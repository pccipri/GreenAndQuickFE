type CardType = "Visa" | "MasterCard" | "PayPal";

export interface CreditCardState {
    type: CardType;
    number: string;
    name: string;
    expiry: string;
    cvc: string;
};