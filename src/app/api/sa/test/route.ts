// app/api/sa/test/route.ts - Test signature generation
import { NextRequest, NextResponse } from 'next/server';
import { sign } from '@/lib/saSign';

export async function GET(req: NextRequest) {
  try {
    const secret = process.env.SA_SECRET_KEY;

    if (!secret) {
      return NextResponse.json({ error: 'Missing secret key' }, { status: 500 });
    }

    // Test data similar to what we generate
    const testFields = {
      access_key: 'test_access_key',
      profile_id: 'test_profile_id',
      transaction_uuid: 'test-uuid-123',
      signed_date_time: '2024-01-01T12:00:00Z',
      locale: 'en',
      transaction_type: 'sale',
      reference_number: '1234567890',
      amount: '100',
      currency: 'usd',
      payment_method: 'card',
      unsigned_field_names: '',
      override_custom_receipt_page: 'http://localhost:3000/payment/success',
      override_custom_cancel_page: 'http://localhost:3000/payment/cancel',
    };

    const signedFieldNames = Object.keys(testFields);
    const signature = sign(testFields, signedFieldNames, secret);

    return NextResponse.json({
      testFields,
      signedFieldNames,
      signature,
      signingData: signedFieldNames
        .map((n) => `${n}=${testFields[n as keyof typeof testFields]}`)
        .join(','),
    });
  } catch (error) {
    console.error('Error in test:', error);
    return NextResponse.json({ error: 'Test failed' }, { status: 500 });
  }
}
