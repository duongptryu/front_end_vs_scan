import { Header } from "../../../components/header";
import FormSignUp from "./form";
import "./body.css";

const BodySignUp = (props) => {
  return (
    <Header data={props.data}>
        <div className="body">
       <h1 style = {{size: "10px"}}>
           Đăng Ký
       </h1>
      <FormSignUp style = {{color: "white"}}></FormSignUp>
      </div>
    </Header>
  );
};

export default BodySignUp;
