import { type JwtPayload } from "jsonwebtoken";

export interface UserStructure {
  username: string;
  password: string;
  email?: string;
}
export interface RobotStructure {
  name: string;
  image: string;
  speed: number;
  endurance: number;
  creationDate: Date;
  chip: string;
}

export interface CustomRequest extends Request {
  ownerId: string;
}

export interface CustomJwtPayload extends JwtPayload {
  sub: string;
}

export type usersStructure = UserStructure[];
export type robotsStructure = RobotStructure[];
