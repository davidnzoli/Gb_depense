"use client";

import * as React from "react";
import { toast } from "sonner";
import { useEffect } from "react";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  // SelectViewport,
  SelectItem,
} from "@/components/ui/select";

import { SelectViewport } from "@radix-ui/react-select";

interface Expenses {
  id: string;
   libelle: string;
  rubrique : string;
  beneficiaire : string;
  amount : string;
  userId    :  string;
  supplierId : string;
  projectId  : string;
  serviceId :  string;
}

interface AddDataDialogContent {
  onClosed: () => void;
}

export default function AddExpense({ onClosed }: AddDataDialogContent) {
  const [Expense, setExpense] = React.useState<Expenses[]>([]);
//   const [projects, setProjects] = React.useState<project[]>([]);
  const [formData, setFormData] = React.useState({
 id: "",
   libelle: "",
  rubrique : "",
  beneficiaire : "",
  amount : "",
  userId    :  "",
  supplierId : "",
  projectId  : "",
  serviceId :  "",

  });

  async function fetchExpense() {
    try {
      const res = await fetch("/api/expenses");
      const result = await res.json();
      console.log("Réponse brute : ", result);

      if (!result || !Array.isArray(result.data)) {
        console.error("Structure inattendue:", result);
        setExpense([]);
        return;
      }

      setExpense(result.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des depense:", error);
      setExpense([]);
    }
  }
    useEffect(() => {
    fetchExpense();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!formData.serviceId) {
    //   toast.error("Veuillez sélectionner un service.");
    //   return;
    // }
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(formData)
      if (!res.ok) {
        const err = await res.json();
        console.log(err)
        throw new Error(err.error || "Erreur lors de l'ajout de depense");
      }
      if (res.status === 409) {
        toast.error(
          "Conflit de données : doublon détecté. Cette element existe déjà !"
        );
      } 
      
      setFormData({
        id: "",
   libelle: "",
  rubrique : "",
  beneficiaire : "",
  amount : "",
  userId    :  "",
  supplierId : "",
  projectId  : "",
  serviceId :  "",
      });
      onClosed();
      toast.success("Depense ajoutée avec succès ✅");
      if (typeof window !== "undefined") {
  window.dispatchEvent(new CustomEvent("expenseAdded"));
}
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      toast.error("Échec de l'ajout du depense ❌");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Ajouter une depense</DialogTitle>
        <DialogDescription>
          Remplissez le formulaire ci-dessous pour ajouter une depense.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Select
            value={formData.serviceId}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, serviceId: val }))
            }
          >
            <SelectTrigger id="serviceId" className="w-full">
              <SelectValue placeholder="Sélectionner un service" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectViewport className="max-h-60 overflow-y-auto">
                {Expense.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.serviceId}
                    className="hover:bg-green-500 hover:text-white"
                  >
                    {cat.serviceId}
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select>
        </div>
         <div className="grid gap-2">
          <Select
            value={formData.serviceId}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, serviceId: val }))
            }
          >
            <SelectTrigger id="projectId" className="w-full">
              <SelectValue placeholder="Sélectionner le projet" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectViewport className="max-h-60 overflow-y-auto">
                {Expense.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.projectId}
                    className="hover:bg-green-500 hover:text-white"
                  >
                    {cat.projectId}
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Select
            value={formData.libelle}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, libelle: val }))
            }
          >
            <SelectTrigger id="libelle" className="w-full">
              <SelectValue placeholder="Sélectionner un libelle" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectViewport className="max-h-60 overflow-y-auto">
                {Expense.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.libelle}
                    className="hover:bg-green-500 hover:text-white"
                  >
                    {cat.libelle}
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Select
            value={formData.libelle}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, libelle: val }))
            }
          >
            <SelectTrigger id="rubrique" className="w-full">
              <SelectValue placeholder="Sélectionner une rubrique" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectViewport className="max-h-60 overflow-y-auto">
                {Expense.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.rubrique}
                    className="hover:bg-green-500 hover:text-white"
                  >
                    {cat.rubrique}
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="amount">Montant</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Ex: 2500"
            required
          />
        </div>

<div className="grid gap-2">
          <Select
            value={formData.supplierId}
            onValueChange={(val) =>
              setFormData((prev) => ({ ...prev, supplierId: val }))
            }
          >
            <SelectTrigger id="supplierId" className="w-full">
              <SelectValue placeholder="Sélectionner un fournisseur" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectViewport className="max-h-60 overflow-y-auto">
                {Expense.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.supplierId}
                    className="hover:bg-green-500 hover:text-white"
                  >
                    {cat.supplierId}
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
          <Button type="button" variant="outline" onClick={onClosed}>
            Annuler
          </Button>
          <Button type="submit">Enregistrer</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}