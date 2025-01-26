"use client";
import { Separator } from "@/components/ui/separator";
import { Calendar, LayoutDashboard, MessageSquare } from "lucide-react";
import Link from "next/link";
import { UserProfile } from "@/components/user-profile";
import { usePathname } from "next/navigation";
import IconSideBar from "./icon-side-bar";
import { Icons } from "@/components/Icons";

export default function DashboardSideBar() {
  const pathname = usePathname();

  return (
    <div className="lg:w-16 lg:block hidden border-r h-full">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[55px] items-center justify-center border-b w-full">
          <Link className="flex items-center justify-center" href="/dashboard">
            <span className="icons--color">
              <Icons.logo />
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start  text-sm font-medium gap-2">
            <IconSideBar path="/dashboard" icon={LayoutDashboard} />
            <IconSideBar path="/dashboard/meeting" icon={Calendar} />
            <IconSideBar path="/dashboard/chat" icon={MessageSquare} />
            <Separator className="my-3" />
            <div className="m-auto">
              <UserProfile />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
