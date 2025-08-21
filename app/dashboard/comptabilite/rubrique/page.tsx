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
import { ArrowRight } from "lucide-react";
import Pagination from "@/components/pagination";
import { Trash, Edit, Loader2 } from "lucide-react";
import AddExpense from "@/components/popups/addNews/addExpense";
import AddService from "@/components/popups/addNews/addService";
import AddSupplier from "@/components/popups/addNews/addSupplier";
import AddRubrique from "@/components/popups/addNews/addRubrique";

interface ItemsRubrique {
  id: string;
  name: string;
  createdAt: string;
}

export default function ListeRubrique() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [rubriques, setRubrique] = useState<ItemsRubrique[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(7);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  // const totalCategories = depenses.length;
  const totalCategories = rubriques?.length ?? 0;
  const totalPages = Math.ceil(totalCategories / categoriesPerPage);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = rubriques.slice(indexOfFirstCategory, indexOfLastCategory);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [allUsers, setAllUsers] = useState(rubriques);

  const handleDelete = (id: string) => {
    setAllUsers((prev) => prev.filter((rubrique) => rubrique.id !== id));
  };

  async function fetchRubrique() {
    setLoading(true);
    try {
      const res = await fetch("/api/rubriques");
      const resulta = await res.json();

      if (!resulta || !Array.isArray(resulta.data)) {
        // console.error("Structure inattendue:", resulta);
        setRubrique([]);
        return;
      }
      setRubrique(resulta.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des service:", error);
      setRubrique([]);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchRubrique();

    const handleExpenseAdded = () => {
      fetchRubrique();
    };

    window.addEventListener("expenseAdded", handleExpenseAdded);

    return () => {
      window.removeEventListener("expenseAdded", handleExpenseAdded);
    };
  }, []);

  return (
    <>
      <div className="justify-center  items-center w-[100%] h-full">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin h-16 w-15 text-green-500" />
          </div>
        ) : (
          <>
            <div className="flex h-16 bg-white p-9 mb-1 justify-between items-center gap-3.5">
              <div className="flex justifyßß-center items-center gap-2">
                <Input
                  type="text"
                  className="w-70"
                  placeholder="Filtrer par le email de fournisseur"
                />
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
                  <AddRubrique onClosed={() => setOpens(false)} />
                </Dialog>
              </div>
            </div>
            <Table className="border border-gray-200">
              <TableHeader className="border border-gray-200">
                <TableRow className="border-none">
                  <TableHead className="font-medium">Rubrique</TableHead>
                  <TableHead className="text-right">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border border-gray-200">
                {currentCategories && currentCategories.length > 0 ? (
                  currentCategories.map((rubrique) => (
                    <TableRow key={rubrique.id} className="border border-gray-200">
                      <TableCell className="text-left">{rubrique.name}</TableCell>
                      <TableCell className="text-right">
                        <div className="text-right flex items-rigth justify-end gap-2">
                          {/* <DeletePopupCategory
                      categoryId={categorie.id}
                      onDeletes={handleDelete}
                    /> */}

                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedServiceId(rubrique.id);
                              setOpen(true);
                            }}
                            className="flex items-center cursor-pointer border-1 border-gray-100 space-x-2"
                          >
                            <Edit className="h-5 w-5 text-[#1e1e2f]" />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedServiceId(rubrique.id);
                              setOpen(true);
                            }}
                            className="flex items-center cursor-pointer border-1 border-gray-100 space-x-2"
                          >
                            <Trash className="h-5 w-5 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      <div className="flex flex-col justify-center items-center text-[#1e1e2f] text-base">
                        <img
                          src="/undraw_no-data_ig65.svg"
                          className="w-48 h-48 mb-4"
                          alt="svg-no-data"
                        />
                        Aucun projet trouvé dans cette table, veuillez ajouter un <br /> projet puis
                        vérifier après !
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <Dialog open={open} onOpenChange={setOpen}>
              {/* <DialogContent>
          <DialogTitle>Modifier la depense</DialogTitle>
          {selectedCategoryId && (
            <UpdatedCategory
              categoryId={selectedCategoryId}
              onClose={() => setOpen(false)}
              onUpdate={fetchCategories}
            />
          )}
        </DialogContent> */}
            </Dialog>
            <div className="flex justify-center mt-2">
              {setRubrique.length > 10 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
