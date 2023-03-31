import Repository from '@app/js/api/axios';

/**
 * Shop
 */
export const shop = {
  get: () => Repository.get('/shop'),
  getItem: (itemId) => Repository.get('/items/' + itemId),
  order: (order) => Repository.post('/order', order)
};
