import { createContext, useState, useEffect, PropsWithChildren } from "react";

export interface FormContextType {
  title: { [key: number]: string };
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: any; // Replace 'any' with the type of your form state
  setData: React.Dispatch<React.SetStateAction<any>>; // Replace 'any' with the type of your form state
  canSubmit: boolean;
  isFormValid: boolean;
  setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  disablePrev: boolean;
  disableNext: boolean;
  prevHide: boolean;
  nextHide: boolean;
  submitHide: boolean;
  offerPrice: string;
  offerPriceError: string;
  handleOfferPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emdAmount: string;
  setEmdAmount: React.Dispatch<React.SetStateAction<string>>;
  emdAmountError: string;
  setEmdAmountError: React.Dispatch<React.SetStateAction<string>>;
  reqFinancing: boolean;
  setReqFinancing: React.Dispatch<React.SetStateAction<boolean>>;
  reqFinancingError: string;
  setReqFinancingError: React.Dispatch<React.SetStateAction<string>>;
  lenderName: string;
  setLenderName: React.Dispatch<React.SetStateAction<string>>;
  lenderNameError: string;
  setLenderNameError: React.Dispatch<React.SetStateAction<string>>;
  buyerName: string;
  setBuyerName: React.Dispatch<React.SetStateAction<string>>;
  buyerNameError: string;
  setBuyerNameError: React.Dispatch<React.SetStateAction<string>>;
  buyerCompany: string;
  setBuyerCompany: React.Dispatch<React.SetStateAction<string>>;
  buyerCompanyError: string;
  setBuyerCompanyError: React.Dispatch<React.SetStateAction<string>>;
  comments: string;
  setComments: React.Dispatch<React.SetStateAction<string>>;
  commentsError: string;
  setCommentsError: React.Dispatch<React.SetStateAction<string>>;
}

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

export const FormProvider = ({
  children,
}: {
  children: PropsWithChildren<any>;
}) => {
  const [form, setForm] = useState({});

  // Logic for step titles
  const title = {
    0: "Offer Details",
    1: "Proof of Funds",
    2: "Acceptance",
  };

  // Logic for step pages
  const [page, setPage] = useState(0);

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

  const handleOfferPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.type;
    const name = e.target.name;
    const value = type === "checkbox" ? e.target.checked : e.target.value;
    // if (e.target.value.length === 0) {
    //   setOfferPriceError("Please enter an offer price.");
    // } else {
    //   setOfferPriceError("");
    // }
    // setOfferPrice(e.target.value);

    setData((prevData: FormState) => ({
      ...prevData,
      offerPrice: e.target.value,
    }));
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  // Define data contents
  const { ...requiredInputs } = data;

  // Create boundary for ability to submit form data
  const canSubmit =
    [...Object.values(requiredInputs)].every(Boolean) &&
    page === Object.keys(title).length - 1;

  // Logic for handling offer form & validation
  const [offerPrice, setOfferPrice] = useState<string>("");
  const [offerPriceError, setOfferPriceError] = useState(
    "Enter your offer price.",
  );

  const [emdAmount, setEmdAmount] = useState<string>("");
  const [emdAmountError, setEmdAmountError] = useState(
    "Enter an amount above $5000.",
  );

  const [reqFinancing, setReqFinancing] = useState<boolean>(false);
  const [reqFinancingError, setReqFinancingError] =
    useState("Select an option.");

  const [lenderName, setLenderName] = useState<string>("");
  const [lenderNameError, setLenderNameError] = useState("Error");

  const [buyerName, setBuyerName] = useState<string>("");
  const [buyerNameError, setBuyerNameError] = useState("Error");

  const [buyerCompany, setBuyerCompany] = useState<string>("");
  const [buyerCompanyError, setBuyerCompanyError] = useState("Error");

  const [comments, setComments] = useState<string>("");
  const [commentsError, setCommentsError] = useState("Error");

  // Validation logic
  const [isFormValid, setIsFormValid] = useState(false);
  const canNextPage1 = Object.keys(data)
    .filter((key) => key.startsWith("bill") && key !== "billAddress2")
    .map((key) => data[key])
    .every(Boolean);

  const canNextPage2 = Object.keys(data)
    .filter((key) => key.startsWith("ship") && key !== "shipAddress2")
    .map((key) => data[key])
    .every(Boolean);
  const disablePrev = page === 0;

  const disableNext =
    page === Object.keys(title).length - 1 ||
    (page === 0 && !canNextPage1) ||
    (page === 1 && !canNextPage2);

  const prevHide = page === 0;
  const nextHide = page === Object.keys(title).length - 1;

  const submitHide = page !== Object.keys(title).length - 1;

  return (
    <FormContext.Provider
      value={{
        title,
        page,
        setPage,
        data,
        setData,
        canSubmit,
        isFormValid,
        setIsFormValid,
        disablePrev,
        disableNext,
        prevHide,
        nextHide,
        submitHide,
        offerPrice,
        offerPriceError,
        handleOfferPrice,
        emdAmount,
        setEmdAmount,
        emdAmountError,
        setEmdAmountError,
        reqFinancing,
        setReqFinancing,
        reqFinancingError,
        setReqFinancingError,
        lenderName,
        setLenderName,
        lenderNameError,
        setLenderNameError,
        buyerName,
        setBuyerName,
        buyerNameError,
        setBuyerNameError,
        buyerCompany,
        setBuyerCompany,
        buyerCompanyError,
        setBuyerCompanyError,
        comments,
        setComments,
        commentsError,
        setCommentsError,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
