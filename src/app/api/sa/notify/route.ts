import { NextRequest, NextResponse } from 'next/server';
import { sign } from '@/lib/saSign';
import { FateOsClient } from '@/db/prisma';

const prisma = FateOsClient;

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const data: Record<string, string> = {};
  form.forEach((v, k) => (data[k] = String(v)));

  const secret = process.env.SA_SECRET_KEY!;
  const signedFields = (data.signed_field_names || '').split(',').filter(Boolean);
  const expectedSig = sign(data, signedFields, secret);

  if (expectedSig !== data.signature) {
    return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 400 });
  }

  // await prisma.transaction.create({
  //   data: {
  //     reference: data.reference_number || '',
  //     amount: parseFloat(data.amount || '0'),
  //     currency: data.currency || 'USD',
  //     paymentToken: data.payment_token || '',
  //     decision: data.decision || '',
  //   },
  // });

  return NextResponse.json({ ok: true });
}
