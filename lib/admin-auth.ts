import { cookies } from 'next/headers';

const COOKIE = 'admin_session';
const MAX_AGE = 60 * 60 * 8; // 8 hours

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const val = jar.get(COOKIE)?.value;
  return val === process.env.ADMIN_PASSWORD && Boolean(val);
}

export async function setAdminCookie(): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE, process.env.ADMIN_PASSWORD ?? '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export async function clearAdminCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}
