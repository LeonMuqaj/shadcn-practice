"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Inbox, Menu, Search, Star, StarOff } from "lucide-react";
import { Message } from "./data";

interface MessageListProps {
  messages: Message[];
  selectedMessage: Message | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectMessage: (message: Message) => void;
  onToggleStar: (messageId: number, e: React.MouseEvent) => void;
  onShowCategories?: () => void;
}

export const MessageList = ({
  messages,
  selectedMessage,
  searchQuery,
  onSearchChange,
  onSelectMessage,
  onToggleStar,
  onShowCategories,
}: MessageListProps) => {
  return (
    <Card className="w-full md:w-80 lg:w-96 shrink-0 h-full md:h-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          {/* Menu button for mobile to show categories */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 lg:hidden shrink-0"
            onClick={onShowCategories}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <CardDescription className="mt-2">
          {messages.length} message
          {messages.length !== 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-12rem)] md:h-[calc(100vh-14rem)]">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Inbox className="h-12 w-12 mb-4 opacity-50" />
              <p>No messages found</p>
            </div>
          ) : (
            <div className="divide-y">
              {messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => onSelectMessage(message)}
                  className={`group cursor-pointer p-3 md:p-4 transition-colors hover:bg-muted/50 ${
                    selectedMessage?.id === message.id ? "bg-muted" : ""
                  } ${!message.read ? "bg-primary/5" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-9 w-9 md:h-10 md:w-10 shrink-0">
                      <AvatarImage src={message.avatar} alt={message.sender} />
                      <AvatarFallback>
                        {message.sender
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`truncate text-sm ${
                            !message.read ? "font-semibold" : "font-medium"
                          }`}
                        >
                          {message.sender}
                        </p>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={(e) => onToggleStar(message.id, e)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {message.starred ? (
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <StarOff className="h-4 w-4 text-muted-foreground hover:text-yellow-400" />
                            )}
                          </button>
                          <span className="text-xs text-muted-foreground">
                            {message.date}
                          </span>
                        </div>
                      </div>
                      <p
                        className={`truncate text-sm ${
                          !message.read
                            ? "font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.subject}
                      </p>
                      <p className="truncate text-xs text-muted-foreground mt-1">
                        {message.preview}
                      </p>
                    </div>
                    {!message.read && (
                      <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
