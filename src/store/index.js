import { FETCH_APPLICANTS_LIST, SET_APPLICANTS_LIST, SET_SCREEN_MODE, TOGGLE_SORT } from './types'
import { LockalStorage } from './localstorage'
import { SORT } from '@/composable/constants'
import { api } from '@/utils/fetch'

import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

/**
* @param {Object} acc
* @param {String} by
*/
const reducer = (acc, by) => ({ ...acc, [by]: 'asc' })
const orderBy = LockalStorage.read()

if (!orderBy.by) {
  Object.assign(orderBy, {
      ...Object.values(SORT).reduce(reducer, {}),
      by: 'name',
    }
  )
}

const store = new Vuex.Store({
  state: () => ({
    endpoint: '/api/v1/applicants.json',
    isMobile: true,
    orderBy,
    list: []
  }),

  getters: {
    isMobile: state => state.isMobile,
    orderBy: state => state.orderBy,
    applicants: state => state.list
  },

  mutations: {
    [TOGGLE_SORT](state, payload)
    {
      const { by, ...orders } = state.orderBy
      const sort = payload.order
        ? { by, ...(
              Object.keys(orders)
                .reduce((acc, k) => ({ ...acc, [k]: payload.order }), {})
          ) }
        : {
          ...state.orderBy,
          ...payload
        }

      LockalStorage.write(sort)

      state.orderBy = sort
    },
    [SET_APPLICANTS_LIST](state, payload)
    {
      state.list = payload
    },
    [SET_SCREEN_MODE](state, payload)
    {
      state.isMobile = payload
    }
  },

  actions: {
    async [FETCH_APPLICANTS_LIST]({ state, commit })
    {
      const data = await api(state.endpoint)

      commit(
        SET_APPLICANTS_LIST,
        data.map(applicant => {
          const [s1, s2, s3] = applicant.subjects

          s1.mark = 'lang'
          s2.mark = 'math'
          s3.mark = 'comp'

          applicant.subjects = [s1, s2, s3]

          return applicant
        })
      )
    }
  }
})

export const useStore = () => store

export {
  FETCH_APPLICANTS_LIST,
  SET_APPLICANTS_LIST,
  SET_SCREEN_MODE,
  TOGGLE_SORT
}

export default store
