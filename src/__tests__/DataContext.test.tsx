import React from "react";
import { render } from "@testing-library/react";
import DataProvider, {
  reducer,
  initialState,
  Types,
  DataContextI,
  DataType,
  Action,
} from "../context/DataContext";

describe("<DataContext/>", () => {
  test("it should render and display properly", () => {
    const { baseElement } = render(
      <DataProvider>
        <p>child element</p>
      </DataProvider>
    );

    expect(baseElement).toBeDefined();
  });

  test("reducer should set data", () => {
    const newData = "New Data!" as DataType;

    const action = { type: Types.SetData, data: newData };

    const newState = reducer(initialState, action);

    expect(newState.data).toBe(newData);
  });

  test("reducer should reset data", () => {
    const differentState = {
      data: "Lorem Ipsum Dolor sit amet",
    } as DataContextI;

    const action = { type: Types.ResetData } as Action;

    const newState = reducer(differentState, action);

    expect(newState.data).toBe(initialState.data);
  });
});
