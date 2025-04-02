export async function keycloakSessionLogOut(): Promise<void> {
  try {
    await fetch('/api/auth/logout', { method: 'GET' });
  } catch (err) {
    console.error(err);
  }
}
