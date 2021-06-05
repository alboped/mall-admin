import React, { useState } from 'react';
import ProCard, { StatisticCard } from '@ant-design/pro-card';
import RcResizeObserver from 'rc-resize-observer';
import moment from 'moment';
import styles from './index.less';

const { Divider } = StatisticCard;

export default () => {
  const [responsive, setResponsive] = useState(false);

  const dataTitle = (
    <span>
      销售数据
      <span className={styles.titleDesc}>更新时间：{moment().format('YYYY-MM-DD hh:mm:ss')}</span>
    </span>
  );

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <ProCard hoverable>
        <StatisticCard.Group title="订单" direction={responsive ? 'column' : 'row'}>
          <StatisticCard
            statistic={{
              title: '待支付订单',
              value: 79,
              valueStyle: { color: '#faad14' },
            }}
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: '已支付订单',
              value: 112893,
              valueStyle: { color: '#faad14' },
            }}
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: '已取消订单',
              value: 92,
              valueStyle: { color: '#faad14' },
            }}
          />
        </StatisticCard.Group>
      </ProCard>
      <ProCard hoverable style={{ marginTop: '18px' }}>
        <StatisticCard.Group title="商品" direction={responsive ? 'column' : 'row'}>
          <StatisticCard
            statistic={{
              title: '上架商品',
              value: 79,
              valueStyle: { color: '#faad14' },
            }}
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: '下架商品',
              value: 112893,
              valueStyle: { color: '#faad14' },
            }}
          />
        </StatisticCard.Group>
      </ProCard>
      <ProCard hoverable style={{ marginTop: '18px' }}>
        <StatisticCard.Group title={dataTitle} direction={responsive ? 'column' : 'row'}>
          <StatisticCard
            statistic={{
              title: '销售商品数量',
              value: 195,
              valueStyle: { color: '#faad14' },
            }}
          />
          <StatisticCard
            statistic={{
              title: '销售金额',
              value: 7992090,
              valueStyle: { color: '#faad14' },
            }}
          />
        </StatisticCard.Group>
      </ProCard>
    </RcResizeObserver>
  );
};
