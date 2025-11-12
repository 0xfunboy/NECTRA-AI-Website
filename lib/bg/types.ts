export interface Colors {
  bgTop: string;
  bgBottom: string;
  cellFill: string;
  cellBorder: string;
  wiring: string;
  glow: string;
}

export interface HexOptions {
    size: number;
    density: number;
}

export interface BuildOptions {
    mode: 'wave' | 'noise' | 'seeds';
    speed: number;
    seedCount: number;
}

export interface Interactivity {
  hoverStrength: number;
  scrollFactor: number;
  clickRippleStrength: number;
}

export interface Quality {
  maxDPR: number;
  targetFPS: number;
  minFPS: number;
  throttleWhenHidden: boolean;
  prefersReducedMotion: boolean;
}

export interface Options {
  hex?: Partial<HexOptions>;
  colors?: Partial<Colors>;
  build?: Partial<BuildOptions>;
  interactivity?: Partial<Interactivity>;
  quality?: Partial<Quality>;
}