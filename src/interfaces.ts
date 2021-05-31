type ID = string;
export interface Movie {
  id: ID;
  description: string;
  name: string;
  price: number;
  categories: string[];
  type: '3D' | '2D';
  minAge: number;
  duration: number;
}

export interface Client {
  cpf: ID;
  name: string;
  dateOfBirth: Date;
  phoneNumber: number;
  status: "working" | "studying" | 'none'
}

export interface Ticket {
   cpf: ID;
   sessionId: string;
   chairNumber: number;
   boughtAt: number;
   priceToPay: number;
   price: number;
}


export interface Room {
  id: ID;
  chairCount: number;
}

export interface Session {
  id: ID;
  movieID: ID;
  roomId: string;
  startAt: number;
}

export interface Chair {
  chairNumber: number;
  occuped: boolean;
}

export interface searchSession {
  id?: string;
  movieId?: string;
  roomId?: string;
  startAt?: number;
}

export interface searchMovie {
  minPrice?: number;
  maxPrice?: number;
  name?: string;
  minAge?: number;
  categories?: string[];
  type?: '3D' | '2D';
}