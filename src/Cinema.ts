import {
    Client,
    Movie,
    Session,
    Ticket,
    Room,
    Chair,
    searchMovie,
    searchSession
} from './interfaces';
import ErrorMessages from './ErrorMessages';
import Logger from './util/Terminal';
import Util from './util/Util';

/**
 * Classe responsavel pelo Cinema
 * 
 */
export default class Cinema {
  /**
   * Os Filmes do Cinema.
   */
  private movies: Movie[];
  /**
   * As Salas do Cinema.
   */
  private rooms: Room[];
  /**
   * As Sessões do Cinema.
   */
  private sessions: Session[];
  /**
   * Os Bilhetes comprados.
   */
  private tickets: Ticket[];
  /**
   * Clientes registrados.
   */
  private clients: Client[];

  public weekendDiscount: number;

  constructor(rooms: Room[], movies: Movie[], sessions: Session[], weekendDiscount = 5) {
    this.movies = movies;
    this.sessions = sessions;
    this.rooms = rooms;
    this.tickets = [];
    this.clients = [];
    this.weekendDiscount = weekendDiscount;
  }

  /**
   * Verifica se a Sessão existe.
   * @param sessionId ID da sessão.
   * @retuns Se a sessão existe.
   */
  private checkIfSessionExists (sessionId: string): boolean {
    return  this.sessions.some(session => session.id === sessionId);
  }

  /**
   * Verifica se a cadeira existe na sala da sessão.
   * @param chairNumber Nûmero da cadeira.
   * @param sessionId ID da sessão.
   * 
   */
  private checkIfChairExists(chairNumber: number, sessionId: string): boolean {
    if (!this.checkIfSessionExists(sessionId)) {
      throw new Error(ErrorMessages.SESSION_INVALID)
    }
    
    const session = this.sessions.find(session => session.id === sessionId) as Session;
    const room = this.rooms.find(room => room.id === session.roomId);

    if (!room) {
      throw new Error(ErrorMessages.ROOM_INVALID);
    }
    if (chairNumber <= 0) {
      return false;
    }
    if (chairNumber <= room.chairCount) {
      return true;
    }

    return false;
  }
  
  /**
   * Método responsavel por verificar se a cadeira ja está ocupada
   * 
   * @param chairNumber Nûmero da cadeira
   * @param sessionId ID da sessão
   */
  private checkIfChairIsOccupied(chairNumber: number, sessionId: string): boolean {
    return this.tickets.some((ticket) => ticket.chairNumber === chairNumber && ticket.sessionId === sessionId);
  }

  /**
   * Método responsavel por verificar se o cliente está registrado.
   * 
   * @param cpf CPF do Cliente
   */
  public checkIfClientIsRegistered(cpf: string): boolean {
    return this.clients.some((client) => client.cpf === cpf);
  }
  
  /**
   * Método responsavel por registrar um cliente.
   * 
   * @param clientData Informações do Cliente
   */
  registerClient(clientData: Client): Client {
    const clientInfo = {
      cpf: String(this.clients.length),
      name: clientData.name,
      dateOfBirth: clientData.dateOfBirth,
      status: clientData.status,
      phoneNumber: clientData.phoneNumber
    }
    this.clients.push(clientInfo);
    return clientInfo;
  }
  
  private getMovieBySession(sessionId: string): null | Movie {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) return null
    return this.movies.find(movie => movie.id === session.movieID) ?? null;
  }

  /**
   * Método responsavel por comprar o Boletim
   * 
   * @param cpf ID do cliente
   * @param chairNumber Nûmero da Cadeira
   * @param sessionId ID da sessão
   */

  public buyTicket(cpf: string, chairNumber: number, sessionId: string): Ticket {
    if (!this.checkIfClientIsRegistered(cpf)) {
      throw new Error(ErrorMessages.CLIENT_INVALID);
    }
    if (!this.checkIfSessionExists(sessionId)) {
      throw new Error(ErrorMessages.SESSION_INVALID)
    }
    if (!this.checkIfChairExists(chairNumber, sessionId)) {
      throw new Error(ErrorMessages.CHAIR_INVALID)
    }
    if (this.checkIfChairIsOccupied(chairNumber, sessionId)) {
      throw new Error(ErrorMessages.OCCUPIED_CHAIR);
    }

    const client = this.clients.find((client) => client.cpf === cpf);
    const price = (this.getMovieBySession(sessionId) as Movie).price
    let priceToPay: number = this.getMovieBySession(sessionId)?.price ?? 20;

    if (Util.isWeekend()) {
      priceToPay -= this.weekendDiscount;
    }

    switch(client?.status) {
      case 'studying':
        priceToPay = priceToPay / 2;
        break;
      case 'working':
        if (!Util.isAdult(client.dateOfBirth)) {
          priceToPay = priceToPay / 2;
        }
        break;
    }

    if (priceToPay < 0) {
      priceToPay = 0;
    }

    Logger.log(`Foi retirado ${price} de seu saldo!`);

    const ticket: Ticket = {
      cpf,
      sessionId,
      chairNumber,
      priceToPay,
      price,
      boughtAt: Date.now(),
    };
    
    this.tickets.push(ticket)
    return ticket;
  }
  /**
   * - Método responsavel por mostrar todas as cadeiras da sessão
   * e se está disponivel ou ocupada.
   * 
   * @param sessionId Nûmero da Sessão
   */
  public getChairs(sessionId: string): Chair[] {
    if (!this.checkIfSessionExists(sessionId)) {
      throw new Error(ErrorMessages.SESSION_INVALID)
    }
    const session = this.sessions.find((session) => session.id === sessionId) as Session
    const room = this.rooms.find((room) =>  room.id === session.roomId) as Room
    const tickets = this.tickets.filter((ticket) => ticket.sessionId === sessionId);
    return new Array(room.chairCount).map<Chair>((_, index) => ({
      chairNumber: index,
      occuped: tickets.some((ticket) => ticket.chairNumber === index)
    }))
  }
  /**
   * Buscar Filmes
   * 
   * @param movieQuery Query para fazer uma rapida pesquisa nos filmes
   * registrados.
   */
  public searchSession(sessionQuery: searchSession = {}) : Session[] {
    return this.sessions.filter((session) => {
      if (sessionQuery.roomId && session.roomId !== sessionQuery.roomId) return false;
      if (sessionQuery.id && session.id !== sessionQuery.id) return false;
      if (sessionQuery.movieId && session.movieID !== sessionQuery.movieId) return false;
      if (sessionQuery.startAt && session.startAt !== sessionQuery.startAt) return false;

      return true;
    })
  }

  public searchMovies(movieQuery: searchMovie = {}): Movie[] {
    return this.movies.filter((movie) => {
      if (movieQuery.name && movie.name.toLowerCase() !== movieQuery.name.toLowerCase()) return false;
      if(movieQuery.type && movie.type !== movieQuery.type) return false;
      if (movieQuery.minAge && movie.minAge < movieQuery.minAge) return false;
      if (movieQuery.minPrice && movie.price < movieQuery.minPrice) return false;
      if (movieQuery.maxPrice && movie.price > movieQuery.maxPrice) return false;
      if (movieQuery.categories && movie.categories.every((category) => !movieQuery.categories?.includes(category))) {
        return false;
      }
      return true;
    })
  }
}
