export class Route {
  polyline: string;
  distance: number;

  constructor(data: { polyline: string, distance: number }) {
    if (data == null) return;
    this.polyline = data.polyline
    this.distance = data.distance
  }
}
