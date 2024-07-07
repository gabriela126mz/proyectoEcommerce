import { useReducer } from "react";

const contadorReducer = (state,action) => {
    switch (action.type) {
        case "incrementar":
            return state + 1;
        case "reiniciar":
            return 0;
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

  const reiniciar = () => {
    dispatch({ type: "reiniciar" });
  };

  return {
    contador,
    incrementar,
    reiniciar,
  };
};