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

export default function projectSetting() {
  return (
    <>
      <div className="flex flex-col h-full bg-white p-8 mb-1 justify-between w-[100%] items-start gap-8 text-gray-500 font-medium">
        <div className="flex w-[100%]  pb-3 justify-between items-start text-center">
          <h1 className="font-extrabold text-start w-[50%] text-3xl text-[#1e1e2f]">
            Parametre de projet intitule : <span className="text-[#1e1e2f]">Nom du projet</span>
          </h1>
          <h1 className="font-extrabold text-[#1e1e2f]">
            {" "}
            Table de bord/ <span className="text-green-500 font-medium">Settings project</span>
          </h1>
        </div>
        <div className="w-[100%] flex flex-col border-0.5 shadow-md bg-white border-gray-300 border-r-8 rounded-2xl ">
          <div className="flex flex-col gap-0.2 w-[100.1%] p-9 border-b-1 border-gray-100 bg-[#f2f2f5] rounded-t-2xl border-b-gray">
            <h1 className="text-2xl font-bold text-[#1e1e2f]">H1 NAME PPROJET</h1>
            <h1 className="font-normal">Information PPROJET de fibre optique</h1>
          </div>
          <div className="flex flex-row justify-start items-center space-x-60 p-5 border-gray-100 border-b-1 border-b-gray">
            <h1>H1 NAME PPROJET</h1>
            <h1>Information PPROJET de fibre optique</h1>
          </div>
          <div className="flex flex-row space-x-60 bg-green-50 p-5 border-b-1 border-gray-100 border-b-gray">
            <h1>H1 NAME PPROJET</h1>
            <h1>Information PPROJET de fibre optique</h1>
          </div>
          <div className="flex flex-row space-x-60 p-5 border-b-1 border-gray-100 border-b-gray">
            <h1>H1 NAME PPROJET</h1>
            <h1>Information PPROJET de fibre optique</h1>
          </div>
          <div className="flex flex-row gap-4 p-8 justify-start items-center bg-[#fbfbfb] rounded-b-2xl text-center ">
            <h1 className="mr-56">Action rapides</h1>
            <Button
              type="button"
              variant="outline"
              className="text-white cursor-pointer p-5 bg-[#1e1e2f]  hover:bg-white hover:text-green-500 hover:border-green-500"
            >
              Configuration1
            </Button>
            <Button
              type="button"
              variant="outline"
              className="text-white cursor-pointer p-5 bg-green-500 hover:bg-white hover:text-green-500 hover:border-green-500"
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
