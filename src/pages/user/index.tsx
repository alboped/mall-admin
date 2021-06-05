import TablePage from '@/components/TablePage';
import { PageContainer } from '@ant-design/pro-layout';
import { rule } from '@/services/ant-design-pro/api';

export default () => {
  const tablePageOptions = {
    request: rule,
    columns: [
      { type: 'index', name: '序号' },
      {
        key: 'mobileOrName',
        name: '',
        hideInTable: true,
        search: true,
        fieldProps: { placeholder: '手机号、姓名' },
      },
      { key: 'accountName', name: '账号' },
      { key: 'mobile', name: '手机号' },
      { key: 'userName', name: '姓名' },
      { key: 'idCardNo', name: '身份证号' },
      { key: 'province', name: '省' },
      { key: 'city', name: '市' },
      { key: 'area', name: '区县' },
      { key: 'address', name: '详细地址' },
      { key: 'registerDate', name: '注册时间' },
    ],
  };

  return (
    <PageContainer>
      <TablePage<API.RuleListItem, API.PageParams> {...tablePageOptions} />
    </PageContainer>
  );
};
