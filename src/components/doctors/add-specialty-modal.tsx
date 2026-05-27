"use client";

import { useState } from "react";
import { BookOpenCheck, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AddSpecialtyModal() {
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    toast.success("Specialty published to doctors", {
      description: "Doctors can now select this specialty and view its protocol.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add specialist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpenCheck className="h-5 w-5 text-teal-700" />
            Add Doctor Specialty
          </DialogTitle>
          <DialogDescription>
            Create a specialty that doctors can see in their onboarding, profile, and consultation assignment workflows.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="specialtyName">Specialty name</Label>
            <Input id="specialtyName" placeholder="e.g., Nephrology" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="visibility">Doctor visibility</Label>
            <Select defaultValue="visible">
              <SelectTrigger id="visibility">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visible">Visible to doctors</SelectItem>
                <SelectItem value="review">Hold for medical review</SelectItem>
                <SelectItem value="hidden">Hidden draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="protocol">Protocol version</Label>
            <Input id="protocol" placeholder="e.g., v1.0 Kidney Care Protocol" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Publish specialty</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
