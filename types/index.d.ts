export interface FicusCustomElement extends HTMLElement {
}

export type CustomElementGetter = () => any
export type CustomElementMethod = (...args: any[]) => void

export interface CustomElementProperty {
  type: String | Number | Boolean | Object
  required?: boolean
  observed?: boolean
  default?: string | number | boolean | object
}

export interface CustomElementComputedTree {
  [key: string]: CustomElementGetter
}

export interface CustomElementPropertyTree {
  [key: string]: CustomElementProperty
}

export type CustomElementOptions<T> = {
  renderer: (what: T, where: Element) => void
  render: () => T
  computed?: CustomElementComputedTree
  props?: CustomElementPropertyTree
  created?: () => void
  mounted?: () => void
  updated?: () => void
  removed?: () => void
} & {
  [key: string]: CustomElementMethod
}

export declare function createCustomElement<I, T>(tagName: string, options: CustomElementOptions<T>): void
