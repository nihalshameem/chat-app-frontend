declare module 'web-vitals' {
    export type Metric = {
      name: string;
      value: number;
      id?: string;
      delta?: number;
      entries?: any[];
      duration?: number;
    };
  
    export function getCLS(onPerfEntry?: (metric: Metric) => void): void;
    export function getFID(onPerfEntry?: (metric: Metric) => void): void;
    export function getFCP(onPerfEntry?: (metric: Metric) => void): void;
    export function getLCP(onPerfEntry?: (metric: Metric) => void): void;
    export function getTTFB(onPerfEntry?: (metric: Metric) => void): void;
  }
  