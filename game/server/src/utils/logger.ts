export default class Logger {
  static info(message: string, meta?: any): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] INFO: ${message}`, meta || "");
  }

  static error(message: string, error?: any, meta?: any): void {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${message}`, error || "", meta || "");
  }

  static warn(message: string, meta?: any): void {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] WARN: ${message}`, meta || "");
  }
}
