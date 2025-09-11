// app/api/sa/build/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { sign } from '@/lib/saSign';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { amount, currency, reference } = await req.json();

    const access_key = process.env.SA_ACCESS_KEY;
    const profile_id = process.env.SA_PROFILE_ID;
    const secret = process.env.SA_SECRET_KEY;

    if (!access_key || !profile_id || !secret) {
      return NextResponse.json(
        { error: 'Missing required environment variables' },
        { status: 500 }
      );
    }

    // Generate transaction UUID and timestamp
    const transaction_uuid = randomUUID();
    const signed_date_time = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

    const fields: Record<string, string> = {
      access_key,
      profile_id,
      transaction_uuid,
      signed_date_time,
      locale: 'en',
      transaction_type: 'sale',
      reference_number: reference,
      payment_method: 'card',
      amount,
      currency,
      unsigned_field_names: '',
      // Add return URLs for success/failure handling
      override_custom_receipt_page: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success`,
      override_custom_cancel_page: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/cancel`,
    };

    // Signed fields: include ALL request fields except card_number, card_cvn, signature
    const signed_field_names = Object.keys(fields).join(',');
    fields.signed_field_names = signed_field_names;

    // Generate signature
    fields.signature = sign(fields, signed_field_names.split(','), secret);

    // Debug logging (remove in production)
    console.log('Generated fields:', {
      access_key: fields.access_key,
      profile_id: fields.profile_id,
      transaction_uuid: fields.transaction_uuid,
      signed_date_time: fields.signed_date_time,
      amount: fields.amount,
      currency: fields.currency,
      reference_number: fields.reference_number,
      signed_field_names: fields.signed_field_names,
      signature: fields.signature.substring(0, 10) + '...',
    });

    return NextResponse.json({ fields });
  } catch (error) {
    console.error('Error building payment fields:', error);
    return NextResponse.json({ error: 'Failed to build payment fields' }, { status: 500 });
  }
}
