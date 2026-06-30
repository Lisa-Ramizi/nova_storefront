"use client";

import { useState } from "react";

export const defaultCategories = [
  "All",
  "Smartphones",
  "Laptops",
  "Fragrances",
  "Skincare",
  "Groceries",
  "Furniture",
] as const;

type CategoryFilterProps = {
  categories?: readonly string[];
  selected?: string;
  defaultSelected?: string;
  onSelect?: (category: string) => void;
  className?: string;
};

export function CategoryFilter({
  categories = defaultCategories,
  selected: selectedProp,
  defaultSelected = categories[0],
  onSelect,
  className = "",
}: CategoryFilterProps) {
  const [internalSelected, setInternalSelected] = useState(defaultSelected);
  const selected = selectedProp ?? internalSelected;

  function handleSelect(category: string) {
    if (category === selected) {
      return;
    }

    if (selectedProp === undefined) {
      setInternalSelected(category);
    }
    onSelect?.(category);
  }

  return (
    <div
      role="radiogroup"
      aria-label="Filter by category"
      className={`flex gap-2 overflow-x-auto pb-1 ${className}`}
    >
      {categories.map((category) => {
        const isSelected = selected === category;

        return (
          <button
            key={category}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => handleSelect(category)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isSelected
                ? "bg-foreground text-surface"
                : "border border-border bg-surface text-foreground hover:border-foreground-muted"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
