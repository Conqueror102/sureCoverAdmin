"use client";

import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

type BaseFieldProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  description?: string;
  className?: string;
};

function FieldMessage({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs font-medium text-red-600">{message}</p>;
}

export function TextField<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  description,
  className,
  type = "text",
  placeholder,
}: BaseFieldProps<TFieldValues> & {
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
}) {
  const error = form.formState.errors[name]?.message;

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} type={type} placeholder={placeholder} {...form.register(name)} />
      {description ? <p className="text-xs text-slate-500">{description}</p> : null}
      <FieldMessage message={typeof error === "string" ? error : undefined} />
    </div>
  );
}

export function SelectField<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  description,
  className,
  placeholder = "Select option",
  options,
}: BaseFieldProps<TFieldValues> & {
  placeholder?: string;
  options: Array<{ label: string; value: string }>;
}) {
  const error = form.formState.errors[name]?.message;

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <Controller
        control={form.control}
        name={name}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {description ? <p className="text-xs text-slate-500">{description}</p> : null}
      <FieldMessage message={typeof error === "string" ? error : undefined} />
    </div>
  );
}

export function DateField<TFieldValues extends FieldValues>(props: BaseFieldProps<TFieldValues>) {
  return <TextField {...props} type="date" />;
}

export function UploadField({
  label,
  description,
  className,
}: {
  label: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center transition-colors hover:bg-slate-100">
        <UploadCloud className="h-6 w-6 text-slate-400" />
        <p className="mt-2 text-sm font-medium text-slate-700">Upload file</p>
        {description ? <p className="mt-1 text-xs text-slate-500">{description}</p> : null}
      </div>
    </div>
  );
}
