"use client";

import { CalendarEvent } from "./data";
import { Clock } from "lucide-react";

interface EventCardProps {
  event: CalendarEvent;
  compact?: boolean;
  onClick?: (event: CalendarEvent) => void;
}

const EventCard = ({ event, compact = false, onClick }: EventCardProps) => {
  if (compact) {
    return (
      <button
        onClick={() => onClick?.(event)}
        className={`w-full text-left px-2 py-1 rounded-md text-xs font-medium text-white truncate ${event.color} hover:opacity-90 transition-opacity`}
      >
        {event.title}
      </button>
    );
  }

  return (
    <button
      onClick={() => onClick?.(event)}
      className={`w-full text-left p-3 rounded-lg bg-card border border-border/50 hover:border-border hover:shadow-md transition-all group`}
    >
      <div className="flex items-start gap-3">
        {/* Color indicator */}
        <div
          className={`w-1 h-full min-h-[40px] rounded-full ${event.color}`}
        />

        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
            {event.title}
          </h4>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>
              {event.startTime} - {event.endTime}
            </span>
          </div>
          {event.description && (
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
              {event.description}
            </p>
          )}
        </div>
      </div>
    </button>
  );
};

export default EventCard;
