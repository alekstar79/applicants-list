import { useStore, TOGGLE_SORT, SET_APPLICANTS_LIST } from '@/store'
import { computed, watch } from 'vue'

import {

  SORT,
  CONVERSION,
  SUBJECTS_ENUM,
  DATE_FORMAT,
  MAX_TOTAL,
  COLOR_MAP,
  COLOR_RANGE

} from './constants'

/**
* @typedef Subject
* @property {String} subject
* @property {String} score
*/

/**
* @typedef Applicant
* @property {Number} id
* @property {String} name
* @property {String} date
* @property {Subject[]} subjects
*/

const cloneList = list => [].concat(list.map(mapHandler))

function mapHandler({ subjects, ...rest })
{
  return Object.assign({}, rest, (subjects && {
    subjects: cloneList(subjects)
  }))
}

export function useApplicant()
{
  const store = useStore()

  const clone = cloneList(store.getters.applicants)
  const orderBy = computed(() => store.getters.orderBy)

  const listOfApplicants = computed({
    set(list) {
      store.commit(SET_APPLICANTS_LIST, list)
    },
    get() {
      return store.getters.applicants
    }
  })

  /**
   * @param {String} key
   * @return {String}
   */
  const convert = key => CONVERSION[key]

  /**
   * @param {Number} total
   * @param {Subject} subject
   * @return {Number}
   */
  const totalReducer = (total, subject) => {
    total += +subject.score

    return total
  }

  /**
   * @param {Subject[]} subjects
   * @return {Number}
   */
  const total = ({ subjects }) => subjects.reduce(totalReducer, 0)

  /**
   * @param {Subject[]} subjects
   * @return {Number}
   */
  const percent = ({ subjects }) => {
    const value = 100 * total({ subjects }) / MAX_TOTAL

    return +value.toFixed(0)
  }

  /**
   * @param {String} date
   * @return {String}
   */
  const localeDate = (date) => {
    return new Date(date).toLocaleString('ru-RU', DATE_FORMAT)
  }

  /**
   * @param {Applicant[]} list
   * @return {Applicant[]}
   */
  const nameSort = list => list.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })

  /**
   * @param {Applicant[]} list
   * @return {Applicant[]}
   */
  const dateSort = list => list.sort((a, b) => {
    return new Date(a.date) - new Date(b.date)
  })

  /**
   * @param {Applicant[]} list
   * @param {String} by
   * @return {Applicant[]}
   */
  const subjectSort = (list, by) => {
    const idx = SUBJECTS_ENUM[by]

    return list.sort((a, b) => {
      return Number(a.subjects[idx].score) - Number(b.subjects[idx].score)
    })
  }

  /**
   * @param {Applicant[]} list
   * @param {String} by
   * @return {Applicant[]}
   */
  const scoreSort = (list, by) =>  {
    const handler = by === 'total' ? total : percent

    return list.sort((a, b) => {
      return handler(a) - handler(b)
    })
  }

  /**
   * @param {Applicant[]} list
   * @param {String} by
   * @param {String} order
   * @return {Applicant[]}
   */
  const sortBy = (list, by, order) => {
    order ||= 'asc'
    by ||= 'name'

    switch (by) {
      case SORT.LANG:
      case SORT.MATH:
      case SORT.COMP:
        list = subjectSort(list, by)
        break
      case SORT.PERCENT:
      case SORT.TOTAL:
        list = scoreSort(list, by)
        break
      case SORT.NAME:
        list = nameSort(list)
        break
      case SORT.DATE:
        list = dateSort(list)
        break
    }

    return order === 'desc'
      ? list.reverse()
      : list
  }

  /**
   * @return {Applicant[]}
   */
  const sort = () => {
    return sortBy(listOfApplicants.value, orderBy.value.by, orderBy.value[orderBy.value.by])
  }

  const toggleSort = by => {
    store.commit(TOGGLE_SORT, { by, [by]: orderBy.value[by] === 'asc' ? 'desc' : 'asc' })
  }

  const setOrder = order => {
    store.commit(TOGGLE_SORT, { /* [orderBy.value.by]: */ order })
  }

  const setSort = by => {
    store.commit(TOGGLE_SORT, { by })
  }

  /**
   * @param {HTMLInputElement} target
   */
  const searchHandler = ({ target }) => {
    const filter = target.value.toLowerCase()

    listOfApplicants.value = clone.filter(({ name }) => {
      return name.toLowerCase().includes(filter)
    })

    listOfApplicants.value = sort()
  }

  /**
   * @param {Number} x
   * @param {Number} min
   * @param {Number} max
   * @return {boolean}
   */
  const between = (x, min, max) => x >= min && x <= max

  /**
   * @param {Number|String} score
   * @param {Number} top
   * @return {String}
   */
  const getColor = (score, top) => {
    score *= 100 / top

    let KEY, COLOR = COLOR_MAP.RED

    if (Object.entries(COLOR_RANGE)
      .some(([COLOR, { MIN, MAX }]) => {
        if (between(score, MIN, MAX)) {
          KEY = COLOR
          return true
        }

        return false
      })
    ) {
      COLOR = COLOR_MAP[KEY]
    }

    return COLOR
  }

  watch(orderBy, () => {
    listOfApplicants.value = sort()

  }, {
    immediate: true
  })

  return {
    orderBy,
    listOfApplicants,

    searchHandler,
    localeDate,
    toggleSort,
    setOrder,
    setSort,
    getColor,
    convert,
    percent,
    total
  }
}
