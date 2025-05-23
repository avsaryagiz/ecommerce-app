import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  ScrollArea,
  Separator,
} from "@/components/ui";
import { getMyOrders } from "@/sanity/lib/orders";
import { urlFor } from "@/sanity/lib/image";
import { formatCurrency } from "@/lib/utils";
import { ROUTES } from "@/constants/app-routes";

export default async function OrdersPage() {
  const { userId } = await auth();

  // If not authenticated, redirect to home
  if (!userId) {
    return redirect(ROUTES.HOME);
  }

  // Fetch user orders from Sanity
  const orders = await getMyOrders(userId);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-start bg-gray-50 p-4 pt-10 sm:p-6"
      aria-label="User orders page"
    >
      <div className="w-full max-w-5xl">
        {/* Page title */}
        <h1 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          My Orders
        </h1>

        {/* If no orders, show empty state message */}
        {orders.length === 0 ? (
          <section
            role="alert"
            aria-live="polite"
            className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-lg font-semibold text-gray-500"
          >
            You have not placed any orders yet.
          </section>
        ) : (
          <section
            aria-label="List of user orders"
            className="flex flex-col gap-6"
          >
            {orders.map((order) => (
              <Card
                key={order.orderNumber}
                className="overflow-visible"
                tabIndex={-1}
              >
                {/* Order metadata: number, date, status, total */}
                <CardHeader className="flex flex-col gap-3 text-sm *:max-sm:items-start sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col items-start gap-1">
                    <CardTitle className="font-semibold text-gray-700">
                      Order Number
                    </CardTitle>
                    <p className="font-mono text-green-700">
                      {order.orderNumber}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <CardTitle className="font-semibold text-gray-700">
                      Order Date
                    </CardTitle>
                    <p className="font-medium text-gray-800">
                      {order.orderDate
                        ? new Date(order.orderDate).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )
                        : "N/A"}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-1">
                    <CardTitle className="font-semibold text-gray-700">
                      Status
                    </CardTitle>
                    <Badge
                      variant={order.status === "paid" ? "paid" : "default"}
                      className="text-xs font-semibold uppercase"
                      aria-label={`Order status: ${order.status}`}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <CardTitle className="text-sm font-semibold text-gray-700">
                      Total Amount
                    </CardTitle>
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(order.totalPrice ?? 0)}
                    </p>
                  </div>
                </CardHeader>

                {/* Show discount if applied */}
                {order.amountDiscount ? (
                  <div
                    className="mx-6 mb-4 flex flex-col justify-between gap-2 rounded-md bg-red-50 px-5 py-3 sm:flex-row sm:items-center"
                    role="note"
                    aria-label="Discount details"
                  >
                    <p className="text-sm font-semibold text-red-700">
                      Discount Applied:{" "}
                      {formatCurrency(order.amountDiscount, order.currency)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Original Subtotal:{" "}
                      {formatCurrency(
                        (order.totalPrice ?? 0) + order.amountDiscount,
                        order.currency,
                      )}
                    </p>
                  </div>
                ) : null}

                <Separator />

                {/* List of order items */}
                <CardContent className="px-4 sm:px-6">
                  <h2
                    className="mb-4 text-lg font-semibold text-gray-700"
                    id={`order-items-${order.orderNumber}`}
                  >
                    Order Items
                  </h2>

                  <ScrollArea
                    className="h-48 px-3"
                    aria-labelledby={`order-items-${order.orderNumber}`}
                  >
                    <div className="flex flex-col gap-4">
                      {order.products?.map((product) => (
                        <article
                          key={product.product?._id}
                          className="flex flex-col items-center gap-3 border-b border-gray-200 pb-4 last:border-b-0 sm:flex-row sm:justify-between"
                          aria-label={`${product.product?.name} - quantity: ${product.quantity ?? "N/A"}`}
                        >
                          <div className="flex items-center gap-4">
                            {/* Product image */}
                            {product.product?.image && (
                              <div className="relative h-14 w-14 overflow-hidden rounded-md bg-gray-100 sm:h-16 sm:w-16">
                                <Link
                                  href={ROUTES.PRODUCT(
                                    product.product?.slug?.current ?? "",
                                  )}
                                >
                                  <Image
                                    src={urlFor(product.product.image).url()}
                                    alt={product.product?.name ?? ""}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 56px, 64px"
                                  />
                                </Link>
                              </div>
                            )}

                            {/* Product name and quantity */}
                            <div>
                              <Link
                                href={ROUTES.PRODUCT(
                                  product.product?.slug?.current ?? "",
                                )}
                              >
                                <p className="text-base font-semibold text-gray-900">
                                  {product.product?.name}
                                </p>
                              </Link>
                              <p className="text-sm text-gray-600">
                                Quantity: {product.quantity ?? "N/A"}
                              </p>
                            </div>
                          </div>

                          {/* Price total for this product */}
                          <p className="text-right text-lg font-semibold text-gray-900 sm:min-w-[100px]">
                            {product.product?.price && product.quantity
                              ? formatCurrency(
                                  product.product.price * product.quantity,
                                  order.currency,
                                )
                              : "N/A"}
                          </p>
                        </article>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
