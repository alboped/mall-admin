export const orderEnum = {
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

export const payTypeEnum = {
  '00': { text: '全部' },
  '01': { text: '微信支付' },
  '02': { text: '支付宝支付' },
};
