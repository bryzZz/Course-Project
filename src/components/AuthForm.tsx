import React from "react";

interface AuthFormProps {
  title: string;
  onSubmit: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = (props) => {
  return <div className="AuthForm" />;
};
