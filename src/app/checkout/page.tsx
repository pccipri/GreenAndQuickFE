"use client";

import { FormGroup, TextField, Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { FC } from "react";
import CheckoutProduct from "../components/checkoutProducts";
import React from "react";

const Checkout: FC = () => {
    // State for payment radio buttons
    const [value, setValue] = React.useState('cash');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <>
            <h1 style={{ padding: '50px' }}>Checkout</h1>
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
                        <h3 style={{ marginBottom: '20px' }}>Personal information</h3>
                        <TextField
                            fullWidth
                            label="Full name"
                            placeholder="John Doe"
                            id="fullname"
                            type={'text'}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ mb: 2.5, mt: 2.5 }}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            placeholder="johndoe@gmail.com"
                            id="username"
                            type={'email'}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ mb: 2.5, mt: 2.5 }}
                        />
                        <TextField
                            fullWidth
                            label="Phone number"
                            placeholder="+1 (999)-999-999"
                            id="phone"
                            type={'tel'}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ mb: 2.5, mt: 2.5 }}
                        />

                        <h3 style={{ margin: '20px 0' }}>Billing address</h3>
                        <TextField
                            fullWidth
                            label="Street"
                            placeholder="St. New Aveneau no. 17"
                            id="street"
                            type={'text'}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ mb: 2.5, mt: 2.5 }}
                        />
                        <TextField
                            fullWidth
                            label="County"
                            placeholder="Cluj"
                            id="county"
                            type={'text'}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ mb: 2.5, mt: 2.5 }}
                        />
                        <TextField
                            fullWidth
                            label="City"
                            placeholder="Cluj-Napoca"
                            id="city"
                            type={'text'}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{ mb: 2.5, mt: 2.5 }}
                        />

                        <h3 style={{ margin: '20px 0' }} className="paymentDetailsSubtitle">Payment details</h3>
                        {/* Payment type, cash or card */}
                        <RadioGroup
                            aria-labelledby="payment-type-choice"
                            name="payment-type-choice-radio-buttons"
                            value={value}
                            onChange={handleChange}
                            row
                        >
                            <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                            <FormControlLabel value="card" control={<Radio />} label="Card" />
                        </RadioGroup>

                        {/* 
                            Displays the card inputs only if the option "Card" is selected
                            using the state value that checks which radio button is selected
                        */}
                        {value === 'card' && (<>
                            <TextField
                                fullWidth
                                label="Cardholder name"
                                placeholder="John Doe"
                                id="name-on-card"
                                type={'text'}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                sx={{ mb: 2.5, mt: 2.5 }}
                            />

                            <TextField
                                fullWidth
                                label="Card number"
                                placeholder="0000 0000 0000 0000"
                                id="card-number"
                                type={'number'}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                                sx={{ mb: 2.5, mt: 2.5 }}
                            />
                            <div className="cardBottomInfo"
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    gap: '20px'
                                }}
                            >
                                <TextField
                                    label="Expiration date"
                                    placeholder="00/00"
                                    id="expiration-date"
                                    type={'text'}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        }
                                    }}
                                    sx={{ mb: 2.5, mt: 2.5, width: '55%' }}
                                />
                                <TextField
                                    label="CVC"
                                    placeholder="000"
                                    id="cvc"
                                    type={'number'}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                    sx={{ mb: 2.5, mt: 2.5, width: '45%' }}
                                />
                            </div>
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
                    <h2 style={{ marginBottom: '30px' }}>Summary</h2>

                    <h4 style={{ marginBottom: '10px' }}>Products from Marcel:</h4>
                    <CheckoutProduct productName="Carrot" productImage="/images/bgplaceholder.jpeg" productPrice={24} />

                    <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Products from Ana:</h4>
                    <CheckoutProduct productName="Onions" productImage="/images/bgplaceholder.jpeg" productPrice={12} />
                    <CheckoutProduct productName="Milk" productImage="/images/bgplaceholder.jpeg" productPrice={8} />

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
                            placeholder="Coupon code"
                            id="couponCodeInput"
                            type={'text'}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                        <Button variant="contained">Apply</Button>
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
                        <p>Subtotal:</p>
                        <p style={{ margin: 0 }}>72 RON</p>
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
                        <p>Discount:</p>
                        <p style={{ margin: 0 }}>0 RON</p>
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
                        <h3>TOTAL:</h3>
                        <h3 style={{ margin: 0 }}>72 RON</h3>
                    </div>

                    <Button variant="contained" type="submit" style={{ width: '100%', marginTop: '50px' }}>Checkout now</Button>
                </div>
            </div>
        </>
    );
};

export default Checkout;