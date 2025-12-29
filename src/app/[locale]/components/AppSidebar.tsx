"use client";

import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  User2,
  ChevronUp,
  Plus,
  Projector,
  ChevronDown,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarSeparator,
} from "./ui/sidebar";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { useTranslations } from "next-intl";

const AppSidebar = () => {
  const t = useTranslations();

  const items = [
    {
      title: t("menu.home"),
      url: "/",
      icon: Home,
    },
    {
      title: t("menu.users"),
      url: "/users",
      icon: Users,
    },
    {
      title: t("menu.inbox"),
      url: "#",
      icon: Inbox,
    },
    {
      title: t("menu.calendar"),
      url: "#",
      icon: Calendar,
    },
    {
      title: t("menu.search"),
      url: "#",
      icon: Search,
    },
    {
      title: t("menu.settings"),
      url: "#",
      icon: Settings,
    },
  ];

  return (
    // Komplet Sidebari
    <Sidebar collapsible="icon">
      {/* Headeri */}
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <Image src="/favicon.ico" alt="logo" width={20} height={20} />
                <span>{t("sidebar.brand")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {/* Menyt e Application  */}
      <SidebarContent>
        <SidebarGroup>
          {/* Labeli per me kallzu menyjat kryesore */}
          <SidebarGroupLabel>{t("sidebar.application")}</SidebarGroupLabel>
          <SidebarGroupContent>
            {/* Menyt qe jena ti marr prej constit nelt */}
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.title === t("menu.inbox") && (
                    <SidebarMenuBadge>24</SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* Menyt per Projects */}
        <SidebarGroup>
          <SidebarGroupLabel>{t("sidebar.projects")}</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">{t("sidebar.addProject")}</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/#">
                    <Projector />
                    {t("sidebar.seeAllProjects")}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/#">
                    <Plus />
                    {t("sidebar.addAProject")}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Sidebari Collapsable */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                {t("sidebar.collapsableGroup")}
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/#">
                        <Projector />
                        {t("sidebar.seeAllProjects")}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/#">
                        <Plus />
                        {t("sidebar.addAProject")}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Nested menus */}
        <SidebarGroup>
          <SidebarGroupLabel>{t("sidebar.nestedItems")}</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/#">
                    <Projector />
                    {t("sidebar.seeAllProjects")}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuSub>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/#">
                        <Plus />
                        {t("sidebar.addProject")}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuSub>
                  <SidebarMenuItem>
                    <SidebarMenuSubButton asChild>
                      <Link href="/#">
                        <Plus />
                        {t("sidebar.addCategory")}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* Sidebar i footerit */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> John Doe <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>{t("menu.account")}</DropdownMenuItem>
                <DropdownMenuItem>{t("menu.settings")}</DropdownMenuItem>
                <DropdownMenuItem>{t("menu.signOut")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
