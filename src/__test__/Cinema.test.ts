import { rooms, movies, sessions } from './data/data';
import Cinema from '../Cinema';
import ErrorMessages from '../ErrorMessages';

const cinema = new Cinema(rooms, movies, sessions);

it('isso deve registrar um cliente', () => {
  const client = cinema.registerClient({ cpf: '333', name: 'Osvaldo', dateOfBirth: new Date(2000, 10, 1), phoneNumber: 342141224, status: 'working' });
  expect(client.name).toBe('Osvaldo');
})
  
it('deve checar se o cliente está registrado', () => {
  const client = cinema.registerClient({ cpf: '111', name: 'Osvaldo 2', dateOfBirth: new Date(2000, 10, 1), phoneNumber: 342141224, status: 'working' });
  expect(cinema.checkIfClientIsRegistered(client.cpf)).toBe(true);
});

describe('Comprar bilhete', () => {
  const client = cinema.registerClient({ cpf: '11144', name: 'Osvaldo 2', dateOfBirth: new Date(2000, 10, 1), phoneNumber: 342141224, status: 'working' });

  it('deve retornar erro de cliente não registrado', () => {
    expect(() => cinema.buyTicket('23-4923908905', 1, '1')).toThrow(ErrorMessages.CLIENT_INVALID);
  });
  it('deve retornar erro de cadeira inexistente', () => {
    expect(() => cinema.buyTicket(client.cpf, 0, '1')).toThrow(ErrorMessages.CHAIR_INVALID);
    expect(() => cinema.buyTicket(client.cpf, -1, '1')).toThrow(ErrorMessages.CHAIR_INVALID);
    expect(() => cinema.buyTicket(client.cpf, 10000, '1')).toThrow(ErrorMessages.CHAIR_INVALID);
  });
  it('deve comprar um bilhete', () => {
    const ticket = cinema.buyTicket(client.cpf, 1, '1');
    expect(ticket).toEqual(expect.objectContaining({ cpf: client.cpf, sessionId: '1', chairNumber: 1 }));
  });
  it('deve retornar erro de cadeira ocupada', () => {
    expect(() => cinema.buyTicket(client.cpf, 1, '1')).toThrow(ErrorMessages.OCCUPIED_CHAIR);
  });
});
describe('Filmes', () => {
  it('Deve retornar todos os filmes', () => {
      expect(cinema.searchMovies()).toEqual(movies);
  });

  const moviesWithAgeMin = movies.filter(movie => movie.minAge >= 10);
  it('Deve retornar apenas filmes com à idade minima de 10 anos', () => {
    expect(cinema.searchMovies({ minAge: 10 })).toEqual(moviesWithAgeMin);
  });

  const techMovies = movies.filter(movie => movie.categories.includes('tecnologia'));
  it('Deve retornar apenas filmes com a categoria tecnologia', () => {
    expect(cinema.searchMovies({ categories: ['tecnologia'] })).toEqual(techMovies);
  });

  const movies2d = movies.filter(movie => movie.type === '2D');
  it('Deve retornar apenas filmes 2d', () => {
    expect(cinema.searchMovies({ type: '2D' })).toEqual(movies2d);
  });

  const movies2 = movies.filter(movie => movie.price >= 20);
  it('Deve retornar filmes que o preço é no minimo 20 reais', () => {
    expect(cinema.searchMovies({ minPrice: 20 })).toEqual(movies2);
  });

  const movies3 = movies.filter(movie => movie.price <= 15);
  it('Deve retornar filmes que o preço é no maximo 15 reais', () => {
    expect(cinema.searchMovies({ maxPrice: 15 })).toEqual(movies3);
  });
// describe('Birth', () => {
//   it(String(cinema.clientes.pop()?.dateOfBirth), () => {
//     expect(cinema.clientes)
//   })
})
describe('Sessão', () => {
  const sessionsFiltered = 
  it('Deve retornar as sessões que o id do filme é 1', () => {
    expect(cinema.searchSession({
      movieId: '1'
    }))
  })
})