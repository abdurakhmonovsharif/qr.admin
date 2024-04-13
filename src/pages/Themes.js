import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Input,
  Typography,
  Select,
  Table,
  Space,
  Spin,
} from "antd";
import axios from "axios";
import { base_url } from "../App";
const { Option } = Select;

const Themes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const fontFamilies = [
    "Arial, sans-serif",
    "Verdana, sans-serif",
    "Helvetica, sans-serif",
    "Tahoma, sans-serif",
    "Trebuchet MS, sans-serif",
    "Georgia, serif",
    "Times New Roman, serif",
    "Palatino, serif",
    "Courier New, monospace",
    "Lucida Console, monospace",
  ];

  const fontFamiliesWithPrefix = fontFamilies.map((font) => ({
    value: font,
    label: font,
  }));
  const showModal = () => {
    setSelectedTheme(null);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const handleSaveTheme = async () => {
    try {
      if (
        selectedTheme.color !== undefined &&
        selectedTheme.background_color !== undefined
      ) {
        if (!isEditing) {
          await axios.post(base_url + "themes", {
            ...selectedTheme,
            font_family:
              selectedTheme.font_family === undefined
                ? fontFamilies[0]
                : selectedTheme.font_family,
          });
          getThemes();
        } else {
          await axios.put(base_url + `themes/${selectedTheme.id}`, {
            ...selectedTheme,
          });
          setIsEditing(false);
          getThemes();
        }
      } else {
        alert("Не все было введено");
      }
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (theme) => {
    setSelectedTheme(theme);
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const handleDelete = async (theme) => {
    setLoading(true);
    await axios.delete(base_url + `themes/${theme.id}`);
    getThemes();
  };

  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Цвет текста",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Цвет шаблона",
      dataIndex: "background_color",
      key: "background_color",
    },
    {
      title: "Фон шрифта",
      dataIndex: "font_family",
      key: "font_family",
    },
    {
      title: "Действия",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Редактировать</Button>
          <Button onClick={() => handleDelete(record)}>Удалить</Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    getThemes();
  }, []);
  async function getThemes() {
    try {
      setLoading(true);
      const response = await axios.get(base_url + "themes");
      setLoading(false);
      setThemes(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Создать тему
      </Button>
      <Modal
        footer={
          <Button type="primary" onClick={handleSaveTheme}>
            {loading ? (
              <Spin />
            ) : isEditing ? (
              "Сохранить изменения"
            ) : (
              "Создать тему"
            )}
          </Button>
        }
        title={isEditing ? "Редактировать тему" : "Создать тему"}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <Typography.Title level={5}>Цвет текста</Typography.Title>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Input
                placeholder="пример: #FFF"
                value={selectedTheme?.color || ""}
                onChange={(e) =>
                  setSelectedTheme({
                    ...selectedTheme,
                    color: e.target.value,
                  })
                }
              />
              <input
                placeholder=""
                type="color"
                value={selectedTheme?.color || ""}
                onChange={(e) =>
                  setSelectedTheme({
                    ...selectedTheme,
                    color: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div>
            <Typography.Title level={5}>Фон шрифта</Typography.Title>
            <Select
              value={
                selectedTheme?.font_family || fontFamiliesWithPrefix[0].label
              }
              style={{ width: "100%" }}
              onChange={(value) =>
                setSelectedTheme({ ...selectedTheme, font_family: value })
              }
            >
              {fontFamiliesWithPrefix.map((font) => (
                <Option key={font.value} value={font.value}>
                  {font.label}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <Typography.Title level={5}>Цвет шаблона</Typography.Title>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Input
                placeholder="пример: #FFF"
                value={selectedTheme?.background_color || ""}
                onChange={(e) =>
                  setSelectedTheme({
                    ...selectedTheme,
                    background_color: e.target.value,
                  })
                }
              />
              <input
                placeholder=""
                type="color"
                value={selectedTheme?.background_color || ""}
                onChange={(e) =>
                  setSelectedTheme({
                    ...selectedTheme,
                    background_color: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </Modal>
      <div className="table-responsive">
        <Table
          columns={columns}
          loading={loading}
          pagination={false}
          dataSource={themes}
          rowKey="id"
          style={{ marginTop: "10px" }}
        />
      </div>
    </div>
  );
};

export default Themes;
