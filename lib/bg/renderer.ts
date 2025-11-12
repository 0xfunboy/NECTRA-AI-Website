
import { Options, Colors, HexOptions, BuildOptions, Interactivity, Quality } from './types';
import { lerp, clamp, rand, debounce } from './utils';

// --- Interfaces & Types ---
interface Point {
  x: number;
  y: number;
}

interface Hex {
  q: number;
  r: number;
  s: number;
}

enum CellState {
  Hidden,
  Wiring,
  Lit,
  Cooling,
}

interface Cell {
  hex: Hex;
  state: CellState;
  animationStart: number;
  animationDuration: number;
  pulseOffset: number;
  baseAlpha: number;
  patrolHighlight: number;
}

interface Ripple {
  center: Hex;
  startTime: number;
  maxRadius: number;
}

enum BeeState {
  PATROLLING,
  FLEEING,
}

interface PathPoint {
  point: Point;
  timestamp: number;
}

interface Bee {
  state: BeeState;
  currentPos: Point;
  target: Point;
  speed: number;
  path: PathPoint[];
  
  // Patrolling state
  patrolCenter: Hex;
  patrolPoints: Point[];
  patrolIndex: number;
  
  // Fleeing state
  fleeUntil: number; 
}


// --- Default Options ---
const DEFAULT_COLORS: Colors = {
  bgTop: '#0B0C10',
  bgBottom: '#111218',
  cellFill: '#151820',
  cellBorder: '#2A2D36',
  wiring: '#D9A928',
  glow: 'rgba(243, 186, 47, 0.12)',
};
const DEFAULT_HEX_OPTIONS: HexOptions = { size: 30, density: 1.0 };
const DEFAULT_BUILD_OPTIONS: BuildOptions = { mode: 'seeds', speed: 1.0, seedCount: 5 };
const DEFAULT_INTERACTIVITY: Interactivity = { hoverStrength: 1.0, scrollFactor: 1.0, clickRippleStrength: 1.0 };
const DEFAULT_QUALITY: Quality = { maxDPR: 1.5, targetFPS: 60, minFPS: 30, throttleWhenHidden: true, prefersReducedMotion: false };

