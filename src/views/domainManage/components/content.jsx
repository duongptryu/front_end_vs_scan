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
  InputNumber,
  Radio,
  Cascader,
} from "antd";
import { useEffect, useState } from "react";
import "../../dashboard/index.css";
import {
  DownOutlined,
  UserOutlined,
  UnorderedListOutlined,
  PlusOutlined,
  TableOutlined,
} from "@ant-design/icons";

import reqwest from "reqwest";
// import { render } from "@testing-library/react";

const { Content } = Layout;
const { Search } = Input;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const handleMenuClick = (record, e) => {
  const { onDeleteItem, onEditItem } = this.props;

  if (e.key === "1") {
    onEditItem(record);
  } else if (e.key === "2") {
    window.confirm({
      title: `Are you sure delete this record?`,
      onOk() {
        // onDeleteItem(record.id)
        alert("Đã xóa");
      },
    });
  }
};

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<UserOutlined />}>
      Update
    </Menu.Item>
    <Menu.Item key="2" icon={<UserOutlined />}>
      Delete
    </Menu.Item>
  </Menu>
);

const columns = [
  {
    title: "Thời gian cập nhật",
    dataIndex: "name",
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: "20%",
  },
  {
    title: "Domain",
    dataIndex: "gender",
    // filters: [
    //   { text: "Male", value: "male" },
    //   { text: "Female", value: "female" },
    // ],
    sorter: true,
    width: "20%",
  },
  {
    title: "Ghi chú",
    dataIndex: "gender",
    width: "20%",
  },
  {
    title: "Rà quét",
    dataIndex: "email",
    width: "10%",
  },
  {
    title: "Xác thực",
    dataIndex: "phone",
    width: "20%",
    sorter: true,
  },
  {
    title: "Tùy chọn",
    dataIndex: "gender",
    width: "10%",
    render: (gender) => {
      return (
        <Space>
          <Dropdown overlay={menu}>
            <Button type="text" disabled>
              <UnorderedListOutlined /> <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      );
    },
  },
];

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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [visiableCreate, setVisiableCreate] = useState(false);

  useEffect(() => {
    fetch({ pagination });
  },[]);

  const handleCreateButton = () => {
    setVisiableCreate(true)
  };

  const handleOk = () => {
    setVisiableCreate(false)
  }

  const handleCancel = () => {
    setVisiableCreate(false)
  }

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const fetch = (params = {}) => {
    setLoading(true);
    reqwest({
      url: "https://randomuser.me/api",
      method: "get",
      type: "json",
      data: getRandomuserParams(params),
    }).then((data) => {
      console.log(data);
      setLoading(false);
      setData(data.results);
      setPagination({
        ...params.pagination,
        total: 200,
      });
    });
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
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
            <Col span={8}>
              <p>Ngày cập nhật cuối 02/04/2021</p>
            </Col>
            <Col span={12}>
              <Space>
                <Search
                  placeholder="input search text"
                  enterButton="Search"
                  size="medium"
                  width="200px"
                />
                <Button style={{ marginLeft: "10px" }}>Reset</Button>
              </Space>
            </Col>
            <Col span={4}>
              <Space style={{ marginBottom: 16, float: "right" }}>
                <Button
                  size="medium"
                  icon={<PlusOutlined />}
                  onClick={handleCreateButton}
                >
                  Thêm domain
                </Button>

                <Modal visible={visiableCreate} title="Thêm mới domain" onOk={handleOk} onCancel={handleCancel}>
                  <Form name="control-ref" layout="horizontal">
                    <FormItem
                      name="name"
                      rules={[{ required: true }]}
                      label={`Name`}
                      hasFeedback
                      {...formItemLayout}
                    >
                      <Input />
                    </FormItem>
                    <FormItem
                      name="nickName"
                      rules={[{ required: true }]}
                      label={`NickName`}
                      hasFeedback
                      {...formItemLayout}
                    >
                      <Input />
                    </FormItem>
                    <FormItem
                      name="isMale"
                      rules={[{ required: true }]}
                      label={`Gender`}
                      hasFeedback
                      {...formItemLayout}
                    >
                      <Radio.Group>
                        <Radio value>Male</Radio>
                        <Radio value={false}>Female</Radio>
                      </Radio.Group>
                    </FormItem>
                    <FormItem
                      name="age"
                      label={`Age`}
                      hasFeedback
                      {...formItemLayout}
                    >
                      <InputNumber min={18} max={100} />
                    </FormItem>
                    <FormItem
                      name="phone"
                      rules={[
                        {
                          required: true,
                          pattern: /^1[34578]\d{9}$/,
                          message: `The input is not valid phone!`,
                        },
                      ]}
                      label={`Phone`}
                      hasFeedback
                      {...formItemLayout}
                    >
                      <Input />
                    </FormItem>
                    <FormItem
                      name="email"
                      rules={[
                        {
                          required: true,
                          pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                          message: `The input is not valid E-mail!`,
                        },
                      ]}
                      label={`Email`}
                      hasFeedback
                      {...formItemLayout}
                    >
                      <Input />
                    </FormItem>
                    <FormItem
                      name="address"
                      rules={[{ required: true }]}
                      label={`Address`}
                      hasFeedback
                      {...formItemLayout}
                    >
                      <Cascader
                        style={{ width: "100%" }}
                        // options={}
                        placeholder={`Pick an address`}
                      />
                    </FormItem>
                  </Form>
                </Modal>
              </Space>
            </Col>
          </Row>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          rowKey={(record) => record.login.uuid}
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
