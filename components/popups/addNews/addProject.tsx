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

interface ItemsProjects {
  id: string;
  name: string;
  description :  string;
  serviceId : string;
  clients : string;
  userId    :  string;
  location : string;
  status : string;
}
interface ItemsService {
  id: string;
  name: string;
}
interface ItemsUser {
  id: string;
  name: string;
}
interface AddDataDialogContent {
  onClosed: () => void;
}

export default function AddProject({ onClosed }: AddDataDialogContent) {
  const [Projet, setProjects] = React.useState<ItemsProjects[]>([]);
  const [Service, setServices] = React.useState<ItemsService[]>([]);
  const [User, setUsers] = React.useState<ItemsUser[]>([]);
  const [formData, setFormData] = React.useState({
   id: "",
   name: "",
   description:"",
   serviceId: "",
   clients:"",
   userId: "",
   location:"",
   status: "",
  });

  async function fetchProject() {
    try {
      const res = await fetch("/api/projects");
      const result = await res.json();
      console.log("Réponse brute : ", result);

      if (!result || !Array.isArray(result.data)) {
        setProjects([]);
        setServices([]);
        setUsers([])
        return;
      }

      setProjects(result.data);
      setServices(result.services);
      setUsers(result.users);
    } catch (error) {
      console.error("Erreur lors de la récupération des service:", error);
        setProjects([]);
        setServices([]);
        setUsers([])
    }
  }
    useEffect(() => {
    fetchProject();
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
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log(formData)
      if (!res.ok) {
        const err = await res.json();
        console.log(err)
        throw new Error(err.error || "Erreur lors de l'ajout de project");
      }
      if (res.status === 409) {
        toast.error(
          "Conflit de données : doublon détecté. Cette element existe déjà !"
        );
      }     
      setFormData({
         id: "",
         name: "",
         description:"",
         serviceId: "",
         clients:"",
         userId: "",
         location:"",
         status: "",
   });
      onClosed();
      toast.success("Project ajoutée avec succès ✅");
      if (typeof window !== "undefined") {
  window.dispatchEvent(new CustomEvent("expenseAdded"));
}
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      toast.error("Échec de l'ajout du project ❌");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Ajouter un service</DialogTitle>
        <DialogDescription>
          Remplissez le formulaire ci-dessous pour ajouter un projet.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Nom de Projet</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: construiction maison"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea name="description" id="description" 
          value={formData.description}  
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))
  }/>
        </div>
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
                         {Service.map((cat) => (
                          <SelectItem
                            key={cat.id}
                            value={cat.id || ""}
                            className="hover:bg-green-500 hover:text-white"
                          >
                            {cat.name || "VIDE"}
                          </SelectItem>
                        ))}
                      </SelectViewport>
                    </SelectContent>
                  </Select>
                </div>
        <div className="grid gap-2">
          <Label htmlFor="clients">Nom de client</Label>
          <Input
            id="clients"
            name="clients"
            type="text"
            value={formData.clients}
            onChange={handleChange}
            placeholder="Ex: Ely"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Adresse</Label>
          <Input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ex: Burundi, province, av, Q"
            required
          />
        </div>
        <div className="grid gap-2">
                  <Select
                    value={formData.userId}
                    onValueChange={(val) =>
                      setFormData((prev) => ({ ...prev, userId: val }))
                    }
                  >
                    <SelectTrigger id="userId" className="w-full">
                      <SelectValue placeholder="Sélectionner un Agent de suivis" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectViewport className="max-h-60 overflow-y-auto">
                         {User.map((cat) => (
                          <SelectItem
                            key={cat.id}
                            value={cat.id || ""}
                            className="hover:bg-green-500 hover:text-white"
                          >
                            {cat.name || "VIDE"}
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