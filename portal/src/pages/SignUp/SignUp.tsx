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

        alertSuccess(
          `User ${response.data.newUser.username} created successfully`,
        );
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
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(
                        new Error('Please input your first name!'),
                      );
                    }
                    if (/^[a-zA-z ]{3,}/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('First name must be at least 3 characters'),
                    );
                  },
                }),
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
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(
                        new Error('Please input your last name!'),
                      );
                    }
                    if (/^[a-zA-z ]{3,}/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Last name must be at least 3 characters'),
                    );
                  },
                }),
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
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(
                        new Error('Please input your Email!'),
                      );
                    }
                    if (
                      /^[a-zA-Z]{3,}[a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                        value,
                      )
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Email must be a valid email'),
                    );
                  },
                }),
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
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(
                        new Error('Please input your username!'),
                      );
                    }
                    if (/^[a-zA-z0-9._%+-]{7,}/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'username must be at least 7 characters or allowed symbol (. _ % - +)',
                      ),
                    );
                  },
                }),
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
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(
                        new Error('Please input your Address!'),
                      );
                    }
                    if (/^[a-zA-Z!@#$%^&*(),._\- ]{8,}$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'Address must be at least 8 characters and allowed symbol !@#$%^&*(),.-_',
                      ),
                    );
                  },
                }),
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
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(
                        new Error('Please input your password!'),
                      );
                    }
                    if (
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value)
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'Password must be 8 characters long, must contain a letter, symbol and a number',
                      ),
                    );
                  },
                }),
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
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject(
                        new Error('Please input your password again!'),
                      );
                    }
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The new password that you entered do not match!',
                      ),
                    );
                  },
                }),
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
