import supabase from '@/lib/supabase';

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    await supabase.auth.signOut({
      scope: 'local',
    });
  }

  location.href = '/sign-in';
}

export async function signUp({
  nickname,
  email,
  password,
}: {
  nickname: string;
  email: string;
  password: string;
}) {
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) throw signUpError;

  if (signUpData.user) {
    const { error: profileError } = await supabase
      .from('profile')
      .insert({
        profile_id: signUpData.user.id,
        nickname: nickname,
      })
      .select()
      .single();

    if (profileError) throw profileError;
  }

  return signUpData;
}

export async function signInWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function requestPasswordResetEmail(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${import.meta.env.VITE_PUBLIC_URL}/reset-password`,
  });

  if (error) throw error;

  return data;
}

export async function updatePassword(password: string) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw error;

  return data;
}
