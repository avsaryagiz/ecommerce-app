import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
  name: "sale",
  title: "Sale",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Sale Title",
      type: "string",
      description: "The name of the sale",
    }),
    defineField({
      name: "description",
      title: "Sale Description",
      type: "string",
      description: "A detailed description of the sale",
    }),
    defineField({
      name: "discounrAmount",
      title: "Discount Amount",
      type: "number",
      description: "Amount off in percentage or fixed value",
    }),
    defineField({
      name: "couponCode",
      title: "Coupon Code",
      type: "string",
      description: "The code that customers can use to avail the discount",
    }),
    defineField({
      name: "validFrom",
      title: "Valid From",
      type: "datetime",
      description: "The date and time when the sale starts",
    }),
    defineField({
      name: "validUntil",
      title: "Valid Until",
      type: "datetime",
      description: "The date and time when the sale ends",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Indicates whether the sale is currently active",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      discountAmount: "discounrAmount",
      couponCode: "couponCode",
      isActive: "isActive",
    },
    prepare({ title, discountAmount, couponCode, isActive }) {
      const status = isActive ? "Active" : "Inactive";
      return {
        title,
        subtitle: `${discountAmount}% off - Code: ${couponCode} - ${status}`,
      };
    },
  },
});
