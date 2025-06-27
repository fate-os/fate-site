export function normalizeValue(usedTotal: number, max_value: number): number {
  const percentage = (usedTotal / max_value) * 100;

  return Math.min(percentage, 100); // Ensure the value does not exceed 100
}

export function getInitials(fullName: string): string {
  if (!fullName || typeof fullName !== 'string') return '';

  // Split the name into parts, trim whitespace, and filter out empty strings
  const nameParts = fullName
    .split(' ')
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  if (nameParts.length === 0) return '';

  // Get first letter of each part and capitalize it
  const initials = nameParts.map((part) => part[0].toUpperCase());

  // Join them with whatever separator you prefer (space, dot, or nothing)
  return initials.join(''); // Returns "F M L" for "FirstName MiddleName LastName"
}

export function getFirstName(fullName: string): string {
  if (!fullName || typeof fullName !== 'string') return '';

  // Trim whitespace and split by spaces
  const nameParts = fullName.trim().split(/\s+/);

  // Return the first part (firstName) or empty string if none
  return nameParts[0] || '';
}

export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function applyDiscount(total: number | string, discountPercent: number) {
  const amount = typeof total === 'string' ? Number(total) : total;

  if (discountPercent < 0 || discountPercent > 100) {
    return 0;
  }

  const discount = (amount * discountPercent) / 100;
  return (amount - discount).toFixed(2);
}
