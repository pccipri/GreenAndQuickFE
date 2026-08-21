export interface CheckoutAvailabilityIssue {
  productId?: string;
  name: string;
}

export const getUnavailableCheckoutItems = (cart: { items?: Array<{ productId?: string; quantity?: number; product?: { name?: string; isAvailable?: boolean; stock?: number | null } }> }): CheckoutAvailabilityIssue[] => {
  return (cart.items ?? []).flatMap((item) => {
    const product = item.product;
    const stock = typeof product?.stock === 'number' ? product.stock : undefined;
    const quantity = item.quantity ?? 0;

    if (product?.isAvailable === false || (typeof stock === 'number' && stock < quantity)) {
      return [{ productId: item.productId, name: product?.name ?? 'Product' }];
    }

    return [];
  });
};

export const getCheckoutAvailabilityMessage = (issues: CheckoutAvailabilityIssue[], fallbackMessage: string): string => {
  if (!issues.length) {
    return '';
  }

  const names = issues.map((issue) => issue.name).filter(Boolean);
  if (!names.length) {
    return fallbackMessage;
  }

  return `${fallbackMessage}: ${names.join(', ')}`;
};
