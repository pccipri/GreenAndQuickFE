"use client"

import Button from "@mui/material/Button";
import { resendVerificationEmail } from "@/services/authService";
import { notify } from "@/utils/toast";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function VerifyEmailInfoPage() {
  const t = useTranslations("auth");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    if (!email || isResending) return;

    setIsResending(true);
    try {
      const response = await resendVerificationEmail(email);
      if (response) {
        notify(response.message || t("resendVerificationSent"), "success");
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-3xl font-bold">{t("checkInboxTitle")}</h1>
      <p>
        {t("checkInboxDescription")}{email ? ` ${email}` : ""}.
      </p>
      <div className="flex items-center gap-3">
        <Button
          variant="outlined"
          onClick={handleResend}
          disabled={!email || isResending}
        >
          {isResending ? t("resendingVerification") : t("resendVerification")}
        </Button>
        <Button variant="contained" href="/login">{t("goBackBtn")}</Button>
      </div>
    </div>
  );
}
