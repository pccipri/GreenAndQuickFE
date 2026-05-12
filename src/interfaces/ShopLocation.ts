import BaseAddress from "./BaseAddress";

export default interface ShopLocation extends BaseAddress {
  coordinates?: {
    lat: number;
    lng: number;
  } | null;
}
