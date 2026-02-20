import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';

type Props = {
  defaultDate?: Date;
  format?: string;
  onChange?: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
};

export function DatePicker({
  defaultDate,
  format = 'YYYY.MM.DD',
  onChange,
  className,
  placeholder = 'Pick a date',
  disabled,
}: Props) {
  const [date, setDate] = React.useState<Date>();

  React.useEffect(() => {
    if (defaultDate) setDate(defaultDate);
  }, [defaultDate]);

  const handleSelectDate = (date?: Date) => {
    setDate(date);

    if (onChange) {
      onChange(date);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`justify-between font-normal ${className}`}
          disabled={disabled}
        >
          {date ? (
            <span>{dayjs(date).format(format)}</span>
          ) : (
            <span className={'text-muted-foreground line-clamp-1 truncate'}>
              {placeholder}
            </span>
          )}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode={'single'}
          selected={date}
          onSelect={handleSelectDate}
          defaultMonth={date}
          disabled={disabled}
          captionLayout={'dropdown'}
        />
      </PopoverContent>
    </Popover>
  );
}