// --- Main Renderer Class ---
export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private options: Required<{ [K in keyof Omit<Options, 'pixelation'>]: Required<Options[K]> }>;
  
  private cells = new Map<string, Cell>();
  private cellArray: Cell[] = [];
  private buildQueue: { hex: Hex, time: number }[] = [];
  private ripples: Ripple[] = [];
  private bees: Bee[] = [];
  
  private mouse: Point = { x: -9999, y: -9999 };
  private time: number = 0;
  private lastTime: number = 0;
  private frameId: number = 0;
  private isVisible: boolean = true;
  private dpr: number = 1;
  private width: number = 0;
  private height: number = 0;
  private activityPulseTime: number = 0;
  private lastBeeSpawn: number = 0;
  
  // Performance
  private lastFpsCheck: number = 0;
  private framesSinceLastCheck: number = 0;
  private currentFps: number = 60;
  private dynamicHexSize: number;

  // Bee constants
  private readonly MAX_BEES: number = 6;
  private readonly BEE_SPAWN_INTERVAL: number = 0.5;

  constructor(canvas: HTMLCanvasElement, options: Options) {
    this.canvas = canvas;
    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('Could not get 2D context');
    this.ctx = context;

    this.options = {
      colors: { ...DEFAULT_COLORS, ...options.colors },
      hex: { ...DEFAULT_HEX_OPTIONS, ...options.hex },
      build: { ...DEFAULT_BUILD_OPTIONS, ...options.build },
      interactivity: { ...DEFAULT_INTERACTIVITY, ...options.interactivity },
      quality: { ...DEFAULT_QUALITY, ...options.quality },
    };

    this.dynamicHexSize = this.options.hex.size;

    this.handleResize = debounce(this.handleResize.bind(this), 250);
    this.init();
  }

  private init() {
    this.addEventListeners();
    this.handleResize();

    if (this.options.quality.prefersReducedMotion) {
      this.drawStatic();
    } else {
      this.startBuild();
      this.lastTime = performance.now();
      this.frameId = requestAnimationFrame(this.loop.bind(this));
    }
  }

  destroy() {
    cancelAnimationFrame(this.frameId);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('scroll', this.handleScroll);
    if (this.options.quality.throttleWhenHidden) {
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
  }

  public triggerActivity() {
      this.activityPulseTime = this.time;
  }

  private addEventListeners() {
    window.addEventListener('resize', this.handleResize);
    if (!this.options.quality.prefersReducedMotion) {
      window.addEventListener('mousemove', this.handleMouseMove);
      window.addEventListener('mousedown', this.handleMouseDown);
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('scroll', this.handleScroll, { passive: true });
      if (this.options.quality.throttleWhenHidden) {
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
      }
    }
  }

  private handleResize() {
    this.dpr = Math.min(window.devicePixelRatio, this.options.quality.maxDPR);
    this.width = this.canvas.offsetWidth;
    this.height = this.canvas.offsetHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
    
    this.layoutGrid();
    if (this.options.quality.prefersReducedMotion) this.drawStatic();
  }
  
  private loop(currentTime: number) {
    if (!this.isVisible) {
        this.frameId = requestAnimationFrame(this.loop.bind(this));
        return;
    };

    const deltaTime = (currentTime - this.lastTime) / 1000.0;
    this.lastTime = currentTime;
    this.time += deltaTime * this.options.build.speed;

    this.update(deltaTime);
    this.draw();
    
    this.checkPerformance(currentTime);

    this.frameId = requestAnimationFrame(this.loop.bind(this));
  }
  
  private update(deltaTime: number) {
    // Process build queue
    if (this.buildQueue.length > 0 && this.buildQueue[0].time <= this.time) {
      const { hex } = this.buildQueue.shift()!;
      const key = this.hexKey(hex);
      const cell = this.cells.get(key);
      if (cell && cell.state === CellState.Hidden) {
        this.setCellState(cell, CellState.Wiring);
        this.propagateBuild(hex);
      }
    }

    // Update cells
    this.cells.forEach(cell => {
      const timeInState = this.time - cell.animationStart;
      if (cell.state === CellState.Wiring && timeInState > cell.animationDuration) {
        this.setCellState(cell, CellState.Lit);
      } else if (cell.state === CellState.Lit && timeInState > cell.animationDuration) {
        this.setCellState(cell, CellState.Cooling);
      }

      // Decay patrol highlight
      if (cell.patrolHighlight > 0) {
          cell.patrolHighlight = Math.max(0, cell.patrolHighlight - deltaTime * 0.5); // Fade over ~2s
      }
    });
    
    // Update ripples
    this.ripples = this.ripples.filter(ripple => {
        const elapsed = this.time - ripple.startTime;
        const currentRadius = Math.floor(elapsed * 15 * this.options.interactivity.clickRippleStrength);
        if(currentRadius > ripple.maxRadius) return false;

        const ring = this.hexRing(ripple.center, currentRadius);
        ring.forEach(hex => {
            const cell = this.cells.get(this.hexKey(hex));
            if(cell && cell.state === CellState.Hidden) {
                this.setCellState(cell, CellState.Wiring);
                this.propagateBuild(hex);
            }
        });
        return true;
    });

    this.updateBees(deltaTime);
  }

  // --- Draw Methods ---
  private draw() {
    const ctx = this.ctx;
    
    // Background
    const bgGradient = ctx.createLinearGradient(0, 0, 0, this.height);
    bgGradient.addColorStop(0, this.options.colors.bgTop);
    bgGradient.addColorStop(1, this.options.colors.bgBottom);
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.globalCompositeOperation = 'source-over';

    // Draw elements
    this.drawWiring(ctx);
    this.drawCells(ctx);
    this.drawBees(ctx);
  }
  
  private drawWiring(ctx: CanvasRenderingContext2D) {
      ctx.strokeStyle = this.options.colors.wiring;
      ctx.lineWidth = 0.5;
      
      this.cells.forEach(cell => {
          if (cell.state !== CellState.Wiring) return;
          const timeInState = this.time - cell.animationStart;
          const progress = clamp(timeInState / cell.animationDuration, 0, 1);
          
          if(progress < 1) {
             ctx.globalAlpha = (1 - progress) * 0.5;
             const p1 = this.hexToPixel(cell.hex);
             this.hexNeighbors(cell.hex).forEach(neighborHex => {
                 const neighbor = this.cells.get(this.hexKey(neighborHex));
                 if(neighbor && neighbor.state !== CellState.Hidden) {
                     ctx.beginPath();
                     ctx.moveTo(p1.x, p1.y);
                     const p2 = this.hexToPixel(neighborHex);
                     ctx.lineTo(p2.x, p2.y);
                     ctx.stroke();
                 }
             });
          }
      });
      ctx.globalAlpha = 1.0;
  }

  private drawCells(ctx: CanvasRenderingContext2D) {
      const hoverHex = this.pixelToHex(this.mouse);
      
      // Activity Pulse calculation
      const timeSincePulse = this.time - this.activityPulseTime;
      const pulseDuration = 1.5; // seconds
      let activityPulseEffect = 0;
      if (timeSincePulse < pulseDuration) {
          const pulseProgress = timeSincePulse / pulseDuration;
          activityPulseEffect = Math.sin(pulseProgress * Math.PI) * 0.5; // A sine wave pulse
      }
      
      this.cells.forEach(cell => {
          if (cell.state < CellState.Lit) return;
          
          const distToMouse = this.hexDistance(cell.hex, hoverHex);
          const hoverEffect = Math.max(0, 1 - distToMouse / 5) * this.options.interactivity.hoverStrength;

          let alpha = cell.baseAlpha;
          let glowAlpha = 1.0;
          
          const timeInState = this.time - cell.animationStart;
          if (cell.state === CellState.Lit) {
              const progress = clamp(timeInState / cell.animationDuration, 0, 1);
              alpha = lerp(0, cell.baseAlpha, progress);
          } else if (cell.state === CellState.Cooling) {
              glowAlpha = 0.5 + Math.sin(this.time * 2 + cell.pulseOffset) * 0.2;
          }

          const center = this.hexToPixel(cell.hex);
          const points = this.hexCorners(center);
          
          ctx.beginPath();
          points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
          ctx.closePath();
          
          // Fill
          ctx.fillStyle = this.options.colors.cellFill;
          ctx.globalAlpha = alpha;
          ctx.fill();

          // Highlight Fill
          if (cell.patrolHighlight > 0) {
              ctx.fillStyle = this.options.colors.wiring;
              ctx.globalAlpha = cell.patrolHighlight * 0.1 * alpha;
              ctx.fill();
          }

          // Border & Glow
          const finalGlowAlpha = clamp(glowAlpha + hoverEffect * 2 + activityPulseEffect, 0, 1);
          ctx.strokeStyle = this.options.colors.cellBorder;
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = clamp(alpha * 0.8 + hoverEffect, 0, 1);
          ctx.stroke();

          ctx.shadowBlur = 10;
          ctx.shadowColor = this.options.colors.glow;
          ctx.globalAlpha = finalGlowAlpha * 0.5 * cell.baseAlpha; // Tie glow to base alpha
          ctx.stroke();
          ctx.shadowBlur = 0;
      });
      ctx.globalAlpha = 1.0;
  }

  private drawBees(ctx: CanvasRenderingContext2D) {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 1.0;

    this.bees.forEach(bee => {
        if (bee.path.length < 2) return;

        // Draw Trail by iterating through segments
        for (let i = 1; i < bee.path.length; i++) {
            const p1 = bee.path[i-1];
            const p2 = bee.path[i];

            const age = this.time - p2.timestamp;
            if (age > 5.0) continue; // 5 second persistence

            // Fade out over 5 seconds, alpha capped at 0.25
            const alpha = clamp((1 - (age / 5.0)) * 0.25, 0, 0.25);

            if (alpha > 0) {
                ctx.beginPath();
                ctx.moveTo(p1.point.x, p1.point.y);
                ctx.lineTo(p2.point.x, p2.point.y);
                ctx.strokeStyle = `rgba(240, 185, 11, ${alpha})`;
                ctx.stroke();
            }
        }
        // Trim the path array occasionally to prevent memory leaks
        if (bee.path.length > 500) { 
            bee.path = bee.path.filter(p => this.time - p.timestamp <= 5.0);
        }

        // Draw Bee Head
        const head = bee.currentPos;
        ctx.fillStyle = `rgba(240, 185, 11, 0.25)`;
        ctx.shadowColor = `rgba(240, 185, 11, 0.25)`;
        ctx.shadowBlur = 3;
        ctx.beginPath();
        ctx.arc(head.x, head.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    });
  }
  
  private drawStatic() {
      this.cells.forEach(cell => {
        cell.state = CellState.Cooling;
        cell.animationStart = -999;
        cell.animationDuration = 1;
      });
      requestAnimationFrame(() => this.draw());
  }

  // --- Animation & State ---
  private startBuild() {
    this.buildQueue = [];
    for (let i = 0; i < this.options.build.seedCount; i++) {
        const q = Math.floor(rand(this.qMin, this.qMax));
        const r = Math.floor(rand(this.rMin, this.rMax));
        const s = -q -r;
        this.buildQueue.push({ hex: {q, r, s}, time: this.time + rand(0, 2) });
    }
  }
  
  private propagateBuild(hex: Hex) {
    this.hexNeighbors(hex).forEach(neighbor => {
        const cell = this.cells.get(this.hexKey(neighbor));
        if (cell && cell.state === CellState.Hidden) {
            const delay = rand(0.05, 0.2) / this.options.build.speed;
            this.buildQueue.push({ hex: neighbor, time: this.time + delay });
        }
    });
    this.buildQueue.sort((a,b) => a.time - b.time);
  }

  private setCellState(cell: Cell, state: CellState) {
    cell.state = state;
    cell.animationStart = this.time;
    if (state === CellState.Wiring) cell.animationDuration = rand(0.5, 1.0);
    if (state === CellState.Lit) cell.animationDuration = rand(0.5, 1.0);
  }

  private spawnBees(count: number) {
    const litCells = this.cellArray.filter(c => c.state >= CellState.Lit);
    if (litCells.length < 1) return;

    for (let i = 0; i < count; i++) {
        if (this.bees.length >= this.MAX_BEES) break;

        // Spawn bees near the center of the view
        const centerPoint = { x: this.width / 2, y: this.height / 2 };
        const centerHex = this.pixelToHex(centerPoint);

        // Find a lit cell close to the center
        let startCell = litCells
            .sort((a, b) => this.hexDistance(a.hex, centerHex) - this.hexDistance(b.hex, centerHex))[0];

        if (!startCell) startCell = litCells[Math.floor(Math.random() * litCells.length)];
        
        const patrolCenter = startCell.hex;
        const patrolPoints = this.hexCorners(this.hexToPixel(patrolCenter));
        const patrolIndex = Math.floor(rand(0, 6));
        const currentPos = patrolPoints[patrolIndex];
        const target = patrolPoints[(patrolIndex + 1) % 6];

        this.bees.push({
            state: BeeState.PATROLLING,
            currentPos,
            target,
            speed: rand(25, 40), // pixels per second
            path: [{ point: { ...currentPos }, timestamp: this.time }],
            patrolCenter,
            patrolPoints,
            patrolIndex,
            fleeUntil: 0,
        });
    }
}

private updateBees(deltaTime: number) {
    if (!this.options.quality.prefersReducedMotion && this.time - this.lastBeeSpawn > this.BEE_SPAWN_INTERVAL && this.bees.length < this.MAX_BEES) {
        this.spawnBees(1);
        this.lastBeeSpawn = this.time;
    }

    const litCells = this.cellArray.filter(c => c.state >= CellState.Lit);

    this.bees.forEach(bee => {
        const repulsionRadius = 100;
        const distToMouse = Math.hypot(bee.currentPos.x - this.mouse.x, bee.currentPos.y - this.mouse.y);
        
        // Check for state transitions
        if (distToMouse < repulsionRadius && bee.state === BeeState.PATROLLING) {
            bee.state = BeeState.FLEEING;
            bee.fleeUntil = this.time + rand(2, 4); // Flee for a bit
            bee.speed *= 2; // Speed up
        } else if (bee.state === BeeState.FLEEING && this.time > bee.fleeUntil) {
            bee.state = BeeState.PATROLLING;
            bee.speed /= 2; // Slow down
            
            // Find a new patrol route
            if (litCells.length > 0) {
                const currentHex = this.pixelToHex(bee.currentPos);
                const newPatrolCell = litCells.sort((a, b) => this.hexDistance(a.hex, currentHex) - this.hexDistance(b.hex, currentHex))[0];
                
                bee.patrolCenter = newPatrolCell.hex;
                bee.patrolPoints = this.hexCorners(this.hexToPixel(bee.patrolCenter));
                // Find closest corner to start from
                let closestCornerIndex = 0;
                let minDst = Infinity;
                bee.patrolPoints.forEach((p, idx) => {
                    const d = Math.hypot(bee.currentPos.x - p.x, bee.currentPos.y - p.y);
                    if (d < minDst) {
                        minDst = d;
                        closestCornerIndex = idx;
                    }
                });
                bee.patrolIndex = closestCornerIndex;
                bee.target = bee.patrolPoints[bee.patrolIndex];
            } else {
                 // No lit cells, just pick a random target for now
                 bee.target = { x: rand(0, this.width), y: rand(0, this.height)};
            }
        }
        
        // Update target based on state
        if (bee.state === BeeState.FLEEING) {
            const angleFromMouse = Math.atan2(bee.currentPos.y - this.mouse.y, bee.currentPos.x - this.mouse.x);
            bee.target = {
                x: bee.currentPos.x + Math.cos(angleFromMouse) * 100,
                y: bee.currentPos.y + Math.sin(angleFromMouse) * 100
            };
        } else { // PATROLLING
            const key = this.hexKey(bee.patrolCenter);
            const cell = this.cells.get(key);
            if (cell) {
                cell.patrolHighlight = 1.0;
            }

            const distToTarget = Math.hypot(bee.currentPos.x - bee.target.x, bee.currentPos.y - bee.target.y);
            if (distToTarget < 3) {
                bee.patrolIndex = (bee.patrolIndex + 1) % 6;
                bee.target = bee.patrolPoints[bee.patrolIndex];
            }
        }
        
        // Movement
        const moveAngle = Math.atan2(bee.target.y - bee.currentPos.y, bee.target.x - bee.currentPos.x);
        const moveDist = bee.speed * deltaTime;
        
        bee.currentPos.x += Math.cos(moveAngle) * moveDist;
        bee.currentPos.y += Math.sin(moveAngle) * moveDist;
        
        // Update path history
        bee.path.push({ point: { ...bee.currentPos }, timestamp: this.time });
    });
}


  // --- Grid & Hex Math ---
  private qMin=0; private qMax=0; private rMin=0; private rMax=0;
  
  private layoutGrid() {
      this.cells.clear();
      const hexSize = this.dynamicHexSize;
      
      const centerHex = this.pixelToHex({x: this.width / 2, y: this.height / 2});
      const horizSpacing = hexSize * Math.sqrt(3);
      const vertSpacing = hexSize * 1.5;
      const widthInHexes = Math.ceil(this.width / horizSpacing);
      const heightInHexes = Math.ceil(this.height / vertSpacing);
      const radius = Math.max(widthInHexes, heightInHexes) + 2;

      this.qMin = -radius; this.qMax = radius;
      this.rMin = -radius; this.rMax = radius;
      
      const alphaLevels = [0.1, 0.2, 0.35, 0.5, 0.65, 0.8];

      for (let q = -radius; q <= radius; q++) {
        for (let r = -radius; r <= radius; r++) {
          const s = -q -r;
          if (s >= -radius && s <= radius) {
            const hex = {q, r, s};
            const key = this.hexKey(hex);
            this.cells.set(key, {
              hex,
              state: CellState.Hidden,
              animationStart: 0,
              animationDuration: 1,
              pulseOffset: rand(0, Math.PI * 2),
              baseAlpha: alphaLevels[Math.floor(Math.random() * alphaLevels.length)],
              patrolHighlight: 0,
            });
          }
        }
      }
      this.cellArray = Array.from(this.cells.values());
  }

  private hexToPixel(hex: Hex): Point {
    const size = this.dynamicHexSize;
    const x = size * (Math.sqrt(3) * hex.q + (Math.sqrt(3) / 2) * hex.r);
    const y = size * ((3 / 2) * hex.r);
    return { x: x + this.width / 2, y: y + this.height / 2 };
  }

  private pixelToHex(p: Point): Hex {
    const size = this.dynamicHexSize;
    const px = p.x - this.width / 2;
    const py = p.y - this.height / 2;
    const q = ((Math.sqrt(3) / 3) * px - (1 / 3) * py) / size;
    const r = ((2 / 3) * py) / size;
    return this.hexRound({ q, r, s: -q-r });
  }
  
  private hexRound(h: Hex): Hex {
    let q = Math.round(h.q);
    let r = Math.round(h.r);
    let s = Math.round(h.s);
    const q_diff = Math.abs(q - h.q);
    const r_diff = Math.abs(r - h.r);
    const s_diff = Math.abs(s - h.s);
    if (q_diff > r_diff && q_diff > s_diff) q = -r-s;
    else if (r_diff > s_diff) r = -q-s;
    else s = -q-r;
    return { q, r, s };
  }
  
  private hexKey = (h: Hex) => `${h.q},${h.r}`;
  private hexDirections = [ {q:1,r:0,s:-1}, {q:1,r:-1,s:0}, {q:0,r:-1,s:1}, {q:-1,r:0,s:1}, {q:-1,r:1,s:0}, {q:0,r:1,s:-1} ];
  private hexAdd = (a: Hex, b: Hex): Hex => ({ q: a.q + b.q, r: a.r + b.r, s: a.s + b.s });
  private hexNeighbor = (h: Hex, dir: number): Hex => this.hexAdd(h, this.hexDirections[dir]);
  private hexNeighbors = (h: Hex): Hex[] => this.hexDirections.map((_,i) => this.hexNeighbor(h, i));
  private hexDistance = (a: Hex, b: Hex) => (Math.abs(a.q - b.q) + Math.abs(a.r - b.r) + Math.abs(a.s - b.s)) / 2;
  private hexRing = (center: Hex, radius: number): Hex[] => {
    const results: Hex[] = [];
    if (radius === 0) return [center];
    let hex = this.hexAdd(center, {q: this.hexDirections[4].q * radius, r: this.hexDirections[4].r * radius, s: this.hexDirections[4].s * radius});
    for(let i=0; i<6; i++) {
        for(let j=0; j<radius; j++) {
            results.push(hex);
            hex = this.hexNeighbor(hex, i);
        }
    }
    return results;
  }
  
  private hexCorners(center: Point): Point[] {
    const corners: Point[] = [];
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + Math.PI / 6;
        corners.push({
            x: center.x + this.dynamicHexSize * Math.cos(angle),
            y: center.y + this.dynamicHexSize * Math.sin(angle),
        });
    }
    return corners;
  }

  // --- Event Handlers & Performance ---
  private handleMouseMove = (e: MouseEvent) => { 
    this.mouse = { x: e.clientX, y: e.clientY };
  };
  private handleMouseDown = (e: MouseEvent) => {
    const hex = this.pixelToHex({ x: e.clientX, y: e.clientY });
    this.ripples.push({ center: hex, startTime: this.time, maxRadius: 15 });
  };
  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.cellArray.length === 0) return;
    const randomIndex = Math.floor(Math.random() * this.cellArray.length);
    const randomCell = this.cellArray[randomIndex];
    if (randomCell) {
        this.ripples.push({ center: randomCell.hex, startTime: this.time, maxRadius: 10 });
    }
  };
  private handleScroll = () => { this.options.build.speed = clamp(this.options.build.speed + 0.1, 1, 3); setTimeout(() => this.options.build.speed = 1, 200); };
  private handleVisibilityChange = () => {
    this.isVisible = document.visibilityState === 'visible';
    if(this.isVisible) this.lastTime = performance.now();
  };
  
  private checkPerformance(currentTime: number) {
      this.framesSinceLastCheck++;
      if (currentTime > this.lastFpsCheck + 1000) {
          this.currentFps = this.framesSinceLastCheck;
          this.framesSinceLastCheck = 0;
          this.lastFpsCheck = currentTime;
          
          if (this.currentFps < this.options.quality.minFPS && this.dynamicHexSize < this.options.hex.size * 1.5) {
              this.dynamicHexSize += 2;
              this.layoutGrid();
          } else if (this.currentFps > this.options.quality.targetFPS - 5 && this.dynamicHexSize > this.options.hex.size) {
              this.dynamicHexSize = Math.max(this.options.hex.size, this.dynamicHexSize - 2);
              this.layoutGrid();
          }
      }
  }
}
