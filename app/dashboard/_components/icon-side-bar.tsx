"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface IconSideBarProps {
  path: string;
  icon: LucideIcon;
}

export default function IconSideBar({ path, icon: Icon }: IconSideBarProps) {
  const pathname = usePathname();

  return (
    <Link
      className={clsx(
        "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all dark:text-gray-400",
        {
          "flex items-center gap-2 rounded-lg px-3 py-2 text-gray-900 transition-all dark:text-gray-50":
            pathname === path,
        }
      )}
      href={path}
    >
      <div className="border rounded-lg dark:bg-black dark:border-gray-800 border-gray-400 p-1 bg-white h-10 w-10 flex items-center justify-center">
        <Icon className="h-4 w-4 " />
      </div>
    </Link>
  );
}
