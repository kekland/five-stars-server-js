export abstract class FilterObject<T> {
  abstract filter: (data: Partial<T>, params: {now: number}) => boolean;
}
