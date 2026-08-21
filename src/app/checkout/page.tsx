"use client";

import { Box, CircularProgress, FormGroup, TextField, Button, FormControlLabel, Radio, RadioGroup, Typography, MenuItem } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutProduct from "../components/checkoutProducts";
import { createCardCheckout, createCashCheckout, getCart, getCartSummary, resolveCheckoutClientSecret } from "@/services/cartService";
import { getPaymentMethods } from "@/services/paymentMethodService";
import type { Cart, PaymentMethod } from "@/interfaces/Cart";
import type UserAddress from "@/interfaces/Address";
import { notify } from "@/utils/toast";
import { getStripePaymentOutcome } from "@/lib/stripeCheckout";
import { buildCheckoutFormDefaults } from "@/lib/checkoutProfile";
import { getCheckoutAvailabilityMessage, getUnavailableCheckoutItems } from "@/lib/checkoutAvailability";
import { useAuth } from "@/contexts/AuthProvider";

const Checkout: FC = () => {
    const t = useTranslations('CheckoutPage');
    const router = useRouter();
    const { user } = useAuth();
    const [value, setValue] = useState<'cash' | 'card'>('cash');
    const [cart, setCart] = useState<Cart>({ items: [] });
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [verificationNotice, setVerificationNotice] = useState<string | null>(null);
    const [saveAddress, setSaveAddress] = useState(false);
    const [savedAddresses, setSavedAddresses] = useState<UserAddress[]>([]);
    const [selectedSavedAddressKey, setSelectedSavedAddressKey] = useState<string>('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [county, setCounty] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [zipcode, setZipcode] = useState('');

    useEffect(() => {
        const loadCheckoutData = async () => {
            try {
                setLoading(true);
                const [cartData, methods] = await Promise.all([getCart(), getPaymentMethods()]);
                setCart(cartData);
                setPaymentMethods(methods);
                const defaultMethod = methods.find((method) => method.isDefault);
                setSelectedPaymentMethodId(defaultMethod?._id ?? methods[0]?._id ?? '');
            } catch (err: any) {
                setError(err.message || t('loadError'));
            } finally {
                setLoading(false);
            }
        };

        loadCheckoutData();
    }, [t]);

    useEffect(() => {
        const normalizedAddresses = [
            ...(Array.isArray((user as any)?.addresses) ? (user as any).addresses : []),
            ...(user?.address ? [user.address] : []),
        ].filter(Boolean) as UserAddress[];

        setSavedAddresses(normalizedAddresses);
        if (normalizedAddresses.length > 0 && !selectedSavedAddressKey) {
            const firstKey = `${normalizedAddresses[0].street}-${normalizedAddresses[0].city}-${normalizedAddresses[0].county}-${normalizedAddresses[0].zipcode}`;
            setSelectedSavedAddressKey(firstKey);
        }
    }, [user]);

    useEffect(() => {
        const defaults = buildCheckoutFormDefaults(user, savedAddresses[0]);
        setFullName(defaults.fullName);
        setEmail(defaults.email);
        setPhone(defaults.phone);
        setStreet(defaults.street);
        setCounty(defaults.county);
        setCity(defaults.city);
        setCountry(defaults.country);
        setZipcode(defaults.zipcode);
    }, [user, savedAddresses[0]]);

    const summary = useMemo(() => getCartSummary(cart), [cart]);
    const unavailableItems = useMemo(() => getUnavailableCheckoutItems(cart), [cart]);
    const availabilityMessage = useMemo(() => getCheckoutAvailabilityMessage(unavailableItems, t('unavailableItemsMessage')), [t, unavailableItems]);
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';
    const stripePromise = useMemo(() => {
        return publishableKey ? loadStripe(publishableKey) : null;
    }, [publishableKey]);
    const subtotal = summary.totalAmount;
    const shippingFee = 20;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value as 'cash' | 'card');
    };

    const handleSavedAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const addressKey = event.target.value;
        setSelectedSavedAddressKey(addressKey);
        const selectedAddress = savedAddresses.find((address, index) => {
            const key = `${address.street}-${address.city}-${address.county}-${address.zipcode}`;
            return key === addressKey || `${index}-${key}` === addressKey;
        });

        if (selectedAddress) {
            const defaults = buildCheckoutFormDefaults(user, selectedAddress);
            setFullName(defaults.fullName);
            setEmail(defaults.email);
            setPhone(defaults.phone);
            setStreet(defaults.street);
            setCounty(defaults.county);
            setCity(defaults.city);
            setCountry(defaults.country);
            setZipcode(defaults.zipcode);
            setSaveAddress(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (unavailableItems.length > 0) {
            const message = availabilityMessage || t('unavailableItemsMessage');
            setError(message);
            notify(message, 'warning');
            return;
        }

        if (!fullName.trim() || !email.trim() || !phone.trim() || !street.trim() || !county.trim() || !city.trim() || !country.trim() || !zipcode.trim()) {
            const message = t('validationCompleteFields');
            setError(message);
            notify(message, 'warning');
            return;
        }

        if (value === 'card' && !selectedPaymentMethodId) {
            const message = t('validationSelectCard');
            setError(message);
            notify(message, 'warning');
            return;
        }

        setSubmitting(true);
        setError(null);
        setVerificationNotice(null);

        try {
            const payload = {
                paymentMethod: value,
                paymentMethodId: value === 'card' ? selectedPaymentMethodId : undefined,
                address: {
                    street,
                    city,
                    county,
                    country: 'Romania',
                    zipcode,
                    isDefault: false,
                },
                saveAddress,
            };

            if (value === 'card') {
                const selectedMethod = paymentMethods.find((method) => (method._id ?? method.stripePaymentMethodId) === selectedPaymentMethodId);
                const stripePaymentMethodId = selectedMethod?.stripePaymentMethodId ?? selectedPaymentMethodId;
                const checkoutResult = await createCardCheckout(payload);
                const orderId = checkoutResult?.orderId;
                const resolvedClientSecret = resolveCheckoutClientSecret(checkoutResult);

                if (!resolvedClientSecret) {
                    throw new Error(t('missingClientSecret'));
                }

                if (!stripePromise) {
                    throw new Error(t('stripeNotConfigured'));
                }

                const stripe = await stripePromise;
                if (!stripe) {
                    throw new Error(t('stripeUnavailable'));
                }

                const confirmationResult = await stripe.confirmCardPayment(resolvedClientSecret, {
                    payment_method: stripePaymentMethodId,
                });
                const paymentOutcome = getStripePaymentOutcome(confirmationResult, t('paymentConfirmationFailed'));

                if (!paymentOutcome.ok) {
                    if (paymentOutcome.requiresAction) {
                        const message = t('paymentRequiresAction');
                        setVerificationNotice(message);
                        notify(message, 'warning');
                    } else {
                        throw new Error(paymentOutcome.message || t('paymentConfirmationFailed'));
                    }
                    return;
                }

                notify(t('paymentConfirmed'), 'success');
                if (orderId) {
                    router.push(`/order-confirmation?orderId=${orderId}`);
                } else {
                    router.push('/order-confirmation');
                }
            } else {
                const checkoutResult = await createCashCheckout(payload);
                const orderId = checkoutResult?.orderId;
                notify(t('orderPlaced'), 'success');
                if (orderId) {
                    router.push(`/order-confirmation?orderId=${orderId}`);
                } else {
                    router.push('/order-confirmation');
                }
            }
        } catch (err: any) {
            const message = err.message || t('submitError');
            setError(message);
            notify(message, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <h1 style={{ padding: '50px' }}>{t('title')}</h1>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                    <CircularProgress />
                </Box>
            ) : (
            <form onSubmit={handleSubmit}>
            <div className="parentContainerCheckout"
                style={{
                    backgroundColor: 'white',
                    color: 'black',
                    height: '100%',
                    width: '100%',
                    display: 'flex'
                }}
            >
                {/* User data inputs */}
                <div className="checkoutFormContainer"
                    style={{
                        height: '100%',
                        width: '50%',
                        padding: '0 50px 50px 50px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}
                >
                    <FormGroup sx={{ width: '100%' }}>
                        <h3 style={{ marginBottom: '20px' }}>{t('personalInfo')}</h3>
                        <TextField
                            fullWidth
                            label={t('fullName')}
                            placeholder={t('fullNamePlaceholder')}
                            id="fullname"
                            type={'text'}
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ mb: 2.5, mt: 2.5 }}
                        />
                        <TextField
                            fullWidth
                            label={t('email')}
                            placeholder={t('emailPlaceholder')}
                            id="username"
                            type={'email'}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ mb: 2.5, mt: 2.5 }}
                        />
                        <TextField
                            fullWidth
                            label={t('phone')}
                            placeholder={t('phonePlaceholder')}
                            id="phone"
                            type={'tel'}
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ mb: 2.5, mt: 2.5 }}
                        />

                        <h3 style={{ margin: '20px 0' }}>{t('billingAddress')}</h3>
                        {savedAddresses.length > 0 ? (
                            <TextField
                                select
                                fullWidth
                                label={t('savedAddresses')}
                                value={selectedSavedAddressKey}
                                onChange={handleSavedAddressChange}
                                sx={{ mb: 2.5, mt: 1 }}
                            >
                                {savedAddresses.map((address, index) => {
                                    const key = `${address.street}-${address.city}-${address.county}-${address.zipcode}`;
                                    return (
                                        <MenuItem key={`${index}-${key}`} value={`${index}-${key}`}>
                                            {address.street}, {address.city}, {address.county} {address.zipcode}
                                        </MenuItem>
                                    );
                                })}
                            </TextField>
                        ) : null}
                        <FormControlLabel
                            control={<Radio checked={saveAddress} onChange={() => setSaveAddress((current) => !current)} />}
                            label={t('saveAddress')}
                            sx={{ mb: 1 }}
                        />
                        <TextField
                            fullWidth
                            label={t('street')}
                            placeholder={t('streetPlaceholder')}
                            id="street"
                            type={'text'}
                            value={street}
                            onChange={(event) => setStreet(event.target.value)}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ mb: 2.5, mt: 2.5 }}
                        />
                        <TextField
                            fullWidth
                            label={t('county')}
                            placeholder={t('countyPlaceholder')}
                            id="county"
                            type={'text'}
                            value={county}
                            onChange={(event) => setCounty(event.target.value)}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ mb: 2.5, mt: 2.5 }}
                        />
                        <TextField
                            fullWidth
                            label={t('city')}
                            placeholder={t('cityPlaceholder')}
                            id="city"
                            type={'text'}
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ mb: 2.5, mt: 2.5 }}
                        />
                        <TextField
                            fullWidth
                            label={t('country')}
                            placeholder={t('countryPlaceholder')}
                            id="country"
                            type={'text'}
                            value={country}
                            onChange={(event) => setCountry(event.target.value)}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ mb: 2.5, mt: 2.5 }}
                        />
                        <TextField
                            fullWidth
                            label={t('zipcode')}
                            placeholder={t('zipcodePlaceholder')}
                            id="zipcode"
                            type={'text'}
                            value={zipcode}
                            onChange={(event) => setZipcode(event.target.value)}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ mb: 2.5, mt: 2.5 }}
                        />

                        <h3 style={{ margin: '20px 0' }} className="paymentDetailsSubtitle">{t('paymentDetails')}</h3>
                        {/* Payment type, cash or card */}
                        <RadioGroup
                            aria-labelledby="payment-type-choice"
                            name="payment-type-choice-radio-buttons"
                            value={value}
                            onChange={handleChange}
                            row
                        >
                            <FormControlLabel value="cash" control={<Radio />} label={t('cash')} />
                            <FormControlLabel value="card" control={<Radio />} label={t('card')} />
                        </RadioGroup>

                        {/* 
                            Displays the card inputs only if the option "Card" is selected
                            using the state value that checks which radio button is selected
                        */}
                        {value === 'card' && (<>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {t('cardPaymentHint')}
                            </Typography>
                            {paymentMethods.length > 0 ? (
                                <TextField
                                    select
                                    fullWidth
                                    label={t('savedCard')}
                                    value={selectedPaymentMethodId}
                                    onChange={(event) => setSelectedPaymentMethodId(event.target.value)}
                                    sx={{ mb: 2.5, mt: 2.5 }}
                                >
                                    {paymentMethods.map((method) => (
                                        <MenuItem key={method._id ?? method.stripePaymentMethodId} value={method._id ?? method.stripePaymentMethodId}>
                                            {method.brand} •••• {method.last4} {method.isDefault ? `• ${t('defaultBadge')}` : ''}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            ) : (
                                <Typography sx={{ mt: 2, mb: 2 }}>
                                    {t('noSavedCards')}
                                </Typography>
                            )}

                            <Button
                                variant="text"
                                sx={{ mb: 1.5, textTransform: 'none', width: 'fit-content' }}
                                onClick={() => router.push('/addCard?returnTo=/checkout')}
                            >
                                {t('addNewCard')}
                            </Button>
                        </>
                        )}
                    </FormGroup>
                </div>

                {/* Summary and checkout button */}
                <div className="summaryContainer"
                    style={{
                        height: '100%',
                        width: '50%',
                        padding: '0 50px 50px 50px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                    }}
                >
                    <h2 style={{ marginBottom: '30px' }}>{t('summary')}</h2>

                    {cart.items.length === 0 ? (
                        <Typography variant="body1">{t('emptyCart')}</Typography>
                    ) : cart.items.map((item, index) => (
                        <CheckoutProduct
                            key={item.productId ?? index}
                            productName={item.product?.name ?? 'Product'}
                            productImage={item.product?.imageUrl ?? '/images/bgplaceholder.jpeg'}
                            productPrice={item.priceAtAdd ?? item.product?.price ?? 0}
                        />
                    ))}

                    {unavailableItems.length > 0 ? (
                        <Typography color="error" sx={{ mb: 2, fontWeight: 600 }}>
                            {availabilityMessage}
                        </Typography>
                    ) : null}

                    <div className="couponCode"
                        style={{
                            display: 'flex',
                            width: '100%',
                            gap: '20px',
                            margin: '30px 0'
                        }}
                    >
                        <TextField
                            fullWidth
                            placeholder={t('couponPlaceholder')}
                            id="couponCodeInput"
                            type={'text'}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                        <Button variant="contained">{t('apply')}</Button>
                    </div>


                    {/* Subtotal container*/}
                    <div
                        className="subTotal"
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: '20px'
                        }}
                    >
                        <p>{t('subtotal')}</p>
                        <p style={{ margin: 0 }}>{subtotal} RON</p>
                    </div>

                    {/* Discount container*/}
                    <div
                        className="discount"
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: '20px'
                        }}
                    >
                        <p>{t('shipping')}</p>
                        <p style={{ margin: 0 }}>{shippingFee} RON</p>
                    </div>

                    {/* Total container*/}
                    <div
                        className="discount"
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: '40px'
                        }}
                    >
                        <h3>{t('total')}</h3>
                        <h3 style={{ margin: 0 }}>{subtotal + shippingFee} RON</h3>
                    </div>

                    {error ? <Typography color="error" sx={{ mt: 2 }}>{error}</Typography> : null}
                    {verificationNotice ? (
                        <Box sx={{ mt: 2, p: 1.5, border: '1px solid #f0b429', borderRadius: 1, bgcolor: '#fff8e1', width: '100%' }}>
                            <Typography color="warning.main" sx={{ fontWeight: 600 }}>{verificationNotice}</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                {t('paymentVerificationHint')}
                            </Typography>
                        </Box>
                    ) : null}

                    <Button variant="contained" type="submit" disabled={submitting || cart.items.length === 0} style={{ width: '100%', marginTop: '50px' }}>
                        {submitting ? t('processing') : value === 'card' ? t('payNowCard') : t('payNowCash')}
                    </Button>
                </div>
            </div>
            </form>
            )}
        </>
    );
};

export default Checkout;