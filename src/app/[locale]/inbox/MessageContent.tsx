"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Archive,
  ArrowLeft,
  Clock,
  Forward,
  Inbox,
  MailOpen,
  MoreVertical,
  Reply,
  Star,
  StarOff,
  Trash2,
} from "lucide-react";
import { Message } from "./data";

interface MessageContentProps {
  message: Message | null;
  onToggleStar: (messageId: number, e: React.MouseEvent) => void;
  onMarkAsUnread: (messageId: number) => void;
  onDelete: (messageId: number) => void;
  onBack?: () => void;
}

export const MessageContent = ({
  message,
  onToggleStar,
  onMarkAsUnread,
  onDelete,
  onBack,
}: MessageContentProps) => {
  if (!message) {
    return (
      <Card className="flex-1 h-full">
        <div className="flex h-full flex-col items-center justify-center text-muted-foreground p-6">
          <div className="rounded-full bg-muted p-6 mb-4">
            <Inbox className="h-10 w-10 md:h-12 md:w-12" />
          </div>
          <h3 className="text-base md:text-lg font-medium mb-1">
            Select a message
          </h3>
          <p className="text-sm text-center">
            Choose a message from the list to read it
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex-1 h-full flex flex-col">
      <CardHeader className="pb-4 shrink-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3 md:gap-4 min-w-0">
            {/* Back button for mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 md:hidden shrink-0"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-10 w-10 md:h-12 md:w-12 shrink-0">
              <AvatarImage src={message.avatar} alt={message.sender} />
              <AvatarFallback>
                {message.sender
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg truncate">
                <span className="truncate">{message.sender}</span>
                {message.starred && (
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 shrink-0" />
                )}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1 text-xs md:text-sm flex-wrap">
                <span className="truncate max-w-[150px] md:max-w-none">
                  {message.email}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {message.date}
                </span>
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => onToggleStar(message.id, e)}
            >
              {message.starred ? (
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ) : (
                <StarOff className="h-4 w-4" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onMarkAsUnread(message.id)}>
                  <MailOpen className="mr-2 h-4 w-4" />
                  Mark as unread
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => onDelete(message.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Separator className="mt-4" />
      </CardHeader>
      <ScrollArea className="flex-1">
        <CardContent className="pt-0">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            {message.subject}
          </h2>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
              {message.content}
            </pre>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-wrap gap-2">
            <Button className="flex-1 sm:flex-none">
              <Reply className="mr-2 h-4 w-4" />
              Reply
            </Button>
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Forward className="mr-2 h-4 w-4" />
              Forward
            </Button>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};
