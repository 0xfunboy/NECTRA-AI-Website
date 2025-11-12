
import { Renderer } from './renderer';
import { Options } from './types';

let instance: Renderer | null = null;

export const initBackground = (canvas: HTMLCanvasElement, options: Options = {}): void => {
  if (instance) {
    destroy();
  }
  if (canvas) {
    try {
        instance = new Renderer(canvas, options);
    } catch (error) {
        console.error("Failed to initialize background animation:", error);
        // Fallback to a static background if initialization fails
        canvas.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = "fixed top-0 left-0 w-full h-full z-0";
        fallback.style.background = 'radial-gradient(ellipse at center, #111218 0%, #0B0C10 100%)';
        document.body.insertBefore(fallback, document.body.firstChild);
    }
  }
};

export const destroy = (): void => {
  if (instance) {
    instance.destroy();
    instance = null;
  }
};

export const triggerActivity = (): void => {
    if (instance) {
        instance.triggerActivity();
    }
}
