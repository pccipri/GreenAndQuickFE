'use client';

import { useParams, useRouter } from 'next/navigation';

export default function FailedOAuthLoginPage() {
  const params = useParams();
  const router = useRouter();
  const error = params?.error as string;
  const message: string = error ? error : "An unknown error occurred during authentication."; 

  const handleGoBack = () => {
    router.replace('/login');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">❌ Verification Failed</h1>
          <p>{message}</p>
          <button
            onClick={handleGoBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Go Back to Login
          </button>
        </div>
    </div>
  );
}
