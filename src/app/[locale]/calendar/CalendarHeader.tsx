"use client";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { format } from "date-fns";

interface CalendarHeaderProps {
  currentDate: Date;
  viewMode: "month" | "week" | "day";
  onViewModeChange: (mode: "month" | "week" | "day") => void;
  onNavigate: (direction: "prev" | "next" | "today") => void;
  onAddEvent: () => void;
}

const CalendarHeader = ({
  currentDate,
  viewMode,
  onViewModeChange,
  onNavigate,
  onAddEvent,
}: CalendarHeaderProps) => {
  const getHeaderTitle = () => {
    switch (viewMode) {
      case "month":
        return format(currentDate, "MMMM yyyy");
      case "week":
        return format(currentDate, "MMMM d, yyyy");
      case "day":
        return format(currentDate, "EEEE, MMMM d, yyyy");
      default:
        return format(currentDate, "MMMM yyyy");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b">
      {/* Left side - Navigation */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate("today")}
          className="font-medium"
        >
          Today
        </Button>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("prev")}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate("next")}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <h2 className="text-xl font-semibold ml-2">{getHeaderTitle()}</h2>
      </div>

      {/* Right side - View toggle and Add button */}
      <div className="flex items-center gap-3">
        {/* View Mode Toggle */}
        <div className="flex bg-muted rounded-lg p-1">
          {(["month", "week", "day"] as const).map((mode) => (
            <Button
              key={mode}
              variant={viewMode === mode ? "secondary" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange(mode)}
              className={`px-3 capitalize transition-all ${
                viewMode === mode
                  ? "bg-background shadow-sm"
                  : "hover:bg-transparent"
              }`}
            >
              {mode}
            </Button>
          ))}
        </div>

        {/* Add Event Button */}
        <Button
          onClick={onAddEvent}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
