export interface Landmark {
  id: string;
  name: string;
  sub: string;
  location: string;
  description: string;
  imageUrl: string;
}

export interface CountrysideItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  coords: string;
}

export interface ScotlandStory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  accent: string;
}
