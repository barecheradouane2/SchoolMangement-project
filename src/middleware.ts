import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));



export default clerkMiddleware(async (auth, req) => {
  // if (isProtectedRoute(req)) auth().protect()

    const { userId, sessionClaims } = await auth();

  if (!userId) return NextResponse.next();

  const role = (sessionClaims?.metadata as any)?.role;

  console.log("middleware role " + role);

  const pathname = req.nextUrl.pathname;

  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req) && role && !allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\.(?:png|jpg|jpeg|gif|svg|ico|css|js)).*)",
    "/(api|trpc)(.*)",
  ],
};