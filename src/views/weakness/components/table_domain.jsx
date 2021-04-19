// import "antd/dist/antd.css";
import { Table } from "antd";
import { useEffect, useState } from "react";
import "../../dashboard/index.css";

import reqwest from "reqwest";

const getRandomuserParams = (params) => ({
  results: params.pagination.pageSize,
  page: params.pagination.current,
  ...params,
});

const TableDomain = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch({ pagination });
  }, []);

  const columns = [
    {
      title: "Lần quét cuối",
      dataIndex: "name",
      sorter: true,
      render: (name) => `${name.first} ${name.last}`,
      width: "30%",
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
      title: "Lỗ hổng",
      dataIndex: "email",
      width: "30%",
      sorter: true,
      render: (email) => {
        return (
          <strong style={{ color: "white", backgroundColor: "red" }}>
            Hight
          </strong>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "phone",
      width: "20%",
      sorter: true,
      render: (phone) => {
        return <p>Running</p>;
      },
    },
  ];

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

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.login.uuid}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
      size="small"
    />
  );
};

export default TableDomain;
