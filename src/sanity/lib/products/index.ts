import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

/**
 * Fetches all products belonging to a specific category by its slug.
 * Orders the products alphabetically by name.
 *
 * @param category - The slug of the category to filter products
 * @returns Array of products in the specified category or empty array on failure
 */
export const getProductsByCategory = async (category: string) => {
  const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
    *[
      _type == "product" && 
      references(*[_type == "category" && slug.current == $category]._id)
    ] | order(name asc)
  `);

  try {
    const products = await sanityFetch({
      query: PRODUCTS_BY_CATEGORY_QUERY,
      params: { category },
    });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

/**
 * Fetches a single product by its slug.
 * Returns null if product is not found or on error.
 *
 * @param slug - The slug of the product to fetch
 * @returns The product object or null
 */
export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_SLUG_QUERY = defineQuery(`
    *[
      _type == "product" && 
      slug.current == $slug
    ] | order(name asc)[0]
  `);

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });
    return product.data || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};

/**
 * Searches products by name using a partial match.
 * The search parameter supports wildcard at the end for prefix matching.
 *
 * @param searchParam - The partial name to search for
 * @returns Array of matched products or empty array on failure
 */
export const searchProductsByName = async (searchParam: string) => {
  const PRODUCT_SEARCH_QUERY = defineQuery(`
    *[
    _type == "product" && 
    name match $searchParam
    ] | order(name asc)
  `);

  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: { searchParam: `${searchParam}*` },
    });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching products by name:", error);
    return [];
  }
};

/**
 * Fetches all categories sorted by name ascending.
 *
 * @returns Array of all category objects or empty array on failure
 */
export const getAllCategories = async () => {
  const ALL_CATEGORIES_QUERY = defineQuery(`
    *[
    _type == "category"
    ] | order(name asc)
  `);

  try {
    const categories = await sanityFetch({
      query: ALL_CATEGORIES_QUERY,
    });
    return categories.data || [];
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
};

/**
 * Fetches all products sorted by name ascending.
 *
 * @returns Array of all product objects or empty array on failure
 */
export const getAllProducts = async () => {
  const ALL_PRODUCTS_QUERY = defineQuery(`
   *[
    _type == "product"
    ] | order(name asc)
  `);

  try {
    const products = await sanityFetch({
      query: ALL_PRODUCTS_QUERY,
    });
    return products.data || [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};
