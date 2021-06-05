/**
 * 系统设置相关接口
 */
import { request } from 'umi';

/** 角色列表 */
export async function roleList() {
  return request<API.RuleList>('/api/list');
}

/** 删除角色 */
export async function removeRole(
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

/** 用户列表 */
export async function userList() {
  return request<API.RuleList>('/api/list');
}

/** 删除用户 */
export async function removeUser(
  params: {
    /** 用户ID */
    id: string;
  },
) {
  return request<API.RuleList>('/api/info', {
    params: {
      ...params,
    },
  });
}

/** 系统设置列表 */
export function systemSettingList() {
  return request<API.RuleList>('/api/system/settings');
}

/** 开启/关闭微信支付 */
export async function updateWeChatPay(
  params: {
    /** 开启/关闭 */
    status: string;
  },
) {
  return request<API.RuleList>('/api/info', {
    params: {
      ...params,
    },
  });
}

/** 开启/关闭支付宝支付 */
export async function updateAliPay(
  params: {
    /** 开启/关闭 */
    status: string;
  },
) {
  return request<API.RuleList>('/api/info', {
    params: {
      ...params,
    },
  });
}
