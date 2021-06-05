import { useState, cloneElement } from 'react';
import { message, Tree } from 'antd';
import ProForm, { ModalForm, ProFormText } from '@ant-design/pro-form';
import { homeConfigEdit } from '@/services';

const treeData = [
  {
    title: '用户中心',
    key: '0',
    children: [
      {
        title: '用户中心',
        key: '0-0',
      },
    ],
  },
  {
    title: '订单管理',
    key: '1',
    children: [
      {
        title: '订单管理',
        key: '1-0',
        children: [
          { title: '查询', key: '1-0-0' },
          { title: '取消', key: '1-0-1' },
        ]
      },
    ],
  },
  {
    title: '运营管理',
    key: '2',
    children: [
      {
        title: '网站首页管理',
        key: '2-0',
        children: [
          { title: '查询', key: '2-0-0' },
          { title: '编辑', key: '2-0-1' },
        ]
      },
      {
        title: '商品管理',
        key: '2-1',
        children: [
          { title: '查询', key: '2-1-0' },
          { title: '编辑', key: '2-1-1' },
          { title: '下架', key: '2-1-2' },
        ]
      },
      {
        title: '商品分类',
        key: '2-2',
        children: [
          { title: '查询', key: '2-2-0' },
          { title: '编辑', key: '2-2-1' },
          { title: '删除', key: '2-2-2' },
        ]
      },
      {
        title: '运费管理',
        key: '2-3',
        children: [
          { title: '查询', key: '2-3-0' },
          { title: '编辑', key: '2-3-1' },
          { title: '删除', key: '2-3-2' },
        ]
      },
    ],
  },
  {
    title: '统计管理',
    key: '3',
    children: [
      {
        title: '收入管理',
        key: '3-0',
      },
      {
        title: '商品数据',
        key: '3-1',
        children: [
          { title: '查询', key: '3-1-0' },
          { title: '导出', key: '3-1-1' },
        ]
      },
    ]
  }
];

export default (props: any) => {
  const { record = {}, trigger, title } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0-0', '0-0-1']);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[]) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

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
        name="roleName"
        label="角色名称"
        initialValue={record.name}
        rules={[{ required: true, message: '请输入角色名称!' }]}
      />
      <ProFormText
        width="md"
        name="roleDesc"
        label="角色描述"
        initialValue={record.name}
        rules={[{ required: true, message: '请输入角色描述!' }]}
      />
      <ProForm.Item label="角色权限">
        <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={treeData}
        />
      </ProForm.Item>
    </ModalForm>
  );
};
