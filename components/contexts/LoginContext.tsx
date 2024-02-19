import React, { createContext, useState, useContext } from "react";

interface ILogged {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  img: string;
  isAdmin: boolean;
  permissions: string[];
}

interface ILoginContext {
  logged: ILogged | null;
  setLogged: React.Dispatch<React.SetStateAction<ILogged | any>>;
}

const initialContext: ILoginContext = {
  logged: null,
  setLogged: () => {},
};

export const LoginContext = createContext<ILoginContext>(initialContext);

export function LoginProvider({ children }: { children: React.ReactNode }) {
  const [logged, setLogged] = useState<ILogged | null>(null);
  return (
    <LoginContext.Provider value={{ logged, setLogged }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLoginContext() {
  return useContext(LoginContext);
}
