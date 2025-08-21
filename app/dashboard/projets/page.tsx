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
import { useParams } from "next/navigation";

interface ItemsProjects {
  id: string;
  name: string;
  description: string;
  serviceId: string;
  clients: string;
  userId: string;
  serviceName: string | null;
  location: string;
  status: string;
}

export default function listeProject() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [Projects, setProjects] = useState<ItemsProjects[]>([]);
  const [ProjectsId, setProjectsId] = useState<ItemsProjects[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(2);
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
            <Table className="border border-gray-200">
              <TableHeader className="border border-gray-200">
                <TableRow className="border-none">
                  <TableHead className="font-medium text-[#1e1e2f] text-base">
                    Nom de projet
                  </TableHead>
                  <TableHead className="font-medium text-[#1e1e2f] text-base">Service</TableHead>
                  <TableHead className="font-medium text-[#1e1e2f] text-base">
                    Nom du client
                  </TableHead>
                  <TableHead className="font-medium text-[#1e1e2f] text-base">
                    État du projet
                  </TableHead>
                  <TableHead className="text-center text-[#1e1e2f] text-base">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="border border-gray-200">
                {currentCategories && currentCategories.length > 0 ? (
                  currentCategories.map((projet) => (
                    <TableRow key={projet.id} className="border border-gray-200">
                      <TableCell>{projet.name}</TableCell>
                      <TableCell className="text-left">{projet.serviceName}</TableCell>
                      <TableCell className="text-left">{projet.clients}</TableCell>
                      <TableCell className="text-left">{projet.status}</TableCell>
                      <TableCell className="text-right">
                        <div className="text-center flex items-center justify-center space-x-2">
                          <DeleteExpense id={projet.id} onDeletes={handleDelete} />
                          <Link href={`/dashboard/projets/${projet.id}`}>
                            <Button
                              variant="outline"
                              className="flex items-center border-1 border-gray-100 cursor-pointer"
                            >
                              <Eye className="h-5 w-5 text-green-500" />
                            </Button>
                          </Link>

                          <Button
                            variant="outline"
                            className="flex items-center cursor-pointer border-1 border-gray-100"
                          >
                            <Pencil className="h-5 w-5 text-[#1e1e2f]" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <>
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10">
                        <div className="flex flex-col justify-center items-center text-[#1e1e2f] text-base">
                          <img
                            src="/undraw_no-data_ig65.svg"
                            className="w-48 h-48 mb-4"
                            alt="svg-no-data"
                          />
                          Aucun projet trouvé dans cette table, veuillez ajouter un <br /> projet
                          puis vérifier après !
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
             <div className="flex w-[100%] mt-2">
              {Projects.length > 2 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
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
           
          </>
        )}
      </div>
    </>
  );
}
