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
// import DeletePopupCategory from "@/components/deletePopupCategory";
import { Dialog, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
// import AddCategory from "@/components/AddCategory_popup";
import Pagination from "@/components/pagination";
import { Trash, Edit } from "lucide-react";
import AddExpense from "@/components/popups/addNews/addExpense";
import UpdatedExpense from "@/components/popups/updateContent/updateExpense";
import DeleteExpense from "@/components/popups/deleteContent/deleteExpense";
// import UpdatedCategory from "@/components/updateCategory";

interface ItemsDepense {
  id: string;
  date: string;
  libelle: string;
  rubrique: string;
  beneficiaire: string;
  amount: string;
  supplier: string;
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
export default function listeDepenses() {
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [depenses, setDepenses] = useState<ItemsDepense[]>([]);
  const [suppliers, setSuppliers] = useState<ItemsSuplier[]>([]);
  const [projects, setProjects] = useState<ItemsProject[]>([]);
  const [services, setServices] = useState<ItemsService[]>([]);
  const [rubriques, setRubriques] = useState<ItemsRubrique[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(7);
  const [selectedDepenseId, setSelectedDepenseId] = useState<string | null>(null);

  async function fetchDepenses() {
    const res = await fetch("/api/expenses");
    const resulta = await res.json();

    if (!resulta || !Array.isArray(resulta.data)) {
      console.error("Structure inattendue:", resulta);
      setDepenses([]);
      setRubriques([]);
      setServices([]);
      setProjects([]);
      setSuppliers([]);
      return;
    }
    setDepenses(resulta.data);
    setRubriques(resulta.rubriques);
    setServices(resulta.services);
    setProjects(resulta.projects);
    setSuppliers(resulta.suppliers);
  }

  useEffect(() => {
    fetchDepenses();

    const handleExpenseAdded = () => {
      fetchDepenses();
    };

    window.addEventListener("expenseAdded", handleExpenseAdded);

    return () => {
      window.removeEventListener("expenseAdded", handleExpenseAdded);
    };
  }, []);

  const totalCategories = depenses.length;
  const totalPages = Math.ceil(totalCategories / categoriesPerPage);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = depenses.slice(indexOfFirstCategory, indexOfLastCategory);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (id: string) => {
    setDepenses((prev) => prev.filter((depense) => depense.id !== id));
  };

  return (
    <>
      <div className="flex h-16 bg-white p-9 mb-1 justify-between items-center gap-3.5">
        <div className="flex justifyßß-center items-center gap-2">
          <Input type="category" className="w-70" placeholder="Filtrer par nom de categorie" />
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button className="bg-green-950 cursor-pointer flex items-center">Appliquer</Button>
          <Dialog open={opens} onOpenChange={setOpens}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 cursor-pointer flex items-center">
                Ajouter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <AddExpense onClosed={() => setOpens(false)} />
          </Dialog>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium">Date</TableHead>
            <TableHead className="font-medium">Rubrique</TableHead>
            <TableHead className="font-center">Montant</TableHead>
            <TableHead className="font-medium">Libelle</TableHead>
            <TableHead className="text-right font-medium">Beneficiaire</TableHead>
            <TableHead className="text-right font-medium">Fournisseur</TableHead>
            <TableHead className="text-center">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentCategories && currentCategories.length > 0 ? (
            currentCategories.map((depense) => (
              <TableRow key={depense.id}>
                <TableCell>{depense.date}</TableCell>
                <TableCell className="text-left">{depense.rubrique}</TableCell>
                <TableCell className="text-left">{depense.amount}</TableCell>
                <TableCell className="text-left">{depense.libelle}</TableCell>
                <TableCell className="text-left">{depense.beneficiaire}</TableCell>
                <TableCell className="text-left">{depense.supplier}</TableCell>
                <TableCell className="text-right">
                  <div className="text-center flex items-center justify-center gap-2">
                    {/* <Button
                                            variant="outline"
                                                              onClick={() => {
                                                                setSelectedDepenseId(depense.id);
                                                                setOpen(true);
                                                              }}
                                                              className="flex items-center cursor-pointer space-x-2"
                                                            >
                                                              <Trash className="h-5 w-5 text-red-500" />
                                                            </Button> */}
                    <DeleteExpense id={depense.id} onDeletes={handleDelete} />
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedDepenseId(depense.id);
                        setOpen(true);
                      }}
                      className="flex items-center cursor-pointer space-x-2"
                    >
                      <Edit className="h-5 w-5 text-blue-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Aucune depense trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Modifier la depense</DialogTitle>
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
        {depenses.length > 10 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
}
