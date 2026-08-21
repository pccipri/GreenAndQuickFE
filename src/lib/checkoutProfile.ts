export interface CheckoutProfileDefaults {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  county: string;
  country: string;
  zipcode: string;
}

export const buildCheckoutFormDefaults = (
  user: Partial<{
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
    address?: Partial<{
      street: string;
      city: string;
      county: string;
      country: string;
      zipcode: string | number;
      isDefault: boolean;
    }> | null;
  }> | null | undefined,
  addressOverride?: Partial<{
    street: string;
    city: string;
    county: string;
    country: string;
    zipcode: string | number;
    isDefault: boolean;
  }> | null
): CheckoutProfileDefaults => {
  const profileAddress = addressOverride ?? user?.address ?? null;

  return {
    fullName: [user?.firstName, user?.lastName].filter(Boolean).join(' ').trim(),
    email: user?.email ?? '',
    phone: user?.phoneNumber ?? '',
    street: profileAddress?.street ?? '',
    city: profileAddress?.city ?? '',
    county: profileAddress?.county ?? '',
    country: profileAddress?.country ?? '',
    zipcode: profileAddress?.zipcode ? String(profileAddress.zipcode) : '',
  };
};
