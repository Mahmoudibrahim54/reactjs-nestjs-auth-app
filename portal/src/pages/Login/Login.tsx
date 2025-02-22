import './Login.scss';
import HttpClient from '../../api/index';
import { Button, Checkbox, Form, Input } from 'antd';
import { FC } from 'react';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useNavigate } from 'react-router';
import { useNotificationContext } from '../../context/NotificationContext';

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

export const Login: FC = () => {
  const navigate = useNavigate();
  const { alertSuccess, alertError } = useNotificationContext();

  const onFinish = (values: LoginFormValues) => {
    console.log('Success:', values);

    HttpClient.post('/auth/login', values, {
      validateStatus: (status) => status >= 200 && status < 300,
    })
      .then((response) => {
        console.log('Response:', response);

        localStorage.setItem('user_info', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.access_token);

        alertSuccess(`Welcome ${response.data.user.first_name}`);
        navigate('/welcome');
        return response.data;
      })
      .catch((e) => {
        console.log(e);
        alertError(e.response.data.message || e.message || e || 'Login failed');
      });
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<LoginFormValues>) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-page-wrapper">
      <h1>Welcome to My Site</h1>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        className="login-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="login-form-item-wrapper">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input className="login-form-input" />
          </Form.Item>
        </div>
        <div className="login-form-item-wrapper">
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password className="login-form-input" />
          </Form.Item>
        </div>
        <Form.Item
          className="login-form-item"
          name="remember"
          valuePropName="checked"
          label={null}
        >
          <Checkbox className="login-form-checkbox">Remember me</Checkbox>
        </Form.Item>

        <Form.Item className="login-form-item" label={null}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-submit-button"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
