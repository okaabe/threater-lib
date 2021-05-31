export default class Util {
  static isWeekend(date = new Date()): boolean {
    return [0, 6].includes(date.getUTCDay());
  } 
    
  static isAdult(date: Date, compareDate = new Date()): boolean {
    return date.getUTCFullYear() < (compareDate.getUTCFullYear() - 18)
  }
}