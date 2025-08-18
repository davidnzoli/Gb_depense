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
      <div className="flex h-16 bg-white p-9 mb-1 justify-between items-center gap-3.5">
        <h1>JUIS MOI</h1>
      </div>
    </>
  );
}
