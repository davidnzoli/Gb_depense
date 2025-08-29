"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DialogContent } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, ArrowUp, BadgeDollarSign, BanknoteArrowDown } from "lucide-react";
import Pagination from "@/components/pagination";
import { Trash, Edit, Loader2, Pencil, Eye } from "lucide-react";
import AddExpense from "@/components/popups/addNews/addExpense";
import UpdatedExpense from "@/components/popups/updateContent/updateExpense";
import DeleteExpense from "@/components/popups/deleteContent/deleteExpense";
import AddProject from "@/components/popups/addNews/addProject";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import ConfigProject from "@/components/popups/updateContent/configProject";
import { Item } from "@radix-ui/react-select";
import DocumentUpload from "@/components/popups/addNews/uploadFiles";

interface ItemsProjects {
  id: string;
  name: string;
  description: string;
  serviceName?: string | null;
  userName?: string | null;
  clients: string;
  location: string;
  status: string;
  budget: string;
  startDate: string;
  endDate: string;
  devisNumber: string;
}

interface ItemsDepense {
  id: string;
  date: string;
  libelle: string;
  rubriqueName: string;
  supplierName: string;
  devise: string;
  amount: string;
  supplier: string;
}

interface Document {
  id: string;
  title: string;
  fileUrl: string;
  type?: string;
  projectId: string;
}

interface ProjectDocumentsProps {
  documents: Document[];
}


export default function projectSetting() {
  const [loading, setLoading] = useState(true);
  const [opens, setOpens] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(7);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projects, setProjects] = useState<ItemsProjects | null>(null);
  const [expenses, setExpense] = useState<ItemsDepense[]>([]);
  const [document, setDocument] = useState<Document[]>([]);
  const [totalUSD, setTotalUSD] = useState<number>(0);
  const [totalCDF, setTotalCDF] = useState<number>(0);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showUpload, setShowUpload] = useState(false);
const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { id } = useParams<{ id: string }>();

  //  if (!documents || documents.length === 0) return <div>Aucun document</div>;
  async function fetchProjectId(id: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      if (!res.ok) throw new Error("Erreur lors de la récupération");

      const resExpense = await fetch(`/api/projects/${id}/expenses`);
      const dataExpense = await resExpense.json();

      

      setExpense(dataExpense.data || []);
     
      console.log("les donnees expense sont : ", dataExpense);
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur de récupération :", error);
      return null;
    }
  }

  useEffect(() => {
  if (!id) return;
  const fetchDocuments = async () => {
    try {
      const res = await fetch(`/api/projects/${id}/documents`);

if (!res.ok) {
  console.error("Erreur serveur", res.status);
  return;
}

let data;
try {
  data = await res.json();
} catch (err) {
  console.error("Réponse vide ou non JSON");
  return;
}

setDocuments(data.data || []);

    } catch (error) {
      console.error("Erreur récupération documents:", error);
    }
  };
  fetchDocuments();
}, [id]);

  useEffect(() => {
    if (!id) return;
    fetchProjectId(id);

    const handleProjectAdded = () => {
      fetchProjectId(id);
    };

    window.addEventListener("expenseAdded", handleProjectAdded);

    return () => {
      window.removeEventListener("expenseAdded", handleProjectAdded);
    };
  }, [id]);

  const totalCategories = expenses ? expenses.length : 0;
  const totalPages = Math.ceil(totalCategories / categoriesPerPage);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = expenses?.slice(indexOfFirstCategory, indexOfLastCategory);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (Array.isArray(expenses)) {
       const totalUSD = expenses
      .filter(item => item.devise === "USD")
      .reduce((acc, item) => acc + Number(item.amount || 0), 0);
      setTotalUSD(totalUSD);
    }
  }, [expenses]);
