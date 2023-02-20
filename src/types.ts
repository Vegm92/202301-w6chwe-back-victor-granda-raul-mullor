export interface userStructure {
  username: string;
  password: string;
  email?: string;
}
export interface robotStructure {
  name: string;
  image: string;
  speed: number;
  endurance: number;
  creationDate: Date;
  chip: string;
}

export type usersStructure = userStructure[];
export type robotsStructure = robotStructure[];
