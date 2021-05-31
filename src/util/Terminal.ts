const colors = {
    FgBlue: '\x1b[34m',
    FgRed: '\x1b[31m',
    FgWhite: '\x1b[37m',
    FgYellow: '\x1b[33m',
};
type ColorOption = 'FgBlue' | 'FgYellow' | 'FgRed';

export default class Logger {
  private static setColor(
    color: ColorOption, 
    text: string): string{
    return `${colors[color]} - ${text}${colors['FgWhite']}`
  }

  static _log(color: ColorOption, content: any, ...optionalArgs: any){
    return console.log(this.setColor(color, content), ...optionalArgs);
  }

  static log(text: string){
    return this._log('FgYellow', text);
  };
  
  static err(err: any){
    return this._log('FgRed', err);
  }
};
