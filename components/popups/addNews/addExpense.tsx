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

const Devises = [
  { code: "USD", name: "Dollar américain" },
  { code: "CDF", name: "Franc congolais" },
];

interface Expenses {
  id: string;
  libelle: string;
  rubriqueId: string;
  beneficiaire: string;
  devise: string;
  amount: string;
  userId: string;
  supplierId: string;
  projectId: string;
  serviceId: string;
  rubriqueName: string;
  serviceName?: string;
  projectName?: string;
  supplierName?: string;
}
interface ItemsSuplier {
  id: string;
  email: string;
}
interface ItemsService {
  id: string;
  name: string;
}
interface ItemsProject {
  id: string;
  name: string;
}
interface ItemsRubrique {
  id: string;
  name: string;
}
interface AddDataDialogContent {
  onClosed: () => void;
}

export default function AddExpense({ onClosed }: AddDataDialogContent) {
  const [Expense, setExpense] = React.useState<Expenses[]>([]);
  const [Suppliers, setSuppliers] = React.useState<ItemsSuplier[]>([]);
  const [Projects, setProjects] = React.useState<ItemsProject[]>([]);
  const [Services, setServices] = React.useState<ItemsService[]>([]);
  const [Rubriques, setRubriques] = React.useState<ItemsRubrique[]>([]);
  const [devisNumber, setDevisNumber] = React.useState(Devises);
  const [devise, setDevise] = React.useState("");
  const [formData, setFormData] = React.useState({
    id: "",
    libelle: "",
    rubriqueId: "",
    beneficiaire: "",
    devise: "",
    amount: "",
    userId: "",
    supplierId: "",
    projectId: "",
    serviceId: "",
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
      setRubriques(result.rubriques);
      setServices(result.services);
      setProjects(result.projects);
      setSuppliers(result.suppliers);
    } catch (error) {
      console.error("Erreur lors de la récupération des depense:", error);
      setExpense([]);
      setRubriques([]);
      setServices([]);
      setProjects([]);
      setSuppliers([]);
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
      console.log(formData);
      if (!res.ok) {
        const err = await res.json();
        console.log(err);
        throw new Error(err.error || "Erreur lors de l'ajout de depense");
      }
      if (res.status === 409) {
        toast.error("Conflit de données : doublon détecté. Cette element existe déjà !");
      }

      setFormData({
        id: "",
        libelle: "",
        rubriqueId: "",
        beneficiaire: "",
        devise: "",
        amount: "",
        userId: "",
        supplierId: "",
        projectId: "",
        serviceId: "",
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
            onValueChange={(val) => setFormData((prev) => ({ ...prev, serviceId: val }))}
          >
            <SelectTrigger id="serviceId" className="w-[90%] h-12">
              <SelectValue placeholder="Sélectionner un service" />
            </SelectTrigger>
            <SelectContent className="w-[90%]">
              <SelectViewport className="max-h-60 overflow-y-auto">
                {Services.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.id || ""}
                    className="hover:bg-[#4895b7] hover:text-white"
                  >
                    {cat.name || "VIDE"}
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Select
            value={formData.projectId}
            onValueChange={(val) => setFormData((prev) => ({ ...prev, projectId: val }))}
          >
            <SelectTrigger id="projectId" className="w-[90%] h-12">
              <SelectValue placeholder="Sélectionner le projet" />
            </SelectTrigger>
            <SelectContent className=" w-[90%] ">
              <SelectViewport className="max-h-06 w-[90%] overflow-y-auto">
                {Projects.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.id}
                    className="hover:bg-[#4895b7]  hover:text-white"
                  >
                    {cat.name || "VIDE"}
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="libele">Libelle</Label>
          <Input
            id="libelle"
            name="libelle"
            type="text"
            value={formData.libelle}
            onChange={handleChange}
            placeholder="Payement outils de menage..."
            required
            className="w-[90%] h-12"
          />
        </div>
        <div className="grid gap-2">
          <Select
            value={formData.rubriqueId}
            onValueChange={(val) => setFormData((prev) => ({ ...prev, rubriqueId: val }))}
          >
            <SelectTrigger id="rubrique" className="w-[90%] h-12">
              <SelectValue placeholder="Sélectionner une rubrique" />
            </SelectTrigger>
            <SelectContent className="w-[90%]">
              <SelectViewport className="max-h-60 overflow-y-auto">
                {Rubriques.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.id}
                    className="hover:bg-[#4895b7] hover:text-white"
                  >
                    {cat.name || "VIDE"}
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Select
            value={devise}
            onValueChange={(value) => {
              console.log("Nouvelle valeur sélectionnée :", value);
              setDevise(value);
            }}
          >
            <SelectTrigger id="service" className="w-full">
              <SelectValue placeholder="Sélectionnez une service" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectViewport className="max-h-60 overflow-y-auto">
                {devisNumber.map((cat) => (
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
            className="w-[90%] h-12"
          />
        </div>

        <div className="grid gap-2">
          <Select
            value={formData.supplierId}
            onValueChange={(val) => setFormData((prev) => ({ ...prev, supplierId: val }))}
          >
            <SelectTrigger id="supplierId" className="w-[90%] h-12">
              <SelectValue placeholder="Sélectionner un fournisseur" />
            </SelectTrigger>
            <SelectContent className="w-[90%]">
              <SelectViewport className="max-h-60 overflow-y-auto">
                {Suppliers.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.id || ""}
                    className="hover:bg-[#4895b7] hover:text-white"
                  >
                    {cat.email || "VIDE"}
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
