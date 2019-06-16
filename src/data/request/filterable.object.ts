import { IFilter } from 'lapisdb/dist/database/filter/filter.types';

export abstract class FilterObject<T> {
  abstract filter: (data: IFilter<T>, params: {now: number}) => boolean;
}
