import React, { createContext, useContext, useState, ReactNode } from "react";

interface SignupFields {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  whatsapp: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

interface SignupContextType {
  fields: SignupFields;
  setFields: React.Dispatch<React.SetStateAction<SignupFields>>;
  captchaToken: string | null;
  setCaptchaToken: (token: string | null) => void;
  resetSignupData: () => void;
}

const initialFields: SignupFields = {
  firstName: "",
  lastName: "",
  email: "",
  country: "Pakistan",
  whatsapp: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
};

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fields, setFields] = useState<SignupFields>(initialFields);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const resetSignupData = () => {
    setFields(initialFields);
    setCaptchaToken(null);
  };

  return (
    <SignupContext.Provider 
      value={{ 
        fields, 
        setFields, 
        captchaToken, 
        setCaptchaToken, 
        resetSignupData 
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export const useSignupData = () => {
  const context = useContext(SignupContext);
  if (context === undefined) {
    throw new Error("useSignupData must be used within a SignupProvider");
  }
  return context;
};
