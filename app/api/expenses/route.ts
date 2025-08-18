import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const categorie = await prisma.expense.findMany();

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Liste des depenses récupérée avec succès.",
//         data: categorie,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Erreur lors de la récupération des depenses :", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Erreur serveur. Impossible de récupérer les depenses.",
//         error: error instanceof Error ? error.message : "Erreur inconnue",
//       },
//       { status: 500 }
//     );
//   }
// }

export async function GET() {
  try {
    const expenses = await prisma.expense.findMany({
      select: {
        id: true,
        libelle: true,
        beneficiaire: true,
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

    const rubriques = await prisma.rubrique.findMany({
      select: { id: true, name: true },
    });

    const services = await prisma.service.findMany({
      select: { id: true, name: true },
    });

    const projects = await prisma.project.findMany({
      select: { id: true, name: true },
    });
    const suppliers = await prisma.supplier.findMany({
      select: { id: true, email: true },
    });

    console.log("le resultats :", formatted);
    return NextResponse.json(
      {
        success: true,
        message: "Liste des dépenses récupérée avec succès.",
        data: formatted,
        rubriques,
        services,
        suppliers,
        projects,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des dépenses :", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur. Impossible de récupérer les dépenses.",
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

    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    console.error("❌ Erreur lors de la création :", error);
    return NextResponse.json({ error: "Erreur lors de l'ajout de dépense." }, { status: 500 });
  }
}
