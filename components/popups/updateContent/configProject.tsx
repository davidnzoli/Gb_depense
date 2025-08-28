"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import CustomDatePicker from "@/components/ui/CustomDatePicker";

import { SelectViewport } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Devise } from "@/app/generated/prisma";
import { parseDate } from "chrono-node";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";

interface AddContentProjectItemsProps {
  onClosed: () => void;
  id: string;
  onUpdate: () => void;
}
// interface Expenses {
//   id: string;
//   libelle: string;
//   rubriqueId: string;
//   beneficiaire: string;
//   amount: string;
//   userId: string;
//   supplierId: string;
//   projectId: string;
//   serviceId: string;
//   rubriqueName: string;
//   serviceName?: string;
//   projectName?: string;
//   supplierName?: string;
// }
// interface supplierItems {
//   id: string;
//   name: string;
//   email: string;
// }
// interface projectItems {
//   id: string;
//   name: string;
// }
// interface serviceItems {
//   id: string;
//   name: string;
//   campany: string;
// }
// interface userItems {
//   id: string;
//   name: string;
// }
// interface rubriqueItems {
//   id: string;
//   name: string;
// }
const Devises = [
  { code: "USD", name: "Dollar américain" },
  { code: "CDF", name: "Franc congolais" },
];

// function formatDate(date: Date | undefined) {
//   if (!date) {
//     return "";
//   }
//   return date.toLocaleDateString("en-US", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//   });
// }

export default function ConfigProject({ onClosed, id, onUpdate }: AddContentProjectItemsProps) {
  const [budget, setBudget] = React.useState<number | "">(0);
  const [loading, setLoading] = React.useState(false);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [devisNumber, setDevisNumber] = React.useState("");
  const [devise, setDevise] = React.useState(Devises);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBudget(value === "" ? "" : Number(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "EN_COURS",
          budget,
          startDate,
          endDate,
          devisNumber,
        }),
      });
      onUpdate();
      onClosed();
      toast.success("Produit modifié avec succès ✅");
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogContent className="animate-in duration-200 ease-out data-[state=openss]:fade-in data-[state=closed]:fade-out">
      <DialogHeader>
        <DialogTitle>Configuration</DialogTitle>

        <DialogDescription>
          Remplissez le formulaire ci‑dessous et cliquez sur Enregistrer.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2 w-full">
          <CustomDatePicker
            label="Date de début"
            value={startDate}
            onChange={setStartDate}
            required
          />
        </div>
        <div className="grid gap-2 w-full">
          <CustomDatePicker label="Date de fin" value={endDate} onChange={setEndDate} required />
        </div>
        <div className="grid gap-2">
          <Select
            value={devisNumber}
            onValueChange={(value) => {
              console.log("Nouvelle valeur sélectionnée :", value);
              setDevisNumber(value);
            }}
          >
            <SelectTrigger id="service" className="w-full">
              <SelectValue placeholder="Sélectionnez une service" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectViewport className="max-h-60 overflow-y-auto">
                {devise.map((cat) => (
                  <SelectItem
                    key={cat.code}
                    value={String(cat.code)}
                    className="hover:bg-[#4895b7] hover:text-white"
                  >
                    {cat.name} - {cat.code}
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor="budget">budget</Label>
          <Input
            id="budget"
            name="budget"
            type="number"
            value={budget}
            onChange={handleBudgetChange}
            required
            className="w-full"
          />
        </div>

        <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
          <Button variant="outline" type="button" onClick={onClosed}>
            Annuler
          </Button>
          <Button type="submit" disabled={loading}>
            {" "}
            {loading ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
