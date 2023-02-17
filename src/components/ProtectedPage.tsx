import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

interface IProtectedPageProps {
  children: React.ReactNode;
}

export default function ProtectedPage({ children }: IProtectedPageProps) {
  const { isLoggedIn, isLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn) {
        navigate("/");
      }
    }
  }, [isLoggedIn, isLoading, navigate]);
  return <>{children}</>;
}
