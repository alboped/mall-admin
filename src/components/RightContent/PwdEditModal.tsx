import { message } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { homeConfigEdit } from '@/services';

export default (props: any) => {
  const { record = {}, title, visible, onCancel } = props;
  // const [visible, setVisible] = useState<boolean>(false);

  return (
    <ModalForm
      title={title}
      width={500}
      layout="horizontal"
      labelCol={{ span: 5 }}
      onFinish={async (values: any) => {
        await homeConfigEdit();
        console.log(values);
        message.success('提交成功');
        onCancel();
      }}
      visible={visible}
      modalProps={{
        onCancel: () => onCancel()
      }}
    >
      <ProFormText
        width="md"
        name="tempName"
        label="账号"
        placeholder="请输入账号"
        initialValue={record.name}
        rules={[{ required: true, message: '请输入账号!' }]}
      />
      <ProFormText
        width="md"
        name="yunfei"
        label="姓名"
        placeholder="请输入姓名"
        initialValue={record.name}
        rules={[{ required: true, message: '请输入姓名!' }]}
      />
      <ProFormText
        width="md"
        name="yunfei"
        label="手机号"
        placeholder="请输入手机号"
        initialValue={record.name}
        rules={[{ required: true, message: '请输入手机号!' }]}
      />
    </ModalForm>
  );
};
