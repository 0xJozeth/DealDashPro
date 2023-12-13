// usePropertyId.ts
import { usePropertyIdStore } from "@/store/store";

export const usePropertyId = () => {
  const propertyId = usePropertyIdStore((state) => state.propertyId);
  return propertyId;
};
