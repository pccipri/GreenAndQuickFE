'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthProvider';
import { setAccessToken } from '@/lib/tokenManager';
import { notify } from '@/utils/toast';

export default function SuccessfulOAuthLoginPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('auth');
  const token = params?.token as string;
  const { refresh } = useAuth();

  useEffect(() => {
    if (!token || typeof token !== 'string') return;

    setAccessToken(token);
    refresh().then(() => {
      router.replace('/');
      notify(t('oauthLoginSuccess'), 'success');
    }).catch(() => {
      router.replace('/login');
      notify(t('oauthLoginFailed'), 'error');
    });
  }, [token, router, refresh, t]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <p className="text-lg">{t('oauthLoginInProgress')}</p>
    </div>
  );
}
