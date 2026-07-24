export interface GroupInvitation {
    _id: string;
    groupName: string;
    invitingShopName: string;
    pickupAddress: {
        street: string;
        city: string;
        county: string;
        country: string;
        zipcode: number;
    };
};