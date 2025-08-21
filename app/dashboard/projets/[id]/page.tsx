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
import { Trash, Edit, Pencil, Eye } from "lucide-react";
import AddExpense from "@/components/popups/addNews/addExpense";
import UpdatedExpense from "@/components/popups/updateContent/updateExpense";
import DeleteExpense from "@/components/popups/deleteContent/deleteExpense";
import AddProject from "@/components/popups/addNews/addProject";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface ItemsProjects {
  id: string;
  name: string;
  description: string;
  serviceName?: string | null;
  userName?: string | null;
  clients: string;
  location: string;
  status: string;
}

export default function projectSetting() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<ItemsProjects | null>(null);
  const { id } = useParams<{ id: string }>();

  async function fetchProjectId(id: string) {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Erreur lors de la récupération");

      const data = await res.json();
      setProjects(data);
      return data;
    } catch (error) {
      console.error("Erreur de récupération :", error);
      return null;
    }
  }

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
  return (
    <>
      <div className="flex flex-col h-full bg-white p-8 mb-1 justify-between w-[100%] items-start gap-8 text-gray-500 font-medium">
        <div className="flex w-[100%]  pb-3 justify-between items-start text-center">
          {projects && (
            <>
              <h1 className="font-extrabold text-start w-[50%] text-3xl text-[#1e1e2f]">
                Parametre de projet intitule :{" "}
                <span className="text-[#1e1e2f] text-2xl">{projects.name}</span>
              </h1>
              <h1 className="font-extrabold text-[#1e1e2f]">
                {" "}
                Table de bord/ <span className="text-green-500 font-medium">Settings project</span>
              </h1>
            </>
          )}
        </div>
        {projects && (
          <>
            <div className="w-[100%] flex flex-col border-0.5 shadow-md bg-white border-gray-300 border-r-8 rounded-2xl ">
              <div className="flex flex-col gap-6 justify-between items-start w-[100.1%] p-6 border-b-1 border-gray-100 bg-[#f2f2f5] rounded-t-2xl border-b-gray">
                <Badge variant="destructive">{projects.status}</Badge>
                <div className="flex flex-col gap-0.2">
                  <h1 className="text-2xl w-xl font-bold text-[#1e1e2f] uppercase">
                    {projects.name}
                  </h1>
                  <h1 className="font-normal lowercase">{projects.serviceName}</h1>
                </div>
              </div>
              <div className="flex flex-row justify-start items-center p-5 border-gray-100 border-b-1 border-b-gray">
                <h1 className="uppercase w-md ">a propos</h1>
                <h1 className="w-3xl">{projects.description}</h1>
              </div>
              <div className="flex flex-row justify-start items-center bg-green-50 p-5 border-b-1 border-gray-100 border-b-gray">
                <h1 className="uppercase w-md">client</h1>
                <h1 className=" w-3xl">{projects.clients}</h1>
              </div>
              <div className="flex flex-row justify-start items-center p-5 border-b-1 border-gray-100 border-b-gray">
                <h1 className="uppercase w-md">pays ou ville</h1>
                <h1 className=" w-3x">{projects.location}</h1>
              </div>
              <div className="border-b-1 border-gray-100 border-b-gray flex flex-row p-5 justify-start items-center bg-[#fbfbfb] rounded-b-2xl  ">
                <h1 className="w-md">Action rapides</h1>
                <Button
                  type="button"
                  variant="outline"
                  className="text-white cursor-pointer mr-10 p-5 bg-[#1e1e2f]  hover:bg-white hover:text-green-500 hover:border-green-500"
                >
                  Configuration1
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="text-white cursor-pointer mr-10 p-5 bg-green-500 hover:bg-white hover:text-green-500 hover:border-green-500"
                >
                  Configuration2
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="text-white cursor-pointer p-5 bg-green-950  hover:bg-white hover:text-green-500 hover:border-green-500"
                >
                  Configuration3
                </Button>
              </div>
            </div>
          </>
        )}

        <div className=" flex flex-row w-[100%] justify-between items-center bg-white gap-3">
          <div className="w-[50%] h-56 border-1 rounded-2xl shadow-md flex flex-row justify-center items-center border-gray-300">
            <h1>BLOC 1</h1>
          </div>
          <div className="w-[50%] h-56 border-1 shadow-md flex rounded-2xl flex-row justify-center items-center border-gray-300">
            <h1>BLOC 2</h1>
          </div>
          <div className="w-[50%] h-56 border-1 shadow-md flex rounded-2xl flex-row justify-center items-center border-gray-300 ">
            <h1>BLOC 3</h1>
          </div>
          <div className="w-[50%] h-56 border-1 shadow-md flex rounded-2xl flex-row justify-center items-center border-gray-300">
            <h1>BLOC 3</h1>
          </div>
        </div>
        <div className="w-[100%] flex flex-col justify-start items-start gap-3">
          <h1>DETAIL SUR LE PROJET</h1>
          <div className="w-[100%] h-96 border-1 border-gray-400 border-dashed p-20 rounded-2xl"></div>
        </div>
      </div>
    </>
  );
}
