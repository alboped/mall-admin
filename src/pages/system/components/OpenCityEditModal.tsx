import { useState, cloneElement } from 'react';
import { message, Cascader } from 'antd';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';
import { homeConfigEdit } from '@/services';
import { roleList } from '@/services/system.api';

const optionLists = [
  {
    value: '01',
    label: '北京市',
    isLeaf: false,
  },
  {
    value: '02',
    label: '河南省',
    isLeaf: false,
  },
  {
    value: '03',
    label: '河北省',
    isLeaf: false,
  },
  {
    value: '04',
    label: '山东省',
    isLeaf: false,
  },
];

export default (props: any) => {
  const { record = {}, trigger } = props;
  const [visible, setVisible] = useState<boolean>(false);

  const [options, setOptions] = useState(optionLists);

  const onChange = (value: any, selectedOptions: any) => {
    console.log(value, selectedOptions);
  };

  const loadData = (selectedOptions: any) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [
        {
          label: '北京市',
          value: '011',
        },
        {
          label: '石家庄',
          value: '012',
        },
        {
          label: '郑州市',
          value: '021',
        },
      ];
      setOptions([...options]);
    }, 1000);
  };

  return (
    <ModalForm
      title="编辑"
      width={460}
      layout="horizontal"
      labelCol={{ span: 6 }}
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
      <ProForm.Item
        width="md"
        name="openCity"
        label="开放城市"
        initialValue={record.name}
        rules={[{ required: true, message: '请输入账号!' }]}
      >
        <Cascader options={options} loadData={loadData} onChange={onChange} changeOnSelect />
      </ProForm.Item>
    </ModalForm>
  );
};
