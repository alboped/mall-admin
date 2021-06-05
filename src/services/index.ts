import { request } from 'umi';

/** 订单列表 */
export async function orders(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
) {
  return request<API.RuleList>('/api/orders', {
    method: 'POST',
    params: {
      ...params,
    },
  });
}

/** 订单详情 */
export async function orderDetail(
  params: {
    /** 订单ID */
    id?: string;
  },
) {
  return request<API.RuleList>('/api/info', {
    params: {
      ...params,
    },
  });
}


/** 取消订单 */
export async function orderCancel() {
  return request<API.RuleList>('/api/info');
}

/** 网站首页配置列表 */
export async function homeConfig() {
  return request<API.RuleList>('/api/list');
}

/** 网站首页配置编辑 */
export async function homeConfigEdit() {
  return request<API.RuleList>('/api/info');
}

/** 商品管理列表 */
export async function goodsList() {
  return request<API.RuleList>('/api/list');
}

/** 商品上下架 */
export async function goodsStatusChange(
  params: {
    /** 订单ID */
    id: string;
    status: string;
  },
) {
  return request<API.RuleList>('/api/info', {
    params: {
      ...params,
    },
  });
}

/** 商品分类列表 */
export async function goodsTypes() {
  return request<API.RuleList>('/api/list');
}

/** 删除商品分类 */
export async function removeGoodsType(
  params: {
    /** 订单ID */
    id: string;
  },
) {
  return request<API.RuleList>('/api/info', {
    params: {
      ...params,
    },
  });
}

/** 运费模板列表 */
export async function postageList() {
  return request<API.RuleList>('/api/list');
}

/** 删除运费模板 */
export async function removePostage(
  params: {
    /** 模板ID */
    id: string;
  },
) {
  return request<API.RuleList>('/api/info', {
    params: {
      ...params,
    },
  });
}

/** 查询运费地区列表 */
export async function provinces() {
  return request<API.RuleList>('/api/provinces');
}

/** 统计管理 折线图数据 */
export async function charts() {
  return request<API.RuleList>('/api/charts');
}
