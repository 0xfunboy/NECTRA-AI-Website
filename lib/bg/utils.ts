export const lerp = (a: number, b: number, t: number): number => a * (1 - t) + b * t;

export const clamp = (val: number, min: number, max: number): number => Math.max(min, Math.min(val, max));

export const rand = (min: number, max: number): number => Math.random() * (max - min) + min;

export const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number): ((...args: Parameters<T>) => void) => {
  let timeoutId: number | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn(...args), delay);
  };
};
