"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

export default function Rapport() {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent, type: string) => {
    e.preventDefault();
    console.log("Type de rapport :", type, "Filtres :", filters);
    // 👉 Ici tu enverras une requête à ton API
    // fetch(`/api/reports?type=${type}`, { method: "POST", body: JSON.stringify(filters) })
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" /> Génération des Rapports
      </h2>

      <Tabs defaultValue="general" className="w-full">
        {/* --- Onglets --- */}
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="depenses">Dépenses</TabsTrigger>
          <TabsTrigger value="projets">Projets</TabsTrigger>
          <TabsTrigger value="revenus">Revenus</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="fournisseurs">Fournisseurs</TabsTrigger>
        </TabsList>

        {/* --- Rapport Général --- */}
        <TabsContent value="general">
          <form onSubmit={(e) => handleSubmit(e, "general")} className="space-y-4 mt-4">
            <div>
              <Label>Plage de dates</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
                <Input
                  type="date"
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </div>
            </div>
            <Button type="submit">📄 Générer Rapport Général</Button>
          </form>
        </TabsContent>

        {/* --- Rapport Dépenses --- */}
        <TabsContent value="depenses">
          <form onSubmit={(e) => handleSubmit(e, "depenses")} className="space-y-4 mt-4">
            <div>
              <Label>Catégorie</Label>
              <Input
                placeholder="Ex: Transport"
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              />
            </div>
            <div>
              <Label>Service</Label>
              <Input
                placeholder="Ex: IT"
                onChange={(e) => setFilters({ ...filters, service: e.target.value })}
              />
            </div>
            {/* ✅ Intervalle de dates */}
            <div>
              <Label>Plage de dates</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
                <Input
                  type="date"
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </div>
            </div>
            <Button type="submit">📄 Générer Rapport Dépenses</Button>
          </form>
        </TabsContent>

        {/* --- Rapport Projets --- */}
        <TabsContent value="projets">
          <form onSubmit={(e) => handleSubmit(e, "projets")} className="space-y-4 mt-4">
            <div>
              <Label>Projet</Label>
              <Input
                placeholder="Nom du projet"
                onChange={(e) => setFilters({ ...filters, project: e.target.value })}
              />
            </div>
            {/* ✅ Intervalle de dates */}
            <div>
              <Label>Plage de dates</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
                <Input
                  type="date"
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </div>
            </div>
            <Button type="submit">📄 Générer Rapport Projets</Button>
          </form>
        </TabsContent>

        {/* --- Rapport Revenus --- */}
        <TabsContent value="revenus">
          <form onSubmit={(e) => handleSubmit(e, "revenus")} className="space-y-4 mt-4">
            <div>
              <Label>Source de revenu</Label>
              <Input
                placeholder="Ex: Vente"
                onChange={(e) => setFilters({ ...filters, source: e.target.value })}
              />
            </div>
            {/* ✅ Intervalle de dates */}
            <div>
              <Label>Plage de dates</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
                <Input
                  type="date"
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </div>
            </div>
            <Button type="submit">📄 Générer Rapport Revenus</Button>
          </form>
        </TabsContent>

        {/* --- Rapport Agents --- */}
        <TabsContent value="agents">
          <form onSubmit={(e) => handleSubmit(e, "agents")} className="space-y-4 mt-4">
            <div>
              <Label>Agent</Label>
              <Input
                placeholder="Nom de l'agent"
                onChange={(e) => setFilters({ ...filters, agent: e.target.value })}
              />
            </div>
            {/* ✅ Intervalle de dates */}
            <div>
              <Label>Plage de dates</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
                <Input
                  type="date"
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </div>
            </div>
            <Button type="submit">📄 Générer Rapport Agents</Button>
          </form>
        </TabsContent>

        {/* --- Rapport Fournisseurs --- */}
        <TabsContent value="fournisseurs">
          <form onSubmit={(e) => handleSubmit(e, "fournisseurs")} className="space-y-4 mt-4">
            <div>
              <Label>Fournisseur</Label>
              <Input
                placeholder="Email ou Nom"
                onChange={(e) => setFilters({ ...filters, supplier: e.target.value })}
              />
            </div>
            {/* ✅ Intervalle de dates */}
            <div>
              <Label>Plage de dates</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
                <Input
                  type="date"
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </div>
            </div>
            <Button type="submit">📄 Générer Rapport Fournisseurs</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
