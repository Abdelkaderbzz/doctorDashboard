"use client";

import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { UserProfile } from "@/components/user-profile";
import config from "@/config";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { File, LayoutDashboard, Wallet, Settings } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import IconSideBar from "./icon-side-bar";
import { Icons } from "@/components/Icons";
import { NotifictionIcon } from "@/components/icons/notification";

export default function DashboardTopNav({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[55px] items-center gap-4 border-b px-3 py-[10px]">
        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden p-2 transition">
            <HamburgerMenuIcon />
            <Link href="/dashboard">
              <span className="sr-only">Home</span>
            </Link>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Link href="/">
                <Icons.logo />
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              <IconSideBar path="/dashboard/blogs" icon={File} />

              <DialogClose asChild>
                <IconSideBar path="/dashboard" icon={LayoutDashboard} />
              </DialogClose>
              <DialogClose asChild>
                <IconSideBar path="/dashboard/blogs" icon={File} />
              </DialogClose>
              <DialogClose asChild>
                <IconSideBar path="/dashboard/finance" icon={Wallet} />
              </DialogClose>
              <Separator className="my-3" />
              <DialogClose asChild>
                <Link href="/dashboard/settings">
                  <Button variant="outline" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </DialogClose>
            </div>
          </SheetContent>
        </Dialog>
        <div className="flex items-center justify-between w-full">
          <p className="text-lg font-semibold">dashboard</p>
          <div className="flex justify-center items-center gap-2 ml-auto ">
            <div className="flex items-center p-[2.8px] px-[16.22px] pl-[16.8px] rounded-[20px] border border-[var(--border)]">
              <Icons.plus
                style={{
                  width: "15px",
                  height: "15px",
                  color: "var(--tc-media-btn)",
                }}
              />
              <p className="text-sm font-medium leading-[19.88px] text-[var(--tc-media-btn)]">
                Add Media
              </p>
            </div>
            <NotifictionIcon style={{ width: "30px", height: "30px" }} />
            {config?.auth?.enabled && <UserProfile />}
            <ModeToggle />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
