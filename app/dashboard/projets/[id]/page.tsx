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
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BadgeDollarSign,
  BanknoteArrowDown,
  BookAlert,
  FileChartColumnIncreasing,
  FileText,
  Printer,
} from "lucide-react";
import Pagination from "@/components/pagination";
import { Trash, Edit, Loader2, Pencil, Eye } from "lucide-react";
import AddExpense from "@/components/popups/addNews/addExpense";
import UpdatedExpense from "@/components/popups/updateContent/updateExpense";
import DeleteExpense from "@/components/popups/deleteContent/deleteExpense";
import AddProject from "@/components/popups/addNews/addProject";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import ConfigProject from "@/components/popups/updateContent/configProject";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

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
  titre: string;
  fileUrl: string;
  type?: string;
  projectId: string;
}
type Props = {
  projectName: string;
  expense: ItemsDepense[];
};
export default function projectSetting({ projectName, expense }: Props) {
  const [loading, setLoading] = useState(true);
  const [opens, setOpens] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(7);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projects, setProjects] = useState<ItemsProjects | null>(null);
  const [expenses, setExpense] = useState<ItemsDepense[]>([]);
  const [totalUSD, setTotalUSD] = useState<number>(0);
  const [totalCDF, setTotalCDF] = useState<number>(0);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const generatePdf = async () => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return rgb(r, g, b);
}


  const logoUrl = "/Design sans titre.png"; 
  const logoBytes = await fetch(logoUrl).then((res) => res.arrayBuffer());
  const logoImage = await pdfDoc.embedPng(logoBytes); 

  const { width: logoWidth, height: logoHeight } = logoImage.scale(0.2); 

  let y = 760;


  page.drawImage(logoImage, {
    x: 210,
    y: y-70,
    width: 160,
    height: 100,
  });

y -= 30;
  // ✅ Titre au centre
  page.drawText("RAPPORT DE TOUTES LES DEPENSES", {
    x: 30,
    y: y-80,
    size: 18,
    font,
    color: hexToRgb("#4895b7"),
  });
  y -= 30; // espace après l'en-tête
  page.drawText(`${projects?.name}`, {
    x: 30,
    y: y-75,
    size: 13,
    font,
    color: hexToRgb("#1e1e2f"),
  });
  y -= 20; 
  page.drawText(`${projects?.serviceName}`, {
    x: 30,
    y: y-75,
    size: 12,
    font,
    color: hexToRgb("#4895b7"),
  });
  y -= 20; 
  const today = new Date().toLocaleDateString("fr-FR");
  page.drawText(`Dates : ${today}`, {
    x: 30,
    y: y-74,
    size: 13,
    font,
    color: hexToRgb("#1e1e2f"),
  });
  y -= 150; 

  page.drawText("Date", { x: 30, y, size: 15, font });
  page.drawText("Rubrique", { x: 250, y, size: 15, font });
  page.drawText("Montant ($)", { x: 450, y, size: 15, font });
  y -= 20;

  expenses.forEach((exp) => {
    page.drawText(new Date(exp.date).toLocaleDateString("fr-FR"), {
      x: 30,
      y,
      size: 14,
      font,
    });
    page.drawText(exp.rubriqueName, { x: 250, y, size: 14, font });
    page.drawText(`${Number(exp.amount).toFixed(2)} ${exp.devise}`, {
      x: 450,
      y,
      size: 14,
      font,
    });
    y -= 20;
  });

const totalsByDevise = expenses.reduce((acc, e) => {
  const devise = e.devise || "N/A"; 
  const amount = Number(e.amount);

  if (!acc[devise]) {
    acc[devise] = 0;
  }

  acc[devise] += amount;
  return acc;
}, {} as Record<string, number>);


y -= 30;
page.drawText("Totaux par devise :", { x: 30, y, size: 14, font });

