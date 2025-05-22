import { formatPrice } from "@/lib/utils";
import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Title",
      type: "string",
      description: "The name of the product type",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "A unique identifier for the product type, used in URLs",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Product Description",
      type: "blockContent",
      description: "A detailed description of the product type",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "price",
      title: "Product Price",
      type: "number",
      description: "The price of the product type",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "categories",
      title: "Product Categories",
      type: "array",
      description: "The categories this product type belongs to",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stock",
      title: "Product Stock",
      type: "number",
      description: "The number of items available in stock",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: "name",
      price: "price",
      media: "image",
    },
    prepare({ title, media, price }) {
      return {
        title,
        subtitle: formatPrice(price),
        media,
      };
    },
  },
});
