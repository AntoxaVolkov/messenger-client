import Vue from 'vue'
import i18n from '@/lang'
import store from '@/store'
import axios from 'axios'
import component from '@/components/Pages/Reset'

Vue.http = Vue.prototype.$http = axios

describe('Login.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      i18n,
      store,
      render: h => h(component)
    }).$mount()

    expect(vm.$el.querySelector('.reset_field--header p').textContent).to.contain('Восстановить пароль')
  })
})