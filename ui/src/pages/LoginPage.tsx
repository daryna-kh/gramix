import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Typography,
  type FormProps,
} from "antd";
import Link from "antd/es/typography/Link";
import { useNavigate } from "react-router";
import { api } from "../api/api";
import { emailRegex, passwordRegex } from "../constants";

const { Title, Text } = Typography;
type FieldType = {
  email: string;
  password: string;
  remember?: "true" | "false";
};

async function getAuth(val: FieldType) {
  try {
    const response = await api.post<FieldType>("/auth/login", val);
    return response;
  } catch (err) {
    console.warn(err);
  }
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm<FieldType>();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const emailTest = emailRegex.test(values.email);
    const passwordTest = passwordRegex.test(values.password);
    try {
      if (!emailTest) {
        form.setFields([
          {
            name: "email",
            errors: ["Invalid email format"],
          },
        ]);
      }

      if (!passwordTest) {
        form.setFields([
          {
            name: "password",
            errors: ["Invalid password format"],
          },
        ]);
      }
      // if (!emailTest || !passwordTest) return;
      const { remember, ...val } = values;
      const response = await getAuth(val);
      if (response?.status === 200) {
        navigate("/list", { replace: true });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: 400,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 0 }}>
            Login
          </Title>
          <Text type="secondary">Please enter your details to sign!</Text>
        </div>

        <Form
          form={form}
          initialValues={{ remember: true }}
          validateTrigger="onSubmit"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link href="/">Forgot password?</Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Text type="secondary">
              Don't have an account? <Link href="/">Sign up</Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};
