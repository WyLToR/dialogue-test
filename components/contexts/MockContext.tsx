import data from "@/mock";
import Data from "@/src/interfaces/mock";
import React, { createContext, useState, useContext } from "react";

interface IMockContext {
  mock: Data;
  setMock: React.Dispatch<React.SetStateAction<Data | null>>;
}

const initialContext: IMockContext = {
  mock: data,
  setMock: () => {},
};

export const MockContext = createContext<IMockContext>(initialContext);

export function MockProvider({ children }: { children: React.ReactNode }) {
  const [mock, setMock] = useState<Data | null>(data);
  return (
    <MockContext.Provider value={{ mock, setMock }}>
      {children}
    </MockContext.Provider>
  );
}

export function useMockContext() {
  return useContext(MockContext);
}
