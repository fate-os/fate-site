import { NextRequest, NextResponse } from 'next/server';
import { sign } from '@/lib/saSign';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const { amount, currency, reference } = await req.json();

  const access_key = process.env.SA_ACCESS_KEY!;
  const profile_id = process.env.SA_PROFILE_ID!;
  const secret = process.env.SA_SECRET_KEY!;

  const transaction_uuid = crypto.randomUUID();
  const signed_date_time = new Date().toISOString();

  const fields: Record<string, string> = {
    access_key,
    profile_id,
    transaction_uuid,
    signed_date_time,
    transaction_type: 'create_payment_token',
    payment_method: 'card',
    reference_number: reference,
    amount,
    currency,
    locale: 'en',
    unsigned_field_names: '',
  };

  const signedFields = Object.keys(fields);
  fields.signed_field_names = signedFields.join(',');
  fields.signature = sign(fields, signedFields, secret);

  return NextResponse.json({ fields });
}
