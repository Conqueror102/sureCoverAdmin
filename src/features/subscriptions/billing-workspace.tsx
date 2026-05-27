"use client";

import { CreditCard, Download, ReceiptText, RefreshCcw, TrendingUp, Undo2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/metrics/metric-card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";

const billingRows = [
  ["INV-48291", "Eleanor Richards", "Premium", "$79", "Paid"],
  ["INV-48292", "Marcus Johnson", "Premium", "$79", "Retrying"],
  ["INV-48293", "Noah Kim", "Enterprise", "$249", "Paid"],
  ["INV-48294", "Sophia Martinez", "Basic", "$29", "Refund Review"],
];

const mrr = [
  { month: "Jan", value: 920000 },
  { month: "Feb", value: 980000 },
  { month: "Mar", value: 1040000 },
  { month: "Apr", value: 1120000 },
  { month: "May", value: 1200000 },
];

export function BillingWorkspace() {
  return (
    <ModulePage
      title="Subscriptions & Billing"
      description="Patient plans, recurring revenue, invoices, failed payments, refunds, and subscription analytics."
      icon={CreditCard}
      primaryAction="Create plan"
      secondaryAction="Export data"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active Subscribers" value="12,234" change="+4.8% this month" icon={CreditCard} />
        <MetricCard label="MRR" value="$1.2M" change="+12.2% net growth" icon={TrendingUp} />
        <MetricCard label="Failed Payments" value="24" change="$8.9k at risk" icon={RefreshCcw} tone="red" />
        <MetricCard label="Refund Requests" value="9" change="4 awaiting finance" icon={Undo2} tone="amber" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>MRR Growth</CardTitle>
            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Export</Button>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={280}>
              <BarChart data={mrr}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${Number(value) / 1000000}M`} />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Bar dataKey="value" fill="#0D9488" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Plan Mix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Basic", "38%", "$29/mo"],
              ["Premium", "49%", "$79/mo"],
              ["Enterprise", "13%", "$249/mo"],
            ].map(([plan, share, price]) => (
              <div key={plan} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-slate-950">{plan}</div>
                  <div className="text-sm font-medium text-slate-500">{price}</div>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-teal-600" style={{ width: share }} />
                </div>
                <div className="mt-2 text-xs font-medium text-slate-500">{share} of active subscriptions</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="border-b bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-3">Invoice</th>
                <th className="px-5 py-3">Patient</th>
                <th className="px-5 py-3">Plan</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {billingRows.map(([invoice, patient, plan, amount, status]) => (
                <tr key={invoice} className="border-b last:border-0">
                  <td className="px-5 py-4 font-medium text-slate-950"><ReceiptText className="mr-2 inline h-4 w-4 text-slate-400" />{invoice}</td>
                  <td className="px-5 py-4 text-slate-600">{patient}</td>
                  <td className="px-5 py-4 text-slate-600">{plan}</td>
                  <td className="px-5 py-4 font-medium">{amount}</td>
                  <td className="px-5 py-4">
                    <StatusPill tone={status === "Paid" ? "success" : status === "Retrying" ? "danger" : "warning"}>{status}</StatusPill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </ModulePage>
  );
}
