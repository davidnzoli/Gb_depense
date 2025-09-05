// "use client";

// import { useState, useEffect } from "react";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { FileText } from "lucide-react";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   // SelectViewport,
//   SelectItem,
// } from "@/components/ui/select";
// import { SelectViewport } from "@radix-ui/react-select";

// const Devises = [
//   { code: "USD", name: "Dollar américain" },
//   { code: "CDF", name: "Franc congolais" },
// ];

// interface Expenses {
//   id: string;
//   libelle: string;
//   rubriqueId: string;
//   beneficiaire: string;
//   devise: string;
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
// interface ItemsSuplier {
//   id: string;
//   email: string;
// }
// interface ItemsService {
//   id: string;
//   name: string;
// }
// interface ItemsProject {
//   id: string;
//   name: string;
// }
// interface ItemsRubrique {
//   id: string;
//   name: string;
// }
// export default function Rapport() {
//   const [filters, setFilters] = useState<Record<string, string>>({});
//   const [Expense, setExpense] = useState<Expenses[]>([]);
//   const [Suppliers, setSuppliers] = useState<ItemsSuplier[]>([]);
//   const [Projects, setProjects] = useState<ItemsProject[]>([]);
//   const [Services, setServices] = useState<ItemsService[]>([]);
//   const [Rubriques, setRubriques] = useState<ItemsRubrique[]>([]);
//   const [devisNumber, setDevisNumber] = useState(Devises);
//   const [devise, setDevise] = useState("");
//   const [formData, setFormData] = useState({
//     id: "",
//     libelle: "",
//     rubriqueId: "",
//     beneficiaire: "",
//     devise: "",
//     amount: "",
//     userId: "",
//     supplierId: "",
//     projectId: "",
//     serviceId: "",
//   });

//   async function fetchExpense() {
//     try {
//       const res = await fetch("/api/expenses");
//       const result = await res.json();
//       console.log("Réponse brute : ", result);

//       if (!result || !Array.isArray(result.data)) {
//         console.error("Structure inattendue:", result);
//         setExpense([]);
//         return;
//       }

//       setExpense(result.data);
//       setRubriques(result.rubriques);
//       setServices(result.services);
//       setProjects(result.projects);
//       setSuppliers(result.suppliers);
//     } catch (error) {
//       console.error("Erreur lors de la récupération des depense:", error);
//       setExpense([]);
//       setRubriques([]);
//       setServices([]);
//       setProjects([]);
//       setSuppliers([]);
//     }
//   }
//   useEffect(() => {
//     fetchExpense();
//   }, []);

//   const handleSubmit = (e: React.FormEvent, type: string) => {
//     e.preventDefault();
//     console.log("Type de rapport :", type, "Filtres :", filters);
//     // 👉 Ici tu enverras une requête à ton API
//     // fetch(`/api/reports?type=${type}`, { method: "POST", body: JSON.stringify(filters) })
//   };

//   return (
//     <div className="p-6 rounded-xl shadow flex justify-center items-start h-full w-[100%]">

//          <div className="p-6 bg-white rounded-xl shadow w-[70%] mt-32">
//       <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
//         <FileText className="w-5 h-5" /> GENERATION DES RAPPORTS
//       </h2>

//       <Tabs defaultValue="general" className="w-full">
//         {/* --- Onglets --- */}
//         <TabsList className="grid grid-cols-6 w-full">
//           <TabsTrigger value="general">Général</TabsTrigger>
//           <TabsTrigger value="depenses">Dépenses</TabsTrigger>
//           <TabsTrigger value="projets">Projets</TabsTrigger>
//           <TabsTrigger value="revenus">Revenus</TabsTrigger>
//           <TabsTrigger value="agents">Agents</TabsTrigger>
//           <TabsTrigger value="fournisseurs">Fournisseurs</TabsTrigger>
//         </TabsList>

