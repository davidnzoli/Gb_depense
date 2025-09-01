// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// import { prisma } from "@/lib/prisma";

// export async function GET(
//   request: Request,
//   context: { params: { id: string} }
// ) {

//   const { id} = await context.params;

//   if (!id) {
//     return NextResponse.json({ error: "ID non fourni." }, { status: 400 });
//   }

//   // if (!projectId) {
//   //   return NextResponse.json({ error: "Nom du projet non fourni." }, { status: 400 });
//   // }

//   const expense = await prisma.expense.findUnique({
//     where: { id },
//     include: { supplier: true },
//   });

//   if (!expense) {
//     return NextResponse.json({ error: "Dépense introuvable." }, { status: 404 });
//   }

//   // const projectExpenses = await prisma.expense.findMany({
//   //   where: { projectId },
//   //   include: { project: true },
//   // });

//   // const formattedProjectExpenses = projectExpenses.map((e) => ({
//   //   ...e,
//   //   projectName: e.project?.name ?? null,
//   // }));

//   return NextResponse.json({
//     expense: {
//       ...expense,
//       supplierName: expense.supplier?.name ?? null,
//     },
//     // projectExpenses: formattedProjectExpenses,
//   });
// }

// // PUT pour modifier une depense
// async function getSupplierIdByName(name: string) {
//   if (!name) return null;
//   const supplier = await prisma.supplier.findFirst({ where: { name } });
//   return supplier ? supplier.id : null;
// }
// async function getRubriqueIdByName(name: string) {
//   if (!name) return null;
//   const rubrique = await prisma.rubrique.findFirst({ where: { name } });
//   return rubrique ? rubrique.id : null;
// }
// async function getUserIdByName(name: string) {
//   if (!name) return null;
//   const user = await prisma.user.findFirst({ where: { name } });
//   return user ? user.id : null;
// }
// async function getServiceIdByName(name: string) {
//   if (!name) return null;
//   const service = await prisma.service.findFirst({ where: { name } });
//   return service ? service.id : null;
// }

// async function getProjectIdByName(name: string) {
//   if (!name) return null;
//   const project = await prisma.project.findFirst({ where: { name } });
//   return project ? project.id : null;
// }

// export async function PUT(request: Request, context: { params: { id: string } }) {
//   try {
//     const { id } = context.params;
//     const body = await request.json();

//     console.log("📩 Données reçues :", body);

//     const rubriqueId = await getRubriqueIdByName(body.rubriqueId);
//     const supplierId = await getSupplierIdByName(body.supplierId);
//     const serviceId = await getServiceIdByName(body.serviceId);
//     const projectId = await getProjectIdByName(body.projectId);
//     const userId = await getUserIdByName(body.userId);
//     console.log("🔗 ID du fournisseur trouvé :", supplierId);

//     if (body.supplierId && !supplierId) {
//       return NextResponse.json(
//         { error: `Fournisseur '${body.supplierId}' non trouvé.` },
//         { status: 400 }
//       );
//     }

//     const updateData = {
//       libelle: body.libelle,
//       beneficiaire: body.beneficiaire,
//       amount: body.amount,
//       devise: body.devise,
//       userId: userId || undefined,
//       rubriqueId: rubriqueId || null,
//       supplierId: supplierId || null,
//       projectId: projectId || undefined,
//       serviceId: serviceId || undefined,
//       updatedAt: new Date(),
//     };

//     console.log("➡️ Données à mettre à jour :", updateData);

//     const updateExpense = await prisma.expense.update({
//       where: { id },
//       data: updateData,
//     });

//     return NextResponse.json(updateExpense, { status: 200 });
//   } catch (error) {
//     console.error("❌ Erreur lors de l'update :", error);
//     return NextResponse.json({ error: "Erreur lors de la mise à jour." }, { status: 500 });
//   }
// }

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

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ─── GET ONE EXPENSE WITH NAMES ─────────────────────────────
export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "ID non fourni." }, { status: 400 });
  }

  const expense = await prisma.expense.findUnique({
    where: { id },
    include: {
      supplier: true,
      rubrique: true,
      service: true,
      project: true,
      user: true,
    },
  });

  if (!expense) {
    return NextResponse.json({ error: "Dépense introuvable." }, { status: 404 });
  }

  return NextResponse.json({
    ...expense,
    supplierName: expense.supplier?.email ?? null,
    rubriqueName: expense.rubrique?.name ?? null,
    serviceName: expense.service?.name ?? null,
    projectName: expense.project?.name ?? null,
    userName: expense.user?.name ?? null,
  });
}

// ─── HELPERS ─────────────────────────────
async function getSupplierIdByName(email: string) {
  if (!email) return null;
  const supplier = await prisma.supplier.findFirst({ where: { email } });
  return supplier?.id ?? null;
}
async function getRubriqueIdByName(name: string) {
  if (!name) return null;
  const rubrique = await prisma.rubrique.findFirst({ where: { name } });
  return rubrique?.id ?? null;
}
async function getUserIdByName(name: string) {
  if (!name) return null;
  const user = await prisma.user.findFirst({ where: { name } });
  return user?.id ?? null;
}
async function getServiceIdByName(name: string) {
  if (!name) return null;
  const service = await prisma.service.findFirst({ where: { name } });
  return service?.id ?? null;
}
async function getProjectIdByName(name: string) {
  if (!name) return null;
  const project = await prisma.project.findFirst({ where: { name } });
  return project?.id ?? null;
}

// ─── PUT : UPDATE EXPENSE BY NAME ─────────────────────────────
export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const body = await request.json();

    console.log("📩 Données reçues :", body);

    const rubriqueId = await getRubriqueIdByName(body.rubriqueName);
    const supplierId = await getSupplierIdByName(body.supplierName);
    const serviceId = await getServiceIdByName(body.serviceName);
    const projectId = await getProjectIdByName(body.projectName);
    const userId = await getUserIdByName(body.userName);

    const updateData = {
      libelle: body.libelle,
      beneficiaire: body.beneficiaire,
      amount: body.amount,
      devise: body.devise,
      rubriqueId: rubriqueId ?? undefined,
      supplierId: supplierId ?? undefined,
      serviceId: serviceId ?? undefined,
      projectId: projectId ?? undefined,
      userId: userId ?? undefined,
      updatedAt: new Date(),
    };

    console.log("➡️ Données à mettre à jour :", updateData);

    const updatedExpense = await prisma.expense.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedExpense, { status: 200 });
  } catch (error) {
    console.error("❌ Erreur lors de l'update :", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour." }, { status: 500 });
  }
}

// ─── DELETE ─────────────────────────────
export async function DELETE(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  try {
    const expense = await prisma.expense.findUnique({ where: { id } });

    if (!expense) {
      return NextResponse.json(
        { error: "Dépense non trouvée ou déjà supprimée." },
        { status: 404 }
      );
    }

    await prisma.expense.delete({ where: { id } });

    return NextResponse.json({ message: "Dépense supprimée avec succès" });
  } catch (error) {
    console.error("Erreur de suppression:", error);
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
