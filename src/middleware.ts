import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "../auth";

export async function middleware(request: NextRequest) { // a chaque request emise
  const session = await auth(); // on recupere la session
  if (
    request.nextUrl.pathname.startsWith("/Admin-Dashboard") && // si l'utilisateur essaie d'acceder a la route admin
    session?.user?.role !== "admin" // mais qu'il n'est pas un admin
  ) {
    return NextResponse.redirect(new URL("/access-denied", request.url)); // alors on le redirige vers la page access denied
  }
  return NextResponse.next(); // sinon il accede a la page voulue
}

// config valable seulement sur les pages suivante
export const config = {
  matcher: "/Admin-Dashboard",
};
