/**
* @class MediaTracker
* @constructor
*/
export class MediaTracker
{
  constructor(width)
  {
    this.maxWidth = window.matchMedia(`(max-width: ${width}px)`)
  }

  setHandler(handler)
  {
    this.maxWidth.addEventListener('change', e => {
      handler(e.matches)
    })
  }
}
