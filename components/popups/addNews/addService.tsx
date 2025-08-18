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
  rubrique: string;
  beneficiaire: string;
  amount: string;
  userId: string;
  supplierId: string;
  projectId: string;
  serviceId: string;
}

interface AddDataDialogContent {
  onClosed: () => void;
}

export default function AddService({ onClosed }: AddDataDialogContent) {
  const [Expense, setExpense] = React.useState<Expenses[]>([]);
  //   const [projects, setProjects] = React.useState<project[]>([]);
  const [formData, setFormData] = React.useState({
    id: "",
    name: "",
  });

  async function fetchService() {
    try {
      const res = await fetch("/api/services");
      const result = await res.json();
      console.log("Réponse brute : ", result);

      if (!result || !Array.isArray(result.data)) {
        console.error("Structure inattendue:", result);
        setExpense([]);
        return;
      }

      setExpense(result.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des service:", error);
      setExpense([]);
    }
  }
  useEffect(() => {
    fetchService();
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
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(formData);
      if (!res.ok) {
        const err = await res.json();
        console.log(err);
        throw new Error(err.error || "Erreur lors de l'ajout de service");
      }
      if (res.status === 409) {
        toast.error("Conflit de données : doublon détecté. Cette element existe déjà !");
      }

      setFormData({
        id: "",
        name: "",
      });
      onClosed();
      toast.success("Service ajoutée avec succès ✅");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("expenseAdded"));
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      toast.error("Échec de l'ajout du service ❌");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Ajouter un service</DialogTitle>
        <DialogDescription>
          Remplissez le formulaire ci-dessous pour ajouter un service.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nom de service</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: 2500"
            required
          />
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
