import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">Notifications</h2>
          <p className="text-muted-foreground mt-1">System alerts, user messages, and platform broadcasts.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>Broadcast Message</Button>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b flex items-center gap-4 bg-slate-50/50">
           <Button variant="outline" size="sm" className="h-9">Mark All Read</Button>
        </div>
        <CardContent className="p-0">
          <div className="text-center py-20">
             <div className="inline-flex h-12 w-12 rounded-full bg-slate-100 items-center justify-center mb-4">
               <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
             </div>
             <h3 className="text-lg font-semibold text-slate-800">You are all caught up.</h3>
             <p className="text-muted-foreground mt-2">There are no new notifications at this time.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
