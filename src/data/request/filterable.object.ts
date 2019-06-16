export abstract class FilterObject<T> {
  abstract filter: (data: T) => boolean;
}
