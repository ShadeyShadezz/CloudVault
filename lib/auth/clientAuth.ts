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

export function saveUser(email: string, password: string): void {
  const users = JSON.parse(localStorage.getItem("cv_users" )||"{}");
  users[email] = { email, password };
  localStorage.setItem("cv_users", JSON.stringify(users));
}

export function checkUser(email: string, password: string): boolean {
  const users = JSON.parse(localStorage.getItem("cv_users") || "{}");
  return users[email] && users[email].password === password;
}

export function setCurrentUser(email: string): void {
  localStorage.setItem("cv_user", email);
}

export function clearCurrentUser(): void {
  localStorage.removeItem("cv_user");
}
