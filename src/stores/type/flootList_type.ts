export interface NavList {
  url: string
  text: string
}

export interface CarouselList {
  id: string
  imgUrl: string
}

export interface floorList_type {
  id: string
  name: string
  keywords: string[]
  imgUrl: string
  navList: NavList[]
  carouselList: CarouselList[]
  recommendList: string[]
  bigImg: string
}
