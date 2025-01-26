import { TableCell, TableRow } from "@/components/ui/table";

export interface IFilesTableRow {
  name: string;
  type: string;
  date: string;
  size: string;
  owner: string;
}

const FilesTableRow = ({ name, type, date, size, owner }: IFilesTableRow) => {
  return (
    <TableRow className="border-b-[1px] border-solid border-[#443E5B] bg-[var(--table-bg-file)]">
      <TableCell className="text-left" >{name}</TableCell>
      <TableCell className="text-left" >{type}</TableCell>
      <TableCell className="text-left" >{date}</TableCell>
      <TableCell className="text-left" >{size}</TableCell>
      <TableCell className="text-left" >{owner}</TableCell>
    </TableRow>
  );
};

export default FilesTableRow;
