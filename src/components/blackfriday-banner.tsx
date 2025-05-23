import { COUPON_CODES } from "@/constants/enums";
import { getActiveCouponCode } from "@/sanity/lib/sales";

export default async function BlackFridayBanner() {
  // Fetch the active Black Friday sale data
  const sale = await getActiveCouponCode(COUPON_CODES.BFRIDAY);

  // If no active sale is found, don't render the banner
  if (!sale) {
    return null;
  }

  return (
    <section className="container mx-auto mt-2 rounded-lg bg-gradient-to-r from-red-600 to-black px-6 py-10 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1">
          {/* Sale title */}
          <h2 className="mb-4 text-left text-3xl font-extrabold sm:text-5xl">
            {sale.title}
          </h2>

          {/* Sale description */}
          <p className="mb-6 text-left text-xl font-semibold sm:text-3xl">
            {sale.description}
          </p>

          {/* Coupon code and discount amount display */}
          <div className="flex">
            <div className="transform rounded-full bg-white px-6 py-4 text-black shadow-md transition duration-300 hover:scale-105">
              <span className="text-base font-bold sm:text-xl">
                Use code:{" "}
                <span className="text-red-600">{sale.couponCode}</span>
              </span>
              <span className="ml-2 text-base font-bold sm:text-xl">
                for {sale.discounrAmount}% off
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
