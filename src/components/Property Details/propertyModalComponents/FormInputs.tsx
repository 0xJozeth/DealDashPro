import OfferStepOne from "./OfferStepOne";
import OfferStepTwo from "./OfferStepTwo";
import OfferStepThree from "./OfferStepThree";

function FormInputs() {
  const display = {
    0: <OfferStepOne />,
    1: <OfferStepTwo />,
    2: <OfferStepThree />,
  };

  const content = <div className="flex flex-col">{display[page]}</div>;
  return content;
}

export default FormInputs;
