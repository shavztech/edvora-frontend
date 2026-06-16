import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Minimal middleware required by Next.js. This will be invoked for matched
 * requests and currently just continues the request unmodified.
 */
export function middleware(_request: NextRequest) {
	return NextResponse.next()
}

// Avoid running middleware for static files, images and _next internals by
// matching only application routes. Adjust matcher as needed.
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
