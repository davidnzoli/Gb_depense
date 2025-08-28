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

interface UpdateExpenseItemsProps {
  onClose: () => void;
  id: string;
  onUpdate: () => void;
}

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
interface supplierItems {
  id: string;
  name: string;
  email: string;
}
interface projectItems {
  id: string;
  name: string;
}
interface serviceItems {
  id: string;
  name: string;
  campany: string;
}
interface userItems {
  id: string;
  name: string;
}
interface rubriqueItems {
  id: string;
  name: string;
}
export default function UpdatedExpense({ onClose, id, onUpdate }: UpdateExpenseItemsProps) {
  const [Expense, setExpense] = React.useState<Expenses[]>([]);
  const [libelle, setlibelle] = React.useState("");
  const [rubrique, setrubrique] = React.useState("");
  const [beneficiaire, setbeneficiaire] = React.useState("");
  const [amount, setamount] = React.useState("");
  const [userIdItems, setuserIdItems] = React.useState("");
  const [supplierIdItems, setsupplierIdItems] = React.useState<string>("");
  const [serviceIdItems, setserviceIdItems] = React.useState("");
  const [projectIdItems, setprojectIdItems] = React.useState("");
  const [Suppliers, setSuppliers] = React.useState<supplierItems[]>([]);
  const [Projects, setProjects] = React.useState<projectItems[]>([]);
  const [Services, setServices] = React.useState<serviceItems[]>([]);
  const [Users, setUsers] = React.useState<userItems[]>([]);
  const [Rubriques, setRubriques] = React.useState<rubriqueItems[]>([]);
  const [devisNumber, setDevisNumber] = React.useState(Devises);
  const [devise, setDevise] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch(`/api/expenses/${id}`);
        if (!res.ok) {
          let errorData;
          try {
            errorData = await res.json();
          } catch (err) {
            errorData = { message: "Réponse vide ou invalide" };
          }
          console.error("Erreur côté serveur:", errorData);
          return;
        }

        const data = await res.json();
        console.log("Succès:", data);

        setlibelle(data.libelle || "");
        setrubrique(data.rubrique || "");
        setbeneficiaire(data.beneficiaire || "");
        setDevise(data.devise || "");
        setamount(data.amount || "");
        setuserIdItems(data.userIdItems || "");
        setsupplierIdItems(data.supplierIdItems || "");
        setserviceIdItems(data.serviceIdItems || "");
        setprojectIdItems(data.projectIdItems || "");
      } catch (error) {
        console.error("Erreur lors du chargement de expense", error);
      }
    };

    if (id) fetchExpenses();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`/api/expenses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          libelle,
          rubrique,
          beneficiaire,
          devise,
          amount: parseFloat(amount),
          userId: userIdItems,
          supplierId: supplierIdItems,
          projectId: projectIdItems,
          serviceId: serviceIdItems,
        }),
      });
      onUpdate();
      onClose();
      toast.success("Produit modifié avec succès ✅");
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
    } finally {
      setLoading(false);
    }
  };

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
  React.useEffect(() => {
    fetchExpense();
  }, []);
  return (
    <DialogContent className="animate-in duration-200 ease-out data-[state=openss]:fade-in data-[state=closed]:fade-out">
      <DialogHeader>
        <DialogTitle>Modifier cette depense</DialogTitle>

        <DialogDescription>
          Remplissez le formulaire ci‑dessous et cliquez sur Enregistrer.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Select
            value={serviceIdItems}
            onValueChange={(value) => {
              console.log("Nouvelle valeur sélectionnée :", value);
              setserviceIdItems(value);
            }}
          >
            <SelectTrigger id="service" className="w-full">
              <SelectValue placeholder="Sélectionnez une service" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectViewport className="max-h-60 overflow-y-auto">
                {Services.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={String(cat.name)}
                    className="hover:bg-[#4895b7] hover:text-white"
                  >
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Select
            value={projectIdItems}
            onValueChange={(value) => {
              console.log("Nouvelle valeur sélectionnée :", value);
              setprojectIdItems(value);
            }}
          >
            <SelectTrigger id="project" className="w-full">
              <SelectValue placeholder="Sélectionnez une projet" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectViewport className="max-h-60 overflow-y-auto">
                {Projects.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={String(cat.name)}
                    className="hover:bg-[#4895b7] hover:text-white"
                  >
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Select
            value={rubrique}
            onValueChange={(value) => {
              console.log("Nouvelle valeur sélectionnée :", value);
              setsupplierIdItems(value);
            }}
          >
            <SelectTrigger id="rubrique" className="w-full">
              <SelectValue placeholder="Sélectionnez une rubrique" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectViewport className="max-h-60 overflow-y-auto">
                {Rubriques.map((cat) => (
                  <SelectItem
                    value={String(cat.name)}
                    className="hover:bg-green-500 hover:text-white"
                  ></SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2 w-full">
          <Label htmlFor="libelle">libelle</Label>
          <Input
            id="libelle"
            name="libelle"
            type="text"
            value={libelle}
            onChange={(e) => setlibelle(e.target.value)}
            required
            className="w-full"
          />
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
        <div className="grid gap-2 w-full">
          <Label htmlFor="amount">amount</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={amount}
            onChange={(e) => setamount(e.target.value)}
            required
            className="w-full"
          />
        </div>
        <div className="grid gap-2">
          <Select
            value={supplierIdItems}
            onValueChange={(value) => {
              console.log("Nouvelle valeur sélectionnée :", value);
              setsupplierIdItems(value);
            }}
          >
            <SelectTrigger id="supplier" className="w-full">
              <SelectValue placeholder="Sélectionnez une supplier" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectViewport className="max-h-60 overflow-y-auto">
                {Suppliers.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={String(cat.name)}
                    className="hover:bg-[#4895b7] hover:text-white"
                  >
                    {cat.email}
                  </SelectItem>
                ))}
              </SelectViewport>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
          <Button variant="outline" type="button" onClick={onClose}>
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
