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
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { base_url, client_base_url } from "../App";
const { Option } = Select;
const { TextArea } = Input;
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
  const statuses = [
    { key: "1", label: "Неактивный", active: false },
    { key: "2", label: "Активный", active: true },
    { key: "3", label: "Блокировать", block: true },
    { key: "4", label: "Разблокировать", block: false },
  ];

  const columns = [
    {
      title: "Автор",
      dataIndex: "name",
      key: "name",
      width: "32%",
      render: (name, user) => (
        <span onDoubleClick={() => onUserItemEdit(user, "name", "Имя")}>
          {name}
        </span>
      ),
    },

    {
      title: "Дата создания",
      dataIndex: "created_at",
      key: "created_at",
      render: (date) => {
        const year = new Date(date).getFullYear();
        const month = new Date(date).getMonth() + 1;
        const day = new Date(date).getDate();
        return `${year}-${month < 10 ? "0" + month : month}-${
          day < 10 ? "0" + day : day
        }`;
      },
    },

    {
      title: "Дата начала",
      dataIndex: "page",
      key: "start_date",
      render: (page) => {
        if (!page) return <span>еще нет</span>;
        const year = new Date(page.start_date).getFullYear();
        const month = new Date(page.start_date).getMonth() + 1;
        const day = new Date(page.start_date).getDate();
        return `${year}-${month < 10 ? "0" + month : month}-${
          day < 10 ? "0" + day : day
        }`;
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
      title: "Статус",
      dataIndex: "active",
      key: "active",
      render: (_, user) => (
        <Select
          defaultValue={
            user.active
              ? user.block
                ? "Блокировать"
                : "Активный"
              : "Неактивный"
          }
          onChange={(value) => onChangeUserStatus(value, user.id)}
          style={{ width: "100%" }}
          required
        >
          <Option value="" disabled>
            Выберите Статус
          </Option>
          {statuses.map((status) => (
            <Option value={JSON.stringify(status)} key={status.key}>
              {status.label}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Дата активации",
      dataIndex: "active_at",
      key: "active_at",
      render: (active_at) => {
        if (!active_at) return <span>еще нет</span>;
        const year = new Date(active_at).getFullYear();
        const month = new Date(active_at).getMonth() + 1;
        const day = new Date(active_at).getDate();
        return (
          <span
            style={{ display: "block", width: "100%", textAlign: "center" }}
          >
            {`${year}-${month < 10 ? "0" + month : month}-${
              day < 10 ? "0" + day : day
            }`}
          </span>
        );
      },
    },
    {
      title: "Режим",
      dataIndex: "plan",
      key: "plan",
      render: (plan, user) => (
        <Select
          value={plan.id}
          onChange={(value) => changeUserPlan(value, user.id)}
          style={{ width: "100%" }}
          required
        >
          {plans.map((item) => (
            <Option value={item.id} key={item.id}>
              {item.nameRu}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Тема",
      dataIndex: "page",
      key: "page",
      render: (page) => (
        <span style={{ display: "block", textAlign: "center" }}>
          {page?.theme?.name}
        </span>
      ),
    },

    {
      title: "Группа",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Максимальное редактирование",
      dataIndex: "page",
      key: "max_edit_count",
      render: (page) => (
        <span style={{ textAlign: "center", width: "100%", display: "block" }}>
          {page ? page.max_edit_count : "еще не менял"}
        </span>
      ),
    },
    {
      title: "Отредактированное количество",
      dataIndex: "page",
      key: "edited_count",
      render: (page) => (
        <span style={{ textAlign: "center", width: "100%", display: "block" }}>
          {page ? page.edited_count : "еще не менял"}
        </span>
      ),
    },
    {
      title: "Кол-во просмотров",
      dataIndex: "page",
      key: "view_count",
      render: (page) => (
        <span style={{ textAlign: "center", width: "100%", display: "block" }}>
          {page ? page.view_count : "еще не менял"}
        </span>
      ),
    },
    {
      title: "Макc-ное кол-во просмотров",
      dataIndex: "page",
      key: "max_view_count",
      render: (page) => (
        <span style={{ textAlign: "center", width: "100%", display: "block" }}>
          {page ? page.max_view_count : "еще не менял"}
        </span>
      ),
    },
    {
      title: "Пароль на редактирование",
      dataIndex: "page",
      key: "password_edit",
      render: (page) => (
        <span style={{ textAlign: "center", width: "100%", display: "block" }}>
          {page && page.password_edit !== ""
            ? page.password_edit
            : "еще не менял"}
        </span>
      ),
    },
    {
      title: "Пароль на просмотр",
      dataIndex: "page",
      key: "password_view",
      render: (page) => (
        <span style={{ textAlign: "center", width: "100%", display: "block" }}>
          {page && page.password_view !== ""
            ? page.password_view
            : "еще не менял"}
        </span>
      ),
    },

    {
      title: "Размер макс, Кбайт",
      dataIndex: "page",
      key: "size",
      render: (page) => (
        <span style={{ textAlign: "center", width: "100%", display: "block" }}>
          {page && page.size !== "" ? page.size + " KB" : "еще нет"}
        </span>
      ),
    },
    {
      title: "Срок публикации, мес.",
      dataIndex: "page",
      key: "end_date",
      render: (page) => (
        <span style={{ textAlign: "center", width: "100%", display: "block" }}>
          {page && page.end_date !== "" ? page.end_date : "еще не менял"}
        </span>
      ),
    },
    {
      title: "Последний просмотр дата",
      dataIndex: "page",
      key: "last_view_date",
      render: (page) => {
        if (!page?.last_view_date) return <span>еще не просмотрено</span>;
        const year = new Date(page.last_view_date).getFullYear();
        const month = new Date(page.last_view_date).getMonth() + 1;
        const day = new Date(page.last_view_date).getDate();
        return (
          <span
            style={{ textAlign: "center", width: "100%", display: "block" }}
          >{`${year}-${month < 10 ? "0" + month : month}-${
            day < 10 ? "0" + day : day
          }`}</span>
        );
      },
    },
    {
      title: "Дата последнего редактирования",
      dataIndex: "page",
      key: "updated_at",
      render: (page) => {
        if (!page) return <span>еще нет</span>;
        const year = new Date(page.updated_at).getFullYear();
        const month = new Date(page.updated_at).getMonth() + 1;
        const day = new Date(page.updated_at).getDate();
        return (
          <span
            style={{ textAlign: "center", width: "100%", display: "block" }}
          >{`${year}-${month < 10 ? "0" + month : month}-${
            day < 10 ? "0" + day : day
          }`}</span>
        );
      },
    },
    {
      title: "Комментарий",
      dataIndex: "comment",
      key: "comment",
      render: (_, user) => (
        <span
          onDoubleClick={() =>
            onUserItemEdit(user, "comment", "Оставить комментарий")
          }
          style={{
            textAlign: "center",
            width: "100%",
            display: "block",
          }}
        >
          {user && user.comment ? user.comment : "еще нет"}
        </span>
      ),
    },
    {
      title: "Удалить",
      dataIndex: "id",
      key: "id",
      fixed: "right",
      render: (_, user) => {
        return (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "7px 0" }}
          >
            <Button
              onClick={() =>
                deleteUser(user.id, user.page ? user.page.id : null)
              }
              danger
              style={{ width: "100%" }}
            >
              Удалить пользователя
            </Button>
            <Button
              disabled={user.page == null}
              onClick={() => deleteUserPage(user.page.id)}
              danger
              style={{ width: "100%" }}
            >
              Удалить продукт
            </Button>
          </div>
        );
      },
    },
  ];
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plans, setPlans] = useState([]);
  const [editInputValue, setEditInputValue] = useState("");
  const [isEditModal, setIsEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState({
    item: null,
    key: null,
    label: null,
  });

  const [userData, setUserData] = useState({
    name: "",
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

  const onUserItemEdit = (item, key, label) => {
    console.log(item);
    setEditingItem({ item, key, label });
    setEditInputValue(item[key]);
    setIsEditModal(true);
  };

  const deleteUser = async (user_id, page_id) => {
    try {
      if (page_id) {
        await deleteUserPage(page_id);
      }
      const response = await axios.delete(base_url + `users/${user_id}`);
      if (response.status === 204) {
        openNotificationWithIcon("success", "Пользователь успешно удален");
        getUsers();
      }
    } catch (error) {
      openNotificationWithIcon("error", error.response.data.message);
    }
  };

  const deleteUserPage = async (page_id) => {
    try {
      const response = await axios.delete(base_url + `pages/${page_id}`);
      if (response.status === 200) {
        openNotificationWithIcon("success", "Продукт успешно удален");
        getUsers();
      }
    } catch (error) {
      openNotificationWithIcon("error", error.response.data.message);
    }
  };
  const changeUserPlan = async (planId, user_id) => {
    try {
      const response = await axios.patch(base_url + `users/plan/${user_id}`, {
        planId,
      });
      if (response.status === 204) {
        openNotificationWithIcon("success", "Пользователь успешно обновлен");
        getUsers();
      }
    } catch (error) {
      openNotificationWithIcon("error", error.response.data.message);
    }
  };
  const onChangeUserStatus = async (status, user_id) => {
    try {
      const obj = { value: "", key: "" };
      const statusObj = JSON.parse(status);
      if (status.includes("active")) {
        obj.key = "active";
        obj.value = statusObj.active;
      } else if (status.includes("block")) {
        obj.key = "block";
        obj.value = statusObj.block;
      }
      const response = await axios.patch(
        base_url + `users/status/${user_id}`,
        obj
      );
      if (response.status === 204) {
        openNotificationWithIcon("success", "Пользователь успешно обновлен");
      }
    } catch (error) {
      openNotificationWithIcon("error", error.response.data.message);
    }
  };
  const handleSaveUser = async () => {
    try {
      const pattern = /^[!@#$%^&*]{2}[\w\d]{2,}\d{3}$/;

      if (userData.name.trim() === "" || userData.planId === "") {
        setError("Все поля должны быть заполнены.");
      } else if (
        userData.password.length > 0 &&
        !pattern.test(userData.password)
      ) {
        setError(
          "Пароль должен начинаться с двух символов и содержать не менее 5 символов, после чего 3 числа в конце."
        );
      } else {
        setError("");
        const response = await axios.post(base_url + "auth/sign_up", {
          ...userData,
          url: uuidv4(),
          password: userData.password === "" ? null : userData.password,
        });
        if (response.status === 201) {
          getUsers();
          setUserData({
            name: "",
            password: "",
            planId: "",
            url: "",
          });
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        openNotificationWithIcon("error", error.response.data.message);
      }
    }
  };
  const handleEditUser = async () => {
    try {
      const response = await axios.put(
        base_url + `users/${editingItem.item.id}`,
        { ...editingItem.item, [editingItem.key]: editInputValue }
      );
      if (response.status === 201) {
        openNotificationWithIcon("success", "Пользователь успешно обновлен");
        setIsEditModal(false);
        setEditingItem({ item: null, key: null, label: null });
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditComment = async () => {
    try {
      const response = await axios.patch(
        base_url + `users/comment/${editingItem.item.id}`,
        { comment: editInputValue }
      );
      if (response.status === 204) {
        openNotificationWithIcon("success", "Пользователь успешно обновлен");
        setIsEditModal(false);
        setEditingItem({ item: null, key: null, label: null });
        getUsers();
      }
    } catch (error) {
      console.log(error);
    }
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
          <Button
            type="primary"
            onClick={
              editingItem.key === "comment" ? handleEditComment : handleEditUser
            }
          >
            Сохранять
          </Button>
        }
        open={isEditModal}
        onCancel={() => setIsEditModal(false)}
      >
        <div>
          <Typography.Title level={5}>{editingItem.label}</Typography.Title>
          {editingItem.key === "comment" ? (
            <TextArea
              placeholder={editingItem.label}
              value={editInputValue}
              type="text"
              onChange={(e) => setEditInputValue(e.target.value)}
              required
            />
          ) : (
            <Input
              placeholder={editingItem.label}
              value={editInputValue}
              type="text"
              onChange={(e) => setEditInputValue(e.target.value)}
              required
            />
          )}
        </div>
      </Modal>
      <Modal
        footer={
          <Button type="primary" onClick={handleSaveUser}>
            Создать
          </Button>
        }
        title={"Создать пользователя"}
        open={isModalOpen}
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
            <Typography.Title level={5}>Режим</Typography.Title>
            <Select
              value={userData.planId}
              onChange={(value) => setUserData({ ...userData, planId: value })}
              style={{ width: "100%" }}
              placeholder="Выберите режим"
              required
            >
              <Option value="" key={"disabled"} disabled>
                Выберите режим
              </Option>
              {plans.map((plan) => (
                <Option value={plan.id} key={plan.id}>
                  {plan.nameRu}
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
