import { MAXIMUM_DATE, MINIMUM_DATE } from '@/constants/column';
import type {
  BooleanOptions,
  DateOptions,
  EnumOptions,
  NumberOptions,
  PrimaryOptions,
} from '@/types/columns';
import type { ColumnOptions } from '@/types/data';
import dayjs from 'dayjs';

type FailReturnType = { status: 'Fail'; message: string };
type SuccessReturnType = {
  status: 'Success';
  data: ColumnOptions;
  message: string;
};
type ReturnType = FailReturnType | SuccessReturnType;

export function columnValidateCheck(options: ColumnOptions): ReturnType {
  const optionsType = options.type;

  switch (optionsType) {
    case 'pk':
      return primaryValidateCheck(options);
    case 'date':
      return dateValidateCheck(options);
    case 'number':
      return numberValidateCheck(options);
    case 'enum':
      return enumValidateCheck(options);
    case 'boolean':
      return booleanValidateCheck(options);
    default:
      return { status: 'Fail', message: 'Undefined Option Type' };
  }
}

// Primary Key Type
function primaryValidateCheck(options: PrimaryOptions): ReturnType {
  const primaryValueType = options.valueType;

  if (primaryValueType === 'uuid') {
    return { status: 'Success', message: 'Success', data: options };
  } else {
    const { min } = options;

    if (!min) {
      return {
        status: 'Fail',
        message: 'Please enter the minimum value.',
      };
    }

    return { status: 'Success', message: 'Success', data: options };
  }
}

// Date Type
function dateValidateCheck(options: DateOptions): ReturnType {
  const { type, startDate, endDate, format, valueType } = options;
  if (startDate && endDate) {
    if (!dayjs(startDate).isBefore(endDate)) {
      return {
        status: 'Fail',
        message: 'Minimum date is greater than maximum date.',
      };
    }
  }

  return {
    status: 'Success',
    message: 'Success',
    data: {
      type,
      valueType,
      format: format || 'YYYY-MM-DD',
      startDate: startDate || new Date(MINIMUM_DATE),
      endDate: endDate || new Date(MAXIMUM_DATE),
    },
  };
}

// Number Type
function numberValidateCheck(options: NumberOptions): ReturnType {
  const { type, min, max, precision } = options;

  if (min && max) {
    if (min >= max) {
      return {
        status: 'Fail',
        message: 'Minimum value is greater than maximum value.',
      };
    }
  }

  return {
    status: 'Success',
    message: 'Success',
    data: {
      type,
      min: min || 0,
      max: max || Infinity,
      precision: precision || 0,
    },
  };
}

// Enum Type
function enumValidateCheck(options: EnumOptions): ReturnType {
  if (options.values.length === 0) {
    return {
      status: 'Fail',
      message: 'One or more values are required.',
    };
  }

  return {
    status: 'Success',
    message: 'Success',
    data: options,
  };
}

// Boolean Type
function booleanValidateCheck(options: BooleanOptions): ReturnType {
  if (!options.valueType) {
    return {
      status: 'Fail',
      message: 'Please select an option type',
    };
  }

  return {
    status: 'Success',
    message: 'Success',
    data: options,
  };
}
