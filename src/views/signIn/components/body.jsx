import { Header } from "../../../components/header";
import FormSignIn from "./form";
import "./body.css";

const BodySignIn = (props) => {
  return (
    <Header data={props.data}>
        <div className="body">
       <h1 style={{fontSize:"55px"}}>
           Đăng Nhập
       </h1>
      <FormSignIn></FormSignIn>
      </div>
    </Header>
  );
};

export default BodySignIn;
