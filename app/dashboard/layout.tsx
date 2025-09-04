// app/dashboard/layout.tsx

import Sidebar from "@/components/sideBar";
import NavBar from "@/components/navBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-[100%] min-h-screen ">
      <div className="flex w-[100%] flex-col ml-0 lg:ml-72">
        <Sidebar />
        {/* <NavBar /> */}
        <main className="flex-1 justify-center items-center bg-gray-100 min-h-screen lg:p-4 p-2">
          {children}
        </main>
      </div>
    </div>
  );
}
