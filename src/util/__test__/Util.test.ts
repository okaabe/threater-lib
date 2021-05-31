import Util from '../Util';

it('deve retornar se é final de semana ou não', () => {
  expect(Util.isWeekend(new Date(2020, 6, 26))).toBe(true);
});

it('testa se a pessoa é adulto', () => {
  expect(Util.isAdult(new Date(1995, 10, 1), new Date(2020, 10, 1))).toBe(true);
  expect(Util.isAdult(new Date(2015, 10, 1), new Date(2020, 10, 1))).toBe(false);
});