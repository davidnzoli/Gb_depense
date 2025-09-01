import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // const { id } = params;

    const { searchParams, pathname } = new URL(request.url);
    const pathParts = pathname.split("/");
    const id = pathParts[pathParts.indexOf("projects") + 1]; // récupère l'id entre 'projects' et 'documents'

    if (!id) {
      return NextResponse.json({ error: "Project ID missing" }, { status: 400 });
    }

    // Récupérer toutes les dépenses liées au projet
    const expenses = await prisma.expense.findMany({
      where: { projectId: id },
      select: {
        id: true,
        libelle: true,
        beneficiaire: true,
        devise: true,
        amount: true,
        date: true,
        createdAt: true,
        updatedAt: true,
        service: { select: { name: true } },
        rubrique: { select: { name: true } },
        supplier: { select: { email: true } },
        project: { select: { name: true } },
        user: { select: { name: true } },
      },
    });

    const formatted = expenses.map((e) => ({
      ...e,
      rubriqueName: e.rubrique?.name || null,
      serviceName: e.service?.name || null,
      supplierName: e.supplier?.email || null,
      projectName: e.project?.name || null,
      userName: e.user?.name || null,
      service: undefined,
      supplier: undefined,
      project: undefined,
      user: undefined,
      rubrique: undefined,
    }));

    return NextResponse.json({
      success: true,
      message: "Liste des dépenses récupérée avec succès.",
      data: formatted,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des dépenses :", error);
    return NextResponse.json({ error: "Impossible de récupérer les dépenses" }, { status: 500 });
  }
}
