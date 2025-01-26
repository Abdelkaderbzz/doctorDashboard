import { Button, ButtonIconProps, ButtonProps } from "@/components/ui/button";
import clsx from "clsx";

export type IButtonFinace = ButtonProps & ButtonIconProps;

const ButtonFinance = ({ className, ...props }: IButtonFinace) => {
  return (
    <Button
      {...props}
      className={clsx(
        "px-[24px] py-[12px] rounded-full text-[var(--tc-btn-finance)] bg-[var(--bg-btn-finance)] text-base font-normal leading-6w-[100%]",
        className
      )}
    />
  );
};

export default ButtonFinance;
