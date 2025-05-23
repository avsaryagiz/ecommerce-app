export const ROUTES = {
  HOME: "/",
  BASKET: "/basket",
  ORDERS: "/orders",
  PRODUCT: (productSlug: string) => `/product/${productSlug}`,
  CATEGORIES: (categorySlug: string) => `/categories/${categorySlug}`,
  SEARCH: (searchTerm: string) => `/search/${searchTerm}`,
} as const;
