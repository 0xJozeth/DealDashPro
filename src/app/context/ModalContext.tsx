import { createContext, useState, useEffect, PropsWithChildren } from "react";

export interface FormContextType {}

// Define the type of your form state
interface FormState {
  offerPrice: string;
  emdAmount: string;
  reqFinancing: boolean;
  lenderName: string;
  buyerName: string;
  buyerCompany: string;
  comments: string;
  [key: string]: any;

  // TODO: Add other fields ...
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: PropsWithChildren }) => {
  // Logic for creating an offer data object after form submission
  const [data, setData] = useState<FormState>({
    offerPrice: "",
    emdAmount: "",
    reqFinancing: "",
    lenderName: "",
    buyerName: "",
    buyerCompany: "",
    comments: "",
    /* canSubmit: false, */
  } as any);

  return;
  <FormContext.Provider value={{}}>{children}</FormContext.Provider>;
};

export default FormContext;
