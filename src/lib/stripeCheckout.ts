export interface StripePaymentOutcome {
  ok: boolean;
  requiresAction: boolean;
  message?: string;
}

export const getStripePaymentOutcome = (
  result: { error?: { message?: string } | null; paymentIntent?: { status?: string } | null },
  fallbackMessage: string,
): StripePaymentOutcome => {
  if (result.error?.message) {
    return {
      ok: false,
      requiresAction: false,
      message: result.error.message,
    };
  }

  if (!result.paymentIntent) {
    return {
      ok: false,
      requiresAction: false,
      message: fallbackMessage,
    };
  }

  const paymentStatus = result.paymentIntent.status;

  if (paymentStatus === 'requires_action') {
    return {
      ok: false,
      requiresAction: true,
      message: fallbackMessage,
    };
  }

  if (
    paymentStatus === 'succeeded' ||
    paymentStatus === 'processing' ||
    paymentStatus === 'requires_capture'
  ) {
    return {
      ok: true,
      requiresAction: false,
    };
  }

  return {
    ok: false,
    requiresAction: false,
    message: fallbackMessage,
  };
};
