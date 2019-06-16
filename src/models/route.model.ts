export class Route {
  polyline: string;
  distance: number;

  constructor(data: {polyline: string, distance: number}) {
    this.polyline = data.polyline
    this.distance = data.distance
  }
}
