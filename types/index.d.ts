// Custom elements
export type CustomElementGetter = () => any
export type CustomElementMethod = (...args: any[]) => void

export interface CustomElementProperty<AT> {
  type: String | Number | Boolean | Object | Array<AT>
  required?: boolean
  observed?: boolean
  default?: string | number | boolean | object | Array<AT>
}

export interface CustomElementComputedTree {
  [key: string]: CustomElementGetter
}

export interface CustomElementPropertyTree<AT> {
  [key: string]: CustomElementProperty<AT>
}

export type CustomElementOptions<WT, AT> = {
  renderer?: (what: WT, where: Element) => void
  root?: "standard" | "shadow" | "shadow:closed"
  render: () => WT
  computed?: CustomElementComputedTree
  props?: CustomElementPropertyTree<AT>
  created?: () => void
  mounted?: () => void
  updated?: () => void
  removed?: () => void
  propsDidUpdate?: () => void
} & {
  [key: string]: CustomElementMethod
}

export declare function createCustomElement<WT, AT>(tagName: string, options: CustomElementOptions<WT, AT>): void

// Modules
type UseFn = typeof use

type ExternalModuleArgs<T> = { [P in keyof T]: T[P] }
export type ModuleArgs<T> = ExternalModuleArgs<T> & { use: UseFn }

export interface Module<ModuleArgs> {
  create: (args: ModuleArgs) => Promise<void> | void
}

export declare function use<T> (module: Module<T>): void
