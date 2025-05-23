"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDownIcon } from "lucide-react";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui";
import { ROUTES } from "@/constants/app-routes";
import { cn } from "@/lib/utils";
import type { Category } from "../../sanity.types";

interface CategorySelectorProps {
  categories: Category[];
}

export default function CategorySelector({
  categories,
}: CategorySelectorProps) {
  const [open, setOpen] = useState(false);

  // Currently selected category ID
  const [value, setValue] = useState<string | null>(null);
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Trigger button for category dropdown */}
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {/* Display selected category title or placeholder text */}
          {value
            ? categories.find((cat) => cat._id === value)?.title
            : "Filter by category"}
          <ChevronsUpDownIcon className="ml-2 size-4 shrink-0" />
        </Button>
      </PopoverTrigger>

      {/* Popover content with searchable category list */}
      <PopoverContent className="w-[200px] p-0 shadow-md">
        <Command>
          {/* Search input to filter categories */}
          <CommandInput
            placeholder="Search category..."
            className="h-9"
            onKeyDown={(e) => {
              // On Enter key, navigate to the first matching category page
              if (e.key === "Enter") {
                const selectedCategory = categories.find((c) =>
                  c.title
                    ?.toLowerCase()
                    .includes(e.currentTarget.value.toLowerCase()),
                );
                if (selectedCategory?.slug?.current) {
                  router.push(ROUTES.CATEGORIES(selectedCategory.slug.current));
                  setOpen(false);
                  setOpen(false);
                }
              }
            }}
          />
          <CommandList>
            {/* Show if no matching category found */}
            <CommandEmpty>No category found.</CommandEmpty>

            {/* List of all categories */}
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.title}
                  onSelect={() => {
                    router.push(
                      ROUTES.CATEGORIES(category.slug?.current ?? ""),
                    );
                    setOpen(false);
                    setOpen(false);
                  }}
                >
                  {category.title}

                  {/* Check icon visible only for selected category */}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === category._id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
