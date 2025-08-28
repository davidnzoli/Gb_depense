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
import AddExpense from "@/components/popups/addNews/addExpense";
import AddService from "@/components/popups/addNews/addService";
import AddSupplier from "@/components/popups/addNews/addSupplier";
// import UpdatedCategory from "@/components/updateCategory";
import { Trash, Edit, Inbox, Loader2, Pencil, Eye } from "lucide-react";

interface ItemsFournisseur {
  id: string;
  name: string;
  contact: string;
  email: string;
  nationalite: string;
  createdAt: string;
}

export default function ListeFouirnisseurs() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [fournisseur, setFournisseur] = useState<ItemsFournisseur[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(7);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const totalCategories = fournisseur.length;
  const totalPages = Math.ceil(totalCategories / categoriesPerPage);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = fournisseur.slice(indexOfFirstCategory, indexOfLastCategory);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [allUsers, setAllUsers] = useState(fournisseur);

  const handleDelete = (id: string) => {
    setAllUsers((prev) => prev.filter((fournisseur) => fournisseur.id !== id));
  };

  async function fetchServices() {
    setLoading(true);
    const res = await fetch("/api/suppliers");
    const resulta = await res.json();
    setFournisseur(resulta.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchServices();

    const handleExpenseAdded = () => {
      fetchServices();
    };

    window.addEventListener("expenseAdded", handleExpenseAdded);

    return () => {
      window.removeEventListener("expenseAdded", handleExpenseAdded);
    };
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="animate-spin h-16 w-15 text-[#4895b7]" />
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
                  <Button className="bg-[#4895b7] cursor-pointer flex items-center">
                    Ajouter
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <AddSupplier onClosed={() => setOpens(false)} />
              </Dialog>
            </div>
          </div>
          <Table className="border border-gray-200">
            <TableHeader className="border border-gray-200">
              <TableRow className="border-none">
                <TableHead className="font-medium">Id</TableHead>
                <TableHead className="font-medium"> Email</TableHead>
                <TableHead className="font-medium"> Phone</TableHead>
                <TableHead className="font-center">Creation</TableHead>
                <TableHead className="text-center">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="border border-gray-200">
              {currentCategories && currentCategories.length > 0 ? (
                currentCategories.map((fournisseur) => (
                  <TableRow key={fournisseur.id} className="border border-gray-200">
                    <TableCell>{fournisseur.id}</TableCell>
                    <TableCell className="text-left">{fournisseur.email}</TableCell>
                    <TableCell className="text-left">{fournisseur.contact}</TableCell>
                    <TableCell className="text-left">{fournisseur.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="text-center flex items-center justify-center gap-2">
                        {/* <DeletePopupCategory
                      categoryId={categorie.id}
                      onDeletes={handleDelete}
                    /> */}

                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedServiceId(fournisseur.id);
                            setOpen(true);
                          }}
                          className="flex items-center cursor-pointer border-gray-100 space-x-2"
                        >
                          <Edit className="h-5 w-5 text-[#1e1e2f]" />
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedServiceId(fournisseur.id);
                            setOpen(true);
                          }}
                          className="flex items-center cursor-pointer border-gray-100 space-x-2"
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
            {fournisseur.length > 10 && (
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
