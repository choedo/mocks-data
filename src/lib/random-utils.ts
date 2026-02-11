import { MAXIMUM_DATE } from '@/constants/column';
import type { DateOptions } from '@/types/columns';
import dayjs from 'dayjs';

export const RandomUtils = {
  getUUID: () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID)
      return crypto.randomUUID();
    else
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
  },
  getInt: (min: number = 0, max: number = Infinity) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  pick: <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  },
  getDate: (options: DateOptions) => {
    const end = new Date(options.endDate || MAXIMUM_DATE);
    const start = new Date(options.startDate || MAXIMUM_DATE);

    const randomTime =
      start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTime);

    if (options.valueType === 'date')
      return dayjs(randomDate).format(options.format);
    else return dayjs(randomDate).unix();
  },
};
