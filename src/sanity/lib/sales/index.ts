import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { COUPON_CODES } from "@/constants/enums";

export const getActiveCouponCode = async (couponCode: COUPON_CODES) => {
  const ACTIVE_SALE_BY_COUPON_CODE_QUERY = defineQuery(`
  *[
      _type == "sale" &&
      isActive == true &&
      couponCode == $couponCode
    ] | order(validFrom desc)[0]
  `);

  try {
    const activeSale = await sanityFetch({
      query: ACTIVE_SALE_BY_COUPON_CODE_QUERY,
      params: { couponCode },
    });
    return activeSale.data || null;
  } catch (error) {
    console.error("Error fetching active sale by coupon code:", error);
    return null;
  }
};
