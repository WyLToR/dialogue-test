import React, { createContext, useState, useContext } from "react";

interface IMenuContext {
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialContext: IMenuContext = {
  menu: false,
  setMenu: () => {},
};

export const MenuContext = createContext<IMenuContext>(initialContext);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState(false);
  return (
    <MenuContext.Provider value={{ menu, setMenu}}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenuContext() {
  return useContext(MenuContext);
}
