import { NextRequest, NextResponse } from "next/server";
import formidable, { Fields, Files } from "formidable";
import path from "path";
import { prisma } from "@/lib/prisma";
import { Readable } from "stream";
import fs from "fs";
const { IncomingForm } = require("formidable-serverless");

export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  if (!id) {
    return NextResponse.json({ error: "ID non fourni." }, { status: 400 });
  }
  const documents = await prisma.document.findMany({
    where: { projectId: id },
    select: { id: true, titre: true, fileUrl: true },
  });

  return NextResponse.json(documents);
}

// export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
//   try {
//     const { id } = await context.params;
//     const formData = await req.formData();

//     const file = formData.get("file") as File | null;
//     if (!file) {
//       return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
//     }

//     const sanitizedFileName = file.name.replace(/\s+/g, "_");

//     const fileUrl = `/uploads/${sanitizedFileName}`;

//     const document = await prisma.document.create({
//       data: {
//         titre: file.name,
//         fileUrl,
//         projectId: id,
//       },
//     });

//     return NextResponse.json(document, { status: 201 });
//   } catch (error) {
//     console.error("Erreur Upload:", error);
//     return NextResponse.json({ error: "Upload échoué" }, { status: 500 });
//   }
// }

export const POST = async (req: NextRequest, context: { params: { id: string } }) => {
  const { id: projectId } = context.params;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });

    const fileName = (file.name || "unknown").replace(/ /g, "_");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    fs.writeFileSync(filePath, buffer);

    const document = await prisma.document.create({
      data: {
        titre: fileName,
        fileUrl: `/uploads/${fileName}`,
        projectId,
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("Erreur Upload:", error);
    return NextResponse.json({ error: "Upload échoué" }, { status: 500 });
  }
};
