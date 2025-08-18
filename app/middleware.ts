// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export default function middleware(request: NextRequest) {}

// const token = request.cookies.get("token")?.value;
// console.log("tokennnnnn", token);

// if (request.nextUrl.pathname.startsWith("/api")) {
//   return NextResponse.next();
// }

// // Autoriser l'accès aux fichiers statiques générés par Next.js
// const isStaticFile =
//   request.nextUrl.pathname.startsWith("/_next") ||
//   request.nextUrl.pathname.startsWith("/static");
// if (isStaticFile) {
//   return NextResponse.next();
// }

// const isAuthPage = request.nextUrl.pathname.startsWith("/loginsss");

// // Redirection si non authentifié
// if (!token && !isAuthPage) {
//   return NextResponse.redirect(new URL("/loginsss", request.url));
// }

// // Redirection si déjà connecté et essaie d'accéder à /login
// if (token && isAuthPage) {
//   try {
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//     const role = decoded.role;

//     if (role === "admin") {
//       return NextResponse.redirect(
//         new URL("/Dashboard/admindashboard", request.url)
//       );
//     } else if (role === "caissier") {
//       return NextResponse.redirect(
//         new URL("/Dashboard/userdashboard", request.url)
//       );
//     }
//   } catch (error) {
//     console.error("Erreur de vérification du token :", error);
//     return NextResponse.redirect(new URL("/loginsss", request.url));
//   }
// }

// // Si l'utilisateur est connecté, vérifier le rôle
// if (token) {
//   try {
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//     const role = decoded.role;
//     const pathname = request.nextUrl.pathname;

//     // Redirection si le caissier tente d'accéder à une page réservée aux admins
//     if (
//       role === "caissier" &&
//       pathname.startsWith("/Dashboard/admindashboard")
//     ) {
//       return NextResponse.redirect(new URL("/unauthorized", request.url));
//     }

//     // Redirection si un admin tente d'accéder à une page réservée aux caissiers
//     if (role === "admin" && pathname.startsWith("/Dashboard/userdashboard")) {
//       return NextResponse.redirect(new URL("/unauthorized", request.url));
//     }

//     // Redirection si un invité tente d'accéder à une page réservée
//     if (
//       role === "invite" &&
//       pathname.startsWith("/Dashboard/userdashboard")
//     ) {
//       return NextResponse.redirect(new URL("/unauthorized", request.url));
//     }
//   } catch (error) {
//     console.error("Erreur de vérification du token :", error);
//     return NextResponse.redirect(new URL("/loginsss", request.url));
//   }
// }

// return NextResponse.next();
