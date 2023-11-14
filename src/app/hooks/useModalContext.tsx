import { useContext } from "react";
import FormContext from "../context/ModalContext";

const useModalContext = () => {
  return useContext(FormContext);
};

export default useModalContext;
