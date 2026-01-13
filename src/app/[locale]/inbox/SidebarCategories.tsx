"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Archive, ArrowLeft, Inbox, Mail, Send, Star } from "lucide-react";
import { useTranslations } from "next-intl";

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
}

interface SidebarCategoriesProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  totalCount: number;
  unreadCount: number;
  starredCount: number;
  onBack?: () => void;
  showBackButton?: boolean;
}

export const SidebarCategories = ({
  activeCategory,
  onCategoryChange,
  totalCount,
  unreadCount,
  starredCount,
  onBack,
  showBackButton = false,
}: SidebarCategoriesProps) => {
  const t = useTranslations();

  const categories: Category[] = [
    {
      id: "inbox",
      label: t("menu.inbox"),
      icon: Inbox,
      count: totalCount,
    },
    { id: "unread", label: "Unread", icon: Mail, count: unreadCount },
    { id: "starred", label: "Starred", icon: Star, count: starredCount },
    { id: "sent", label: "Sent", icon: Send, count: 0 },
    { id: "archive", label: "Archive", icon: Archive, count: 0 },
  ];

  return (
    <Card className="w-full lg:w-52 shrink-0 h-full lg:h-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 lg:hidden"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <Mail className="h-5 w-5" />
          {t("menu.inbox")}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3">
        <div className="space-y-1">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-2"
              onClick={() => onCategoryChange(category.id)}
            >
              <category.icon className="h-4 w-4" />
              {category.label}
              {category.count > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-auto bg-primary/10 text-primary"
                >
                  {category.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
