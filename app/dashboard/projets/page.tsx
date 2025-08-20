"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { Trash, Edit, Inbox, Loader2, Pencil, Eye } from "lucide-react";
import AddExpense from "@/components/popups/addNews/addExpense";
import UpdatedExpense from "@/components/popups/updateContent/updateExpense";
import DeleteExpense from "@/components/popups/deleteContent/deleteExpense";
import AddProject from "@/components/popups/addNews/addProject";
import Router from "next/router";
import Link from "next/link";

interface ItemsProjects {
  id: string;
  name: string;
  description: string;
  serviceId: string;
  clients: string;
  userId: string;
  location: string;
  status: string;
}

export default function listeProject() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [Projects, setProjects] = useState<ItemsProjects[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(7);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);


  async function fetchProjects() {
    setLoading(true);
    const res = await fetch("/api/projects");
    const resulta = await res.json();

    if (!resulta || !Array.isArray(resulta.data)) {
      setProjects([]);
      return;
    }
    setProjects(resulta.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProjects();

    const handleProjectAdded = () => {
      fetchProjects();
    };

    window.addEventListener("expenseAdded", handleProjectAdded);

    return () => {
      window.removeEventListener("expenseAdded", handleProjectAdded);
    };
  }, []);

  const totalCategories = Projects.length;
  const totalPages = Math.ceil(totalCategories / categoriesPerPage);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = Projects.slice(indexOfFirstCategory, indexOfLastCategory);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

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
                <Input type="category" className="w-70" placeholder="Filtrer par nom de projet" />
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
                  <AddProject onClosed={() => setOpens(false)} />
                </Dialog>
              </div>
            </div>
            {currentCategories && currentCategories.length > 0 ? (
              currentCategories.map((projet) => (
                <Table key={projet.id}>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-medium text-[#1e1e2f] text-base">
                        Nom de projet
                      </TableHead>
                      <TableHead className="font-medium text-[#1e1e2f] text-base">
                        Service
                      </TableHead>
                      <TableHead className="font-center text-[#1e1e2f] text-base">
                        Description
                      </TableHead>
                      <TableHead className="font-medium text-[#1e1e2f] text-base">
                        Nom du client
                      </TableHead>
                      <TableHead className="font-medium text-[#1e1e2f] text-base">
                        État du projet
                      </TableHead>
                      <TableHead className="text-center text-[#1e1e2f] text-base">
                        ACTIONS
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow key={projet.id}>
                      <TableCell>{projet.name}</TableCell>
                      <TableCell className="text-left">{projet.serviceId}</TableCell>
                      <TableCell className="text-left">{projet.description}</TableCell>
                      <TableCell className="text-left">{projet.clients}</TableCell>
                      <TableCell className="text-left">{projet.status}</TableCell>
                      <TableCell className="text-right">
                        <div className="text-center flex items-center justify-center space-x-2">
                          <DeleteExpense id={projet.id} onDeletes={handleDelete} />
                          <Link href="./components_completeData/projets">
                           <Button
                            variant="outline"
                            className="flex items-center cursor-pointer"
                          >
                            <Eye className="h-5 w-5 text-blue-800" />
                          </Button>
                          </Link>
                         
                          <Button
                            variant="outline"
                           
                            className="flex items-center cursor-pointer"
                          >
                            <Pencil className="h-5 w-5 text-blue-800" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ))
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="text-[#1e1e2f]">
                      <TableHead className="font-medium text-[#1e1e2f] text-base">
                        Nom de projet
                      </TableHead>
                      <TableHead className="font-medium text-[#1e1e2f] text-base">
                        Service
                      </TableHead>
                      <TableHead className="font-center text-[#1e1e2f] text-base">
                        Description
                      </TableHead>
                      <TableHead className="font-medium text-[#1e1e2f] text-base">
                        Nom du client
                      </TableHead>
                      <TableHead className="font-medium text-[#1e1e2f] text-base">
                        Nom du client
                      </TableHead>
                      <TableHead className="font-medium text-[#1e1e2f] text-base">
                        Nom du client
                      </TableHead>
                      <TableHead className="font-medium text-[#1e1e2f] text-base">
                        État du projet
                      </TableHead>
                      <TableHead className="text-center text-[#1e1e2f] text-base">
                        ACTIONS
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                </Table>
                <div className="flex flex-col justify-center text-center text-[#1e1e2f] text-base items-center mt-56">
                  <img src="/undraw_no-data_ig65.svg" className="w-48 h-48" alt="svg-no-data" />
                  Aucun projet trouvé dans cette table, Veuillez ajouter un <br /> projets puis
                  verifiez après !
                </div>
              </>
            )}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogTitle>Modifier la projects</DialogTitle>
                {selectedProjectId && (
                  <UpdatedExpense
                    id={selectedProjectId}
                    onClose={() => setOpen(false)}
                    onUpdate={fetchProjects}
                  />
                )}
              </DialogContent>
            </Dialog>
            <div className="flex justify-center mt-2">
              {Projects.length > 10 && (
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
