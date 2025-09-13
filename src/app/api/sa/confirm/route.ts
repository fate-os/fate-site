// app/api/sa/confirm/route.ts - Bank of America confirmation page
import { NextRequest, NextResponse } from 'next/server';
import { sign } from '@/lib/saSign';

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SA_SECRET_KEY;

    if (!secret) {
      console.error('Missing SA_SECRET_KEY environment variable');
      return NextResponse.json({ error: 'Missing secret key' }, { status: 500 });
    }

    const formData = await req.formData();
    const params: Record<string, string> = {};

    // Convert FormData to object
    formData.forEach((value, key) => {
      params[key] = String(value);
    });

    // Generate signature using the existing params
    const signedFieldNames = params.signed_field_names?.split(',') || [];

    // Create a copy of params without the signature field for signing
    const paramsForSigning = { ...params };
    delete paramsForSigning.signature; // Remove signature field if it exists

    // Ensure signed_field_names doesn't include 'signature' field
    const filteredSignedFieldNames = signedFieldNames.filter((name) => name !== 'signature');

    console.log('=== Confirmation Debug ===');
    console.log('Received params:', params);
    console.log('Signed field names:', signedFieldNames);
    console.log('Filtered signed field names:', filteredSignedFieldNames);
    console.log('Params for signing:', paramsForSigning);

    const signature = sign(paramsForSigning, filteredSignedFieldNames, secret);

    // Add signature to params
    params.signature = signature;

    console.log('Generated signature:', signature);
    console.log('Final params:', params);
    console.log('========================');

    // Return the signed parameters
    return NextResponse.json({ params });
  } catch (error) {
    console.error('Error in confirmation:', error);
    return NextResponse.json({ error: 'Failed to process confirmation' }, { status: 500 });
  }
}
