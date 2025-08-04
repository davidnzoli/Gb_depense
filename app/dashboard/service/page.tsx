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
import AddService from "@/components/popups/addNews/addService";
// import UpdatedCategory from "@/components/updateCategory";

interface ItemsService {
  id: string;
  name   :   string;
  companyId  : string; 
  createdAt:string
}

export default function lIsteservice() {
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [services, setServices] = useState<ItemsService[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(7);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );

  



  const totalCategories = services.length;
  const totalPages = Math.ceil(totalCategories / categoriesPerPage);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = services.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [allUsers, setAllUsers] = useState(services);

  const handleDelete = (id: string) => {
    setAllUsers((prev) => prev.filter((service) => service.id !== id));
  };

  async function fetchServices() {
      const res = await fetch("/api/services");
      const resulta = await res.json();
      setServices(resulta.data);
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
      <div className="flex h-16 bg-white p-9 mb-1 justify-between items-center gap-3.5">
        <div className="flex justifyßß-center items-center gap-2">
          <Input
            type="text"
            className="w-70"
            placeholder="Filtrer par nom des services"
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
            <AddService onClosed={() => setOpens(false)} />
          </Dialog>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium">Id</TableHead>
            <TableHead className="font-medium">service</TableHead>
            <TableHead className="font-center">Creation</TableHead>
            <TableHead className="text-center">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentCategories && currentCategories.length > 0 ? (
            currentCategories.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.id}</TableCell>
                <TableCell className="text-left">
                  {service.name}
                </TableCell>
                <TableCell className="text-left">
                  {service.createdAt}
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
                        setSelectedServiceId(service.id);
                        setOpen(true);
                      }}
                      className="flex items-center cursor-pointer space-x-2"
                    >
                      <Edit className="h-5 w-5 text-blue-500" />
                    </Button>
                    <Button
                        variant="outline"
                                          onClick={() => {
                                            setSelectedServiceId(service.id);
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
                Aucune depense trouvée
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