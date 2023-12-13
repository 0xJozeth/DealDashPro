import { Property } from "@prisma/client";
import { create } from "zustand";

type SearchState = {
  searchParams: { pathname: string; minPrice: string; maxPrice: string } | null;
  setSearchParams: (
    params: { pathname: string; minPrice: string; maxPrice: string } | null,
  ) => void;
};

type PropertiesState = {
  allProperties: Property[];
  setAllProperties: (allProperties: Property[]) => void;
  searchProperties: Property[];
  setSearchProperties: (properties: Property[]) => void;
};

type NewPropertyIdState = {
  propertyId: string | null;
  setPropertyId: (id: string | null) => void;
};

export const useSearchParamsStore = create<SearchState>((set, get) => ({
  // Define the searchParams state
  searchParams: null,
  setSearchParams: (params) => set({ searchParams: params }),
}));

export const usePropertiesStore = create<PropertiesState>((set, get) => ({
  // Define the allProperties state
  allProperties: [],
  setAllProperties: (allProperties) => set({ allProperties }),

  searchProperties: [],
  setSearchProperties: (properties) => set({ searchProperties: properties }),

  // This function will filter the properties based on the search params
  filterProperties: (
    params: string,
    min: string,
    max: string,
    allProperties: Property[],
    searchProperties: Property[],
  ) => {
    const propertyCity = params.toLocaleLowerCase().trim();
    const propertyCounty = params.toLocaleLowerCase().trim();
    const propertyState = params.toLocaleLowerCase().trim();
    const propertyZip = params.toString().trim();

    if (!propertyCity || propertyCity.trim() === "") {
      return set({ searchProperties: allProperties });
    }

    // This is the filtered properties array
    const filteredProperties = allProperties.filter((property) => {
      return property.city?.toLocaleLowerCase().includes(propertyCity) ||
        property.county?.toLocaleLowerCase().includes(propertyCounty) ||
        property.state?.toLocaleLowerCase().includes(propertyState) ||
        property.zip?.toString().includes(propertyZip)
        ? true
        : false;
    });

    set({ searchProperties: filteredProperties });
  },
}));

export const usePropertyIdStore = create<NewPropertyIdState>((set) => ({
  propertyId: null,
  setPropertyId: (id) => set({ propertyId: id }),
}));
