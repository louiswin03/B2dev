import { NextRequest, NextResponse } from 'next/server';

// This API route was previously using Resend. Emails are now handled via EmailJS
// client-side. Keep a minimal POST handler so builds don't fail if this route is
// accidentally requested on the server. It returns 501 Not Implemented.

export async function POST(_request: NextRequest) {
  return NextResponse.json({
    error: 'Email sending disabled on server. Use EmailJS client-side.'
  }, { status: 501 });
}
