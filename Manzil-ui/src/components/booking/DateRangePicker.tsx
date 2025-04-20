import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerWithRangeProps {
  className?: string;
  onChange?: (range: DateRange | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
}

export function DatePickerWithRange({
  className,
  onChange,
  minDate = new Date(), // default to today
  maxDate,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const [months, setMonths] = React.useState<number>(2);

  // Responsive: change number of months based on screen width
  React.useEffect(() => {
    const updateMonths = () => {
      setMonths(window.innerWidth < 640 ? 1 : 2);
    };
    updateMonths();
    window.addEventListener("resize", updateMonths);
    return () => window.removeEventListener("resize", updateMonths);
  }, []);

  const handleDateChange = (range: DateRange | undefined) => {
    setDate(range);
    onChange?.(range);
  };

  const handleClear = () => {
    setDate(undefined);
    onChange?.(undefined);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={months}
            fromDate={minDate}
            toDate={maxDate}
          />
          <Button
            variant="ghost"
            onClick={handleClear}
            className="mt-2 text-xs text-red-500 hover:text-red-600"
          >
            Clear dates
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
