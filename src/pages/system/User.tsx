/**
 * 用户管理
 */
import { Popconfirm, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TablePage from '@/components/TablePage';
import { PageContainer } from '@ant-design/pro-layout';
import { userList, removeUser } from '@/services/system.api';
import UserEditModal from './components/UserEditModal';

export default () => {
  const renderHandle = (text: string, onOk: any) => (
    <Popconfirm key="popconfirm" title={`确认${text}吗?`} okText="是" cancelText="否" onConfirm={onOk}>
      <a>{text}</a>
    </Popconfirm>
  );

  const handleRemoveRole = (record: any) => {
    removeUser({
      id: record.id,
    }).then(res => {
      console.log(res);
    });
  }

  const tablePageOptions = {
    request: userList,
    columns: [
      {
        key: 'mobileOrName',
        name: '',
        hideInTable: true,
        search: true,
        fieldProps: { placeholder: '手机号、姓名' },
      },
      { type: 'index', name: '序号' },
      { key: 'accountName', name: '账号' },
      { key: 'userName', name: '用户名' },
      { key: 'mobile', name: '手机号' },
      { key: 'idCardNo', name: '角色' },
      { key: 'province', name: '创建人' },
      { key: 'city', name: '用户描述' },
      { key: 'area', name: '创建时间' },
      {
        title: '操作',
        valueType: 'option',
        render: (_, record: any) => {
          return [
            <UserEditModal key="edit" title="修改用户" trigger={<a>修改</a>} />,
            renderHandle('删除', handleRemoveRole),
          ];
        },
      },
    ],
    toolBarRender: () => [
      <UserEditModal
        key="create"
        title="新增用户"
        trigger={
          <Button type="primary">
            <PlusOutlined />
            新增用户
          </Button>
        }
      />,
    ]
  };

  return (
    <PageContainer>
      <TablePage<API.RuleListItem, API.PageParams> {...tablePageOptions} />
    </PageContainer>
  );
};
