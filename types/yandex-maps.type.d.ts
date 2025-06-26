// types/yandex-maps.type.d.ts

declare namespace ymaps {
  export function ready(callback: () => void): void;
  export class Map {
    constructor(id: string, options: any);
    setCenter(coords: number[]): void;
    setZoom(zoom: number): void;
  }

  export class Placemark {
    constructor(coords: number[], options: any, style: any);
  }
}