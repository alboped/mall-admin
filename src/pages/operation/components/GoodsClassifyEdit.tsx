import { useState, cloneElement } from 'react';
import { message } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { homeConfigEdit } from '@/services';

export default (props: any) => {
  const { record = {}, trigger } = props;
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <ModalForm
      title="编辑"
      width={400}
      layout="horizontal"
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
        name="goodsTypeName"
        label="类别名称"
        initialValue={record.name}
        rules={[{ required: true, message: '请输入类别名称!' }]}
      />
    </ModalForm>
  );
};
