import { useContext, Redirect } from "react";
import { Navigation } from "../../components/navigation";
import BodySignIn from "./components/body";
import UserContext from "../../contexts/user/userContext";
import Footer_ from "../dashboard/components/footer"

const data = {
  title: "V SCANNER",
  paragraph: "Hệ thống cảnh báo điểm yếu và rà soát lỗ hổng bảo mật tự động",
};

const SignIn = () => {

  const { user } = useContext(UserContext)
  if (user){
    return <Redirect to="/dashboard"/>
  }
  return (
    <div>
      <Navigation></Navigation>
      <BodySignIn data={data}></BodySignIn>
    </div>
  );
};

export default SignIn;
