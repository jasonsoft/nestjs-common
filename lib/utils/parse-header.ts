export const parseAuthHeader = (
  value: string,
): {
  scheme: string;
  token: string;
} | null => {
  if (!value) {
    return null;
  }
  const re = /(\S+)\s+(\S+)/;
  const matches = value.match(re);
  return matches && { scheme: matches[1], token: matches[2] };
};
