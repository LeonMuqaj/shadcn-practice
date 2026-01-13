"use client";

import { format } from "date-fns";
import { CalendarEvent } from "./data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { X, Clock, Calendar, Tag, Trash2, Edit2 } from "lucide-react";
import { ScrollArea } from "../components/ui/scroll-area";
import EventCard from "./EventCard";

interface EventSidebarProps {
  selectedDate: Date;
  selectedEvent: CalendarEvent | null;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onCloseEvent: () => void;
  onEditEvent: (event: CalendarEvent) => void;
  onDeleteEvent: (event: CalendarEvent) => void;
}

const EventSidebar = ({
  selectedDate,
  selectedEvent,
  events,
  onEventClick,
  onCloseEvent,
  onEditEvent,
  onDeleteEvent,
}: EventSidebarProps) => {
  const dayEvents = events.filter(
    (event) => event.date.toDateString() === selectedDate.toDateString()
  );

  // If an event is selected, show event details
  if (selectedEvent) {
    return (
      <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 flex flex-col">
        <CardHeader className="pb-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Event Details
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onCloseEvent}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {/* Event color bar */}
          <div className={`h-2 rounded-full mb-4 ${selectedEvent.color}`} />

          {/* Event title */}
          <h3 className="text-xl font-semibold mb-4">{selectedEvent.title}</h3>

          {/* Event details */}
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{format(selectedEvent.date, "EEEE, MMMM d, yyyy")}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                {selectedEvent.startTime} - {selectedEvent.endTime}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span
                className={`px-2 py-0.5 rounded text-white text-xs ${selectedEvent.color}`}
              >
                {selectedEvent.category}
              </span>
            </div>

            {selectedEvent.description && (
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                  Description
                </h4>
                <p className="text-sm leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t mt-auto">
            <Button
              variant="outline"
              className="flex-1"
              size="sm"
              onClick={() => onEditEvent(selectedEvent)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              size="sm"
              onClick={() => onDeleteEvent(selectedEvent)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show daily events list
  return (
    <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 flex flex-col">
      <CardHeader className="pb-2 flex-shrink-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {format(selectedDate, "EEEE")}
        </CardTitle>
        <p className="text-2xl font-bold">{format(selectedDate, "MMMM d")}</p>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        {dayEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Calendar className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">No events scheduled</p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Click "Add Event" to create one
            </p>
          </div>
        ) : (
          <ScrollArea className="h-full pr-4">
            <div className="space-y-3">
              {dayEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={onEventClick}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default EventSidebar;
