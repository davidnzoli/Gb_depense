import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categorie = await prisma.service.findMany();

    return NextResponse.json(
      {
        success: true,
        message: "Liste des services récupérée avec succès.",
        data: categorie,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des services :", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur. Impossible de récupérer les services.",
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
    const newExpense = await prisma.service.create({
      data: {
        name: body.name || null,
        companyId : body.compagnyId || null 
      },
    });

    return NextResponse.json(newExpense, {status: 201});
  } catch (error) {
    console.error("❌ Erreur lors de la création :", error);
    return NextResponse.json(
      { error: "Erreur lors de l'ajout de service." },
      { status: 500 }
    );
  }
}
