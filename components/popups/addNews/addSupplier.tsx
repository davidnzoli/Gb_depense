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

interface fournisseur {
   id: string;
  name    :  string
  contact :  string
  email     :string
  nationalite :string
  createdAt:string
}

interface AddDataDialogContent {
  onClosed: () => void;
}

export default function AddSupplier({ onClosed }: AddDataDialogContent) {
  const [Fournisseuer, setFournisseur] = React.useState<fournisseur[]>([]);
//   const [projects, setProjects] = React.useState<project[]>([]);
  const [formData, setFormData] = React.useState({
 id: "",
  name    :  "",
  contact :  "",
  email     :"",
  nationalite :"",
  createdAt:""

  });

  async function fetchService() {
    try {
      const res = await fetch("/api/suppliers");
      const result = await res.json();
      console.log("Réponse brute : ", result);

      if (!result || !Array.isArray(result.data)) {
        console.error("Structure inattendue:", result);
        setFournisseur([]);
        return;
      }

      setFournisseur(result.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des fournisseurs:", error);
      setFournisseur([]);
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
      const res = await fetch("/api/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(formData)
      if (!res.ok) {
        const err = await res.json();
        console.log(err)
        throw new Error(err.error || "Erreur lors de l'ajout de fournisseur");
      }
      if (res.status === 409) {
        toast.error(
          "Conflit de données : doublon détecté. Cette element existe déjà !"
        );
      } 
      
      setFormData({
         id: "",
  name    :  "",
  contact :  "",
  email     :"",
  nationalite :"",
  createdAt:""
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
          Remplissez le formulaire ci-dessous pour ajouter un fournisseur.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="fournisseur">Nom de fournisseur</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: devino"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ex: devino@gmail.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact">Phone</Label>
          <Input
            id="contact"
            name="contact"
            type="text"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Ex: +243 976 435 697"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="nationalite">Nationalite</Label>
          <Input
            id="nationalite"
            name="nationalite"
            type="text"
            value={formData.nationalite}
            onChange={handleChange}
            placeholder="Ex: Congolaise"
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