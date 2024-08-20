import Repository from '@app/js/api/axios';
import type { TOrder, TShopResponse, TTableQuery } from '@app/js/types.ts'
import type { AxiosResponse } from 'axios'

/**
 * Shop
 */
export const shop = {
  get: () => Repository.get('/shop/items'),
  order: (order: TOrder) => Repository.post('/shop/orders', order)
};

export const bans = {
  get: (page: number) => Repository.get(`/banlist/${page}`),
}

export const shops = {
  get: (params: TTableQuery):  Promise<AxiosResponse<TShopResponse>> => Repository.get(`/shops`, { params }),
}