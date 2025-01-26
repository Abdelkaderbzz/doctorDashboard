import { ReactNode } from "react"
import DashboardSideBar from "./_components/dashboard-side-bar"
import DashboardTopNav from "./_components/dashbord-top-nav"

export default function DashboardLayout({ children }: { children: ReactNode }) {

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[auto_1fr]">
      <DashboardSideBar />
      <DashboardTopNav >
        <main className="flex flex-col gap-4 p-4 pt-0 lg:gap-6 h-[100%]">
          {children}
        </main>
      </DashboardTopNav>
    </div>
  )
}
