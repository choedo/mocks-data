import React, { type KeyboardEvent } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { ColumnOptions, ColumnTypes } from '@/types/data';
import { Input } from '@/components/ui/input';
import type {
  BooleanOptions,
  DateOptions,
  EnumOptions,
  ForeignOptions,
  NumberOptions,
  PrimaryOptions,
} from '@/types/columns';
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { PlusSquare, XIcon } from 'lucide-react';
import toastMessage from '@/lib/toastMessage';

type Props = {
  type: ColumnTypes;
  onChange?: (selected: ColumnOptions) => void;
  disabled?: boolean;
};

export default function ColumnOptionSelector(props: Props) {
  const getDefaultOptions = (type: ColumnTypes): ColumnOptions => {
    switch (type) {
      case 'pk':
        return { type: 'pk', valueType: 'uuid' };
      case 'fk':
        return { type: 'fk', valueType: 'uuid', relationship: '1:1' };
      case 'number':
        return { type: 'number' };
      case 'date':
        return { type: 'date', valueType: 'date' };
      case 'enum':
        return { type: 'enum', values: [] };
      case 'boolean':
        return { type: 'boolean', valueType: 'boolean' };
      default:
        return { type: 'pk', valueType: 'uuid' };
    }
  };

  const [selected, setSelected] = React.useState(() =>
    getDefaultOptions(props.type),
  );
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    const newOptions = getDefaultOptions(props.type);
    setSelected(newOptions);
  }, [props.type]);

  React.useEffect(() => {
    props.onChange?.(selected);
  }, [selected, props.onChange]);

  const handleSelectedChange = (
    target: string,
    value: string | number | Date | undefined | null,
  ) => {
    setSelected((prev) => ({
      ...prev,
      [target]: value,
    }));
  };

  const handleInputNumber = (value: string) => {
    return value.replace(/[^0-9]/g, '');
  };

  const handleAddValues = () => {
    if (selected.type !== 'enum') return;

    if (inputValue.trim() === '') {
      toastMessage.info('Please enter a value.');
      return;
    }

    const prevValues = selected.values;

    if (prevValues.includes(inputValue)) {
      toastMessage.info('Duplicate value exists.');
      return;
    }

    setSelected((prev) => ({
      ...prev,
      values: [...prevValues, inputValue],
    }));
    setInputValue('');
  };

  const handleRemoveValues = (value: string) => {
    if (selected.type !== 'enum') return;

    const prevValues = selected.values;
    setSelected((prev) => ({
      ...prev,
      values: prevValues.filter((v) => v !== value),
    }));
  };

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleAddValues();
    }
  };

  const optionsRendering = (options: ColumnOptions) => {
    if (!options || !options.type) return null;

    switch (options.type) {
      case 'pk': {
        const pkOption = options as PrimaryOptions;

        return (
          <div className={'flex justify-between items-center gap-4'}>
            <Select
              disabled={props.disabled}
              value={pkOption.valueType}
              onValueChange={(value) =>
                handleSelectedChange('valueType', value)
              }
            >
              <SelectTrigger className={'flex-1'}>
                <SelectValue placeholder={'type'} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={'uuid'}>uuid</SelectItem>
                  <SelectItem value={'number'}>number</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className={'flex-1'}>
              {pkOption.valueType === 'number' ? (
                <Input
                  type={'number'}
                  value={pkOption.min}
                  onChange={(e) =>
                    handleSelectedChange(
                      'min',
                      handleInputNumber(e.target.value),
                    )
                  }
                  disabled={props.disabled}
                />
              ) : null}
            </div>
            <div className={'flex-1'}>
              {pkOption.valueType === 'number' ? (
                <Input
                  type={'number'}
                  value={pkOption.max}
                  onChange={(e) =>
                    handleSelectedChange(
                      'max',
                      handleInputNumber(e.target.value),
                    )
                  }
                  placeholder={'Max number'}
                  disabled={props.disabled}
                />
              ) : null}
            </div>
          </div>
        );
      }
      case 'fk': {
        const fkOption = options as ForeignOptions;

        return (
          <div className={'flex justify-between items-center gap-4'}>
            <Select
              disabled={props.disabled}
              value={fkOption.valueType}
              onValueChange={(value) =>
                handleSelectedChange('valueType', value)
              }
            >
              <SelectTrigger className={'flex-1'}>
                <SelectValue placeholder={'type'} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={'uuid'}>uuid</SelectItem>
                  <SelectItem value={'number'}>number</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              disabled={props.disabled}
              value={fkOption.relationship}
              onValueChange={(value) =>
                handleSelectedChange('relationship', value)
              }
            >
              <SelectTrigger className={'flex-1'}>
                <SelectValue placeholder={'relationship'} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={'1:1'}>1:1</SelectItem>
                  <SelectItem value={'1:N'}>1:N</SelectItem>
                  <SelectItem value={'N:1'}>N:11</SelectItem>
                  <SelectItem value={'N:N'}>N:N</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        );
      }
      case 'date': {
        const dateOption = options as DateOptions;
        return (
          <div className={'flex flex-col gap-2'}>
            <div className={'flex-1 flex items-center gap-2'}>
              <Select
                disabled={props.disabled}
                value={dateOption.valueType}
                onValueChange={(value) =>
                  handleSelectedChange('valueType', value)
                }
              >
                <SelectTrigger className={'w-full'}>
                  <SelectValue placeholder={'type'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={'date'}>Date</SelectItem>
                    <SelectItem value={'unix'}>Unix Time</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {dateOption.valueType === 'date' ? (
                <Input
                  className={'w-full'}
                  value={dateOption.format}
                  placeholder={'format'}
                  onChange={(e) =>
                    handleSelectedChange('format', e.target.value)
                  }
                  disabled={props.disabled}
                />
              ) : null}
            </div>
            <div className={'flex-1 flex items-center gap-2'}>
              <DatePicker
                className={'flex-1 w-full'}
                placeholder={'Pick a minimum date'}
                onChange={(date) => handleSelectedChange('startDate', date)}
                disabled={props.disabled}
              />
              <DatePicker
                className={'flex-1 w-full'}
                placeholder={'Pick a maximum date'}
                onChange={(date) => handleSelectedChange('endDate', date)}
                disabled={props.disabled}
              />
            </div>
          </div>
        );
      }
      case 'number': {
        const numberOption = options as NumberOptions;

        return (
          <div className={'flex justify-between items-center gap-4'}>
            <Input
              type={'number'}
              value={numberOption.min}
              onChange={(e) =>
                handleSelectedChange('min', handleInputNumber(e.target.value))
              }
              placeholder={'min'}
              disabled={props.disabled}
            />
            <Input
              type={'number'}
              value={numberOption.max}
              onChange={(e) =>
                handleSelectedChange('max', handleInputNumber(e.target.value))
              }
              placeholder={'max'}
              disabled={props.disabled}
            />
            <Input
              type={'number'}
              value={numberOption.precision}
              onChange={(e) =>
                handleSelectedChange(
                  'precision',
                  handleInputNumber(e.target.value),
                )
              }
              placeholder={'precision'}
              disabled={props.disabled}
            />
          </div>
        );
      }
      case 'enum': {
        const enumOption = options as EnumOptions;

        return (
          <div className={'flex flex-col gap-4'}>
            <div className={'flex gap-2 items-center'}>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={'Please enter a value.'}
                onKeyDown={handlePressEnter}
              />
              <Button size={'icon'} onClick={handleAddValues}>
                <PlusSquare />
              </Button>
            </div>
            <div className={'flex gap-2 flex-wrap'}>
              {enumOption.values.map((value, index) => (
                <div
                  key={`${value}-${index}`}
                  className={'flex items-center gap-2'}
                >
                  <span className={'text-sm'}>{value}</span>{' '}
                  <Button
                    size={'icon-sm'}
                    variant={'outline'}
                    onClick={() => handleRemoveValues(value)}
                    className={'cursor-pointer'}
                  >
                    <XIcon />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );
      }
      case 'boolean': {
        const booleanOption = options as BooleanOptions;

        return (
          <div className={'flex justify-between items-center gap-4'}>
            <Select
              disabled={props.disabled}
              value={booleanOption.valueType}
              onValueChange={(value) =>
                handleSelectedChange('valueType', value)
              }
            >
              <SelectTrigger className={'flex-1'}>
                <SelectValue placeholder={'type'} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={'boolean'}>
                    Boolean (true/false)
                  </SelectItem>
                  <SelectItem value={'number'}>Number (0/1)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        );
      }
      default:
        return <></>;
    }
  };

  return (
    <div className={'flex flex-col gap-2'}>
      <Label>Options</Label>
      {optionsRendering(selected)}
    </div>
  );
}
