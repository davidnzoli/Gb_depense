import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const fournisseur = await prisma.supplier.findMany();

    return NextResponse.json(
      {
        success: true,
        message: "Liste des fournisseur récupérée avec succès.",
        data: fournisseur,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des fournisseur :", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur. Impossible de récupérer les fournisseur.",
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
    const newExpense = await prisma.supplier.create({
      data: {
        name: body.name || null,
        contact: body.contact || null,
        nationalite: body.nationalite || null,
        email: body.email || null,
      },
    });

    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    console.error("❌ Erreur lors de la création :", error);
    return NextResponse.json({ error: "Erreur lors de l'ajout de fournisseur." }, { status: 500 });
  }
}
