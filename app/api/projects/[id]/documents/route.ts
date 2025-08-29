// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { id } = params;

//     const documents = await prisma.document.findMany({
//       where: { projectId: id },
//       select: {
//         id: true,
//         title: true,
//         fileUrl: true,
//         createdAt: true,
//         updatedAt: true,
//         project: { select: { name: true } },
//       },
//     });

//     const formatted = documents.map((d) => ({
//       ...d,
//       projectName: d.project?.name || null,
//       project: undefined,
//       user: undefined,
//     }));

//     return NextResponse.json({
//       success: true,
//       message: "Liste des documents récupérée avec succès.",
//       data: formatted,
//     });
//   } catch (error) {
//     console.error("Erreur lors de la récupération des documents :", error);
//     return NextResponse.json(
//       { error: "Impossible de récupérer les documents" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest } from "next/server";
import formidable, { Fields, Files } from "formidable";
import path from "path";
import { prisma } from "@/lib/prisma";

export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  try {
    const form = formidable({
      multiples: false,
      uploadDir: "./public/uploads",
      keepExtensions: true,
    });

    const [fields, files]: [Fields, Files] = await new Promise(
      (resolve, reject) => {
        form.parse(req as any, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      }
    );

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const rawProjectId = Array.isArray(fields.projectId) ? fields.projectId[0] : fields.projectId;
    const projectId = typeof rawProjectId === "string" ? rawProjectId : null;

    if (!file || !projectId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Chemin relatif pour la BDD
    const fileUrl = `/uploads/${path.basename(file.filepath)}`;

    const document = await prisma.document.create({
      data: {
        title: file.originalFilename ?? fileUrl,
        fileUrl,
        projectId,
      },
    });

    return new Response(JSON.stringify(document), { status: 201 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message ?? "Server error" }),
      { status: 500 }
    );
  }
}