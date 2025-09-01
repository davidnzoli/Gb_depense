// app/api/report/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function GET() {
  try {
    // Récupérer toutes les dépenses
    const expenses = await prisma.expense.findMany({
      select: {
        date: true,
        libelle: true,
        amount: true,
        devise: true,
        rubrique: { select: { name: true } },
        service: { select: { name: true } },
        supplier: { select: { email: true } },
        project: { select: { name: true } },
      },
      orderBy: { date: 'asc' },
    });

    // Créer le PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([700, 900]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;

    // Titre
    page.drawText("Rapport des dépenses", {
      x: 50,
      y: height - 50,
      size: 18,
      font,
      color: rgb(0, 0, 0),
    });

    // En-tête du tableau
    const headers = ["Date", "Libellé", "Montant", "Devise", "Rubrique", "Service", "Fournisseur", "Projet"];
    let yPos = height - 80;
    headers.forEach((header, i) => {
      page.drawText(header, { x: 50 + i * 80, y: yPos, size: fontSize, font, color: rgb(0, 0, 0) });
    });

    // Données
    yPos -= 20;
    expenses.forEach((e) => {
      const values = [
        e.date.toISOString().split("T")[0],
        e.libelle || "-",
        e.amount.toString(),
        e.devise || "-",
        e.rubrique?.name || "-",
        e.service?.name || "-",
        e.supplier?.email || "-",
        e.project?.name || "-",
      ];
      values.forEach((val, i) => {
        page.drawText(val.toString(), { x: 50 + i * 80, y: yPos, size: fontSize, font });
      });
      yPos -= 20;
      if (yPos < 50) yPos = height - 50; // Nouvelle page si nécessaire
    });

    const pdfBytes = await pdfDoc.save();

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="rapport_depenses.pdf"`,
      },
    });
  } catch (error) {
    console.error("Erreur génération PDF :", error);
    return NextResponse.json({ error: "Impossible de générer le rapport" }, { status: 500 });
  }
}
