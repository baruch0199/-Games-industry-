import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useAuth } from "./contexts/auth-context";
import { CartContext } from "./contexts/cart-context";
import { refresh } from "../services/usersSerivce";

const SignOut = () => {
  const { doRender, setDoRender } = useContext(CartContext);
  const navigate = useNavigate();
  const { logOut, user } = useAuth();

  useEffect(() => {
    if (user()) {
      navigate("/sign-in");

      logOut();
      setDoRender(doRender + 1);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div className="text-white">sign out page</div>
    </div>
  );
};

export default SignOut;
