export function validateEmail(email) {
  const regex = /[!@#$%^&*(),._<>:|?{}]/;
  return regex.test(email);
}

export const maskEmail = (email) => {
  if (!email || typeof email !== 'string' || !email.includes('@'))
    return 'Anonymus';
  const [localPart, domain] = email.split('@');
  const maskedLocal =
    localPart.length > 1
      ? localPart[0] + '*'.repeat(localPart.length - 1)
      : '*';
  return `${maskedLocal}@${domain}`;
};
