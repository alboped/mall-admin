/**
 * 收入统计
 */
import { useState, useEffect } from 'react';
import { Card, Spin } from 'antd';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import type { StatisticProps } from '@ant-design/pro-card';
import {
  QueryFilter,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Line } from '@ant-design/charts';
import { charts } from '@/services';

const { Statistic } = StatisticCard;

const items = [
  { key: '1', title: '支付金额', value: 1 },
  { key: '2', title: '支付用户', value: 2 },
  { key: '3', title: '支付订单苏', value: 3 },
];

export default () => {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  const config = {
    data: chartData,
    xField: 'month',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };

  const getLineCharts = () => {
    setLoading(true);
    charts().then(res => {
      setChartData(res);
    }).finally(() => setLoading(false));
  }

  useEffect(() => {
    getLineCharts();
  }, []);

  return (
    <PageContainer>
      <Card style={{marginBottom: '12px'}}>
        <QueryFilter<{
          name: string;
          company: string;
        }>
          onFinish={async (values) => {
            console.log(values.name);
            getLineCharts();
          }}
        >
          <ProFormDatePicker name="startDate" placeholder="下单开始时间" />
          <ProFormDatePicker name="endDate" placeholder="下单结束时间" />
        </QueryFilter>
      </Card>
      <Spin spinning={loading}>
        <ProCard
          tabs={{
            onChange: (key) => {
              console.log('key', key);
              getLineCharts();
            },
          }}
        >
          {items.map((item) => (
            <ProCard.TabPane
              style={{ width: '100%' }}
              key={item.key}
              tab={
                <Statistic
                  layout="vertical"
                  title={item.title}
                  value={item.value}
                  status={item.status as StatisticProps['status']}
                  style={{ width: 120, borderRight: item.total ? '1px solid #f0f0f0' : undefined }}
                />
              }
            >
              <div style={{height: '460px'}}>
                <Line {...config} />
              </div>
            </ProCard.TabPane>
          ))}
        </ProCard>
      </Spin>
    </PageContainer>
  );
};
