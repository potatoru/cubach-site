import Repository from '@app/js/api/axios';

/**
 * Shop
 */
export const shop = {
  get: () => Repository.get('/shop/items'),
  getItem: (itemId) => Repository.get('/shop/items/' + itemId),
  order: (order) => Repository.post('/shop/orders', order)
};

export const banlist = {
  get: (page) => Repository.get(`/banlist/${page}`),
}

export const shops = {
  get: (params) => Repository.get(`/shops`, { params }),
}