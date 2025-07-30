"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("je suis dans TRY");
      const res = await fetch("/api/auth", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.token) {
        // Stocke le token dans un cookie
        Cookies.set("token", data.token, { expires: 1 }); // Le cookie expire après 1 jour

        // Redirige vers le tableau de bord approprié
        window.location.href = data.redirectUrl;
      } else {
        // Gérez les erreurs ici
        console.log(data.message);
      }
      console.log(data);
      console.log("Réponse API:", data); // Vérifiez ce qui est renvoyé

      // Ajout d'un log pour vérifier ce qui est renvoyé

      if (!res.ok) {
        setError(data.error || "Erreur de connexion");
        return;
      }

      // Rediriger selon le rôle de l'utilisateur
      if (data.redirectUrl) {
        setTimeout(() => {
          console.log("Redirection vers:", data.redirectUrl); // Ajout d'un log pour déboguer
          router.push(data.redirectUrl); // Le rôle déterminera la redirection
        }, 500);
      } else {
        setError("Réponse de l'API invalide");
      }
    } catch (err) {
      console.log("logggggggggggggggggggggg");
      console.log("Erreur attrapée :", err);
      setError("Une erreur est survenue.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="flex flex-col justify-center items-center gap-3">
          <CardTitle className="text-[25px] text-green-500 font-bold">
            Gb_Stock
          </CardTitle>
          <h1 className="text-black text-start font-bold text-[20px]">
            Se connecter
          </h1>
          <CardDescription className="flex flex-col justify-center items-center gap-3">
            <span className="text-center">
              Utilisez ce formulaire pour s'authentifier ou se connecter et
              acceder dans votre espace en fonction de votre rôle et permission.{" "}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e : any) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e : any) => setPassword(e.target.value)}
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" className="w-full cursor-pointer">
                Connectez-vous
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// // app/api/login/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@/app/generated/prisma";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// const prisma = new PrismaClient();

// export async function POST(req: NextRequest, res: NextResponse) {
//   try {
//     console.log("Route login appelée");
//     const { email, password } = await req.json();
//     console.log("Email reçu :", email);
//     console.log("Mot de passe reçu :", password);

//     console.log("Status:", res.status);
//     console.log("Headers:", res.headers.get("content-type"));

//     const user = await prisma.user.findUnique({ where: { email } });
//     const users = await prisma.user.findMany(); // Pour debug
//     console.log("LES UTILISATEUR", users);

//     if (!user) {
//       console.log("Utilisateur non trouvé");
//       return NextResponse.json(
//         { error: "Utilisateur introuvable" },
//         { status: 400 }
//       );
//     }

//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//       console.log("Mot de passe incorrect");
//       return NextResponse.json(
//         { error: "Mot de passe incorrect" },
//         { status: 400 }
//       );
//     }

//     const payload = { userId: user.id, role: user.role };
//     const secret = process.env.JWT_SECRET;
//     if (!secret) throw new Error("JWT_SECRET is not defined");

//     const token = jwt.sign(payload, secret, { expiresIn: "1h" });

//     const response = NextResponse.json({
//       redirectUrl:
//         user.role === "admin"
//           ? "/Dashboard/users"
//           : user.role === "caissier"
//           ? "/caissier/dashboard"
//           : "/",
//     });

//     response.cookies.set("token", token, {
//       httpOnly: true,
//       path: "/",
//       maxAge: 60 * 60, // 1h
//     });

//     return response;
//   } catch (error) {
//     console.error("Erreur dans POST /api/login :", error);
//     return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
//   }
// }