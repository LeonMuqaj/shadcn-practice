"use client";

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  isToday,
  addDays,
} from "date-fns";
import { CalendarEvent } from "./data";
import EventCard from "./EventCard";

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date;
  viewMode: "month" | "week" | "day";
  events: CalendarEvent[];
  onSelectDate: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const CalendarGrid = ({
  currentDate,
  selectedDate,
  viewMode,
  events,
  onSelectDate,
  onEventClick,
}: CalendarGridProps) => {
  const getEventsForDate = (date: Date) => {
    return events.filter((event) => isSameDay(event.date, date));
  };

  // Month View
  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    const weeks: Date[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <div className="flex-1 flex flex-col">
        {/* Week day headers */}
        <div className="grid grid-cols-7 border-b">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="py-3 text-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="flex-1 flex flex-col">
          {weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className="grid grid-cols-7 border-b last:border-b-0"
            >
              {week.map((day) => {
                const dayEvents = getEventsForDate(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isSelected = isSameDay(day, selectedDate);
                const isTodayDate = isToday(day);

                return (
                  <div
                    key={day.toISOString()}
                    onClick={() => onSelectDate(day)}
                    className={`min-h-[100px] p-2 border-r last:border-r-0 text-left transition-colors hover:bg-muted/50 cursor-pointer ${
                      !isCurrentMonth ? "bg-muted/20" : ""
                    } ${isSelected ? "bg-accent" : ""}`}
                  >
                    <div className="flex flex-col h-full">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 text-sm rounded-full flex-shrink-0 whitespace-nowrap ${
                          isTodayDate
                            ? "bg-primary text-primary-foreground font-bold"
                            : isCurrentMonth
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {format(day, "d")}
                      </span>
                      <div className="flex-1 mt-1 space-y-1 overflow-hidden">
                        {dayEvents.slice(0, 3).map((event) => (
                          <EventCard
                            key={event.id}
                            event={event}
                            compact
                            onClick={onEventClick}
                          />
                        ))}
                        {dayEvents.length > 3 && (
                          <span className="text-xs text-muted-foreground px-2">
                            +{dayEvents.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Week View
  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate);
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Week day headers */}
        <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b sticky top-0 bg-background z-10">
          <div className="py-3" />
          {days.map((day) => {
            const isTodayDate = isToday(day);
            const isSelected = isSameDay(day, selectedDate);
            return (
              <button
                key={day.toISOString()}
                onClick={() => onSelectDate(day)}
                className={`py-3 text-center border-l hover:bg-muted/50 transition-colors ${
                  isSelected ? "bg-accent" : ""
                }`}
              >
                <div className="text-xs text-muted-foreground">
                  {format(day, "EEE")}
                </div>
                <div
                  className={`text-lg font-semibold ${
                    isTodayDate ? "text-primary" : "text-foreground"
                  }`}
                >
                  {format(day, "d")}
                </div>
              </button>
            );
          })}
        </div>

        {/* Time grid */}
        <div className="flex-1">
          {hours.map((hour) => (
            <div
              key={hour}
              className="grid grid-cols-[60px_repeat(7,1fr)] border-b min-h-[60px]"
            >
              <div className="pr-2 text-right text-xs text-muted-foreground sticky left-0 bg-background">
                {format(new Date().setHours(hour, 0, 0, 0), "ha")}
              </div>
              {days.map((day) => {
                const dayEvents = getEventsForDate(day).filter((event) => {
                  const eventHour = parseInt(event.startTime.split(":")[0]);
                  return eventHour === hour;
                });
                return (
                  <div
                    key={day.toISOString()}
                    className="border-l p-1 relative"
                  >
                    {dayEvents.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        compact
                        onClick={onEventClick}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Day View
  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dayEvents = getEventsForDate(currentDate);

    return (
      <div className="flex-1 overflow-auto">
        {/* All day events section */}
        {dayEvents.length > 0 && (
          <div className="border-b p-4 bg-muted/20">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Events for {format(currentDate, "MMMM d, yyyy")}
            </h3>
            <div className="flex flex-wrap gap-2">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className={`px-3 py-1.5 rounded-md text-white text-sm font-medium cursor-pointer hover:opacity-90 ${event.color}`}
                  onClick={() => onEventClick(event)}
                >
                  {event.title} ({event.startTime} - {event.endTime})
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hourly grid */}
        <div>
          {hours.map((hour) => {
            const hourEvents = dayEvents.filter((event) => {
              const eventHour = parseInt(event.startTime.split(":")[0]);
              return eventHour === hour;
            });
            return (
              <div
                key={hour}
                className="flex border-b min-h-[80px] hover:bg-muted/30 transition-colors"
              >
                <div className="w-20 pr-3 py-2 text-right text-sm text-muted-foreground border-r flex-shrink-0">
                  {format(new Date().setHours(hour, 0, 0, 0), "h:mm a")}
                </div>
                <div className="flex-1 p-2">
                  {hourEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-2 rounded-md text-white cursor-pointer hover:opacity-90 transition-opacity ${event.color}`}
                      onClick={() => onEventClick(event)}
                    >
                      <div className="font-medium text-sm">{event.title}</div>
                      <div className="text-xs opacity-90">
                        {event.startTime} - {event.endTime}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-card rounded-lg border overflow-hidden">
      {viewMode === "month" && renderMonthView()}
      {viewMode === "week" && renderWeekView()}
      {viewMode === "day" && renderDayView()}
    </div>
  );
};

export default CalendarGrid;
