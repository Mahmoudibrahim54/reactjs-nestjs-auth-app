import { notification } from 'antd';

const useAlert = () => {
  const [api, contextHolder] = notification.useNotification();

  const alertSuccess = (description: string) => {
    api.success({
      message: 'SUCCESS',
      description: description,
      placement: 'bottomRight',
    });
  };
  const alertWarning = (description: string) => {
    api.warning({
      message: 'WARN',
      description: description,
      placement: 'bottomRight',
    });
  };
  const alertError = (description: string) => {
    api.error({
      message: 'ERROR',
      description: description,
      placement: 'bottomRight',
    });
  };
  const alertInfo = (description: string) => {
    api.info({
      message: 'INFO',
      description: description,
      placement: 'bottomRight',
    });
  };

  return {
    contextHolder,
    alertSuccess,
    alertWarning,
    alertError,
    alertInfo,
  };
};
export default useAlert;
