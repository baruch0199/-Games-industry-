import { useAuth } from "./contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRout = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user() && user().admin == false) {
      navigate("/");
      return;
    }
  });

  return children;
};

export default ProtectedRout;
