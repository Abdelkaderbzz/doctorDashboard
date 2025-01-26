import UserDataTable from "./_components/user-table-data";
export default async function Dashboard() {
  return (
    <div className="flex flex-col gap-4 p-4">
   
      <UserDataTable />
    </div>
  );
}
