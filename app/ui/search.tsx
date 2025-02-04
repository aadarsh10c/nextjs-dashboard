/**
 * Search component that provides a debounced search input field.
 *
 * @param {Object} props - The component props.
 * @param {string} props.placeholder - The placeholder text for the search input.
 *
 * @returns {JSX.Element} The rendered search component.
 *
 * This component uses the `useDebouncedCallback` hook to handle search input changes
 * with a debounce delay of 300ms. It updates the URL query parameter `query` based on
 * the input value. If the input is empty, the `query` parameter is removed from the URL.
 *
 * The component also includes a magnifying glass icon from the `@heroicons/react` library.
 *
 * @example
 * ```tsx
 * <Search placeholder="Search..." />
 * ```
 */
"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
      Search
      </label>
      <input
      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
      placeholder={placeholder}
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("query")?.toString() || ""}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
