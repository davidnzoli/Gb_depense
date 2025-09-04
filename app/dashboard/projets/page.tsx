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
import { ArrowRight, Loader2, Eye, Pencil } from "lucide-react";
import Pagination from "@/components/pagination";
import DeleteExpense from "@/components/popups/deleteContent/deleteExpense";
import UpdatedExpense from "@/components/popups/updateContent/updateExpense";
import AddProject from "@/components/popups/addNews/addProject";
import Link from "next/link";

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

export default function ListeProject() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [opens, setOpens] = React.useState(false);
  const [Projects, setProjects] = useState<ItemsProjects[]>([]);
  const [filtered, setFiltered] = useState<ItemsProjects[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(7);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);


  const [filterProjectName, setFilterProjectName] = useState<string>("");
  const [filterClientName, setFilterClientName] = useState<string>("");


  async function fetchProjects() {
    setLoading(true);
    const res = await fetch("/api/projects");
    const resulta = await res.json();

    if (!resulta || !Array.isArray(resulta.data)) {
      setProjects([]);
      setFiltered([]);
      setLoading(false);
      return;
    }
    setProjects(resulta.data);
    setFiltered(resulta.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProjects();

    const handleProjectAdded = () => fetchProjects();
    window.addEventListener("expenseAdded", handleProjectAdded);

    return () => {
      window.removeEventListener("expenseAdded", handleProjectAdded);
    };
  }, []);


  const applyFilter = () => {
    let result = Projects;

    if (filterProjectName) {
      result = result.filter((p) => p.name.toLowerCase().includes(filterProjectName.toLowerCase()));
    }

    if (filterClientName) {
      result = result.filter((p) =>
        p.clients.toLowerCase().includes(filterClientName.toLowerCase())
      );
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
    setProjects((prev) => prev.filter((project) => project.id !== id));
    setFiltered((prev) => prev.filter((project) => project.id !== id));
  };

  return (
    <div className="justify-center items-center w-full h-full">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="animate-spin h-16 w-15 text-[#4895b7]" />
        </div>
      ) : (
        <>
          {/* Filtres */}
          <div className="w-[100%] flex lg:h-16 h-32 bg-white lg:p-9 p-2 mb-1 justify-between items-center gap-2 lg:gap-3.5">
            <div className="flex lg:flex-row flex-col justify-center items-center gap-2">
              <Input
                type="text"
                placeholder="Filtrer par nom de projet"
                className="lg:w-70 w-60"
                value={filterProjectName}
                onChange={(e) => setFilterProjectName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") applyFilter();
                }}
              />
              <Input
                type="text"
                placeholder="Filtrer par nom du client"
                className="lg:w-70 w-60"
                value={filterClientName}
                onChange={(e) => setFilterClientName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") applyFilter();
                }}
              />
              
            </div>

            <div className="flex lg:flex-row flex-col justify-center items-center gap-2">
              <Button
                className="bg-[#1e1e2f] cursor-pointer flex items-center"
                onClick={applyFilter}
              >
                Appliquer
              </Button>
              <Dialog open={opens} onOpenChange={setOpens}>
                <DialogTrigger asChild>
                  <Button className="bg-[#4895b7] cursor-pointer flex items-center">
                    Ajouter
                    <ArrowRight className="  lg:ml-2 h-4 lg:w-4 w-3" />
                  </Button>
                </DialogTrigger>
                <AddProject onClosed={() => setOpens(false)} />
              </Dialog>
            </div>
          </div>

          {/* Tableau */}
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
              {currentCategories.length > 0 ? (
                currentCategories.map((projet) => (
                  <TableRow key={projet.id} className="border border-gray-200">
                    <TableCell className="text-gray-700">{projet.name}</TableCell>
                    <TableCell className="text-left text-gray-700">{projet.serviceName}</TableCell>
                    <TableCell className="text-left text-gray-700">{projet.clients}</TableCell>
                    <TableCell className="text-left text-gray-700">{projet.status}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-center space-x-2">
                        <DeleteExpense id={projet.id} onDeletes={handleDelete} />
                        <Link href={`/dashboard/projets/${projet.id}`}>
                          <Button
                            variant="outline"
                            className="flex items-center border-1 border-gray-100"
                          >
                            <Eye className="h-5 w-5 text-[#4895b7]" />
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
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <div className="flex flex-col justify-center items-center text-[#1e1e2f] text-base">
                      <img
                        src="/undraw_no-data_ig65.svg"
                        className="w-48 h-48 mb-4"
                        alt="svg-no-data"
                      />
                      Aucun projet trouvé dans cette table, veuillez ajouter un projet puis vérifier
                      après !
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {filtered.length > categoriesPerPage && (
            <div className="flex w-full mt-2">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          {/* Popup de modification */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogTitle>Modifier le projet</DialogTitle>
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
  );
}
