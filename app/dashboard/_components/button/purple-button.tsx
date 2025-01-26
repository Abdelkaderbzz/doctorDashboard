"use client";
import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";

interface PurpleButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  title: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const PurpleButton = ({
  icon,
  title,
  style,
  onClick,
  ...props
}: PurpleButtonProps) => {
  return (
    <Button
      className="flex gap-4  rounded-[22.17px] border border-[1px] border-white/15 bg-[var(--bg-btn-purple-button)] hover:bg-[#401D5B] text-white px-[27px] py-[24px] gap-[8.21px] shadow-inner shadow-white/20 backdrop-blur-[11.49px]"
      style={style}
      onClick={onClick}
      {...props}
    >
      {icon}
      <p className="text-[14.86px] font-medium leading-[21.11px] text-[var(--tc-purple-button)]">{title}</p>
    </Button>
  );
};
