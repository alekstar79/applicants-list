export const COLOR_RANGE = { RED: { MIN: 0, MAX: 49 }, ORANGE: { MIN: 50, MAX: 74 }, GREEN: { MIN: 75, MAX: 100 } }

export const COLOR_MAP = { RED: '#FF0000', ORANGE: '#FFA200', GREEN: '#01AA88' }

export const DATE_FORMAT = { day: '2-digit', month: '2-digit', year: 'numeric' }

export const SUBJECTS_ENUM = { lang: 0, math: 1, comp: 2 }

export const BASE_URL = '/applicants-list'

export const MIN_WIDTH = 360

export const MAX_TOTAL = 15

export const MAX_SCORE = 5

export const CONVERSION = {
  name: 'ФИО',
  date: 'Дата подачи заявления',
  lang: 'Балл по русскому',
  math: 'Балл по математике',
  comp: 'Балл по информатике',
  total: 'Суммарный балл',
  percent: 'Процент'
}

export const SORT = {
  PERCENT: 'percent',
  TOTAL: 'total',
  NAME: 'name',
  DATE: 'date',
  LANG: 'lang',
  MATH: 'math',
  COMP: 'comp'
}
