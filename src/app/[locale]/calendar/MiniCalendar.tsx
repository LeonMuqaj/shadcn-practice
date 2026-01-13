"use client";

import { Calendar } from "../components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { CalendarEvent } from "./data";
import { Badge } from "../components/ui/badge";

interface MiniCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date | undefined) => void;
  events: CalendarEvent[];
}

const MiniCalendar = ({
  selectedDate,
  onSelectDate,
  events,
}: MiniCalendarProps) => {
  // Get unique categories from events
  const categories = Array.from(new Set(events.map((e) => e.category)));

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Work: "bg-blue-500",
      Meeting: "bg-purple-500",
      Personal: "bg-green-500",
      Other: "bg-gray-500",
    };
    return colors[category] || colors.Other;
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          className="w-full"
          modifiers={{
            hasEvent: events.map((e) => e.date),
          }}
          modifiersStyles={{
            hasEvent: {
              fontWeight: "bold",
            },
          }}
        />

        {/* Categories Legend */}
        <div className="px-4 pb-4">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Categories
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="text-xs font-normal"
              >
                <span
                  className={`w-2 h-2 rounded-full mr-1.5 ${getCategoryColor(
                    category
                  )}`}
                />
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MiniCalendar;
