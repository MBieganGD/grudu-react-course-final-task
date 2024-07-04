import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { login, logout, signUp } from "../auth/authSlice";

export const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const handleLogin = (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  const handleSignUp = (email: string, fullName: string, password: string) => {
    dispatch(signUp({ email, fullName, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    ...auth,
    handleLogin,
    handleLogout,
    handleSignUp,
  };
};
