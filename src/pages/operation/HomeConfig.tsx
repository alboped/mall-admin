/**
 * 网站首页管理
 */
import { useState } from 'react';
import TablePage from '@/components/TablePage';
import { PageContainer } from '@ant-design/pro-layout';
import { homeConfig } from '@/services';
import DetailModal from './components/DetailModal';

export default () => {
  const [detailInfo, setDetailInfo] = useState(null);

  const tablePageOptions = {
    options: false,
    search: false,
    pagination: false,
    request: homeConfig,
    columns: [
      { type: 'index', name: '序号' },
      { key: 'name', name: '标题' },
      { key: 'image', name: '图片', valueType: 'image' },
      { key: 'image', name: '链接' },
      {
        title: '操作',
        valueType: 'option',
        render: (_, record: any) => (
          // <a key="detail" onClick={() => setDetailInfo(record)}>详情</a>
          <DetailModal record={record}/>
        ),
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
