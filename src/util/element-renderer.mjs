export function elementRenderer (what, where) {
  // remove any existing elements
  while (where.firstChild) where.removeChild(where.firstChild)

  let element
  if (typeof what === 'string') {
    // create a new in-memory element
    element = document.createElement('div')
    element.innerHTML = what
  } else if (what.nodeName) {
    element = what
  } else {
    throw new Error(`Unable to render ${what}. Have you included a renderer function?`)
  }

  // add the element to the DOM
  if (element) where.appendChild(element)
}
