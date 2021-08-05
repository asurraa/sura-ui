/* eslint-disable indent */
import { isProductionModeFunc } from "./isProductionMode";
type Color = "#FFFFFF" | "#FF0000" | "#0000FF";

export class Logger {
  static big(...args: unknown[]) {
    setTimeout(
      console.log.bind(
        console,
        `%c${args[0]}\n`,
        "color: #FF00FF;font-size: 60px;",
        args.slice(1)
      ),
      0
    );
  }
  static log(...args: unknown[]) {
    isProductionModeFunc({}) ? null : console.log(...args);
  }
  static data(...args: unknown[]) {
    isProductionModeFunc({})
      ? null
      : console.log(
          `%c ${JSON.stringify(args, null, 2)}! `,
          "background: #222; color: #bada55"
        );
  }
  static info(...data: any[]): void {
    isProductionModeFunc({}) ? null : console.log(data);
  }
  static error(...data: any[]): void {
    isProductionModeFunc({}) ? null : console.error(data);
  }
  static warn(...data: any[]): void {
    isProductionModeFunc({}) ? null : console.warn(data);
  }
  static color(color: Color, ...args: unknown[]) {
    const WHITE: Color = "#FFFFFF";
    const RED: Color = "#FF0000";
    const BLUE: Color = "#0000FF";
    const colorBook = [WHITE, RED, BLUE];
    const selectColor = colorBook.find((c) => c === color);
    isProductionModeFunc({})
      ? null
      : console.log(
          `%c ${JSON.stringify(args, null, 2)}! `,
          `background: #222; color: ${selectColor}`
        );
  }
}
