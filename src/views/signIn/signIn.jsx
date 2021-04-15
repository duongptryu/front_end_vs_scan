import { Navigation } from "../../components/navigation";
import BodySignIn from "./components/body";

const data = {
  title: "V SCANNER",
  paragraph: "Hệ thống cảnh báo điểm yếu và rà soát lỗ hổng bảo mật tự động",
};

const SignIn = () => {
  return (
    <div>
      <Navigation></Navigation>
      <BodySignIn data={data}></BodySignIn>
    </div>
  );
};

export default SignIn;
