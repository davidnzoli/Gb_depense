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
import { Trash, Edit } from "lucide-react";
import AddExpense from "@/components/popups/addNews/addExpense";
import AddService from "@/components/popups/addNews/addService";
import AddSupplier from "@/components/popups/addNews/addSupplier";
import AddRubrique from "@/components/popups/addNews/addRubrique";

interface ItemsRibrique {
  id: string;
  name    :  string
  createdAt:string
}

export default function ListeRubrique() {
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
    const [depenses, setDepenses] = useState<ItemsRibrique[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(7);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );

  


  // const totalCategories = depenses.length;
  const totalCategories = depenses?.length ?? 0;
  const totalPages = Math.ceil(totalCategories / categoriesPerPage);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = depenses.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [allUsers, setAllUsers] = useState(depenses);

  const handleDelete = (id: string) => {
    setAllUsers((prev) => prev.filter((rubrique) => rubrique.id !== id));
  };

 async function fetchRubrique() {
      

       try {
         const res = await fetch("/api/rubriques");
      const resulta = await res.json();
     

      if (!resulta || !Array.isArray(resulta.data)) {
        console.error("Structure inattendue:", resulta);
        setDepenses([]);
        return;
      }
       setDepenses(resulta.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des service:", error);
          setDepenses([]);
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
      <div className="flex h-16 bg-white p-9 mb-1 justify-between items-center gap-3.5">
        <div className="flex justifyßß-center items-center gap-2">
          <Input
            type="text"
            className="w-70"
            placeholder="Filtrer par le email de fournisseur"
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button className="bg-green-950 cursor-pointer flex items-center">
            Appliquer
          </Button>
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium">Rubrique</TableHead>
            <TableHead className="text-center">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentCategories && currentCategories.length > 0 ? (
            currentCategories.map((rubrique) => (
              <TableRow key={rubrique.id}>
                <TableCell className="text-left">
                  {rubrique.name}
                </TableCell>
                <TableCell className="text-right">
                  <div className="text-center flex items-center justify-center gap-2">
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
                      className="flex items-center cursor-pointer space-x-2"
                    >
                      <Edit className="h-5 w-5 text-blue-500" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedServiceId(rubrique.id);
                        setOpen(true);
                      }}
                      className="flex items-center cursor-pointer space-x-2"
                    >
                      <Trash className="h-5 w-5 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Aucune rubrique trouvée
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}