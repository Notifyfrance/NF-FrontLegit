export function encodeProfileUsername(username: string): string {
  const decoded = decodeProfileUsername(username);
  const encoded = encodeURIComponent(decoded);

  if (encoded.endsWith(".")) {
    return `${encoded.slice(0, -1)}%2E`;
  }

  return encoded;
}

function decodeProfileUsername(username: string): string {
  try {
    return decodeURIComponent(username);
  } catch {
    return username;
  }
}
