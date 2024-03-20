/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import {
  Row,
  Col,
  Card,
  Table,
  Input,
  Modal,
  Button,
  Select,
  notification,
  Typography,
  Space,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { base_url, client_base_url } from "../App";
import Popover from "../components/helpers/Popover";
const { Option } = Select;
const generateIcon = [
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      fill="#444"
      d="M2.6 5.6c0.9-2.1 3-3.6 5.4-3.6 3 0 5.4 2.2 5.9 5h2c-0.5-3.9-3.8-7-7.9-7-3 0-5.6 1.6-6.9 4.1l-1.1-1.1v4h4l-1.4-1.4z"
    />
    <path
      fill="#444"
      d="M16 9h-4.1l1.5 1.4c-0.9 2.1-3 3.6-5.5 3.6-2.9 0-5.4-2.2-5.9-5h-2c0.5 3.9 3.9 7 7.9 7 3 0 5.6-1.7 7-4.1l1.1 1.1v-4z"
    />
  </svg>,
];
// table code start

function Users() {
  const columns = [
    {
      title: "АВТОР",
      dataIndex: "name",
      key: "name",
      width: "32%",
    },
    {
      title: "Статус",
      dataIndex: "active",
      key: "active",
      render: (active) => (
        <Button
          type="text"
          className="tag-primary"
          style={{ color: active ? "#0E9F6E" : "red" }}
        >
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="check-circle"
            width="14"
            height="14"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
          </svg>
          {active ? "АКТИВНЫЙ" : "НЕ АКТИВНЫЙ"}
        </Button>
      ),
    },

    {
      title: "Дата регистрации",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => {
        const year = new Date(date).getFullYear();
        const month = new Date(date).getMonth() + 1;
        const day = new Date(date).getDate();
        const hours = new Date(date).getHours();
        const minutes = new Date(date).getMinutes();
        const seconds = new Date(date).getSeconds();
        return `${hours}:${minutes}:${seconds} - ${day}.${month}.${year}`;
      },
    },
    {
      title: "Ссылка",
      dataIndex: "url",
      key: "url",
      render: (url) => (
        <a target="_blank" href={client_base_url + "ws/" + url}>
          {url}
        </a>
      ),
    },
    {
      title: "Режим",
      dataIndex: "plan",
      key: "plan",
      render: (plan) => <span key={plan.id}>{plan.name}</span>,
    },
    {
      title: "Группа",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Максимальное редактирование",
      dataIndex: "max_edit_count",
      key: "max_edit_count",
    },
    {
      title: "Отредактированное количество",
      dataIndex: "edited_count",
      key: "edited_count",
    },
    {
      title: "Кол-во просмотров",
      dataIndex: "view_count",
      key: "view_count",
    },
    {
      title: "Кол-во просмотров",
      dataIndex: "max_view_count",
      key: "max_view_count",
    },
    {
      title: "Пароль на редактирование",
      dataIndex: "password_edit",
      key: "password_edit",
    },
    {
      title: "Пароль на редактирование",
      dataIndex: "password_view",
      key: "password_view",
    },
    {
      title: "Срок публикации, мес.",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "Удалить",
      dataIndex: "id",
      key: "id",
      fixed: "right",

      render: (id) => {
        return (
          <Space>
            <Button type="danger" onClick={() => deleteUserWithPage(id)}>
              Удалить
            </Button>
          </Space>
        );
      },
    },
  ];
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupState, setPopupState] = useState({ visible: false, x: 0, y: 0 });
  const [plans, setPlans] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    url: "",
    planId: "",
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const getUsers = async () => {
    try {
      const response = await axios.get(base_url + "users");
      setUsers(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPlans = async () => {
    try {
      const response = await axios.get(base_url + "plan");
      setPlans(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOk = () => {};
  const deleteUserWithPage = (id) => {
    console.log(id);
  };

  const handleSaveUser = async () => {
    try {
      const pattern = /^[!@#$%^&*]{2}[\w\d]{2,}\d{3}$/;

      if (
        userData.name.trim() === "" ||
        userData.email.trim() === "" ||
        userData.password.trim() === "" ||
        userData.planId === ""
      ) {
        setError("Все поля должны быть заполнены.");
      } else if (!pattern.test(userData.password)) {
        setError(
          "Пароль должен начинаться с двух символов и содержать не менее 5 символов, после чего 3 числа в конце."
        );
      } else {
        setError("");
        const response = await axios.post(
          "http://localhost:8080/api/auth/sign_up",
          userData
        );
        if (response.status === 201) {
          getUsers();
          setUserData({
            email: "",
            name: "",
            password: "",
            planId: "",
            url: "",
          });
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      openNotificationWithIcon("error", error.response.data.message);
    }
  };

  const generateLink = () => {
    setUserData({ ...userData, url: uuidv4() });
  };

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message,
    });
  };
  useEffect(() => {
    getUsers();
    getPlans();
  }, []);
  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Создать пользователя
      </Button>
      <Modal
        footer={
          <Button type="primary" onClick={handleSaveUser}>
            Создать
          </Button>
        }
        title={"Создать пользователя"}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <Typography.Title level={5}>Имя</Typography.Title>
            <Input
              placeholder="Имя"
              value={userData.name}
              type="username"
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Typography.Title level={5}>Электронная почта</Typography.Title>
            <Input
              placeholder="Электронная почта"
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Typography.Title level={5}>Пароль</Typography.Title>
            <Input
              placeholder="Пароль"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              required
            />
            {error && <Typography.Text type="danger">{error}</Typography.Text>}
          </div>
          <div>
            <Typography.Title level={5}>Ссылка</Typography.Title>
            <div style={{ display: "flex", gap: "5px" }}>
              <Input
                placeholder="Ссылка"
                value={userData.url}
                readOnly
                disabled
                onChange={(e) =>
                  setUserData({ ...userData, link: e.target.value })
                }
              />
              <Button type="ghost" onClick={generateLink}>
                {generateIcon[0]}
              </Button>
            </div>
          </div>
          <div>
            <Typography.Title level={5}>Режим</Typography.Title>
            <Select
              value={userData.planId}
              onChange={(value) => setUserData({ ...userData, planId: value })}
              style={{ width: "100%" }}
              placeholder="Выберите режим"
              required
            >
              <Option value="" disabled >Выберите режим</Option>
              {plans.map((plan) => (
                <Option value={plan.id} key={plan.id}>
                  {plan.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>
      <div className="tabled">
        <Row gutter={[24, 0]} style={{ marginTop: "10px" }}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Таблица пользователей"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={users}
                  pagination={false}
                  bordered
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Users;
