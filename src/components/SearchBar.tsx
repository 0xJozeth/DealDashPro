"use client";
import axios from "axios";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import path from "path";
import { useSearchParamsStore } from "@/store/store";
import { StringParam, useQueryParam } from "use-query-params";

// Define the query schema type
type querySchemaType = z.infer<typeof querySchema>;

// Define the query schema
export const querySchema = z.object({
  q: z.string(),
  priceRange: z.number(),
});

function SearchBar() {
  // use store from Zustand to set the search params. See src/store/store.ts. Also importing directly into Home() in src/app/page.tsx
  const setSearchParams = useSearchParamsStore(
    (state) => state.setSearchParams,
  );
  //  Define the useForm properties
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
    clearErrors,
    setValue,
  } = useForm<querySchemaType>({
    resolver: zodResolver(querySchema),
  });

  // This is what we'll use to update the URL string
  // const [pathname, setPathname] = useQueryParam("pathname", StringParam);
  const [pathname, setPathname] = useState("");
  const [minPrice, setMinPrice] = useState("1");
  const [maxPrice, setMaxPrice] = useState("Infinity");
  const router = useRouter();

  const onSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submit behavior
    event.preventDefault();

    // Call setSearchParams when a search is made
    setSearchParams({ pathname, minPrice, maxPrice });

    // router.push(`?q=${pathname}`);

    router.push(
      `?q=${pathname}&minPriceFilter=${minPrice}&maxPriceFilter=${maxPrice}`,
    );

    const url = `/api/search/${pathname}/minPrice/${minPrice}/maxPrice/${maxPrice}`;
    console.log("Request URL:", url);

    // GET request to the /api/search endpoint
    const response = await axios
      .get(url)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      id="searchBar"
      onSubmit={onSearch}
      className={`duration-30 mb-4 flex w-[500px] 
      items-center justify-between gap-x-2 rounded-full border bg-white p-2 pl-4 text-neutral-500 transition-all`}
    >
      <input
        type="text"
        placeholder="Search by City or State"
        className="text-base-font-normal  w-1/2 border-r border-neutral-200 leading-normal text-neutral-500 focus:outline-none"
        value={pathname || ""}
        onChange={(event) => {
          {
            setPathname(event.target.value), console.log("pathname", pathname);
          }
        }}
      />
      <Select
        onValueChange={(value) => {
          setMinPrice(value), console.log("minPrice", minPrice);
        }}
      >
        <SelectTrigger className="w-1/4 truncate border-none text-sm text-neutral-500">
          <SelectValue placeholder={"Min Price"} defaultValue={"5000000"} />
        </SelectTrigger>
        <SelectContent className="z-[9999]">
          <SelectItem
            value={"1"}
            disabled={!!maxPrice && Number("1") > Number(maxPrice)}
          >
            $1
          </SelectItem>
          <SelectItem
            value={"100000"}
            disabled={!!maxPrice && Number("100000") > Number(maxPrice)}
          >
            $100K
          </SelectItem>
          <SelectItem
            value={"250000"}
            disabled={!!maxPrice && Number("250000") > Number(maxPrice)}
          >
            $250K
          </SelectItem>
          <SelectItem
            value={"500000"}
            disabled={!!maxPrice && Number("500000") > Number(maxPrice)}
          >
            $500K
          </SelectItem>
          <SelectItem
            value={"1000000"}
            disabled={!!maxPrice && Number("1000000") > Number(maxPrice)}
          >
            $1M
          </SelectItem>
          <SelectItem
            value={"3000000"}
            disabled={!!maxPrice && Number("3000000") > Number(maxPrice)}
          >
            $3M
          </SelectItem>
          <SelectItem
            value={"5000000"}
            disabled={!!maxPrice && Number("5000000") > Number(maxPrice)}
          >
            $5M
          </SelectItem>
          <SelectItem
            value={"7500000"}
            disabled={!!maxPrice && Number("7500000") > Number(maxPrice)}
          >
            $7.5M
          </SelectItem>
          <SelectItem
            value={"10000000"}
            disabled={!!maxPrice && Number("10000000") > Number(maxPrice)}
          >
            $10M
          </SelectItem>
          <SelectItem
            value={"15000000"}
            disabled={!!maxPrice && Number("15000000") > Number(maxPrice)}
          >
            $15M
          </SelectItem>
          <SelectItem
            value={"20000000"}
            disabled={!!maxPrice && Number("20000000") > Number(maxPrice)}
          >
            $20M+
          </SelectItem>
        </SelectContent>
      </Select>

      {minPrice && (
        <Select
          onValueChange={(value) => {
            setMaxPrice(value), console.log("maxPrice", maxPrice);
          }}
        >
          <SelectTrigger className="w-1/4 truncate border-none text-sm text-neutral-500">
            <SelectValue placeholder={"Max Price"} />
          </SelectTrigger>
          <SelectContent className="z-[9999]">
            <SelectItem value={"1"} disabled={Number("1") < Number(minPrice)}>
              $1
            </SelectItem>
            <SelectItem
              value={"100000"}
              disabled={Number("100000") < Number(minPrice)}
            >
              $100K
            </SelectItem>
            <SelectItem
              value={"250000"}
              disabled={Number("250000") < Number(minPrice)}
            >
              $250K
            </SelectItem>
            <SelectItem
              value={"500000"}
              disabled={Number("500000") < Number(minPrice)}
            >
              $500K
            </SelectItem>
            <SelectItem
              value={"1000000"}
              disabled={Number("1000000") < Number(minPrice)}
            >
              $1M
            </SelectItem>
            <SelectItem
              value={"3000000"}
              disabled={Number("3000000") < Number(minPrice)}
            >
              $3M
            </SelectItem>
            <SelectItem
              value={"5000000"}
              disabled={!!maxPrice && Number("5000000") > Number(maxPrice)}
            >
              $5M
            </SelectItem>
            <SelectItem
              value={"7500000"}
              disabled={!!maxPrice && Number("7500000") > Number(maxPrice)}
            >
              $7.5M
            </SelectItem>
            <SelectItem
              value={"10000000"}
              disabled={!!maxPrice && Number("10000000") > Number(maxPrice)}
            >
              $10M
            </SelectItem>
            <SelectItem
              value={"15000000"}
              disabled={!!maxPrice && Number("15000000") > Number(maxPrice)}
            >
              $15M
            </SelectItem>
            <SelectItem
              value={"20000000"}
              disabled={!!maxPrice && Number("20000000") > Number(maxPrice)}
            >
              $20M+
            </SelectItem>
          </SelectContent>
        </Select>
      )}

      {/* <input
        {...register("priceRange")}
        type="text"
        placeholder="Enter a price range"
        className="text-base-font-normal  w-1/2 border-r border-neutral-200 leading-normal text-neutral-500 focus:outline-none"
        // onChange={(event) => {
        //   {
        //     setPriceRange(event.target.value),
        //       console.log("priceRange", priceRange);
        //   }
        // }}
        onChange={(e) => {
          // Clear errors when the input changes
          clearErrors("priceRange");
          // Prevent non-numeric input
          const value = e.target.value.replace(/[^0-9.]/g, "");
          // Format the value as a dollar amount
          const formattedValue = "$" + Number(value).toLocaleString();
          // Update the form value
          setValue("priceRange", formattedValue);
        }}
      /> */}
      <button type="submit" title="Search">
        <Image
          src="/search1.svg"
          width={32}
          height={32}
          alt="search"
          className="flex items-center justify-center"
        />
      </button>
    </form>
  );
}

export default SearchBar;
