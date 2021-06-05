import React, { useRef, useMemo } from 'react';
import type { ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';

const TablePage: React.FC = ({ title = '', columns = [], request, ...otherProps }: any) => {
  const columnsList = useMemo(() => {
    return columns.map(({ type, name, key, search = false, ...other }: any) => {
      const columnsItem = {
        key,
        title: name,
        dataIndex: key,
        search,
        ...other,
      };

      if (type === 'index') {
        columnsItem.valueType = 'index';
      }

      return columnsItem;
    });
  }, [columns]);

  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.RuleListItem, API.PageParams>
      headerTitle={title}
      actionRef={actionRef}
      rowKey="key"
      search={{ labelWidth: 120 }}
      request={request}
      columns={columnsList}
      scroll={{ x: 'max-content' }}
      {...otherProps}
    />
  );
};

export default TablePage;
