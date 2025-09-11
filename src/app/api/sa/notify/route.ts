// app/api/sa/notify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sign } from '@/lib/saSign';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const secret = process.env.SA_SECRET_KEY!;
  const data: Record<string, string> = {};
  form.forEach((v, k) => {
    data[k] = String(v);
  });

  const signedNames = (data.signed_field_names || '').split(',').filter(Boolean);
  const expectedSig = sign(data, signedNames, secret);

  const valid = expectedSig === data.signature;
  if (!valid) return NextResponse.json({ ok: false }, { status: 400 });

  // Typical success check (reason_code 100 == OK)
  const success = data.decision === 'ACCEPT' || data.reason_code === '100';
  // TODO: mark order paid based on reference_number / transaction_id, etc.
  return NextResponse.json({ ok: true, success, data });
}
