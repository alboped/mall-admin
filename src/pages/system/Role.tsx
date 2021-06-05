/**
 * 角色管理
 */
import { Popconfirm, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TablePage from '@/components/TablePage';
import { PageContainer } from '@ant-design/pro-layout';
import { roleList, removeRole } from '@/services/system.api';
import RoleEditModal from './components/RoleEditModal';

export default () => {
  const renderHandle = (text: string, onOk: any) => (
    <Popconfirm key="popconfirm" title={`确认${text}吗?`} okText="是" cancelText="否" onConfirm={onOk}>
      <a>{text}</a>
    </Popconfirm>
  );

  const handleRemoveRole = (record: any) => {
    removeRole({
      id: record.id,
    }).then(res => {
      console.log(res);
    });
  }

  const tablePageOptions = {
    request: roleList,
    columns: [
      { type: 'index', name: '序号' },
      { key: 'mobileOrName', name: '角色名称', search: true },
      { key: 'accountName', name: '角色描述' },
      { key: 'mobile', name: '创建人' },
      { key: 'userName', name: '创建时间' },
      {
        title: '操作',
        valueType: 'option',
        render: (_, record: any) => {
          return [
            <RoleEditModal key="edit" title="修改角色" trigger={<a>修改</a>} />,
            renderHandle('删除', handleRemoveRole),
          ];
        },
      },
    ],
    toolBarRender: () => [
      <RoleEditModal
        key="create"
        title="新增角色"
        trigger={
          <Button type="primary">
            <PlusOutlined />
            新建角色
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
