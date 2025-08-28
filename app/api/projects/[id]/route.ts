import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      service: true,
      user: true,
    },
  });

  if (!project) {
    return NextResponse.json({ error: "Dépense introuvable." }, { status: 404 });
  }
  return NextResponse.json({
    ...project,
    serviceName: project.service?.name ?? null,
    userName: project.user?.name ?? null,
  });
  //   return Response.json(project);
}

// // PUT pour modifier un projet

export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const body = await request.json();

    const updateData = {
      status: body.status || "EN_COURS",
      budget: body.budget,
      startDate: body.startDate ? new Date(body.startDate) : undefined,
      endDate: body.endDate ? new Date(body.endDate) : undefined,
      devisNumber: body.devisNumber,
      updatedAt: new Date(),
    };

    console.log("➡️ Données à mettre à jour :", updateData);

    const updateExpense = await prisma.project.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updateExpense, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de l'update :", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour." }, { status: 500 });
  }
}

// export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
//   const { id } = await context.params;
//   try {
//     const expense = await prisma.expense.findUnique({
//       where: { id: id },
//     });

//     if (!expense) {
//       return NextResponse.json(
//         {
//           error: "Depense non trouvée (OU SOIT ELLE EST DÉJA ÉTÈ SUPPRIMMER, Actualiser la page !",
//         },
//         { status: 404 }
//       );
//     }

//     await prisma.expense.delete({
//       where: { id: id },
//     });

//     return NextResponse.json({ message: "Depense supprimée avec succès" });
//   } catch (error) {
//     console.error("Erreur de suppression:", error);
//     return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
//   }
// }
