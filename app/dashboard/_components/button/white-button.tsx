"use client";
import { Button } from "@/components/ui/button";

export const WhiteButton = ({
  icon,
  title,
}: {
  icon?: React.ReactNode;
  title: string;
}) => {
  return (
    <Button className="flex gap-4  rounded-[22.17px]  bg-[var(--bg-btn-white-button)] px-[27px] py-[24px] gap-[8.21px]">
      {icon}
      <p className="text-[14.86px] font-medium leading-[21.11px] text-[var(--tc-white-button)]">{title}</p>
    </Button>
  );
};
