"use client"

import { FC, ReactNode } from "react";


interface CheckoutProductProps {
    productName: string;
    productImage?: ReactNode;
    productPrice: number;
}

const CheckoutProduct: FC<CheckoutProductProps> = ({ productName, productImage, productPrice }) => {
    return (
        <div
            className="checkoutProductContainer"
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                margin: '20px 0'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {productImage && (
                    <img src={productImage} alt={productName} width="60px" height="60px" />
                )}
                <h3 style={{ marginLeft: '20px', marginBottom: 0 }}>{productName}</h3>
            </div>
            <p style={{ margin: 0 }}>{productPrice} RON</p>
        </div>
    );
};

export default CheckoutProduct;