useEffect(() => {
  if (Array.isArray(expenses)) {
    const totalCDF = expenses
      .filter(item => item.devise === "CDF")
      .reduce((acc, item) => acc + Number(item.amount || 0), 0);

    console.log("Total CDF :", totalCDF);
    setTotalCDF(totalCDF);
  }
}, [expenses]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="animate-spin h-16 w-15 text-[#4895b7]" />
        </div>
      ) : (
        <div className="flex flex-col h-full bg-white p-8 mb-1 justify-between w-[100%] items-start gap-8 text-gray-500 font-medium">
          <div className="flex w-[100%]  pb-3 justify-between items-start text-center">
            {projects && (
              <>
                <h1 className="font-normal text-start w-[50%] text-3xl text-[#28283a]">
                  Parametre de projet intitule :{" "}
                  <span className="text-[#28283a] text-2xl">{projects.name}</span>
                </h1>
                <h1 className="font-extrabold text-[#1e1e2f]">
                  {" "}
                  Table de bord/{" "}
                  <span className="text-[#4895b7] font-medium">Settings project</span>
                </h1>
              </>
            )}
          </div>
          {projects && (
            <>
              <div className="w-[100%] flex flex-col border-0.5 shadow-md bg-white border-gray-300 border-r-8 rounded-2xl ">
                <div className="flex flex-col gap-6 justify-between items-start w-[100.1%] p-6 border-b-1 border-gray-100 bg-[#f2f2f5] rounded-t-2xl border-b-gray">
                  <Badge variant="destructive">{projects.status}</Badge>
                  <div className="flex flex-col gap-0.2">
                    <h1 className="text-2xl w-xl font-bold text-[#1e1e2f] uppercase">
                      {projects.name}
                    </h1>
                    <h1 className="font-normal lowercase">{projects.serviceName}</h1>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center p-5 border-gray-100 border-b-1 border-b-gray">
                  <h1 className="uppercase w-md ">a propos</h1>
                  <h1 className="w-3xl">{projects.description}</h1>
                </div>
                <div className="flex flex-row justify-start items-center bg-[#f2faff] p-5 border-b-1 border-gray-100 border-b-gray">
                  <h1 className="uppercase w-md">client</h1>
                  <h1 className=" w-3xl">{projects.clients}</h1>
                </div>
                <div className="flex flex-row justify-start items-center p-5 border-b-1 border-gray-100 border-b-gray">
                  <h1 className="uppercase w-md">pays ou ville</h1>
                  <h1 className=" w-3x">{projects.location}</h1>
                </div>
                <div className="border-b-1 border-gray-100 border-b-gray flex flex-row p-5 justify-start items-center bg-[#fbfbfb] rounded-b-2xl  ">
                  <h1 className="w-md">Action rapides</h1>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedProjectId(projects.id);
                      setOpens(true);
                    }}
                    className="flex items-center w-[220px] text-white  cursor-pointer mr-3 p-5 bg-[#1e1e2f] border-1 border-gray-100  hover:bg-white hover:text-[#4895b7] hover:border-[#4895b7]"
                  >
                    Configuration du projet
                    <Edit className="h-5 w-5 text-text-[#1e1e2f]" />
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="text-white  w-[220px]  cursor-pointer mr-3 p-5 bg-[#4895b7] border-1 border-gray-100 hover:bg-white hover:text-[#4895b7] hover:border-[#4895b7]"
                  >
                    Jalon
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="text-white  w-[220px] cursor-pointer p-5 bg-[#2b5a6c] border-1 border-gray-100  hover:bg-white hover:text-[#4895b7] hover:border-[#4895b7]"
                  >
                    paramettre
                  </Button>
                </div>
              </div>
              <Dialog open={opens} onOpenChange={setOpens}>
                <DialogContent>
                  <DialogTitle>Modifier la depense</DialogTitle>
                  {selectedProjectId && (
                    <ConfigProject
                      id={selectedProjectId}
                      onClosed={() => setOpens(false)}
                      onUpdate={() => fetchProjectId(id)}
                    />
                  )}
                </DialogContent>
              </Dialog>
            </>
          )}

          <div className=" flex flex-row w-[100%] justify-between items-center bg-white gap-3">
            <div className="w-[50%] h-48 border-1 p-4 rounded-2xl shadow-md flex flex-col justify-end items-start gap-5 border-gray-300">
              <h1 className=" bg-[#f2f2f5] p-4 rounded-[50%] text-red-500">
                <BadgeDollarSign className="w-10 h-10" />
              </h1>
              {projects && (
                <h1 className="font-bold text-2xl text-[#393944]">
                  {projects.budget} {projects.devisNumber}
                </h1>
              )}

              <div className=" w-[100%] gap-1 flex justify-between items-center text-center">
                <h1 className="font-bold text-sm text-[#1e1e2f]">Budget</h1>
                <h1 className="text-sm text-[#4895b7] flex gap-1 text-center justify-center items-center">
                  Total pour le projet{" "}
                  <span>
                    <ArrowUp />
                  </span>
                </h1>
              </div>
            </div>
            <div className="w-[50%] h-48 border-1 p-4 rounded-2xl shadow-md flex flex-col justify-end items-start gap-3 border-gray-300">
              <h1 className=" bg-[#f2f2f5] p-4 rounded-[50%] text-red-500">
                <BadgeDollarSign className="w-10 h-10" />
              </h1>
              <h1 className="font-bold text-2xl text-[#393944]">10000.00 $</h1>

              <div className=" w-[100%] gap-1 flex justify-between items-center text-center">
                <h1 className="font-bold text-sm text-[#1e1e2f]">Budget</h1>
                <h1 className="text-sm text-[#4895b7] flex gap-1 text-center justify-center items-center">
                  Total pour le projet{" "}
                  <span>
                    <ArrowUp />
                  </span>
                </h1>
              </div>
            </div>
            <div className="w-[50%] h-48 border-1 p-4 rounded-2xl shadow-md flex flex-col justify-end items-start gap-4 border-gray-300">
              <h1 className=" bg-[#f2f2f5] p-4 rounded-[50%] text-red-500">
                <BadgeDollarSign className="w-10 h-10" />
              </h1>
              <h1 className="font-bold text-2xl text-[#393944]">{totalCDF.toLocaleString()} Fc</h1>

              <div className=" w-[100%] gap-1 flex justify-between items-center text-center">
                <h1 className="font-bold text-sm text-[#1e1e2f]">Dépenses CDF</h1>
                <h1 className="text-sm text-[#4895b7] flex gap-1 text-center justify-center items-center">
                  Total pour le projet{" "}
                  <span>
                    <ArrowUp />
                  </span>
                </h1>
              </div>
            </div>
            <div className="w-[50%] h-48 border-1 p-4 rounded-2xl shadow-md flex flex-col justify-end items-start gap-4 border-gray-300">
              <h1 className=" bg-[#f2f2f5] rounded-[50%] p-4 text-red-500">
                <BanknoteArrowDown className="w-10 h-10" />
              </h1>

              <h1 className="font-bold text-2xl text-[#393944]">{totalUSD.toLocaleString()} $</h1>

              <div className=" w-[100%] flex justify-between gap-1 items-center text-center">
                <h1 className="font-bold text-sm text-[#1e1e2f]">Dépenses USD</h1>
                <h1 className="text-sm text-[#4895b7] flex gap-1 text-center justify-center items-center">
                  Total pour le projet{" "}
                  <span>
                    <ArrowDown />
                  </span>
                </h1>
              </div>
            </div>
          </div>
          {projects && (
  <div className="w-[100%] flex flex-col justify-start items-start gap-3">
    <h1 className="text-lg font-semibold">DOCUMENTS ET FICHIERS</h1>

    {/* Upload form */}
    <form
      className="flex items-center gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!projects?.id) return;
        const formData = new FormData();
        if (selectedFile) {
          formData.append("file", selectedFile);
          formData.append("projectId", projects.id);

          try {
            const res = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });

            if (!res.ok) throw new Error("Erreur lors de l'upload");

            const newDoc = await res.json();

            // Mettre à jour l’état local
            setDocuments((prev) => [...prev, newDoc]);
            setSelectedFile(null);
          } catch (error) {
            console.error("Upload échoué :", error);
          }
        }
      }}
    >
      <Input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        className="w-[300px]"
      />
      <Button type="submit" className="bg-[#4895b7] text-white">
        Upload
      </Button>
    </form>

    {/* Zone d’affichage des documents */}
    <div className="w-[100%] min-h-48 border-1 border-gray-400 border-dashed p-6 rounded-2xl">
      {documents.length === 0 ? (
        <div className="flex flex-col justify-center items-center text-[#1e1e2f] text-base">
          <img
            src="/undraw_no-data_ig65.svg"
            className="w-32 h-32 mb-4"
            alt="no-docs"
          />
          Aucun document pour ce projet
        </div>
      ) : (
        <ul className="list-disc pl-6 space-y-2">
          {documents.map((doc) => (
            <li key={doc.id}>
              <a
                href={doc.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4895b7] underline"
              >
                {doc.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
)}


          <div className="w-[100%] flex flex-col justify-start items-start gap-3">
            <h1>DEPENSES EFFECTUEZ SUR CE PROJET</h1>
            {currentCategories && currentCategories.length > 0 ? (
              <Table className="border border-gray-200">
                <TableHeader className="border border-gray-200">
                  <TableRow className="border-none">
                    <TableHead className="font-medium text-[#1e1e2f] text-base">
                      Depense du date de :
                    </TableHead>
                    <TableHead className="font-medium text-[#1e1e2f] text-base">
                      Montants depense
                    </TableHead>
                    <TableHead className="font-medium text-[#1e1e2f] text-base">Libelle</TableHead>
                    <TableHead className="font-medium text-[#1e1e2f] text-base">
                      Fournisseur
                    </TableHead>
                    <TableHead className="font-medium text-[#1e1e2f] text-base">Rubrique</TableHead>
                    <TableHead className="text-center text-[#1e1e2f] text-base">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="border border-gray-200">
                  {currentCategories.map((expense) => (
                    
                    <TableRow key={expense.id} className="border border-gray-200">
                      <TableCell className=" text-gray-700">{expense.date}</TableCell>
                      <TableCell className="text-left text-gray-700">{expense.amount} {expense.devise}</TableCell>
                      <TableCell className="text-left text-gray-700">{expense.libelle}</TableCell>
                      <TableCell className="text-left text-gray-700">
                        {expense.supplierName}
                      </TableCell>
                      <TableCell className="text-left text-gray-700">
                        {expense.rubriqueName}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="text-center flex items-center justify-center space-x-2">
                          {/* <DeleteExpense id={projet.id} onDeletes={handleDelete} /> */}

                          <Button
                            variant="outline"
                            className="flex items-center border-1 border-gray-100 cursor-pointer"
                          >
                            <Eye className="h-5 w-5 text-[#4895b7]" />
                          </Button>

                          <Button
                            variant="outline"
                            className="flex items-center cursor-pointer border-1 border-gray-100"
                          >
                            <Pencil className="h-5 w-5 text-[#1e1e2f]" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="w-[100%] h-96 border-1 text-center border-gray-400 border-dashed p-40 rounded-2xl">
                <div className="flex flex-col justify-center items-center text-[#1e1e2f] text-base">
                  <img
                    src="/undraw_no-data_ig65.svg"
                    className="w-48 h-48 mb-4"
                    alt="svg-no-data"
                  />
                  Aucune donnée trouvé dans la table
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
