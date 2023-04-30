export class LockalStorage
{
  static KEY = 'sort'

  /**
   * @returns {Object}
   */
  static read()
  {
    return  JSON.parse(localStorage.getItem(LockalStorage.KEY) || '{}')
  }

  /**
   * @param {Object} payload
   */
  static write(payload)
  {
    const sort = JSON.parse(localStorage.getItem(LockalStorage.KEY) || '{}')

    Object.assign(sort, payload)

    localStorage.setItem(LockalStorage.KEY, JSON.stringify(sort))
  }
}
