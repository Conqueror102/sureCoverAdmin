import { Activity, ArrowDownRight, ArrowUpRight, Droplets, Filter, Heart, Thermometer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HealthMonitoringPage() {
  const escalations = [
    ["Marcus Johnson", "Critical", "BP 190/118", "92%"],
    ["Noah Kim", "High", "SpO2 88%", "76%"],
    ["Eleanor Richards", "Medium", "Glucose 184 mg/dL", "58%"],
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">Health Monitoring</h2>
          <p className="mt-1 text-muted-foreground">Review patient vitals, remote telemetry, and AI health scores.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
          <Button>Generate Report</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Heart Rate</CardTitle>
            <Heart className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72 bpm</div>
            <p className="mt-1 flex items-center text-xs text-emerald-600">
              <ArrowDownRight className="mr-1 h-3 w-3" /> -2% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Blood Pressure Alerts</CardTitle>
            <Activity className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">14</div>
            <p className="mt-1 flex items-center text-xs text-amber-600">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +3 from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Temp Variance</CardTitle>
            <Thermometer className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.4 C</div>
            <p className="mt-1 flex items-center text-xs text-slate-500">Normal range maintained</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Glucose Flags</CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">8</div>
            <p className="mt-1 flex items-center text-xs text-emerald-600">
              <ArrowDownRight className="mr-1 h-3 w-3" /> -12% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Risk Escalations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-3">
            {escalations.map(([name, risk, signal, confidence]) => (
              <div key={name} className="rounded-lg border bg-slate-50/60 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-slate-900">{name}</div>
                  <Badge variant="outline" className={risk === "Critical" ? "border-red-200 bg-red-50 text-red-700" : "border-amber-200 bg-amber-50 text-amber-700"}>
                    {risk}
                  </Badge>
                </div>
                <div className="mt-3 text-sm text-slate-500">{signal}</div>
                <div className="mt-4 h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-teal-600" style={{ width: confidence }} />
                </div>
                <div className="mt-2 text-xs font-medium text-slate-500">AI confidence {confidence}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
