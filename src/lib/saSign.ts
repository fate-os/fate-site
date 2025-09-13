import crypto from 'crypto';

export function buildSigningString(fields: Record<string, string>, signedFields: string[]) {
  return signedFields.map((name) => `${name}=${fields[name] ?? ''}`).join(',');
}

export function sign(fields: Record<string, string>, signedFields: string[], secretKey: string) {
  const dataToSign = buildSigningString(fields, signedFields);
  return crypto.createHmac('sha256', secretKey).update(dataToSign, 'utf8').digest('base64');
}
