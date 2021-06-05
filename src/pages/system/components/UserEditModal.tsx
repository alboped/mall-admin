import { useState, cloneElement } from 'react';
import { message } from 'antd';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { homeConfigEdit } from '@/services';
import { roleList } from '@/services/system.api';

export default (props: any) => {
  const { record = {}, trigger, title } = props;
  const [visible, setVisible] = useState<boolean>(false);

  const roleListPromise = () => {
    return new Promise((resolve, reject) => {
      roleList().then(res => {
        resolve(res?.data?.map((item: any) => ({
          label: item.userName,
          value: item.idCardNo,
        })));
      });
    })
  }

  return (
    <ModalForm
      title={title}
      width={500}
      layout="horizontal"
      labelCol={{ span: 5 }}
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
      {/* <ProFormText
        width="md"
        name="yunfei"
        label="角色"
        placeholder="请输入角色"
        initialValue={record.name}
        rules={[{ required: true, message: '请输入角色!' }]}
      /> */}
      <ProFormSelect
        width="md"
        request={roleListPromise}
        name="goodsType"
        label="角色"
        placeholder="请选择角色"
        rules={[{ required: true, message: '请选择角色!' }]}
      />
      <ProFormText
        width="md"
        name="yunfei"
        label="用户描述"
        placeholder="请输入用户描述"
        initialValue={record.name}
        rules={[{ required: true, message: '请输入用户描述!' }]}
      />
    </ModalForm>
  );
};
