import { useSession } from 'next-auth/react';

export function useRoles() {
  const { data: session } = useSession();

  const hasRole = (role: string): boolean => {
    return session?.roles?.includes(role) ?? false;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some((role) => hasRole(role));
  };

  const hasAllRoles = (roles: string[]): boolean => {
    return roles.every((role) => hasRole(role));
  };

  return {
    roles: session?.roles ?? [],
    hasRole,
    hasAnyRole,
    hasAllRoles,
  };
}
