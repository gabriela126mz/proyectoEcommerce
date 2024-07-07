import { useReducer } from "react";

const contadorReducer = (state,action) => {
    switch (action.type) {
        case "incrementar":
            return state + 1;
        default:
            state;
    }
    return state;
};


export const useCounter = () => {
    const [contador, dispatch] = useReducer(contadorReducer, 0);
  
    const incrementar = () => {
      dispatch({ type: "incrementar" });
    };
  
    return {
      contador,
      incrementar,
    };
  };