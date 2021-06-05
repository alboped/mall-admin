/**
 * 商品管理
 */
import { useState, useRef } from 'react';
import { Button, Radio, Popconfirm } from 'antd';
import TablePage from '@/components/TablePage';
import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { goodsList, goodsStatusChange } from '@/services';
import { goodsTypeEnum, ticketsEnum, goodsStatusEnum } from './components/enum';
import GoodsEdit from './components/GoodsEditModal';

export default () => {
  const ref = useRef<any>();
  const [type, setType] = useState('1');
  const [detailInfo, setDetailInfo] = useState(null);

  const renderHandle = (text: string, onOk: any) => (
    <Popconfirm key="popconfirm" title={`确认${text}吗?`} okText="是" cancelText="否" onConfirm={onOk}>
      <a>{text}</a>
    </Popconfirm>
  );

  const handleGoodsStatusChange = (record: any, status: any) => {
    goodsStatusChange({
      id: record.id,
      status
    }).then(res => {
      console.log(res);
    });
  }

  const tablePageOptions = {
    actionRef: ref,
    search: { span: 8, defaultCollapsed: false },
    params: {type},
    request: goodsList,
    columns: [
      { type: 'index', name: '序号' },
      {
        key: 'mobileOrName',
        name: '',
        hideInTable: true,
        search: true,
        fieldProps: { placeholder: '商品名称' },
      },
      {
        key: 'status',
        name: '商品分类',
        search: true,
        valueType: 'select',
        valueEnum: goodsTypeEnum,
      },
      {
        key: 'status',
        name: '票种',
        search: true,
        valueType: 'select',
        valueEnum: ticketsEnum,
      },
      {
        key: 'status',
        name: '商品状态',
        search: true,
        valueType: 'select',
        valueEnum: goodsStatusEnum,
      },
      { key: 'num', name: '销售价格' },
      { key: 'num', name: '库存数量' },
      { key: 'num', name: '累计销量' },
      { key: 'date', name: '发布时间', valueType: 'date' },
      {
        title: '操作',
        valueType: 'option',
        render: (_, record: any) => {
          const option = [
            <GoodsEdit title="编辑商品" trigger={<a>编辑</a>} />
          ];
          if (record.status === '01') {
            option.push(renderHandle('上架', () => handleGoodsStatusChange(record, '01')));
          } else {
            option.push(renderHandle('下架', () => handleGoodsStatusChange(record, '02')));
          }
          return option;
        },
      },
    ],
    toolBarRender: () => [
      <Radio.Group key="filter" value={type} onChange={(e) => setType(e.target.value)}>
        <Radio.Button value="1">全部</Radio.Button>
        <Radio.Button value="2">在售中</Radio.Button>
        <Radio.Button value="3">已售罄</Radio.Button>
        <Radio.Button value="4">已下架</Radio.Button>
      </Radio.Group>,
      <GoodsEdit
        key="create"
        title="发布商品"
        trigger={
          <Button type="primary">
            <PlusOutlined />
            新建表单
          </Button>
        }
      />,
    ]
  };

  const detailCancel = () => {
    setDetailInfo(null);
  };

  return (
    <PageContainer>
      <TablePage<API.RuleListItem, API.PageParams> {...tablePageOptions} />
    </PageContainer>
  );
};
