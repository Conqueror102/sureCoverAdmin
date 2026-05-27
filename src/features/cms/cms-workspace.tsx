import { Bell, FileEdit, GripVertical, Mail, Newspaper, Send, Sparkles, UploadCloud, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModulePage } from "@/components/shared/module-page";
import { StatusPill } from "@/components/shared/status-pill";

const blocks = [
  ["Hero", "Care without borders, monitored every month", "Published"],
  ["Chronic Care", "Diabetes, hypertension, asthma, heart failure", "Draft"],
  ["Emergency Support", "Escalation pathways and response center", "Review"],
  ["Pricing", "Subscription plans by care intensity", "Published"],
];

const templates = [
  ["Welcome Email", Mail, "Published"],
  ["Prescription Ready", Mail, "Draft"],
  ["Emergency Alert", Bell, "Published"],
  ["Care Check-in", Send, "Review"],
] satisfies Array<[string, LucideIcon, string]>;

const cmsCards = [
  [Newspaper, "Blog CMS", "Clinical education drafts, reviewer assignments, SEO controls."],
  [FileEdit, "FAQ CMS", "Patient support answers, categories, translations, publishing state."],
  [Bell, "Notification Templates", "Push, SMS, email, and in-app message variants."],
] satisfies Array<[LucideIcon, string, string]>;

export function CmsWorkspace() {
  return (
    <ModulePage
      title="Content Management"
      description="Homepage blocks, blog CMS, FAQ content, email templates, notification templates, and publishing workflows."
      icon={FileEdit}
      primaryAction="Publish changes"
      secondaryAction="Preview site"
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Homepage Block Editor</CardTitle>
            <Button variant="outline" size="sm"><Sparkles className="mr-2 h-4 w-4" /> Generate variant</Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {blocks.map(([name, copy, state]) => (
              <div key={name} className="flex items-center gap-3 rounded-lg border bg-white p-4">
                <GripVertical className="h-5 w-5 text-slate-300" />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-slate-950">{name}</div>
                  <div className="truncate text-sm text-slate-500">{copy}</div>
                </div>
                <StatusPill tone={state === "Published" ? "success" : state === "Review" ? "warning" : "neutral"}>{state}</StatusPill>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Publishing Queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {templates.map(([name, TemplateIcon, state]) => (
                <div key={String(name)} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className="rounded-lg border bg-slate-50 p-2 text-teal-700">
                        <TemplateIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-950">{name}</div>
                        <div className="mt-1 text-sm text-slate-500">Transactional healthcare communication template.</div>
                      </div>
                    </div>
                    <StatusPill tone={state === "Published" ? "success" : state === "Review" ? "warning" : "neutral"}>{state}</StatusPill>
                  </div>
                </div>
            ))}
            <Button variant="outline" className="w-full"><UploadCloud className="mr-2 h-4 w-4" /> Import template</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cmsCards.map(([CardIcon, title, copy]) => (
            <Card key={String(title)} className="rounded-lg">
              <CardContent className="p-5">
                <CardIcon className="mb-3 h-5 w-5 text-teal-700" />
                <div className="font-semibold text-slate-950">{title}</div>
                <p className="mt-1 text-sm text-slate-500">{copy}</p>
                <Button variant="outline" size="sm" className="mt-5">Open editor</Button>
              </CardContent>
            </Card>
        ))}
      </div>
    </ModulePage>
  );
}
