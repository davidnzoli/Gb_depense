import { prisma } from "@/lib/prisma";
import { Select } from "@radix-ui/react-select";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const project = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        service: { select: { name: true } },
        clients: true,
        user: { select: { name: true } },
        location: true,
        status: true,
      },
    });

    const formatted = project.map((e) => ({
      ...e,
      serviceName: e.service?.name || null,
      userName: e.user?.name || null,
      service: undefined,
      user: undefined,
    }));

    const services = await prisma.service.findMany({
      select: { id: true, name: true },
    });

    const users = await prisma.user.findMany({
      select: { id: true, name: true },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Liste des projets récupérée avec succès.",
        data: formatted,
        services,
        users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des projets :", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur serveur. Impossible de récupérer les projets.",
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
    const newExpense = await prisma.project.create({
      data: {
        name: body.name,
        description: body.description,
        serviceId: body.serviceId,
        clients: body.clients || undefined,
        userId: body.userId || undefined,
        location: body.location || undefined,
        status: body.status || "PLANIFIE",
      },
    });

    return NextResponse.json(newExpense, { status: 201 });
  } catch (error) {
    console.error("❌ Erreur lors de la création :", error);
    return NextResponse.json({ error: "Erreur lors de l'ajout de projet." }, { status: 500 });
  }
}
