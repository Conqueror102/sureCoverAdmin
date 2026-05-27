import { DashboardShell } from "@/components/layout/dashboard-shell";
import { AccessGuard } from "@/components/layout/access-guard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell>
      <AccessGuard>{children}</AccessGuard>
    </DashboardShell>
  );
}
