// Custom elements
export type CustomElementMethod = (...args: any[]) => any

export interface CustomElementProperty<TArrayPropType = any> {
  type: String | Number | Boolean | Object | Array<TArrayPropType>
  required?: boolean
  observed?: boolean
  default?: string | number | boolean | object | Array<TArrayPropType>
}

export interface CustomElementComputedTree<TGetterReturnType = any> {
  [key: string]: TGetterReturnType
}

export interface CustomElementPropertyTree<TArrayPropType = any> {
  [key: string]: CustomElementProperty<TArrayPropType>
}

export type CustomElementOptions<TRenderResult, TArrayPropType = string, TGetterReturnType = any> = {
  renderer?: (what: TRenderResult, where: Element) => void
  root?: "standard" | "shadow" | "shadow:closed"
  render: () => TRenderResult
  computed?: CustomElementComputedTree<TGetterReturnType>
  props?: CustomElementPropertyTree<TArrayPropType>
  created?: () => void
  mounted?: () => void
  updated?: () => void
  removed?: () => void
  propsDidUpdate?: () => void
} & {
  [key: string]: CustomElementMethod
}

export declare function createCustomElement<TRenderResult, TArrayPropType = string>(tagName: string, options: CustomElementOptions<TRenderResult, TArrayPropType>): void

// Modules
type UseFn = typeof use

type ExternalModuleArgs<T> = { [P in keyof T]: T[P] }
export type ModuleArgs<T> = ExternalModuleArgs<T> & { use: UseFn }

export interface Module<ModuleArgs> {
  create: (args: ModuleArgs) => Promise<void> | void
}

export declare function use<T> (module: Module<T>): void
