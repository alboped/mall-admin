/**
 * 运费管理
 */
import { Popconfirm, Button } from  'antd';
import TablePage from '@/components/TablePage';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { postageList, removePostage } from '@/services';
import PostageEditModal from './components/PostageEditModal';

export default () => {
  const renderHandle = (text: string, onOk: any) => (
    <Popconfirm key="popconfirm" title={`确认${text}吗?`} okText="是" cancelText="否" onConfirm={onOk}>
      <a>{text}</a>
    </Popconfirm>
  );

  const handleRemoveGoodsType = (record: any) => {
    removePostage({
      id: record.id,
    }).then(res => {
      console.log(res);
    });
  }

  const tablePageOptions = {
    request: postageList,
    rowKey: 'userName',
    columns: [
      {
        key: 'mobileOrName',
        name: '',
        hideInTable: true,
        search: true,
        fieldProps: { placeholder: '手机号、姓名' },
      },
      { type: 'index', name: '序号' },
      { key: 'accountName', name: '类别' },
      { key: 'mobile', name: '创建时间' },
      { key: 'userName', name: '创建人' },
      {
        title: '操作',
        valueType: 'option',
        render: (_, record: any) => {
          return [
            <PostageEditModal key="edit" title="编辑运费模板" trigger={<a>编辑</a>} />,
            renderHandle('删除', handleRemoveGoodsType),
          ];
        },
      },
    ],
    toolBarRender: () => (
      <PostageEditModal
        key="create"
        title="新建运费模板"
        trigger={
          <Button type="primary">
            <PlusOutlined />
            新建模板
          </Button>
        }
      />
    )
  };

  return (
    <PageContainer>
      <TablePage<API.RuleListItem, API.PageParams> {...tablePageOptions} />
    </PageContainer>
  );
};
