import { Header } from "../../../components/header";
import FormSignUp from "./form";
import "./body.css";

const BodySignUp = (props) => {
  return (
    <Header data={props.data}>
        <div className="body">
       <h1>
           Đăng Ký
       </h1>
      <FormSignUp></FormSignUp>
      </div>
    </Header>
  );
};

export default BodySignUp;
