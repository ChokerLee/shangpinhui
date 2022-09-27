export interface CategoryChild2 {
  categoryName: string
  categoryId: number
}

export interface CategoryChild {
  categoryChild: CategoryChild2[]
  categoryName: string
  categoryId: number
}

export interface CategoryList {
  categoryChild: CategoryChild[]
  categoryName: string
  categoryId: number
}
