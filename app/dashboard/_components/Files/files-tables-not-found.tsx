import { TableCell, TableRow } from "@/components/ui/table";
import { Icons } from "@/components/Icons";
import { PurpleButton } from "../button";

const FilesTablesNotFound = () => {
  return (
    <TableRow>
      <TableCell colSpan={6}>
        <div className="flex flex-col gap-2 items-center justify-center">
          <Icons.microFolder />
          <div className="flex justify-center items-center flex-col gap-2">
            <h2 className="text-[19.71px] font-semibold leading-[26.27px]">
              Manage your opportunities
            </h2>
            <p className="text-[13.14px] font-normal leading-[19.71px] text-center">
              Invite an Independent to work with you on Contra! Start a new
              opportunity to
            </p>
            <PurpleButton icon={<Icons.plus />} title="Add media" />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default FilesTablesNotFound;
