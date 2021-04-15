import "./body.css";

const FormSignUp = () => {
  return (
    <form className="form">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">
       Họ và tên
      </label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">
       Tên đăng nhập
      </label>
      <input
        type="text"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">
       Địa chỉ email
      </label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">
        Mật khẩu
      </label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
      />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">
        Nhập lại mật khẩu
      </label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
      />
    </div>
    <button type="submit" class="btn btn-primary">
      Đăng ký
    </button>
  </form>
  );
};

export default FormSignUp;
