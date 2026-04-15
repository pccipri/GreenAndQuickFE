'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { verifyRegisterToken } from '@/services/authService';
import { notify } from '@/utils/toast';

export default function VerifyRegisterPage() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;
  const hasVerifiedToken = useRef(false);
  
  const [status, setStatus] = useState<'nothing' | 'loading' | 'error' | 'done'>('nothing');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
   if (!token || hasVerifiedToken.current) return;

    hasVerifiedToken.current = true;
    setStatus('loading');

    verifyRegisterToken(token).then((res) => {
      if (res) {
        notify(res.message, "success");
        router.replace('/');
      } else {
        setStatus('error');
        setMessage('Something went wrong.');
        router.replace('/');
      }
      setStatus('done');
    }).catch((err) => {
      setStatus('error');
      setMessage('Verification failed.');
    });
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {status === 'loading' && <p className="text-lg">{message}</p>}
      {status === 'error' && (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">❌ Verification Failed</h1>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}