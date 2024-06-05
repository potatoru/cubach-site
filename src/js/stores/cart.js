import { defineStore } from 'pinia'

export const useCartStore = defineStore('appearanceStore', {
  state: ()=> ({
    items: {}
  }),

  getters: {
    count(state) {
      return Object.keys(state.items).length
    },

    total(state) {
      let sum = 0
      for (let [k, v] of Object.entries(state.items)) {
        sum += v.amount * v.price
      }
      return sum
    }
  },

  actions: {
    append(item, amount) {
      if (Object.prototype.hasOwnProperty.call(this.items, item.id)) {
        if (amount < 0 && this.items[item.id]['amount'] === 1) {
          delete this.items[item.id]
        } else {
          this.items[item.id]['amount'] += amount
        }
      } else {
        this.items[item.id] = item
        this.items[item.id]['amount'] = amount
      }
    }
  }
})
