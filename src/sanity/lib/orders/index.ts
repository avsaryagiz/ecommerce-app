import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

/**
 * Fetches orders for a specific user from Sanity CMS.
 * Orders are filtered by `clerkUserId` and sorted by `orderDate` descending.
 * Each order includes all its fields plus detailed product information.
 *
 * @param userId - The unique identifier of the user whose orders are requested
 * @returns An array of orders with populated product details
 * @throws Throws an error if userId is not provided or fetch fails
 */
export async function getMyOrders(userId: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const MY_ORDERS_QUERY = defineQuery(`
  *[_type=="order" && clerkUserId == $userId] | order(orderDate desc){
    ...,
    products[]{
      ...,
      product->
      }
  }
  `);

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders.data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}
