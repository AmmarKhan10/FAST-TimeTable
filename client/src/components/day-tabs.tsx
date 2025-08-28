import { Button } from "@/components/ui/button";

interface DayTabsProps {
  selectedDay: string;
  onDayChange: (day: string) => void;
}

const days = [
  { value: "all", label: "All" },
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
];

export default function DayTabs({ selectedDay, onDayChange }: DayTabsProps) {
  return (
    <div className="flex space-x-1 mb-6 overflow-x-auto">
      {days.map((day) => (
        <Button
          key={day.value}
          variant={selectedDay === day.value ? "default" : "ghost"}
          size="sm"
          className="whitespace-nowrap"
          onClick={() => onDayChange(day.value)}
          data-testid={`day-tab-${day.value}`}
        >
          {day.label}
        </Button>
      ))}
    </div>
  );
}
