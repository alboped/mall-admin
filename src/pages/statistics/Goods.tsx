import { Button } from 'antd';
import TablePage from '@/components/TablePage';
import { PageContainer } from '@ant-design/pro-layout';
import { rule } from '@/services/ant-design-pro/api';
import { goodsTypeEnum } from '../operation/components/enum';

export default () => {
  const tablePageOptions = {
    request: rule,
    search: {
      defaultCollapsed: false,
      labelWidth: '80px',
      optionRender: (_searchConfig, _formProps, dom) => [
        ...dom.reverse(),
        <Button key="out">导出</Button>,
      ],
    },
    columns: [
      { type: 'index', name: '序号' },
      { key: 'accountName', name: '商品名称', search: true },
      {
        key: 'goodsType',
        name: '商品分类',
        search: true,
        hideInTable: true,
        valueType: 'select',
        valueEnum: goodsTypeEnum,
      },
      { key: 'startDate', name: '下单开始时间', valueType: 'date', search: true, hideInTable: true },
      { key: 'endDate', name: '下单结束时间', valueType: 'date', search: true, hideInTable: true },
      { key: 'mobile', name: '支付订单数' },
      { key: 'userName', name: '支付用户' },
      { key: 'idCardNo', name: '支付金额' },
    ],
    toolbar: {
      subTitle: '统计时间：2021-05-09  00：00：00 至 2021-05-09  23：59：59',
    }
  };

  return (
    <PageContainer>
      <TablePage<API.RuleListItem, API.PageParams> {...tablePageOptions} />
    </PageContainer>
  );
};
