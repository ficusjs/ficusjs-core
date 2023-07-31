export function loadRenderer () {
  return import('./renderers/uhtml.mjs')
}

export function elementFromString (htmlStr) {
  const div = globalThis.document.createElement('div')
  div.innerHTML = htmlStr
  return div.firstChild
}

export const waitFor = (test = () => true, timeoutInMilliseconds = 10000) => new Promise((resolve, reject) => {
  const check = () => {
    if (test()) {
      resolve()
    } else if ((timeoutInMilliseconds -= 100) < 0) {
      reject(new Error('Timed out waiting!'))
    } else {
      setTimeout(check, 100)
    }
  }
  setTimeout(check, 100)
})
