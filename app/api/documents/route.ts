import { NextRequest, NextResponse } from "next/server";
import formidable, { Fields, Files, Part } from "formidable";
import path from "path";
import fs from "fs";
import { prisma } from "@/lib/prisma";

// Désactiver le bodyParser de Next.js pour gérer Formidable
export const config = { api: { bodyParser: false } };

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const documents = await prisma.document.findMany({
      where: { projectId: params.id },
    });

    return NextResponse.json({ data: documents }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     const uploadDir = path.join(process.cwd(), "public", "uploads");

//     // Créer le dossier s’il n’existe pas
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     const form = formidable({
//       multiples: false,
//       uploadDir,
//       keepExtensions: true,
//       maxFileSize: 20 * 1024 * 1024, // 20 Mo
//       filter: ({ mimetype }: Part): boolean => {
//         // Autoriser uniquement certains types de fichiers
//         return Boolean(
//           mimetype === "application/pdf" ||
//             mimetype === "application/msword" || // .doc
//             mimetype ===
//               "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // .docx
//             mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
//             mimetype === "application/vnd.ms-excel" || // .xls
//             mimetype?.startsWith("image/") // images (png, jpg, jpeg)
//         );
//       },
//     });

//     const [fields, files]: [Fields, Files] = await new Promise((resolve, reject) => {
//       form.parse(req as any, (err, fields, files) => {
//         if (err) reject(err);
//         else resolve([fields, files]);
//       });
//     });

//     // Récupérer le fichier
//     const file = Array.isArray(files.file) ? files.file[0] : files.file;
//     if (!file) {
//       return new Response(JSON.stringify({ error: "Aucun fichier reçu" }), { status: 400 });
//     }

//     // Récupérer projectId
//     const rawProjectId = Array.isArray(fields.projectId) ? fields.projectId[0] : fields.projectId;
//     const projectId = typeof rawProjectId === "string" ? rawProjectId : null;

//     if (!projectId) {
//       return new Response(JSON.stringify({ error: "Le projectId est obligatoire" }), {
//         status: 400,
//       });
//     }

//     // Construire le chemin du fichier
//     const fileUrl = `/uploads/${path.basename(file.filepath)}`;

//     // Sauvegarder en BDD
//     const document = await prisma.document.create({
//       data: {
//         title: file.originalFilename ?? fileUrl,
//         fileUrl,
//         type: file.mimetype ?? "unknown",
//         projectId,
//       },
//     });

//     return new Response(JSON.stringify(document), { status: 201 });
//   } catch (error: any) {
//     console.error("Erreur upload :", error);
//     return new Response(JSON.stringify({ error: error.message ?? "Erreur serveur" }), {
//       status: 500,
//     });
//   }
// }
