"use client";

import { Badge } from "../../components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../components/ui/hover-card";
import { Progress } from "../../components/ui/progress";
import { BadgeCheck, Candy, Citrus, Shield } from "lucide-react";
import { Sheet, SheetTrigger } from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import EditUser from "../../components/EditUser";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import AppLineChart from "../../components/AppLineChart";
import CardList from "../../components/CardList";
import { useUsersStore } from "@/store/useUsersStore";
import { useTranslations } from "next-intl";

interface UserProfileClientProps {
  username: string;
}

const UserProfileClient = ({ username }: UserProfileClientProps) => {
  const t = useTranslations();
  const users = useUsersStore((state) => state.users);
  const user = users.find((u) => u.username === username);

  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">User not found</h1>
        <p className="text-muted-foreground mt-2">
          The user with username &quot;{username}&quot; does not exist.
        </p>
      </div>
    );
  }

  // Get user initials for avatar fallback
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="mt-4 flex flex-col xl:flex-row gap-8">
      {/* LEFT */}
      <div className="w-full xl:w-1/3 space-y-6">
        {/* USER BADGES CONTAINER */}
        <div className="bg-primary-foreground p-4 rounded-lg">
          <h1 className="text-xl font-semibold">{t("profile.userBadges")}</h1>
          <div className="flex gap-4 mt-4">
            <HoverCard>
              <HoverCardTrigger>
                <BadgeCheck
                  size={36}
                  className="rounded-full bg-blue-500/30 border-1 border-blue-500/50 p-2"
                />
              </HoverCardTrigger>
              <HoverCardContent>
                <h1 className="font-bold mb-2">{t("profile.verifiedUser")}</h1>
                <p className="text-sm text-muted-foreground">
                  {t("profile.verifiedDesc")}
                </p>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Shield
                  size={36}
                  className="rounded-full bg-green-500/30 border-1 border-green-500/50 p-2"
                />
              </HoverCardTrigger>
              <HoverCardContent>
                <h1 className="font-bold mb-2">{t("profile.admin")}</h1>
                <p className="text-sm text-muted-foreground">
                  {t("profile.adminDesc")}
                </p>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Candy
                  size={36}
                  className="rounded-full bg-yellow-500/30 border-1 border-yellow-500/50 p-2"
                />
              </HoverCardTrigger>
              <HoverCardContent>
                <h1 className="font-bold mb-2">{t("profile.awarded")}</h1>
                <p className="text-sm text-muted-foreground">
                  {t("profile.awardedDesc")}
                </p>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger>
                <Citrus
                  size={36}
                  className="rounded-full bg-orange-500/30 border-1 border-orange-500/50 p-2"
                />
              </HoverCardTrigger>
              <HoverCardContent>
                <h1 className="font-bold mb-2">{t("profile.popular")}</h1>
                <p className="text-sm text-muted-foreground">
                  {t("profile.popularDesc")}
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        <div className="bg-primary-foreground p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">{t("profile.userInfo")}</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button>{t("profile.editUser")}</Button>
              </SheetTrigger>
              <EditUser user={user} />
            </Sheet>
          </div>
          <div className="space-y-4 mt-4">
            <div className="flex flex-col gap-2 mb-8">
              <p className="text-sm text-muted-foreground">
                {t("profile.completion")}
              </p>
              <Progress value={66} />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{t("profile.username")}</span>
              <span>{user.username}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{t("profile.email")}</span>
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{t("profile.phone")}</span>
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{t("profile.location")}</span>
              <span>{user.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{t("profile.roleLabel")}</span>
              <Badge>{user.role}</Badge>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            {t("profile.joinedOn")} 02.05.2025
          </p>
        </div>

        {/* CARD LIST CONTAINER */}
        <div className="bg-primary-foreground p-4 rounded-lg">
          <CardList title={t("profile.recentTransactions")} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-2/3 space-y-6">
        {/* USER CARD CONTAINER */}
        <div className="bg-primary-foreground p-4 rounded-lg space-y-2">
          <div className="flex items-center gap-2">
            <Avatar className="size-12">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-semibold">{user.name}</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa
            porro praesentium eius hic suscipit perferendis atque, nobis, ut,
            vel cupiditate veniam ex quidem. Ex neque sapiente sint blanditiis.
            Debitis, ut?
          </p>
        </div>

        {/* CHART CONTAINER */}
        <div className="bg-primary-foreground p-4 rounded-lg">
          <h1 className="text-xl font-semibold mb-4">
            {t("profile.userActivity")}
          </h1>
          <AppLineChart />
        </div>
      </div>
    </div>
  );
};

export default UserProfileClient;
