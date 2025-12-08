import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstname, lastname, email, service, subject, message } = body;

    // Validation
    if (!firstname || !lastname || !email || !service || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'B2dev Contact <onboarding@resend.dev>', // Adresse par défaut de Resend
      to: ['AmauryAll.b2dev@gmail.com'],
      replyTo: email,
      subject: `Nouveau contact - ${subject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Prénom:</strong> ${firstname}</p>
        <p><strong>Nom:</strong> ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type de service:</strong> ${service}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <br>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}
