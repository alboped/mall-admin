import { useState, cloneElement } from 'react';
import { message } from 'antd';
import { ModalForm, ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import { homeConfigEdit, provinces } from '@/services';

export default (props: any) => {
  const { record = {}, trigger } = props;
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <ModalForm
      title="编辑"
      width={600}
      layout="horizontal"
      labelCol={{ span: 4 }}
      trigger={cloneElement(
        trigger,
        {
          onClick: () => setVisible(true)
        }
      )}
      onFinish={async (values: any) => {
        await homeConfigEdit();
        console.log(values);
        message.success('提交成功');
        setVisible(false);
      }}
      visible={visible}
      modalProps={{
        onCancel: () => setVisible(false)
      }}
    >
      <ProFormText
        width="md"
        name="tempName"
        label="模板名称"
        initialValue={record.name}
        rules={[{ required: true, message: '请输入模板名称!' }]}
      />
      <ProFormText
        width="md"
        name="yunfei"
        label="运费"
        initialValue={record.name}
        rules={[{ required: true, message: '请输入运费!' }]}
      />
      <ProFormCheckbox.Group
        width="md"
        name="checkbox-group"
        label="区域选择"
        rules={[{ required: true, message: '请选择区域!' }]}
        request={provinces}
      />
    </ModalForm>
  );
};
