"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DialogContent, Dialog, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, Edit } from "lucide-react";
import Pagination from "@/components/pagination";
import AddExpense from "@/components/popups/addNews/addExpense";
import UpdatedExpense from "@/components/popups/updateContent/updateExpense";
import DeleteExpense from "@/components/popups/deleteContent/deleteExpense";

interface ItemsDepense {
  id: string;
  date: string;
  libelle: string;
  rubriqueName: string;
  beneficiaire: string;
  devise: string;
  amount: string;
  supplierName: string;
}

export default function ListeDepenses() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [opens, setOpens] = useState(false);
  const [depenses, setDepenses] = useState<ItemsDepense[]>([]);
  const [filtered, setFiltered] = useState<ItemsDepense[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(7);
  const [selectedDepenseId, setSelectedDepenseId] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState<string>("");

  const fetchDepenses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/expenses");
      const result = await res.json();
      if (!result || !Array.isArray(result.data)) {
        setDepenses([]);
        setFiltered([]);
        setLoading(false);
        return;
      }
      setDepenses(result.data);
      setFiltered(result.data);
    } catch (err) {
      console.error("Erreur récupération dépenses:", err);
      setDepenses([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepenses();
    const handleExpenseAdded = () => fetchDepenses();
    window.addEventListener("expenseAdded", handleExpenseAdded);
    return () => window.removeEventListener("expenseAdded", handleExpenseAdded);
  }, []);

  const applyFilter = () => {
    let result = depenses;
    if (filterDate) {
      result = result.filter((d) => d.date.slice(0, 10) === filterDate);
    }
    setFiltered(result);
    setCurrentPage(1);
  };

  const totalCategories = filtered.length;
  const totalPages = Math.ceil(totalCategories / categoriesPerPage);
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filtered.slice(indexOfFirstCategory, indexOfLastCategory);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = (id: string) => {
    setDepenses((prev) => prev.filter((d) => d.id !== id));
    setFiltered((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="animate-spin h-16 w-16 text-[#4895b7]" />
        </div>
      ) : (
        <>
          <div className="flex h-16 bg-white p-9 mb-1 justify-between items-center gap-3.5">
            <div className="flex items-center gap-2">
              <Input
                type="date"
                placeholder="Filtrer par date"
                className="w-48"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyFilter()}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                className="bg-green-950 cursor-pointer flex items-center"
                onClick={applyFilter}
              >
                Appliquer
              </Button>
              <Dialog open={opens} onOpenChange={setOpens}>
                <DialogTrigger asChild>
                  <Button className="bg-[#4895b7] flex items-center">
                    Ajouter
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <AddExpense onClosed={() => setOpens(false)} />
              </Dialog>
            </div>
          </div>

          <Table className="border border-gray-200">
            <TableHeader className="border border-gray-200">
              <TableRow className="border-none">
                <TableHead className="font-medium text-[#1e1e2f] text-base">Date</TableHead>
                <TableHead className="font-medium text-[#1e1e2f] text-base">Rubrique</TableHead>
                <TableHead className="font-medium text-[#1e1e2f] text-base">Montant</TableHead>
                <TableHead className="font-medium text-[#1e1e2f] text-base">Libelle</TableHead>
                <TableHead className="font-medium text-[#1e1e2f] text-base">Fournisseur</TableHead>
                <TableHead className="font-medium text-[#1e1e2f] text-base">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border border-gray-200">
              {currentCategories.length > 0 ? (
                currentCategories.map((depense) => (
                  <TableRow key={depense.id} className="border border-gray-200">
                    <TableCell className="text-gray-700">{depense.date}</TableCell>
                    <TableCell className="text-gray-700">{depense.rubriqueName}</TableCell>
                    <TableCell className="text-gray-700">
                      {depense.amount} {depense.devise}
                    </TableCell>
                    <TableCell className="text-gray-700">{depense.libelle}</TableCell>
                    <TableCell className="text-gray-700">{depense.supplierName}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-center gap-2">
                        <DeleteExpense id={depense.id} onDeletes={handleDelete} />
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedDepenseId(depense.id);
                            setOpen(true);
                          }}
                          className="flex items-center border border-gray-100"
                        >
                          <Edit className="h-5 w-5 text-[#1e1e2f]" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <div className="flex flex-col items-center">
                      <img
                        src="/undraw_no-data_ig65.svg"
                        className="w-48 h-48 mb-4"
                        alt="No data"
                      />
                      Aucune dépense trouvée pour cette date.
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogTitle>Modifier la dépense</DialogTitle>
              {selectedDepenseId && (
                <UpdatedExpense
                  id={selectedDepenseId}
                  onClose={() => setOpen(false)}
                  onUpdate={fetchDepenses}
                />
              )}
            </DialogContent>
          </Dialog>

          <div className="flex justify-center mt-2">
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

// "use client";
// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
// import { Button } from "@/components/ui/button";

// export default function PrintExpensesButton({ expenses }: { expenses: any[] }) {
//   const handlePrint = async () => {
//     // 1. Créer un PDF
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([600, 800]);
//     const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//     const { height } = page.getSize();

//     page.drawText("Rapport de Dépenses", {
//       x: 50,
//       y: height - 50,
//       size: 20,
//       font,
//       color: rgb(0, 0, 0),
//     });

//     let y = height - 100;
//     expenses.forEach((exp, index) => {
//       page.drawText(`${index + 1}. ${exp.title} - ${exp.amount} $`, {
//         x: 50,
//         y,
//         size: 12,
//         font,
//       });
//       y -= 20;
//     });

//     // 2. Convertir en Blob
//     const pdfBytes = await pdfDoc.save();
//     const blob = new Blob([pdfBytes], { type: "application/pdf" });

//     // 3. Ouvrir le PDF dans un nouvel onglet
//     const url = URL.createObjectURL(blob);
//     const newWindow = window.open(url);

//     // 4. Déclencher la boîte de dialogue d’impression
//     if (newWindow) {
//       newWindow.onload = () => {
//         newWindow.focus();
//         newWindow.print();
//       };
//     }
//   };

//   return (
//     <Button onClick={handlePrint}>
//       Imprimer les dépenses
//     </Button>
//   );
// }
