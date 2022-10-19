import { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {

  const [contextUser, setContextUser] = useState({
    correo: "",
    token: ""
  });
  const value = { contextUser, setContextUser };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    console.log(context);
    throw new Error('Bueno, ok')
  }
  return context
}