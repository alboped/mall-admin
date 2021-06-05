/**
 * 商品分类
 */
import TablePage from '@/components/TablePage';
import { PageContainer } from '@ant-design/pro-layout';
import { Popconfirm, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { goodsTypes, removeGoodsType } from '@/services';
import GoodsClassifyEdit from './components/GoodsClassifyEdit';

export default () => {
  const renderHandle = (text: string, onOk: any) => (
    <Popconfirm key="popconfirm" title={`确认${text}吗?`} okText="是" cancelText="否" onConfirm={onOk}>
      <a>{text}</a>
    </Popconfirm>
  );

  const handleRemoveGoodsType = (record: any) => {
    removeGoodsType({
      id: record.id,
    }).then(res => {
      console.log(res);
    });
  }

  const tablePageOptions = {
    request: goodsTypes,
    columns: [
      { type: 'index', name: '序号' },
      {
        key: 'mobileOrName',
        name: '',
        hideInTable: true,
        search: true,
        fieldProps: { placeholder: '类别名称' },
      },
      { key: 'accountName', name: '类别' },
      { key: 'registerDate', name: '创建时间' },
      { key: 'mobile', name: '创建人' },
      {
        title: '操作',
        valueType: 'option',
        render: (_, record: any) => {
          return [
            <GoodsClassifyEdit key="edit" title="编辑分类" trigger={<a>编辑</a>} />,
            renderHandle('删除', handleRemoveGoodsType),
          ];
        },
      },
    ],
    toolBarRender: () => (
      <GoodsClassifyEdit
        key="create"
        title="发布商品"
        trigger={
          <Button type="primary">
            <PlusOutlined />
            新建表单
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
