import React, { useContext, createContext, FC, useReducer } from "react";
import { Dispatch } from "react";

type DataType = string;

enum Types {
  SetData = "SET_DATA",
  ResetData = "RESET_DATA",
}

type Action =
  | { type: Types.SetData; data: DataType }
  | { type: Types.ResetData };

interface DataContextI {
  data: DataType;
}

const initialState: DataContextI = {
  data: "Initial State",
};

const DataContext = createContext<{
  state: DataContextI;
  dispatch: Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

const useDataContext = (): {
  state: DataContextI;
  dispatch: Dispatch<any>;
} => {
  return useContext(DataContext);
};

function reducer(state: DataContextI, action: Action) {
  switch (action.type) {
    case Types.SetData:
      return { ...state, data: action.data };
    case Types.ResetData:
      return { ...state, data: initialState.data };
    default:
      return state;
  }
}

const DataProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
export { Types, DataContext, useDataContext, reducer, initialState };
export type { DataContextI, Action, DataType };
