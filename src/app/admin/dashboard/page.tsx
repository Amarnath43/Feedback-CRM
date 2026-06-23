import { DashboardClient } from "@/components/admin/dashboard-client";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
   const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }
  return <DashboardClient />;
}