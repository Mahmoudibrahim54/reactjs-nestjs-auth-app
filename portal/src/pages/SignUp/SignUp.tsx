import HttpClient from '../../api/index';
import { Button, Checkbox, Form, Input } from 'antd';
import './SignUp.scss';
import { FC } from 'react';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { useNavigate } from 'react-router';
import { useNotificationContext } from '../../context/NotificationContext';
interface SignUpFormValues {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  username: string;
  password: string;
  confirm_password: string;
  remember: boolean;
}

export const SignUp: FC = () => {
  const navigate = useNavigate();
  const { alertSuccess, alertError } = useNotificationContext();

  const onFinish = (values: SignUpFormValues) => {
    HttpClient.post('/users', values)
      .then((response) => {
        console.log('Success:', response);

        alertSuccess(`User ${response.data.user.email} created successfully`);
        navigate('/login');
        return response.data;
      })
      .catch((e) => {
        alertError(e.response.data.message || e.message || e || 'Login failed');
        console.log(e.message);
      });
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<SignUpFormValues>) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="sign-up-page-wrapper">
      <h1>Welcome to My Site</h1>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        className="sign-up-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="sign-up-form-inputs-wrapper">
          <div className="sign-up-form-item-wrapper">
            <Form.Item
              label="First Name"
              name="first_name"
              rules={[
                {
                  required: true,
                  message: 'Please input your first name!',
                },
              ]}
            >
              <Input className="sign-up-form-input" />
            </Form.Item>
          </div>
          <div className="sign-up-form-item-wrapper">
            <Form.Item
              label="Last Name"
              name="last_name"
              rules={[
                {
                  required: true,
                  message: 'Please input your last name!',
                },
              ]}
            >
              <Input className="sign-up-form-input" />
            </Form.Item>
          </div>
          <div className="sign-up-form-item-wrapper">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input className="sign-up-form-input" />
            </Form.Item>
          </div>
          <div className="sign-up-form-item-wrapper">
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input className="sign-up-form-input" />
            </Form.Item>
          </div>
          <div className="sign-up-address-wrapper">
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Please input your Address!',
                },
              ]}
            >
              <Input className="sign-up-form-input" />
            </Form.Item>
          </div>
          <div className="sign-up-form-item-wrapper">
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
              <Input.Password className="sign-up-form-input" />
            </Form.Item>
          </div>
          <div className="sign-up-form-item-wrapper">
            <Form.Item
              label="Confirm Password"
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password again!',
                },
              ]}
            >
              <Input.Password className="sign-up-form-input" />
            </Form.Item>
          </div>
        </div>
        <Form.Item
          className="sign-up-form-item"
          name="approve_terms"
          valuePropName="checked"
          label={null}
          rules={[
            {
              required: true,
              message: 'You must agree to terms & conditions!',
            },
          ]}
        >
          <Checkbox className="sign-up-form-checkbox">
            I have read <a>Terms & Conditions</a> and agree
          </Checkbox>
        </Form.Item>

        <Form.Item className="sign-up-form-item" label={null}>
          <Button
            type="primary"
            htmlType="submit"
            className="sign-up-form-submit-button"
          >
            SignUp
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
