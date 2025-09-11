// lib/saSign.ts (server only)
import crypto from 'crypto';

export function buildSigningString(fields: Record<string, string>, signedFieldNames: string[]) {
  return signedFieldNames.map((n) => `${n}=${fields[n] ?? ''}`).join(',');
}

export function sign(
  fields: Record<string, string>,
  signedFieldNames: string[],
  secretKey: string
) {
  const dataToSign = buildSigningString(fields, signedFieldNames);

  // Debug logging (remove in production)
  console.log('Signing data:', dataToSign);
  console.log('Signed field names:', signedFieldNames);

  const signature = crypto
    .createHmac('sha256', secretKey)
    .update(dataToSign, 'utf8')
    .digest('base64');

  console.log('Generated signature:', signature);

  return signature;
}
