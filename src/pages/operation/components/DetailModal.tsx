import { useState } from 'react';
import { message } from 'antd';
import { ModalForm, ProFormText, ProFormUploadButton } from '@ant-design/pro-form';
import { homeConfigEdit } from '@/services';

export default (props: any) => {
  const { record = {} } = props;
  const [fileList, setFileList] = useState<any[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const initFileList = (state: boolean) => {
    if (state && record.image) {
      setFileList([{ url: record.image }]);
    }
  }

  const imgChange = (file: any) => {
    setFileList([file.file]);
  }

  return (
    <ModalForm
      title="编辑"
      width={500}
      layout="horizontal"
      labelCol={{ span: 4 }}
      trigger={<a onClick={() => setVisible(true)}>编辑</a>}
      onFinish={async (values: any) => {
        await homeConfigEdit();
        console.log(values);
        message.success('提交成功');
        setVisible(false);
      }}
      onVisibleChange={initFileList}
      visible={visible}
      modalProps={{
        onCancel: () => setVisible(false)
      }}
    >
      <ProFormText width="md" name="id" label="标题" initialValue={record.name} disabled />
      <ProFormText
        width="md"
        name="link"
        label="详情链接"
        initialValue={record.image}
        rules={[{ required: true, message: '请输入详情链接!' }]}
      />
      <ProFormUploadButton
        extra="可以上传jpg格式图片，大小限制2M"
        label="图片"
        name="file"
        title="上传图片"
        fileList={fileList}
        onChange={imgChange}
        rules={[{ required: true, message: '请上传图片!' }]}
      />
    </ModalForm>
  );
};
