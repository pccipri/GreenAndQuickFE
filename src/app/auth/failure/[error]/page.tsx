'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';
import KeyOffOutlinedIcon from '@mui/icons-material/KeyOffOutlined';
import Button from "node_modules/@mui/material/esm/Button/Button";

export default function FailedOAuthLoginPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('auth');
  const error = params?.error as string;
  const message: string = error ? t(error) || error : t('unknownError');

  const handleGoBack = () => {
    router.replace('/login');
  }

  return (
    <div className={styles.errorMessageContainer}>
      <KeyOffOutlinedIcon className={styles.errorIcon} />

      <h1 className="text-2xl font-bold text-red-600">{t('authFail')}</h1>

      <p>{t('authFailMessage')}</p>
      <p className={styles.errorMessage}>{message}</p>

      <p>{t('authTryAgain')}</p>

      <Button onClick={handleGoBack} className={styles.formButton} variant="contained">
        {t('goBackBtn')}
      </Button>
    </div>
  );
}
