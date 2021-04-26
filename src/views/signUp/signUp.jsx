import { Navigation } from "../../components/navigation";
import BodySignUp from "./components/body"

const data = {
  title: "V SCANNER",
  paragraph: "Hệ thống cảnh báo điểm yếu và rà soát lỗ hổng bảo mật tự động",
};

const SignUp = () => {
  return (
    <div>
      <Navigation style={{zIndex:0}}></Navigation>
      <BodySignUp data={data}></BodySignUp>
    </div>
  );
};

export default SignUp
