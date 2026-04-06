'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthProvider';
import { setAccessToken } from '@/lib/tokenManager';
import { notify } from '@/utils/toast';

export default function SuccessfulOAuthLoginPage() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;
  const { refresh } = useAuth()

  useEffect(() => {
    if (!token) {
      return;
    }

    if(token && typeof token === 'string') {
          setAccessToken(token);
          refresh().then(() => {
            router.replace('/');
                        notify("Succesfull login", "success")
          }).catch(() => {
            router.replace('/login');
            notify("Failed to refresh user data after login", "error")
          });
    }

  }, [token, router, params]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <p className="text-lg">Verifying your email...</p>
    </div>
  );
}
