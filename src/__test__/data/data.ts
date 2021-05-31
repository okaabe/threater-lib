import {
  Client,
  Movie,
  Session,
  Ticket,
  Room,
  Chair,
  searchMovie,
} from '../../interfaces';

export const movies: Movie[] = [
  {
    "id": "1",
    "name": "O Poderoso Chefão",
    "description": "",
    "price": 25,
    "type": "3D",
    "categories": ["infantil", "luta", "guerra"],
    "minAge": 10,
    "duration": 42342342323
  },
  {
    "id": "2",
    "name": "Jumper",
    "description": "",
    "price": 10,
    "categories": ["luta", "guerra", "sobrenatural"],
    "type": "3D",
    "minAge": 14,
    "duration": 33232333
  },
  {
    "id": "3",
    "name": "Rede Social",
    "description": "Conheça a historia de Mark Zuckerberg e ",
    "price": 15,
    "type": "3D",
    "categories": ["tecnologia", "adolescente"],
    "minAge": 16,
    "duration": 42342342323
  },
  {
    "id": "4",
    "name": "O Mágico de Oz",
    "description": "",
    "price": 20,
    "type": "3D",
    "categories": ["infantil", "luta", "guerra"],
    "minAge": 10,
    "duration": 42342342323
  },
  {
    "id": "5",
    "name": "O Poderoso Chefão",
    "description": "",
    "price": 20,
    "type": "3D",
    "categories": ["infantil", "luta", "guerra"],
    "minAge": 9,
    "duration": 42342342323
  }
]

export const sessions: Session[] = [
  {
      "id": "1",
      "movieID": "1",
      "roomId": "1",
      "startAt": 321
  },
  {
      "id": "2",
      "movieID": "2",
      "roomId": "2",
      "startAt": 5335
  },
  {
      "id": "3",
      "movieID": "3",
      "roomId": "3",
      "startAt": 423423
  },
  {
      "id": "4",
      "movieID": "4",
      "roomId": "4",
      "startAt": 4234234
  },
  {
      "id": "5",
      "movieID": "5",
      "roomId": "5",
      "startAt": 234234
  }
]

export const rooms: Room[] = [
  {
     "id": "1",
     "chairCount": 20
  },
  {
      "id": "2",
      "chairCount": 20
  },
  {
      "id": "3",
      "chairCount": 20
  },
  {
      "id": "4",
      "chairCount": 20
   },
   {
       "id": "5",
       "chairCount": 20
   },
   {
       "id": "6",
       "chairCount": 20
   },
   {
      "id": "7",
      "chairCount": 20
   },
   {
       "id": "8",
       "chairCount": 20
   },
   {
       "id": "9",
       "chairCount": 20
   },
   {
      "id": "10",
      "chairCount": 20
   },
   {
       "id": "11",
       "chairCount": 20
   },
   {
       "id": "12",
       "chairCount": 20
   },
   {
      "id": "13",
      "chairCount": 20
   },
   {
       "id": "14",
       "chairCount": 20
   },
   {
       "id": "15",
       "chairCount": 20
   },
   {
      "id": "16",
      "chairCount": 20
   },
   {
       "id": "17",
       "chairCount": 20
   },
   {
       "id": "18",
       "chairCount": 20
   },
   {
      "id": "19",
      "chairCount": 33,
   }
]  
