/**
 * 系统设置
 */
import { Popconfirm } from 'antd';
import TablePage from '@/components/TablePage';
import { PageContainer } from '@ant-design/pro-layout';
import { systemSettingList, updateWeChatPay, updateAliPay } from '@/services/system.api';
import OpenCityEditModal from './components/OpenCityEditModal';

export default () => {
  const renderHandle = (text: string, onOk: any) => (
    <Popconfirm key="popconfirm" title={`确认${text}吗?`} okText="是" cancelText="否" onConfirm={onOk}>
      <a>{text}</a>
    </Popconfirm>
  );

  const handleUpdateWeChatPay = (record: any) => {
    updateWeChatPay({
      status: '01',
    }).then(res => {
      console.log(res);
    });
  }

  const handleUpdateAliPay = (record: any) => {
    updateAliPay({
      status: '01',
    }).then(res => {
      console.log(res);
    });
  }

  const tablePageOptions = {
    request: systemSettingList,
    pagination: false,
    search: false,
    options: false,
    columns: [
      { type: 'index', name: '序号' },
      { key: 'name', name: '名称' },
      { key: 'name', name: '描述' },
      { key: 'name', name: '注册时间' },
      {
        title: '操作',
        valueType: 'option',
        render: (_, record: any) => {
          if (record.id === '1') return renderHandle('开启', handleUpdateWeChatPay);
          if (record.id === '2') return renderHandle('关闭', handleUpdateAliPay);
          if (record.id === '3') return <OpenCityEditModal key="edit" title="修改角色" trigger={<a>修改</a>} />;
        },
      },
    ],
  };

  return (
    <PageContainer>
      <TablePage<API.RuleListItem, API.PageParams> {...tablePageOptions} />
    </PageContainer>
  );
};
