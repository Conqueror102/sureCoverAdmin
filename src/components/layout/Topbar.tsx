"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, ChevronDown, Command, LogOut, Menu, Moon, Plus, Search, Settings, ShieldAlert, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { roleLabels } from "@/config/permissions";
import { useUIStore } from "@/store/ui-store";
import type { AdminRole } from "@/types/domain";
import { useState } from "react";

const roleOptions = Object.keys(roleLabels) as AdminRole[];

export const Topbar = () => {
  const pathname = usePathname();
  const { role, setRole, setCommandOpen, setMobileNavOpen, setNotificationOpen } = useUIStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const section = pathname.split("/")[1] || "Overview";

  return (
    <div className="flex h-16 shrink-0 items-center justify-between border-b bg-white/90 px-4 backdrop-blur lg:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileNavOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden min-w-0 items-center gap-2 text-sm font-medium capitalize text-slate-500 sm:flex">
          Command Center <span className="text-slate-300">/</span> <span className="truncate text-slate-700">{section}</span>
        </div>
      </div>
      
      <div className="flex flex-1 items-center justify-end gap-2 lg:gap-3">
        <button
          type="button"
          className="relative hidden w-full max-w-md items-center lg:flex"
          onClick={() => setCommandOpen(true)}
        >
          <Search className="absolute left-2.5 h-4 w-4 text-slate-400" />
          <Input 
            type="search" 
            readOnly
            placeholder="Search patients, doctors, invoices..." 
            className="w-full cursor-pointer border-slate-200 bg-slate-50 pl-9 pr-14 text-left focus-visible:ring-1 focus-visible:ring-primary/50"
          />
          <div className="absolute right-2 flex items-center gap-1">
             <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100">
               <Command className="h-3 w-3" />
               K
             </kbd>
          </div>
        </button>

        <Button asChild variant="outline" size="sm" className="hidden gap-2 xl:inline-flex">
          <Link href="/emergency">
            <ShieldAlert className="h-4 w-4 text-red-600" />
            3 escalations
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="hidden gap-2 lg:inline-flex" onClick={() => setCommandOpen(true)}>
          <Plus className="h-4 w-4" />
          Quick create
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setCommandOpen(true)} className="lg:hidden">
          <Search className="h-5 w-5 text-slate-600" />
        </Button>
        <Button variant="ghost" size="icon">
          <Moon className="h-5 w-5 text-slate-600" />
        </Button>
        <Button variant="ghost" size="icon" className="relative" onClick={() => setNotificationOpen(true)}>
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-600 ring-2 ring-white" />
        </Button>
        
        <div className="relative">
          <button
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1.5 pr-2 text-left"
            onClick={() => setProfileOpen((open) => !open)}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 font-semibold text-primary">A</span>
            <span className="hidden leading-tight xl:block">
              <span className="block text-xs font-semibold text-slate-800">Admin Lead</span>
              <span className="block text-[11px] text-slate-500">{roleLabels[role]}</span>
            </span>
            <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 xl:block" />
          </button>

          {profileOpen ? (
            <div className="absolute right-0 top-12 z-[140] w-80 overflow-hidden rounded-xl border bg-white shadow-2xl shadow-slate-950/15">
              <div className="border-b p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-semibold text-primary">A</span>
                  <div>
                    <div className="font-semibold text-slate-950">Admin Lead</div>
                    <div className="text-sm text-slate-500">admin@surecova.com</div>
                  </div>
                </div>
              </div>
              <div className="border-b p-2">
                <div className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Switch role preview</div>
                {roleOptions.map((option) => (
                  <button
                    key={option}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50"
                    onClick={() => setRole(option)}
                  >
                    <span className="font-medium text-slate-700">{roleLabels[option]}</span>
                    {role === option ? <span className="text-xs font-semibold text-teal-700">Active</span> : null}
                  </button>
                ))}
              </div>
              <div className="p-2">
                <Link href="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <Settings className="h-4 w-4 text-slate-400" /> Settings
                </Link>
                <Link href="/session-management" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  <UserCog className="h-4 w-4 text-slate-400" /> Session management
                </Link>
                <Link href="/login" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50">
                  <LogOut className="h-4 w-4" /> Sign out
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
