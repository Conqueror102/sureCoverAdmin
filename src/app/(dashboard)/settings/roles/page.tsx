import { Shield } from "lucide-react";
import { SectionPage } from "@/features/shared/section-page";

export default function RolePermissionsPage() {
  return <SectionPage title="Role Permissions" description="RBAC matrix for admin roles, route permissions, and protected operational actions." icon={Shield} items={["Super Admin", "Medical Reviewer", "Finance Admin"]} />;
}
