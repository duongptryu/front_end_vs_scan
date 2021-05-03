// import "antd/dist/antd.css";
import {
  Row,
  Col,
  Layout,
  Modal,
  Table,
  Space,
  Dropdown,
  Button,
  Menu,
  Input,
  Form,
  Switch,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../dashboard/index.css";
import {
  UserOutlined,
  FileAddOutlined,
  TableOutlined,
  EditOutlined,
  DeleteOutlined,
  SecurityScanOutlined,
  StopOutlined,
  PauseCircleOutlined,
  CaretRightOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";
import config from "../../../config";
const axios = require("axios").default;
// import { render } from "@testing-library/react";

const { Content } = Layout;
const { Search, TextArea } = Input;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const getRandomuserParams = (params) => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

const Content_ = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [idVerify, setIdVerify] = useState();

  useEffect(() => {
    document.title = "Chi tiết domain - Quản lý domain";
    fetch({ pagination });
  }, []);

  const handleCreateButton = () => {
    setVisibleCreate(true);
  };

  const handleChangeSchedule = (target, p) => {
    console.log(target.targetId);
    const token = localStorage.getItem("accessToken");
    checkToken(token);
    setLoading(true);
    let data = {};
    if (p == 1) {
      data = {
        daily: [target.targetId],
      };
    } else if (p == 2) {
      data = {
        weekly: [target.targetId],
      };
    } else {
      data = {
        monthly: [target.targetId],
      };
    }

    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + "tasks/target/schedule",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    })
      .then((res) => {
        console.log(res);
        if (res.data.status_code == 0) {
          notification.open({
            message: "Thông báo lỗi",
            description: res.data.msg,
          });
          setLoading(false);
          return false;
        } else {
          notification.open({
            message: "Thông báo",
            description: res.data.msg,
          });
          setLoading(false);
          setVisibleCreate(false);
          fetch({ pagination });
        }
      })
      .catch((err) => {
        notification.open({
          message: "Thông báo lỗi",
          description: "Vui lòng thử lại sau",
        });
        setVisibleCreate(false);
        setLoading(false);
        return false;
      });
  };

  const menuPriority = (target) => {
    if (target.priority == 1) {
      return (
        <Menu theme="dark">
          <Menu.Item
            key="1"
            icon={<UserOutlined />}
            style={{ backgroundColor: "#7B68EE" }}
            disabled
          >
            Hàng ngày
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<UserOutlined />}
            onClick={() => {
              handleChangeSchedule(target, 2);
            }}
          >
            Hàng tuần
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<UserOutlined />}
            onClick={() => {
              handleChangeSchedule(target, 3);
            }}
          >
            Hàng tháng
          </Menu.Item>
        </Menu>
      );
    } else if (target.priority == 2) {
      return (
        <Menu theme="dark">
          <Menu.Item
            key="1"
            icon={<UserOutlined />}
            onClick={() => {
              handleChangeSchedule(target, 1);
            }}
          >
            Hàng ngày
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<UserOutlined />}
            style={{ backgroundColor: "#7B68EE" }}
            disabled
          >
            Hàng tuần
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<UserOutlined />}
            onClick={() => {
              handleChangeSchedule(target, 3);
            }}
          >
            Hàng tháng
          </Menu.Item>
        </Menu>
      );
    } else {
      return (
        <Menu theme="dark">
          <Menu.Item
            key="1"
            icon={<UserOutlined />}
            onClick={() => {
              handleChangeSchedule(target, 1);
            }}
          >
            Hàng ngày
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<UserOutlined />}
            onClick={() => {
              handleChangeSchedule(target, 2);
            }}
          >
            Hàng tuần
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<UserOutlined />}
            style={{ backgroundColor: "7B68EE" }}
            disabled
          >
            Hàng tháng
          </Menu.Item>
        </Menu>
      );
    }
  };

  const menuAction = (target) => {
    if (target.scanStatus == "processing" || target.scanStatus == "running") {
      return (
        <Menu theme="light">
          <Menu.Item key="1">
            <Button
              type="primary"
              onClick={() => {
                handlePaused(target);
              }}
              style={{ width:"100%" }}
            >
              <PauseCircleOutlined /> Pause
            </Button>
          </Menu.Item>
          <Menu.Item key="2">
            <Button
              type="primary"
              onClick={() => {
                handleStop(target);
              }}
              style={{ width:"100%" }}
            >
              <StopOutlined /> Stop
            </Button>
          </Menu.Item>
        </Menu>
      );
    } else if (
      target.scanStatus == "pending" ||
      target.scanStatus == "completed" ||
      target.scanStatus == "cancel"
    ) {
      return (
        <Menu theme="light">
          <Menu.Item key="1">
            <Button
              type="primary"
              onClick={() => {
                startScan(target);
              }}
            >
              <SecurityScanOutlined /> Scan
            </Button>
          </Menu.Item>
        </Menu>
      );
    } else {
      return (
        <div>
          <Menu theme="light">
            <Menu.Item key="1">
              <Button
                type="primary"
                onClick={() => {
                  handleStop(target);
                }}
                style={{width:"100%" }}
              >
                <StopOutlined /> Stop
              </Button>
            </Menu.Item>
            <Menu.Item key="1">
              <Button
                type="primary"
                onClick={() => {
                  handleResume(target);
                }}
                style={{width:"80%"}}
              >
                <CaretRightOutlined /> Resume
              </Button>
            </Menu.Item>
          </Menu>
        </div>
      );
    }
  };

  const handleAddDomain = (e) => {
    setLoading(true);
    const data = document.querySelector("#domains").innerHTML;
    const arr = data.split(",");

    const token = localStorage.getItem("accessToken");
    checkToken(token);

    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + "tasks/target/add",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: {
        targets: arr,
      },
    })
      .then((res) => {
        // const fail = arr.length() - res.data.
        if (res.data.notTargets.length != 0) {
          notification.open({
            message: "Thông báo lỗi",
            description: "Domain " + res.data.notTargets + " không hợp lệ",
          });
          setLoading(false);
          return false;
        } else {
          document.querySelector("#domains").value = " ";
          notification.open({
            message: "Thông báo",
            description: "Thêm domain thành công",
          });
          setLoading(false);
          setVisibleCreate(false);
          fetch({ pagination });
        }
      })
      .catch((err) => {
        document.querySelector("#domains").value = " ";
        console.log(err);
        notification.open({
          message: "Thông báo lỗi",
          description: "Vui lòng thử lại sau",
        });
        setVisibleCreate(false);
        setLoading(false);
        return false;
      });
  };

  const handleCancel = () => {
    setVisibleCreate(false);
    setVisibleConfirm(false);
    setScanPopUp(false);
  };

  const handleSwitch = (target) => {
    console.log(target.targetId);
    const token = localStorage.getItem("accessToken");
    checkToken(token);
    setLoading(true);
    let data = {};
    if (target.isScan) {
      data = {
        disable: [target.targetId],
      };
    } else {
      data = {
        enable: [target.targetId],
      };
    }

    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + "tasks/target/scan",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    })
      .then((res) => {
        // const fail = arr.length() - res.data.
        if (res.data.status_code == 0) {
          notification.open({
            message: "Thông báo lỗi",
            description: res.data.msg,
          });
          setLoading(false);
          return false;
        } else {
          notification.open({
            message: "Thông báo",
            description: res.data.msg,
          });
          setLoading(false);
          setVisibleCreate(false);
          fetch({ pagination });
        }
      })
      .catch((err) => {
        notification.open({
          message: "Thông báo lỗi",
          description: "Vui lòng thử lại sau",
        });
        setVisibleCreate(false);
        setLoading(false);
        return false;
      });
  };

  const convertTimeToSeconds = (dateTime) => {
    let arrDateTime = dateTime.split(" ");
    var d = new Date(arrDateTime[0].replace(":", "-") + " " + arrDateTime[1]);
    return d.getSeconds();
  };

  
  const handlePaused = (target) => {
    const token = localStorage.getItem("accessToken");
    checkToken(token);
    setLoading(true);
    let data = {targetIds: [target.targetId]};

    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + "tasks/scan/pause",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    })
      .then((res) => {
        console.log(res);
        if (res.data.status_code == 0) {
          notification.open({
            message: "Thông báo lỗi",
            description: "Không thể thực hiện yêu cầu, vui lòng thử lại sau"
          });
          setLoading(false);
          return false;
        } else {
          notification.open({
            message: "Thông báo",
            description: "Thành công",
          });
          setLoading(false);
          setVisibleCreate(false);
          fetch({ pagination });
        }
      })
      .catch((err) => {
        notification.open({
          message: "Thông báo lỗi",
          description: "Vui lòng thử lại sau",
        });
        setVisibleCreate(false);
        setLoading(false);
        return false;
      });
  };


  const handleStop = (target) => {
    const token = localStorage.getItem("accessToken");
    checkToken(token);
    setLoading(true);
    let data = {targetIds: [target.targetId]};

    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + "tasks/scan/stop",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    })
      .then((res) => {
        console.log(res);
        if (res.data.status_code == 0) {
          notification.open({
            message: "Thông báo lỗi",
            description: "Không thể thực hiện yêu cầu, vui lòng thử lại sau"
          });
          setLoading(false);
          return false;
        } else {
          notification.open({
            message: "Thông báo",
            description: "Thành công",
          });
          setLoading(false);
          setVisibleCreate(false);
          fetch({ pagination });
        }
      })
      .catch((err) => {
        notification.open({
          message: "Thông báo lỗi",
          description: "Vui lòng thử lại sau",
        });
        setVisibleCreate(false);
        setLoading(false);
        return false;
      });
  };

  const handleResume = (target) => {
    const token = localStorage.getItem("accessToken");
    checkToken(token);
    setLoading(true);
    let data = {targetIds: [target.targetId]};

    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + "tasks/scan/resume",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    })
      .then((res) => {
        console.log(res);
        if (res.data.status_code == 0) {
          notification.open({
            message: "Thông báo lỗi",
            description: "Không thể thực hiện yêu cầu, vui lòng thử lại sau"
          });
          setLoading(false);
          return false;
        } else {
          notification.open({
            message: "Thông báo",
            description: "Thành công",
          });
          setLoading(false);
          setVisibleCreate(false);
          fetch({ pagination });
        }
      })
      .catch((err) => {
        notification.open({
          message: "Thông báo lỗi",
          description: "Vui lòng thử lại sau",
        });
        setVisibleCreate(false);
        setLoading(false);
        return false;
      });
  };

  const columns = [
    {
      title: "Thời gian cập nhật",
      dataIndex: "updateTime",
      sorter: (a, b) => {
        return (
          convertTimeToSeconds(a.updateTime) -
          convertTimeToSeconds(b.updateTime)
        );
      },
      width: "20%",
    },
    {
      title: "Domain",
      width: "15%",
      render: (target) => {
        return (
          <Link to={"/detail-domain/" + target.targetId}>{target.target}</Link>
        );
      },
    },
    {
      title: "Lập lịch",
      width: "15%",
      key: "scanSchedule",
      align: "center",
      sorter: (a, b) => a.isScan - b.isScan,
      render: (target) => {
        return (
          <Space>
            {target.isScan == true && (
              <Switch
                checked={true}
                onClick={() => {
                  handleSwitch(target);
                }}
              />
            )}
            {target.isScan == false && (
              <Switch
                checked={false}
                onClick={() => {
                  handleSwitch(target);
                }}
              />
            )}
            <Dropdown overlay={menuPriority(target)}>
              <Button type="text" disabled>
                <EditOutlined />
              </Button>
            </Dropdown>
          </Space>
        );
      },
    },
    {
      title: "Xác thực",
      width: "10%",
      align: "center",
      sorter: (a, b) => {
        return a.isVerify - b.isVerify;
      },
      render: (target) => {
        return (
          <>
            {target.isVerify == true && (
              <Button
                type="text"
                ghost
                style={{
                  backgroundColor: "#00BFFF",
                  color: "white",
                  width: "100%",
                }}
                disabled={true}
              >
                Đã xác thực
              </Button>
            )}
            {target.isVerify == false && (
              <Button
                type="text"
                ghost
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  width: "100%",
                }}
                onClick={() => {
                  confirmHandleBtn(target);
                }}
              >
                Xác thực
              </Button>
            )}
          </>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "scanStatus",
      width: "15%",
      align: "center",
      sorter: (a, b) => {
        return a.scanStatus.localeCompare(b.scanStatus);
      },
    },
    {
      title: "Tùy chọn",
      width: "20%",
      align: "center",
      sorter: (a, b) => {
        return a.scanStatus.localeCompare(b.scanStatus);
      },
      render: (target) => {
        return (
          <Space>
            <Dropdown overlay={menuAction(target)}>
              <Button type="text" disabled>
              <UnorderedListOutlined />
              </Button>
            </Dropdown>
            <Button
              type="text"
              onClick={() => {
                handleDeleteDomain(target);
              }}
            >
              <DeleteOutlined />
            </Button>
          </Space>
        );
      },
    },
  ];

  const startScan = (target) => {
    if (!target.isVerify) {
      alert("Vui lòng xác thực domain để bắt đầu scan.");
      return false;
    }

    setLoading(true);

    const token = localStorage.getItem("accessToken");
    checkToken(token);

    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + "tasks/scan/start",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: {
        targetIds: [target.targetId],
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.targetIds.length == 0) {
          setLoading(false);
          notification.open({
            message: "Thông báo lỗi",
            description: "Không thành công, vui lòng thử lại sau",
          });
          return false;
        } else {
          notification.open({
            message: "Thông báo",
            description: "Hệ thống đang quét, vui lòng đợi trong giây lát",
          });
          fetch({ pagination });
        }
      })
      .catch((err) => {
        console.log(err);
        notification.open({
          message: "Thông báo",
          description: "Không thành công",
        });
        setLoading(false);
      });
  };

  const handleDeleteDomain = (target) => {
    setLoading(true);

    const token = localStorage.getItem("accessToken");
    checkToken(token);

    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + "tasks/target/delete",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: {
        targetIds: [target.targetId],
      },
    })
      .then((res) => {
        if (res.data.targetIds.length != 1) {
          setLoading(false);
          notification.open({
            message: "Thông báo lỗi",
            description: "Xóa không thành công, vui lòng thử lại sau",
          });
          return false;
        } else {
          notification.open({
            message: "Thông báo",
            description: "Xóa domain thành công",
          });
          fetch({ pagination });
        }
      })
      .catch((err) => {
        notification.open({
          message: "Thông báo",
          description: "Hệ thông đang bận, vui lòng thử lại sau",
        });
        setLoading(false);
      });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const confirmHandleBtn = (target) => {
    setVisibleConfirm(true);
    setIdVerify(target.targetId);
  };

  const fetch = (params = {}) => {
    setLoading(true);

    const token = localStorage.getItem("accessToken");
    checkToken(token);

    axios({
      method: "GET",
      url: config.API_URL + config.API_VR + "tasks/target/all",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.status_code == 0) {
          setLoading(false);
          notification.open({
            message: "Thông báo lỗi",
            description: res.data.msg,
          });
          return false;
        } else {
          setLoading(false);
          let data = res.data.targets;
          for (let i = 0; i < data.length; i++) {
            data[i]["key"] = data[i].targetId;
          }
          setData(data);
          setPagination({
            ...params.pagination,
            total: res.data.targets.length,
          });
        }
      })
      .catch((err) => {
        checkError(err);
      });
  };

  const checkError = (err) => {
    if (err.response.status == 401) {
      window.location = "/signin";
      return false;
    } else {
      setLoading(false);
      notification.open({
        message: "Thông báo lỗi",
        description: err.response.data,
      });
      return false;
    }
  };

  const checkToken = (token) => {
    if (token == null || token == "") {
      window.location = "/signin";
      return false;
    }
  };

  const handleGetVerifyCode = () => {
    setLoading(true);
    const id = idVerify;
    if (id == null) {
      notification.open({
        message: "Thông báo lỗi",
        description: "Domain is not exist",
      });
      return false;
    }
    const token = localStorage.getItem("accessToken");
    checkToken(token);

    axios({
      method: "GET",
      url:
        config.API_URL +
        config.API_VR +
        "tasks/target/verify/code?targetId=" +
        id,
      // mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.data.status_code == 0) {
          setLoading(false);
          notification.open({
            message: "Thông báo lỗi",
            description: res.data.msg,
          });
          return false;
        } else {
          setLoading(false);
          console.log(res.data.verifyCode);
          document.querySelector("#displayCode").innerHTML =
            "Code = " + res.data.verifyCode;
        }
      })
      .catch((err) => {
        checkError(err);
      });
  };

  const handleVerify = () => {
    setLoading(true);
    const id = idVerify;
    if (id == null) {
      notification.open({
        message: "Thông báo lỗi",
        description: "Xác thực không thành công, vui lòng thử lại",
      });
      return false;
    }
    const token = localStorage.getItem("accessToken");
    checkToken(token);

    axios({
      method: "GET",
      url:
        config.API_URL + config.API_VR + "tasks/target/verify?targetId=" + id,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.data.status_code == 0) {
          notification.open({
            message: "Thông báo lỗi",
            description: res.data.msg,
          });
          return false;
        } else {
          setLoading(false);
          console.log(res.data.verifyCode);
          alert("Xác thực thành công");
          setVisibleConfirm(false);
          setVisibleCreate(false);
        }
      })
      .catch((err) => {
        console.log(err);
        notification.open({
          message: "Thông báo lỗi",
          description: "Xác thực không thành công, vui lòng thử lại",
        });
        setLoading(false);
        setVisibleConfirm(false);
        setVisibleCreate(false);
        return false;
      });
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataScan, setDataScan] = useState([]);
  const [dataErr, setDataErr] = useState([]);
  const [scanPopUp, setScanPopUp] = useState(false);

  const onSelectChange = (s) => {
    console.log("selectedRowKeys changed: ", s);
    setSelectedRowKeys(s);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const setNullData = () => {
    setDataScan([]);
    setDataErr([]);
    setSelectedRowKeys([]);
  };

  const handleScanMulti = () => {
    setLoading(true);
    if (selectedRowKeys.length <= 0) {
      notification.open({
        message: "Thông báo lỗi",
        description: "Không có đối tượng để scan",
      });
      setLoading(false);
      return false;
    }

    let data_err = [];
    selectedRowKeys.forEach((id) => {
      let x = data.filter((target) => target.targetId == id);
      if (
        x[0].scanStatus == "processing" ||
        x[0].scanStatus == "running" ||
        x[0].isVerify == false
      ) {
        data_err.push(x[0]);
      }
    });
    if (data_err.length > 0) {
      const name_err = [];
      data_err.forEach((target) => {
        name_err.push(target.target);
      });
      setDataScan(selectedRowKeys);
      setDataErr(name_err);
      setScanPopUp(true);
      setLoading(false);
    } else {
      scanMulti(selectedRowKeys);
    }
  };

  const scanMulti = (targetsID) => {
    console.log(targetsID);
    setLoading(true);
    setScanPopUp(false);
    const token = localStorage.getItem("accessToken");
    checkToken(token);

    if (targetsID.length == 0) {
      notification.open({
        message: "Thông báo lỗi",
        description: "Không tồn tại domain scan, vui lòng thử lại",
      });
      setLoading(false);
      return false;
    }
    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + "tasks/scan/start",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: {
        targetIds: targetsID,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.targetIds.length == 0) {
          setLoading(false);
          notification.open({
            message: "Thông báo lỗi",
            description: "Không thành công, vui lòng thử lại sau",
          });
          setNullData();
          return false;
        } else {
          notification.open({
            message: "Thông báo",
            description: "Hệ thống đang quét, vui lòng đợi",
          });
          setNullData();
          fetch({ pagination });
        }
      })
      .catch((err) => {
        console.log(err);
        notification.open({
          message: "Thông báo",
          description: "Không thành công",
        });
        setNullData();
        setLoading(false);
      });
  };

  const handleDeleteMulti = () => {
    setLoading(true);

    const token = localStorage.getItem("accessToken");
    checkToken(token);
    if (selectedRowKeys.length == 0) {
      notification.open({
        message: "Thông báo lỗi",
        description: "Không tồn tại domain lựa chọn, vui lòng thử lại",
      });
      setLoading(false);
      return false;
    }

    axios({
      method: "POST",
      url: config.API_URL + config.API_VR + "tasks/target/delete",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: {
        targetIds: selectedRowKeys,
      },
    })
      .then((res) => {
        console.log(res);
        notification.open({
          message: "Thông báo",
          description: "Xóa thành công",
        });
        setSelectedRowKeys([]);
        fetch({ pagination });
      })
      .catch((err) => {
        notification.open({
          message: "Thông báo",
          description: "Hệ thông đang bận, vui lòng thử lại sau",
        });
        setSelectedRowKeys([]);
        setLoading(false);
      });
  };

  return (
    <div style={{ marginRight: "10px", marginLeft: "20px" }}>
      <div style={{ marginTop: "20px" }}>
        <Row>
          <Col span={24}>
            <TableOutlined /> Quản lý domain /{" "}
          </Col>
        </Row>
      </div>

      <Content
        style={{ marginTop: "20px", backgroundColor: "white", padding: "20px" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h1>Danh sách Domain</h1>
          <Row>
            <Col span={3.5} style={{ display: "flex" }}>
              <Space style={{ float: "right" }}>
                <Button
                  size="medium"
                  icon={<FileAddOutlined />}
                  onClick={handleCreateButton}
                >
                  Thêm domain
                </Button>
                <Modal
                  visible={visibleCreate}
                  title="Thêm mới domain"
                  onOk={handleAddDomain}
                  onCancel={handleCancel}
                  loading={loading}
                  footer={[
                    <Button key="back" onClick={handleCancel}>
                      Hủy
                    </Button>,
                    <Button
                      key="submit"
                      type="primary"
                      loading={loading}
                      onClick={handleAddDomain}
                    >
                      Thêm
                    </Button>,
                  ]}
                >
                  <p>
                    Trong trường hợp nhập nhiều domain, vui lòng ngăn cách nhau
                    bởi dấu phẩy (Ví dụ: khonggianmang.vn, tinnhiemmang.vn)
                  </p>
                  <Form name="control-ref" layout="horizontal" id="myForm">
                    <FormItem
                      name="domain"
                      rules={[{ required: true }]}
                      label={`Domain`}
                      hasFeedback
                      {...formItemLayout}
                    >
                      <TextArea id="domains" />
                    </FormItem>
                  </Form>
                </Modal>
              </Space>
            </Col>
            <Col span={14}>
              <Space>
                {/* <p style={{ paddingTop: "10px", marginRight: "10px" }}>
                  Ngày cập nhật cuối 02/04/2021
                </p> */}
                <Button
                  size="medium"
                  type="primary"
                  icon={<SecurityScanOutlined />}
                  onClick={handleScanMulti}
                  disabled={!selectedRowKeys.length > 0}
                >
                  Scan
                </Button>
                <Button
                  size="medium"
                  icon={<DeleteOutlined />}
                  onClick={handleDeleteMulti}
                  disabled={!selectedRowKeys.length > 0}
                >
                  Xóa
                </Button>
              </Space>
            </Col>
            <Col span={6} style={{ display: "flex" }}>
              <Space style={{ float: "right" }}>
                <Search
                  placeholder="input search text"
                  enterButton="Search"
                  size="medium"
                  width="200px"
                />
              </Space>
            </Col>
          </Row>
        </div>

        <Modal
          visible={visibleConfirm}
          title="Xác thực domain"
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancle
            </Button>,
            <Button key="submit" type="primary" onClick={handleGetVerifyCode}>
              Lấy mã xác thực
            </Button>,
            <Button key="link" type="primary" onClick={handleVerify}>
              Xác thực
            </Button>,
          ]}
        >
          <p id="displayCode">Viet cai gi do</p>
        </Modal>

        <Modal
          visible={scanPopUp}
          title="Thông báo"
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Hủy
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                scanMulti(dataScan);
              }}
            >
              Quét
            </Button>,
          ]}
        >
          <p>
            <b>Domain không thể scan:</b>
            <ul>
              {dataErr.map((name, index) => {
                return <li key={index}>{name}</li>;
              })}
            </ul>
            <br></br>
            <b>Bạn có muốn tiếp tục quét.</b>
          </p>
        </Modal>

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          size="small"
        />
      </Content>
    </div>
  );
};

export default Content_;
