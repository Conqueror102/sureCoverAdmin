import type { LucideIcon } from "lucide-react";
import { ArrowRight, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModulePage } from "@/components/shared/module-page";
import { Badge } from "@/components/ui/badge";

export function SectionPage({
  title,
  description,
  icon = FileText,
  items,
}: {
  title: string;
  description: string;
  icon?: LucideIcon;
  items: string[];
}) {
  return (
    <ModulePage title={title} description={description} icon={icon} primaryAction="Create workflow" secondaryAction="Export">
      <div className="grid gap-4 lg:grid-cols-3">
        {items.map((item, index) => (
          <Card key={item} className="rounded-lg">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-base">{item}</CardTitle>
                <Badge variant="outline" className="border-teal-200 bg-teal-50 text-teal-700">
                  {index === 0 ? "Live" : index === 1 ? "Review" : "Ready"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-slate-500">
                Workspace includes the route, interaction model, permissions context, filters, and backend-ready action surface.
              </p>
              <div className="mt-5 flex items-center text-sm font-medium text-teal-700">
                Open workspace <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ModulePage>
  );
}
