"use client";

import { useState } from "react";
import { initialMessages, Message } from "./data";
import { SidebarCategories } from "./SidebarCategories";
import { MessageList } from "./MessageList";
import { MessageContent } from "./MessageContent";

const InboxPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("inbox");
  // Mobile view state: 'categories' | 'list' | 'content'
  const [mobileView, setMobileView] = useState<
    "categories" | "list" | "content"
  >("list");

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "inbox" ||
      (activeCategory === "starred" && msg.starred) ||
      (activeCategory === "unread" && !msg.read);
    return matchesSearch && matchesCategory;
  });

  const unreadCount = messages.filter((msg) => !msg.read).length;
  const starredCount = messages.filter((msg) => msg.starred).length;

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    setMobileView("content");
    if (!message.read) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, read: true } : msg
        )
      );
    }
  };

  const handleToggleStar = (messageId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
      )
    );
    if (selectedMessage?.id === messageId) {
      setSelectedMessage((prev) =>
        prev ? { ...prev, starred: !prev.starred } : null
      );
    }
  };

  const handleDeleteMessage = (messageId: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
      setMobileView("list");
    }
  };

  const handleMarkAsUnread = (messageId: number) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, read: false } : msg))
    );
    setSelectedMessage(null);
    setMobileView("list");
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSelectedMessage(null);
    setMobileView("list");
  };

  const handleBackToList = () => {
    setSelectedMessage(null);
    setMobileView("list");
  };

  const handleShowCategories = () => {
    setMobileView("categories");
  };

  const handleBackFromCategories = () => {
    setMobileView("list");
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] gap-4 md:gap-6 p-4 md:p-6">
      {/* Sidebar Categories - hidden on mobile, visible on lg+ */}
      <div
        className={`
        ${mobileView === "categories" ? "block" : "hidden"} 
        lg:block 
        w-full lg:w-auto
      `}
      >
        <SidebarCategories
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          totalCount={messages.length}
          unreadCount={unreadCount}
          starredCount={starredCount}
          onBack={handleBackFromCategories}
          showBackButton={mobileView === "categories"}
        />
      </div>

      {/* Message List - visible on mobile when mobileView is 'list', always visible on md+ */}
      <div
        className={`
        ${mobileView === "list" ? "block" : "hidden"} 
        md:block 
        w-full md:w-auto
      `}
      >
        <MessageList
          messages={filteredMessages}
          selectedMessage={selectedMessage}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectMessage={handleSelectMessage}
          onToggleStar={handleToggleStar}
          onShowCategories={handleShowCategories}
        />
      </div>

      {/* Message Content - visible on mobile when mobileView is 'content', always visible on md+ */}
      <div
        className={`
        ${mobileView === "content" ? "block" : "hidden"} 
        md:block 
        w-full md:flex-1
      `}
      >
        <MessageContent
          message={selectedMessage}
          onToggleStar={handleToggleStar}
          onMarkAsUnread={handleMarkAsUnread}
          onDelete={handleDeleteMessage}
          onBack={handleBackToList}
        />
      </div>
    </div>
  );
};

export default InboxPage;