//         {/* --- Rapport Général --- */}
//         <TabsContent value="general" className="flex flex-col justify-center items-center mt-10">
//           <form onSubmit={(e) => handleSubmit(e, "general")} className="space-y-4 mt-4">
//             <div>
//               <Label>Plage de dates</Label>
//               <br />
//               <div className="flex gap-2">
//                 <Input
//                   type="date"
//                   onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
//                 />
//                 <Input
//                   type="date"
//                   onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
//                 />
//               </div>
//             </div>
//             <Button type="submit">📄 Générer Rapport Général</Button>
//           </form>
//         </TabsContent>

//         {/* --- Rapport Dépenses --- */}
//         <TabsContent value="depenses" className=" mt-10">
//           <form onSubmit={(e) => handleSubmit(e, "projets")} className="space-y-4 mt-4">
         
            
//             <div className="flex gap-2">
             
               
//                 <Select
//                   value={formData.projectId}
//                   onValueChange={(val) => setFormData((prev) => ({ ...prev, projectId: val }))}
//                 >
//                   <SelectTrigger id="projectId" className=" h-12">
//                     <SelectValue placeholder="Sélectionner le projet" />
//                   </SelectTrigger>
//                   <SelectContent className=" w-full ">
//                     <SelectViewport className="max-h-06  overflow-y-auto">
//                       {Projects.map((cat) => (
//                         <SelectItem
//                           key={cat.id}
//                           value={cat.id}
//                           className="hover:bg-[#4895b7]  hover:text-white"
//                         >
//                           {cat.name || "VIDE"}
//                         </SelectItem>
//                       ))}
//                     </SelectViewport>
//                   </SelectContent>
//                 </Select>
           
              
//                 <Select
//                   value={formData.devise}
//                   onValueChange={(val) => setFormData((prev) => ({ ...prev, devise: val }))}
//                 >
//                   <SelectTrigger id="devise" className=" ">
//                     <SelectValue placeholder="Sélectionnez la devise" />
//                   </SelectTrigger>
//                   <SelectContent className="w-full">
//                     <SelectViewport className="max-h-06 overflow-y-auto">
//                       {devisNumber.map((cat) => (
//                         <SelectItem
//                           key={cat.code}
//                           value={String(cat.code)}
//                           className="hover:bg-[#4895b7] hover:text-white"
//                         >
//                           {cat.name} - {cat.code}
//                         </SelectItem>
//                       ))}
//                     </SelectViewport>
//                   </SelectContent>
//                 </Select>
//               </div>

//             {/* ✅ Intervalle de dates */}
//             <div>
//               <Label>Plage de dates</Label>
//               <div className="flex gap-2">
//                 <Input
//                   type="date"
//                   onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
//                 />
//                 <Input
//                   type="date"
//                   onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
//                 />
//               </div>
//             </div>
        
//             <Button type="submit">📄 Générer Rapport Dépenses</Button>
//           </form>
//         </TabsContent>



       
//       </Tabs>
//     </div>

//     </div>
   
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const Devises = [
  { code: "USD", name: "Dollar américain" },
  { code: "CDF", name: "Franc congolais" },
];

