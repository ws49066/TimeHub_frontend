import { NextRequest, NextResponse, type MiddlewareConfig } from "next/server";


const publicRoutes = [
    {path: '/client/login', whenAuthenticated: 'redirect'},
    {path: '/client/register', whenAuthenticated: 'next'},
    {path: '/admin/login', whenAuthenticated: 'redirect'},
]

const NOT_AUTHENTICATED_ROUTE = "/client/login"


export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname
    const publicRoute = publicRoutes.find(route => route.path === path)
    const authToken = request.cookies.get('auth_token')

    if(!authToken && publicRoute){
        return NextResponse.next()
    }

    if(!authToken && !publicRoute){
        const url = request.nextUrl.clone()

        
        url.pathname = NOT_AUTHENTICATED_ROUTE
        
        return NextResponse.redirect(url)
    }
    
    if(authToken && publicRoute && publicRoute.whenAuthenticated === "redirect"){
        const url = request.nextUrl.clone()
        url.pathname = "/agendamento"

        return NextResponse.redirect(url)

    }

    if(authToken && !publicRoute){
        return NextResponse.next()
    }


    return NextResponse.next()
}


export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}