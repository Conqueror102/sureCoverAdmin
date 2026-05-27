"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dashboardRoutes } from "@/constants/routes";
import { canAccess } from "@/config/permissions";
import { useUIStore } from "@/store/ui-store";

function findRoute(pathname: string) {
  return dashboardRoutes
    .filter((route) => route.href !== "/")
    .sort((a, b) => b.href.length - a.href.length)
    .find((route) => pathname === route.href || pathname.startsWith(`${route.href}/`));
}

export function AccessGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const role = useUIStore((state) => state.role);
  const route = pathname === "/" ? dashboardRoutes.find((item) => item.href === "/") : findRoute(pathname);

  if (route && !canAccess(role, route.permission)) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-6">
        <div className="max-w-md rounded-xl border bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-xl font-semibold text-slate-950">Access restricted</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Your current role cannot open this module. Switch role from the admin profile menu or return to the command center.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Return to command center</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
