import { createContext } from "react";

export const apiContextData = {
  apiHost: "https://api.fangchunjia.com",
  fileHost: "https://fs.fangchunjia.com",
};

export const ApiContext = createContext<{
  apiHost: string;
  fileHost: string;
}>(apiContextData);
