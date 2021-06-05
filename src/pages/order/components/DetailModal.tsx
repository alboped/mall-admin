import { useState, useEffect } from 'react';
import { Modal, Button, Divider, Skeleton } from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';
import { orderDetail } from '@/services';
import { payTypeEnum } from './enum';

const ModalBody = (props: any) => {
  const initDetail = {
    name: undefined as string | undefined,
    id: undefined as string | undefined,
    date: undefined as number | undefined,
    status: undefined as string | undefined,
    num: undefined as number | undefined,
  }
  
  const [detail, setDetail] = useState(initDetail);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    orderDetail({id: props.id}).then(res => {
      if (res.success) {
        setDetail(res.data);
      }
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const priceItem = (label: string, value: any, unit: string, isBold: boolean | undefined = false) => (
    <p>
      <span style={{width: '180px', fontWeight: isBold ? 'bold' : '400'}}>{label}</span>
      <span style={{width: '180px'}}>{value}</span>
      <span style={{width: '180px'}}>{unit}</span>
    </p>
  );
  
  return (
    <div>
      {loading ? <Skeleton active/> : (
        <div>
          <ProDescriptions
            title="订单详情"
          >
            <ProDescriptions.Item label="商品名称" span={3}>{detail.name}</ProDescriptions.Item>
            <ProDescriptions.Item label="用户账户">{detail.id}</ProDescriptions.Item>
            <ProDescriptions.Item label="订单编号">{detail.id}</ProDescriptions.Item>
            <ProDescriptions.Item label="手机号">{detail.date}</ProDescriptions.Item>
            <ProDescriptions.Item label="下单时间" valueType="dateTime">{detail.date}</ProDescriptions.Item>
            <ProDescriptions.Item label="支付方式" valueType="select" valueEnum={payTypeEnum}>{detail.status}</ProDescriptions.Item>
            <ProDescriptions.Item label="票种">{detail.name}</ProDescriptions.Item>
          </ProDescriptions>
          <Divider style={{ margin: '16px 0' }} />
          <div style={{width: '70%'}}>
            <ProDescriptions
              title="订单明细"
              column={1}
            >
              {priceItem('票面', `x${detail.num}`, `${detail.num}元`)}
              {priceItem('运费', `x${detail.num}`, `${detail.num}元`)}
              {priceItem('总计', `x${detail.num}`, `${detail.num}元`, true)}
            </ProDescriptions>
          </div>
        </div>
      )}
    </div>
  );
}

export default (props: any) => {
  const { detail, onCancel } = props;

  return (
    <Modal
      width={740}
      visible={!!detail}
      onCancel={onCancel}
      destroyOnClose
      footer={[
        <Button key="back" onClick={onCancel}>
          确定
        </Button>
      ]}
    >
      <ModalBody id={detail && detail.orderNo}/>
    </Modal>
  );
};
