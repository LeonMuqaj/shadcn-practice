"use client";

import { useState } from "react";
import { initialEvents, CalendarEvent } from "./data";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import MiniCalendar from "./MiniCalendar";
import EventSidebar from "./EventSidebar";
import AddEventDialog from "./AddEventDialog";
import EditEventDialog from "./EditEventDialog";
import DeleteEventDialog from "./DeleteEventDialog";
import MobileEventSheet from "./MobileEventSheet";
import {
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
} from "date-fns";

const CalendarPage = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<CalendarEvent | null>(null);
  const [eventToDelete, setEventToDelete] = useState<CalendarEvent | null>(
    null
  );
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false);

  const handleNavigate = (direction: "prev" | "next" | "today") => {
    if (direction === "today") {
      setCurrentDate(new Date());
      setSelectedDate(new Date());
      return;
    }

    const modifier = direction === "next" ? 1 : -1;

    switch (viewMode) {
      case "month":
        setCurrentDate(
          modifier === 1 ? addMonths(currentDate, 1) : subMonths(currentDate, 1)
        );
        break;
      case "week":
        setCurrentDate(
          modifier === 1 ? addWeeks(currentDate, 1) : subWeeks(currentDate, 1)
        );
        break;
      case "day":
        setCurrentDate(
          modifier === 1 ? addDays(currentDate, 1) : subDays(currentDate, 1)
        );
        break;
    }
  };

  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setSelectedEvent(null);
      if (viewMode === "day") {
        setCurrentDate(date);
      }
      // Open mobile sheet on smaller screens
      if (window.innerWidth < 768) {
        setIsMobileSheetOpen(true);
      }
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const handleCloseEvent = () => {
    setSelectedEvent(null);
  };

  const handleAddEvent = (eventData: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: Math.max(...events.map((e) => e.id), 0) + 1,
    };
    setEvents([...events, newEvent]);
  };

  const handleEditClick = (event: CalendarEvent) => {
    setEventToEdit(event);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (updatedEvent: CalendarEvent) => {
    setEvents(events.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)));
    setSelectedEvent(updatedEvent);
    setIsEditDialogOpen(false);
    setEventToEdit(null);
  };

  const handleDeleteClick = (event: CalendarEvent) => {
    setEventToDelete(event);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = (eventId: number) => {
    setEvents(events.filter((e) => e.id !== eventId));
    setSelectedEvent(null);
    setIsDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] p-4 md:p-6">
      {/* Header */}
      <CalendarHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onNavigate={handleNavigate}
        onAddEvent={() => setIsAddDialogOpen(true)}
      />

      {/* Main Content */}
      <div className="flex-1 flex gap-4 md:gap-6 mt-4 min-h-0">
        {/* Left Sidebar - Mini Calendar (hidden on mobile) */}
        <div className="hidden lg:block w-[280px] flex-shrink-0">
          <MiniCalendar
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            events={events}
          />
        </div>

        {/* Center - Calendar Grid */}
        <CalendarGrid
          currentDate={currentDate}
          selectedDate={selectedDate}
          viewMode={viewMode}
          events={events}
          onSelectDate={(date) => handleSelectDate(date)}
          onEventClick={handleEventClick}
        />

        {/* Right Sidebar - Event Details (hidden on mobile) */}
        <div className="hidden md:block w-[300px] flex-shrink-0">
          <EventSidebar
            selectedDate={selectedDate}
            selectedEvent={selectedEvent}
            events={events}
            onEventClick={handleEventClick}
            onCloseEvent={handleCloseEvent}
            onEditEvent={handleEditClick}
            onDeleteEvent={handleDeleteClick}
          />
        </div>
      </div>

      {/* Add Event Dialog */}
      <AddEventDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddEvent={handleAddEvent}
        selectedDate={selectedDate}
      />

      {/* Edit Event Dialog */}
      <EditEventDialog
        open={isEditDialogOpen}
        event={eventToEdit}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEventToEdit(null);
        }}
        onSave={handleSaveEdit}
      />

      {/* Delete Event Dialog */}
      <DeleteEventDialog
        open={isDeleteDialogOpen}
        event={eventToDelete}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setEventToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />

      {/* Mobile Event Sheet */}
      <MobileEventSheet
        open={isMobileSheetOpen}
        onClose={() => setIsMobileSheetOpen(false)}
        selectedDate={selectedDate}
        selectedEvent={selectedEvent}
        events={events}
        onEventClick={handleEventClick}
        onCloseEvent={handleCloseEvent}
        onEditEvent={handleEditClick}
        onDeleteEvent={handleDeleteClick}
      />
    </div>
  );
};

export default CalendarPage;
