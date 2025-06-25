import useLoginMutation from "@/hooks/global/login/useLoginMutation";
import Login from "./Login";

function LoginLogic() {
  // login mutation methods
  const { login, handleLogin } = useLoginMutation();

  return <Login login={login} handleLogin={handleLogin} />;
}

export default LoginLogic;
