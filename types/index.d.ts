// Custom elements
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
  renderer?: (what: T, where: Element) => void
  render: () => T
  computed?: CustomElementComputedTree
  props?: CustomElementPropertyTree
  created?: () => void
  mounted?: () => void
  updated?: () => void
  removed?: () => void
  propsDidUpdate?: () => void
} & {
  [key: string]: CustomElementMethod
}

export declare function createCustomElement<I, T>(tagName: string, options: CustomElementOptions<T>): void

// Modules
type UseFn = typeof use

type ExternalModuleArgs<T> = { [P in keyof T]: T[P] }
export type ModuleArgs<T> = ExternalModuleArgs<T> & { use: UseFn }

export interface Module<ModuleArgs> {
  create: (args: ModuleArgs) => void
}

export declare function use<T> (module: Module<T>): void
