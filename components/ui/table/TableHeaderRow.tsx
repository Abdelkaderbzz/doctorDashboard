import clsx from "clsx";
import { TableHead, TableHeader, TableRow } from "./table";

type ITableHeaderRow = {
  headLabel: string[];
  className?: string;
  classNameRow?: string;
};

export const TableHeaderRow = ({
  headLabel,
  className,
  classNameRow,
}: ITableHeaderRow) => {
  return (
    <TableHeader className={clsx(className)}>
      <TableRow className="border-b-[1px] border-solid border-[#443E5B]">
        {headLabel.map((label) => (
          <TableHead className={classNameRow}>{label}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};
