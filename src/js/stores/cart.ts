import { defineStore } from 'pinia'
import type { TItem } from '@app/js/types.ts'

interface State {
  items: {
    [key: number]: {
      amount: number,
      item: TItem
    };
  }
}

export const useCartStore = defineStore('appearanceStore', {
  state: (): State => ({
    items: {}
  }),

  getters: {
    count(state) {
      return Object.keys(state.items).length
    },

    total(state) {
      let sum = 0
      for (let v of Object.values(state.items)) {
        sum += v.amount * v.item.price
      }
      return sum
    }
  },

  actions: {
    append(item: TItem, amount: number) {
      if (Object.prototype.hasOwnProperty.call(this.items, item.id)) {
        if (amount < 0 && this.items[item.id]!!.amount === 1) {
          delete this.items[item.id]
        } else {
          this.items[item.id]!!.amount += amount
        }
      } else {
        this.items[item.id]!!.item = item
        this.items[item.id]!!.amount = amount
      }
    }
  }
})
