"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { CalendarEvent } from "./data";
import { AlertTriangle } from "lucide-react";

interface DeleteEventDialogProps {
  open: boolean;
  event: CalendarEvent | null;
  onClose: () => void;
  onConfirm: (eventId: number) => void;
}

const DeleteEventDialog = ({
  open,
  event,
  onClose,
  onConfirm,
}: DeleteEventDialogProps) => {
  if (!event) return null;

  const handleDelete = () => {
    onConfirm(event.id);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] backdrop-blur-sm">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                Delete Event
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-foreground">
            Are you sure you want to delete{" "}
            <span className="font-semibold">&quot;{event.title}&quot;</span>?
          </p>
          <div className="mt-3 p-3 rounded-lg bg-muted/50 border">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${event.color}`} />
              <span className="font-medium text-sm">{event.title}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {event.startTime} - {event.endTime} • {event.category}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteEventDialog;
