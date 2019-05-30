export interface NamedPosition {
  latitude: number;
  longitude: number;
  name: string;
}

export interface NamedPositionWithTime {
  position: NamedPosition;
  time: Date;
}