Object.entries(totalsByDevise).forEach(([devise, total]) => {
  y -= 20;
  page.drawText(`${devise}: ${total.toFixed(2)}`, {
    x: 30,
    y,
    size: 12,
    font,
    color: rgb(0.2, 0.5, 0.2),
  });
});

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `rapport_depenses_${projectName}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
};

  const { id } = useParams<{ id: string }>();

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

        let data;
        try {
          data = await res.json();
        } catch (err) {
          console.error("Réponse vide ou non JSON");
          return;
        }

        console.log("resultat de data :", data || []);

        setDocuments(data || []);
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
        .filter((item) => item.devise === "USD")
        .reduce((acc, item) => acc + Number(item.amount || 0), 0);
      setTotalUSD(totalUSD);
    }
  }, [expenses]);
  useEffect(() => {
    if (Array.isArray(expenses)) {
      const totalCDF = expenses
        .filter((item) => item.devise === "CDF")
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
        <div className="flex flex-col h-full bg-white lg:p-8 p-3 mb-1 justify-between w-[100%]  items-start gap-8 text-gray-500 font-medium">
          <div className="flex lg:felx-row flex-col-reverse  w-[100%]  pb-3 lg:justify-between justify-center items-center lg:items-start text-center gap-4 lg:gap-0">
            {projects && (
              <>
                <h1 className="font-normal lg:text-start text-center lg:w-[50%] w-[100%] lg:text-3xl text-base text-[#28283a]">
                  Parametre de projet intitule :{" "}
                  <span className="text-[#28283a] lg:text-2xl text-base">{projects.name}</span>
                </h1>
                <h1 className="lg:font-extrabold font-normal text-[12px] lg:text-xl text-[#1e1e2f]">
                  {" "}
                  Table de bord/{" "}
                  <span className="text-[#4895b7] font-medium">Settings project</span>
                </h1>
              </>
            )}
          </div>
          {projects && (
            <>
              <div className="w-[100%] flex flex-col border-0.5 shadow-md bg-white border-gray-300 lg:border-r-8 rounded-2xl ">
                <div className="flex flex-col gap-6 justify-between items-start w-[100.1%] p-6 border-b-1 border-gray-100 bg-[#f2f2f5] rounded-t-2xl border-b-gray">
                  <Badge variant="destructive">{projects.status}</Badge>
                  <div className="flex flex-col gap-0.2">
                    <h1 className="lg:text-2xl text-base lg:w-xl w-[100%] font-bold text-[#1e1e2f] uppercase">
                      {projects.name}
                    </h1>
                    <h1 className="font-normal lowercase">{projects.serviceName}</h1>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center lg:p-5 p-2 border-gray-100 border-b-1 border-b-gray">
                  <h1 className="uppercase w-md ">a propos</h1>
                  <h1 className="w-3xl">{projects.description}</h1>
                </div>
                <div className="flex flex-row justify-start items-center bg-[#f2faff] lg:p-5 p-2 border-b-1 border-gray-100 border-b-gray">
                  <h1 className="uppercase w-md">client</h1>
                  <h1 className=" w-3xl">{projects.clients}</h1>
                </div>
                <div className="flex flex-row justify-start items-center lg:p-5 p-2 border-b-1 border-gray-100 border-b-gray">
                  <h1 className="uppercase w-md">pays ou ville</h1>
                  <h1 className=" w-3x">{projects.location}</h1>
                </div>
                <div className="border-b-1 border-gray-100 border-b-gray flex flex-row lg:p-5 p-2 justify-start items-center bg-[#fbfbfb] rounded-b-2xl  ">
                  <h1 className="w-md">Action rapides</h1>
                  <div className="flex flex-col lg:flex-row justify-end items-center gap-1">
                             <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedProjectId(projects.id);
                      setOpens(true);
                    }}
                    className="flex items-center w-[220px] text-white  cursor-pointer lg:mr-3 lg:p-5 p-1 bg-[#1e1e2f] border-1 border-gray-100 hover:bg-white hover:text-[#4895b7] hover:border-[#4895b7]"
                  >
                    Configuration du projet
                    <Edit className="h-5 w-5 text-text-[#1e1e2f]" />
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="text-white  w-[220px]  cursor-pointer lg:mr-3 lg:p-5 p-1 bg-[#4895b7] border-1 border-gray-100 hover:bg-white hover:text-[#4895b7] hover:border-[#4895b7]"
                  >
                    Jalon
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="text-white  w-[220px] cursor-pointer lg:p-5 p-1 bg-[#2b5a6c] border-1 border-gray-100  hover:bg-white hover:text-[#4895b7] hover:border-[#4895b7]"
                  >
                    paramettre
                  </Button>
                  </div>
           
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

          <div className=" flex lg:flex-row flex-col lg:items-center items-start w-[100%] justify-between bg-white gap-3">
            <div className="w-[100%] lg:w-[50%] h-48 border-1 p-4 rounded-2xl shadow-md flex flex-col justify-end items-start gap-5 border-gray-300">
              <h1 className=" bg-[#f2f2f5] p-4 rounded-[50%] text-red-500">
                <BadgeDollarSign className="w-10 h-10" />
              </h1>
              {projects?.budget != null ? (
                <h1 className="font-bold text-2xl text-[#393944]">
                  {projects.budget} {projects.devisNumber}
                </h1>
              ) : (
                <h1 className="font-bold text-2xl text-[#393944]">$ 0.00</h1>
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
            <div className="w-[100%] lg:w-[50%] h-48 border-1 p-4 rounded-2xl shadow-md flex flex-col justify-end items-start gap-3 border-gray-300">
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
            <div className="w-[100%] lg:w-[50%] h-48 border-1 p-4 rounded-2xl shadow-md flex flex-col justify-end items-start gap-4 border-gray-300">
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
            <div className="w-[100%] lg:w-[50%] h-48 border-1 p-4 rounded-2xl shadow-md flex flex-col justify-end items-start gap-4 border-gray-300">
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
            <div className="w-full flex flex-col gap-4">
              <h1 className="text-lg font-semibold">DOCUMENTS ET FICHIERS</h1>
              <form
                className="flex items-center gap-3"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!projects?.id || !selectedFile) return;

                  const formData = new FormData();
                  formData.append("file", selectedFile);

                  try {
                    const res = await fetch(`/api/projects/${projects.id}/documents`, {
                      method: "POST",
                      body: formData,
                    });

                    if (!res.ok) throw new Error("Erreur lors de l'upload");

                    const newDoc = await res.json();

                    setDocuments((prev) => [...prev, newDoc]);
                  } catch (error: unknown) {
                    const message = error instanceof Error ? error.message : JSON.stringify(error);
                    console.error("Upload échoué :", message);
                  }
                }}
              >
                <Input
                  type="file"
                  name="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="w-[300px]"
                />
                <Button type="submit" className="bg-[#4895b7] text-white">
                  Upload
                </Button>
              </form>

              <div className="w-full min-h-48 border border-dashed border-gray-400 p-6 rounded-2xl">
                {documents.length === 0 ? (
                  <div className="flex flex-col justify-center items-center text-[#1e1e2f] text-base">
                    <img src="/undraw_no-data_ig65.svg" className="w-32 h-32 mb-4" alt="no-docs" />
                    Aucun document pour ce projet
                  </div>
                ) : (
                  <div className="w-[100%] flex lg:flex-row flex-col lg:justify-between justify-center items-center lg:gap-3 gap-2">
                    {documents.map((doc) => {
                      const isImage = /\.(jpg|jpeg|png|gif|svg|heic|webp)$/i.test(doc.fileUrl);
                      const isPdf =
                        /\.pdf$/i.test(doc.fileUrl) ||
                        /\.txt$/i.test(doc.fileUrl) ||
                        /\.docx$/i.test(doc.fileUrl);

                      return (
                        <div
                          key={doc.id}
                          className="lg:w-[50%] w-[100%] flex flex-col items-center justify-center border border-dashed rounded-xl shadow-sm p-1 bg-white"
                        >
                          {isImage ? (
                            <a
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-[100%]"
                            >
                              <img
                                src={doc.fileUrl}
                                alt={doc.titre}
                                className="w-[100%] h-36 object-cover rounded-lg hover:scale-105 transition-transform"
                              />
                            </a>
                          ) : isPdf ? (
                            <a
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center text-gray-400"
                            >
                              <FileText
                                strokeWidth={1}
                                className=" w-[100%] h-36 object-cover rounded-lg hover:scale-105 transition-transform"
                              />
                            </a>
                          ) : (
                            <a
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col items-center text-gray-400 font-normal"
                            >
                              <BookAlert
                                strokeWidth={1}
                                className=" w-[100%] h-36 object-cover rounded-lg hover:scale-105 transition-transform"
                              />
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="w-[100%] flex flex-col justify-start items-start gap-3">
            <div className="flex w-[100%] justify-between items-start gap-3">
              <h1>DEPENSES EFFECTUEZ SUR CE PROJET</h1>
              {currentCategories && currentCategories.length > 0 ? (
                <Button
                  variant="outline"
                  onClick={generatePdf}
                  className="flex items-center border-1 p-3 border-gray-100 text-white font-bold bg-[#1e1e2f] hover:text-[#1e1e2f] cursor-pointer"
                >
                  PDF
                  <FileChartColumnIncreasing className="h-6 w-6  hover:text-[#1e1e2f] hover:border-[#1e1e2f] " />
                </Button>
              ) : (
                ""
              )}
            </div>

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
                      <TableCell className="text-left text-gray-700">
                        {expense.amount} {expense.devise}
                      </TableCell>
                      <TableCell className="text-left text-gray-700">{expense.libelle}</TableCell>
                      <TableCell className="text-left text-gray-700">
                        {expense.supplierName}
                      </TableCell>
                      <TableCell className="text-left text-gray-700">
                        {expense.rubriqueName}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="text-center flex items-center justify-center space-x-2">
                          <Button
                            variant="outline"
                            className="flex items-center border-1 border-gray-100 cursor-pointer"
                          >
                            <Printer className="h-5 w-5 text-[#4895b7]" />
                          </Button>

                          <Button
                            variant="outline"
                            className="flex items-center cursor-pointer border-1 border-gray-100"
                          >
                            <Trash className="h-5 w-5 text-red-500" />
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
