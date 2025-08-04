import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categorie = await prisma.expense.findMany();

    return NextResponse.json(
      {
        success: true,
        message: "Liste des depenses récupérée avec succès.",
        data: categorie,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des depenses :", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur. Impossible de récupérer les depenses.",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("reponse a la requete :", body)
    const newExpense = await prisma.expense.create({
      data: {
        libelle: body.libelle || null,
        rubrique: body.rubrique || null,
        beneficiaire: body.beneficiaire || null,
        amount: parseFloat(body.amount),
        userId: body.userId || null,
        supplierId: body.supplierId || null,
        projectId: body.projectId || null,
        serviceId: body.serviceId || null,
      },
    });

    return NextResponse.json(newExpense, {status: 201});
  } catch (error) {
    console.error("❌ Erreur lors de la création :", error);
    return NextResponse.json(
      { error: "Erreur lors de l'ajout de dépense." },
      { status: 500 }
    );
  }
}

