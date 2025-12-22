export const INSTRUCTORS: Record<string,string> = {
  'rob@launchpadphilly.org': 'lpuser1',
  'sanaa@launchpadphilly.org': 'lpuser2',
  'taheera@launchpadphilly.org': 'lpuser3',
};

export function getCurrentUser(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('cv_user') || null;
  } catch {
    return null;
  }
}

export function isInstructor(email?: string | null): boolean {
  const user = email ?? getCurrentUser();
  if (!user) return false;
  return Object.prototype.hasOwnProperty.call(INSTRUCTORS, user);
}

export function instructorList(): string[] {
  return Object.keys(INSTRUCTORS);
}
