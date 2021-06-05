import { useState, useRef } from 'react';
import TablePage from '@/components/TablePage';
import { orders, orderCancel } from '@/services';
import { PageContainer } from '@ant-design/pro-layout';
import { Popconfirm } from 'antd';
import DetailModal from './components/DetailModal';

export default () => {
  const ref = useRef<any>();
  const [detailInfo, setDetailInfo] = useState(null);

  const orderEnum = {
    '00': { text: '全部', status: 'Default' },
    '01': {
      text: '待支付',
      status: 'Processing',
    },
    '02': {
      text: '已支付',
      status: 'Success',
    },
    '03': {
      text: '已取消',
      status: 'Error',
    },
  };

  const payTypeEnum = {
    '00': { text: '全部' },
    '01': { text: '微信支付' },
    '02': { text: '支付宝支付' },
  };

  const renderRemoveUser = (text: string, onOk: any) => (
    <Popconfirm key="popconfirm" title={`确认${text}吗?`} okText="是" cancelText="否" onConfirm={onOk}>
      <a>{text}</a>
    </Popconfirm>
  );

  const handleCancel = (record: any) => {
    orderCancel().then(() => {
      ref.current.reload();
    });
  }

  const tablePageOptions = {
    actionRef: ref,
    request: orders,
    search: { span: 8, defaultCollapsed: false },
    columns: [
      {
        key: 'mobileOrName',
        name: '',
        hideInTable: true,
        search: true,
        fieldProps: { placeholder: '订单编号、账户、商品名称' },
      },
      { type: 'index' },
      { key: 'orderNo', name: '订单编号' },
      { key: 'accountNo', name: '账号' },
      { key: 'productName	', name: '商品名称' },
      { key: 'session', name: '场次' },
      { key: 'fare', name: '票面' },
      { key: 'ticketType', name: '票种' },
      {
        key: 'payType',
        name: '支付方式',
        search: true,
        valueType: 'select',
        valueEnum: payTypeEnum,
      },
      {
        key: 'orderStatus',
        name: '订单状态',
        search: true,
        valueType: 'select',
        valueEnum: orderEnum,
      },
      {
        key: 'orderDateRange',
        name: '下单时间',
        valueType: 'dateRange',
        search: {
          transform: (value: any) => ({ startTime: value[0], endTime: value[1] }),
        },
        hideInTable: true,
      },
      {
        key: 'orderDate',
        name: '下单时间',
        valueType: 'dateTime',
      },
      { key: 'orderAmount', name: '订单金额' },
      {
        title: '操作',
        valueType: 'option',
        render: (_, record: any) => {
          const option = [<a key="detail" onClick={() => setDetailInfo(record)}>详情</a>];
          if (record.orderStatus !== '03') {
            option.push(renderRemoveUser('取消', () => handleCancel(record)));
          }
          return option;
        },
      },
    ],
  };

  const detailCancel = () => {
    setDetailInfo(null);
  };

  return (
    <PageContainer>
      <TablePage<API.RuleListItem, API.PageParams> {...tablePageOptions} />
      <DetailModal detail={detailInfo} onCancel={detailCancel} />
    </PageContainer>
  );
};