export default function Rapport() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [Projects, setProjects] = useState<{ id: string; name: string }[]>([]);
  const [devisNumber] = useState(Devises);

  const [formData, setFormData] = useState({
    projectId: "",
    devise: "",
  });

  async function fetchExpense() {
    try {
      const res = await fetch("/api/expenses");
      const result = await res.json();
      if (result?.projects) setProjects(result.projects);
    } catch (error) {
      console.error("Erreur lors du fetch:", error);
    }
  }

  useEffect(() => {
    fetchExpense();
  }, []);

  const handleSubmit = (e: React.FormEvent, type: string) => {
    e.preventDefault();
    console.log("Type :", type, "Filtres :", filters, "FormData :", formData);
  };

  return (
    <div className="p-6 flex justify-center items-start w-full">
      <div className="p-6 bg-white rounded-xl shadow-lg w-full md:w-[70%] mt-20">
        <h2 className="text-xl font-bold mb-6 flex items-start gap-2 text-gray-700 flex-col justify-center">
          <FileText className="w-6 h-6 text-[#4895b7]" /> GENERATION DES RAPPORTS
          <span className="text-[17px] text-base font-normal">Utilisez ce formulaire pour generer des raports</span>
        </h2>
        

        <Tabs defaultValue="general" className="w-full">
          {/* Onglets */}
          <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 w-full mb-6">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="depenses">Dépenses</TabsTrigger>
            <TabsTrigger value="projets">Projets</TabsTrigger>
            <TabsTrigger value="revenus">Revenus</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="fournisseurs">Fournisseurs</TabsTrigger>
          </TabsList>

          {/* Rapport Général */}
          <TabsContent value="general">
            <form
              onSubmit={(e) => handleSubmit(e, "general")}
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Date de début</Label>
                  <Input
                    type="date"
                    onChange={(e) =>
                      setFilters({ ...filters, startDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Date de fin</Label>
                  <Input
                    type="date"
                    onChange={(e) =>
                      setFilters({ ...filters, endDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <Button className="w-full cursor-pointer sm:w-auto" type="submit">
                📄 Générer Rapport Général
              </Button>
            </form>
          </TabsContent>

          {/* Rapport Dépenses */}
          <TabsContent value="depenses">
            <form
              onSubmit={(e) => handleSubmit(e, "depenses")}
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Projet</Label>
                  <Select
                    value={formData.projectId}
                    onValueChange={(val) =>
                      setFormData((prev) => ({ ...prev, projectId: val }))
                    }
                  >
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Sélectionner le projet" />
                    </SelectTrigger>
                    <SelectContent>
                      {Projects.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name || "VIDE"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Devise</Label>
                  <Select
                    value={formData.devise}
                    onValueChange={(val) =>
                      setFormData((prev) => ({ ...prev, devise: val }))
                    }
                  >
                    <SelectTrigger className="w-full h-12">
                      <SelectValue placeholder="Sélectionner la devise" />
                    </SelectTrigger>
                    <SelectContent>
                      {devisNumber.map((d) => (
                        <SelectItem key={d.code} value={d.code}>
                          {d.name} - {d.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Date de début</Label>
                  <Input
                    type="date"
                    onChange={(e) =>
                      setFilters({ ...filters, startDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Date de fin</Label>
                  <Input
                    type="date"
                    onChange={(e) =>
                      setFilters({ ...filters, endDate: e.target.value })
                    }
                  />
                </div>
              </div>

              <Button className="w-full cursor-pointer sm:w-auto" type="submit">
                📄 Générer Rapport Dépenses
              </Button>
            </form>
          </TabsContent>
           {/* --- Rapport Projets --- */}
        <TabsContent value="projets">
          <form onSubmit={(e) => handleSubmit(e, "projets")} className="space-y-6">
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
            <Button type="submit" className="cursor-pointer">📄 Générer Rapport Projets</Button>
          </form>
        </TabsContent>

        {/* --- Rapport Revenus --- */}
        <TabsContent value="revenus" >
          <form onSubmit={(e) => handleSubmit(e, "revenus")} className="space-y-6">
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
            <Button type="submit" className="cursor-pointer">📄 Générer Rapport Revenus</Button>
          </form>
        </TabsContent>

        {/* --- Rapport Agents --- */}
        <TabsContent value="agents">
          <form onSubmit={(e) => handleSubmit(e, "agents")} className="space-y-6">
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
            <Button type="submit" className="cursor-pointer">📄 Générer Rapport Agents</Button>
          </form>
        </TabsContent>

        {/* --- Rapport Fournisseurs --- */}
        <TabsContent value="fournisseurs">
          <form onSubmit={(e) => handleSubmit(e, "fournisseurs")} className="space-y-6">
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
            <Button type="submit" className="cursor-pointer">📄 Générer Rapport Fournisseurs</Button>
          </form>
        </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
