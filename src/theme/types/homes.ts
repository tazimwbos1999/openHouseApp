
export type IBuyerHeroProps = {
  textId: string;
  name: string;
  label: string;
  caption: string;
  desktopCoverUrl: string;
  mobileCoverUrl: string;
};

export type IHomeProps = {
  slug: string
  society: Society
  propertyType: PropertyType
  layout: Layout
  price: Price
  parking: Parking
  furnishings: Furnishing[]
  overlooking: Overlooking[]
  whyChooseThisHome: WhyChooseThisHome[]
  whyBuyFromUs: WhyBuyFromUs[]
  unitAddress: UnitAddress,
  homePhotos: HomePhoto[]
  listingStatus: string
  unitAddressLine1: string
  unitAddressLine2: string
  floor: number
  facing: string
  naturalLightScore: string
  furnishingStatus: string
  isCornerProperty: boolean
  propertyAge: number
  ageUnits: string
  createdAt: string
  updatedAt: string
}

export interface Society {
  builderName: string
  maintenanceAgencies: MaintenanceAgency[]
  essentialAmenities: EssentialAmenity[]
  amenities: Amenity[]
  whyChooseThisSociety: WhyChooseThisSociety[]
  map: Map
  microMarket: MicroMarket
  locality: Locality
  layouts: Layout[]
  name: string
  connectivityScore: string
  openSpacePc: string
  isClubPresent: boolean
  totalUnits: number
  sizeAcres: string
  societyAge: number
  phLevel: string
  createdAt: string
  updatedAt: string
}

export interface MaintenanceAgency {
  name: string
}

export interface EssentialAmenity {
  name: string
}

export interface Amenity {
  name: string
}

export interface WhyChooseThisSociety {
  reason: string
}

export interface Map {
  address: string
  latitude: string
  longitude: string
  googleMapUrl: string
}

export interface MicroMarket {
  name: string
  address: string
  latitude: string
  longitude: string
  googleMapUrl: string
}

export interface Locality {
  name: string
  environment: string[]
  safetySecurity: string[]
  education: string[]
  healthcare: string[]
  infrastructure: string[]
  traffic: string
  retail: string[]
  entertainment: string[]
}

export interface Layout {
  bedrooms: Bedroom[]
  bathrooms: Bathroom[]
  balconies: Balcony[]
  livingDining: LivingDining
  kitchen: Kitchen
  config: number
  name: string
  areaUnit: string
  numberOfBalconies: number
  bath: number
  servantQtr: number
  builtUp: number
  carpet: number
  superBuiltUp: number
  pujaRoom: number
  studyRoom: number
}

export interface Bedroom {
  config: string
  type: string
  area: string
  areaUnit: string
  length: string
  breadth: string
  lengthUnit: string
}

export interface Bathroom {
  config: string
  type: string
  area: string
  areaUnit: string
  length: string
  breadth: string
  lengthUnit: string
}

export interface Balcony {
  config: string
  area: string
  areaUnit: string
  length: string
  breadth: string
  lengthUnit: string
}

export interface LivingDining {
  area: string
  areaUnit: string
  length: string
  breadth: string
  lengthUnit: string
}

export interface Kitchen {
  area: string
  areaUnit: string
  length: string
  breadth: string
  lengthUnit: string
}

export interface PropertyType {
  name: string
}

export interface Price {
  totalCurrency: string
  total: string
  perSqFtCurrency: string
  perSqFt: string
  includes: string[]
}

export interface Parking {
  covered: number
  open: number
}

export interface Furnishing {
  name: string
}

export interface Overlooking {
  name: string
}

export interface WhyChooseThisHome {
  reason: string
}

export interface WhyBuyFromUs {
  reason: string
}

export interface HomePhoto {
  id: number
  image: string
  altText: string
  tags: string[]
  isThumbnail: boolean
  isDetailImage: boolean
}

export type ICustomerTestimonialProps = {
  id: string;
  name: string;
  quote: string;
  about: string;
  avatarUrl: string;
  verified?: boolean;
};

export interface IconUrlProps {
  key: string
  iconSvgUrl: string
}

export interface UnitAddress {
  firstLine: string
  secondLine: string
}