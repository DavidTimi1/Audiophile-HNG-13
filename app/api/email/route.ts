import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: body.to,
      subject: body.subject,
      html: body.html,
    });
    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ id: data?.id });
    
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
