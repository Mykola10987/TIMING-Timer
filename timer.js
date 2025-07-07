// Displays the time elapsed since startup
class Timer {
  #h
  #mins
  #sec
  #separator
  #block
  
  /**
  * @param {HTMLElement} block - element for rendering time
  * @param {string} separator - timer separator
  */
  constructor(block, separator = ':') {
    if (!(block instanceof HTMLElement)) return console.error('To display the time, specify an HTMLElement')

    this.#separator = separator
    this.#block = block
    this.#sec = this.#mins = this.#h = 0
    this.#render()
  }

  // start counting
  start () {
    this.counter = setInterval(() => {
      this.#sec++

      if (this.#sec == 60) {
        this.#sec = 0

        this.#mins++

        if (this.#mins == 60) {
          this.#mins = 0

          this.#h++
        }
      }

      this.#render()
    }, 1000)
  }

  #reset() {
    clearInterval(this.counter)

    this.#sec = this.#mins = this.#h = 0
  }

  restart() {
    this.#reset()

    this.start()
  }

  stop() {
    this.#reset()

    this.#render()
  }

  rm() {
    this.#reset()

    this.#block.textContent = ''
  }

  #render() {
    let els = [this.#h, this.#mins, this.#sec]

    const add_zero = (() => {
      els = els.map(unit => String(unit).padStart(2, 0))
    })()

    const timer = els.join(this.#separator)

    this.#block.textContent = timer
  }
}
