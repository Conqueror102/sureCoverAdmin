"use client";

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
import { UploadCloud, FileText } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export function UploadSpecialtyModal() {
  const [open, setOpen] = useState(false);

  const handleUpload = () => {
    toast.success("Specialty guidelines uploaded successfully", {
      description: "The new specialty protocols are now available in the system."
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-dashed bg-slate-50">
          <UploadCloud className="h-4 w-4 mr-2 text-slate-500" />
          Upload Specialty
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Specialty Guidelines</DialogTitle>
          <DialogDescription>
            Add new specialty requirements, documents, or classification rules for medical staff.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Specialty Name</Label>
            <Input id="title" placeholder="e.g., Cardiology Protocols" />
          </div>
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-slate-500 text-sm space-y-2 hover:bg-slate-50 cursor-pointer transition-colors">
            <FileText className="h-6 w-6 text-slate-400" />
            <p>Click to browse or drag and drop files here</p>
            <p className="text-xs text-slate-400">PDF, DOCX up to 10MB</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleUpload}>Save Specialty</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
