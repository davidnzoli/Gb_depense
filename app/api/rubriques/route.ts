import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rubrique = await prisma.rubrique.findMany();

    return NextResponse.json(
      {
        success: true,
        message: "Liste des rubrique récupérée avec succès.",
        data: rubrique,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des rubriques :", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur. Impossible de récupérer les rubriques.",
        error: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("reponse a la requete :", body);
    const newExpense = await prisma.rubrique.create({
      data: {
        name: body.name || null,
      },
    });

    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    console.error("❌ Erreur lors de la création :", error);
    return NextResponse.json({ error: "Erreur lors de l'ajout de rubrique." }, { status: 500 });
  }
}
