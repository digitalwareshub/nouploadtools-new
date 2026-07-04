'use server';

import { redirect } from 'next/navigation';
import { isAdminAuthenticated, setAdminCookie, clearAdminCookie } from '@/lib/admin-auth';
import { adminSetStatus, adminDeleteTool } from '@/lib/admin-supabase';

export async function loginAction(formData: FormData) {
  const password = (formData.get('password') as string) ?? '';
  if (password === process.env.ADMIN_PASSWORD && password.length > 0) {
    await setAdminCookie();
    redirect('/admin');
  }
  redirect('/admin?error=1');
}

export async function logoutAction() {
  await clearAdminCookie();
  redirect('/admin');
}

export async function approveAction(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const id = formData.get('id') as string;
  await adminSetStatus(id, 'approved');
  redirect('/admin?status=pending');
}

export async function rejectAction(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const id = formData.get('id') as string;
  await adminSetStatus(id, 'rejected');
  redirect('/admin?status=pending');
}

export async function pendingAction(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const id = formData.get('id') as string;
  await adminSetStatus(id, 'pending');
  redirect('/admin?status=all');
}

export async function deleteAction(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect('/admin');
  const id = formData.get('id') as string;
  await adminDeleteTool(id);
  redirect('/admin?status=all');
}
