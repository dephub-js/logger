/** All console method names except the constructor */
export type LoggerMethods = keyof Omit<Console, 'Console'>;

/** Types of log messages */
export type LoggerType = 'error' | 'info' | 'success' | 'warn';

/**
 * Configuration options for the Logger.
 */
interface LoggerOptions {
  /** Whether to use colors (Node.js only, default: true) */
  useColors?: boolean;
  /** Whether to show emojis in messages (default: true) */
  useEmojis?: boolean;
}

/**
 * Enhanced console logger with optional colors and emojis.
 */
export class Logger implements Pick<Console, LoggerMethods> {
  assert: typeof console.assert = console.assert.bind(console);
  clear: typeof console.clear = console.clear.bind(console);
  count: typeof console.count = console.count.bind(console);
  countReset: typeof console.countReset = console.countReset.bind(console);
  debug: typeof console.debug = console.debug.bind(console);
  dir: typeof console.dir = console.dir.bind(console);
  dirxml: typeof console.dirxml = console.dirxml.bind(console);
  group: typeof console.group = console.group.bind(console);
  groupCollapsed: typeof console.groupCollapsed =
    console.groupCollapsed.bind(console);
  groupEnd: typeof console.groupEnd = console.groupEnd.bind(console);
  log: typeof console.log = console.log.bind(console);
  profile: typeof console.profile = console.profile.bind(console);
  profileEnd: typeof console.profileEnd = console.profileEnd.bind(console);
  table: typeof console.table = console.table.bind(console);
  time: typeof console.time = console.time.bind(console);
  timeEnd: typeof console.timeEnd = console.timeEnd.bind(console);
  timeLog: typeof console.timeLog = console.timeLog.bind(console);
  timeStamp: typeof console.timeStamp = console.timeStamp.bind(console);
  trace: typeof console.trace = console.trace.bind(console);
  readonly #colors: Record<LoggerType, string> = {
    error: '\x1b[31m', // red
    info: '\x1b[36m', // cyan
    success: '\x1b[32m', // green
    warn: '\x1b[33m', // yellow
  };
  readonly #emojis: Record<LoggerType, string> = {
    error: '❌',
    info: '💡',
    success: '✅',
    warn: '⚠️',
  };
  readonly #isNode: boolean = typeof window === 'undefined';
  readonly #resetColor = '\x1b[0m';
  readonly #useColors: boolean;
  readonly #useEmojis: boolean;
  /**
   * Creates a new Logger instance.
   * @param options Configuration options for emojis and colors.
   */
  constructor(options: LoggerOptions = {}) {
    this.#useEmojis = options.useEmojis ?? true;
    this.#useColors = options.useColors ?? true;
  }
  /** Log an error message (red ❌) */
  error = (message: string, ...optionalParams: unknown[]): void =>
    console.error(this.#formatMessage('error', message), ...optionalParams);
  /** Log an info message (cyan 💡) */
  info = (message: string, ...optionalParams: unknown[]): void =>
    console.log(this.#formatMessage('info', message), ...optionalParams);
  /**
   * Displays an object in a pretty format with environment-specific optimizations
   * @param obj - The object to display prettily
   * @example
   * ```typescript
   * pretty({ user: "Alice", preferences: { theme: "dark" } });
   * ```
   */
  pretty = (obj: unknown): void => {
    if (typeof window !== 'undefined') {
      // Browser environment
      this.dir(obj);
    } else {
      // Node.js environment with enhanced formatting
      try {
        this.dir(obj, { colors: true, depth: null });
      } catch {
        // Fallback for primitive values
        this.dir(String(obj));
      }
    }
  };
  /** Log a success message (green ✅) */
  success = (message: string, ...optionalParams: unknown[]): void =>
    console.log(this.#formatMessage('success', message), ...optionalParams);
  /** Log a warning message (yellow ⚠️) */
  warn = (message: string, ...optionalParams: unknown[]): void =>
    console.warn(this.#formatMessage('warn', message), ...optionalParams);
  #formatMessage(type: LoggerType, message: string): string {
    const prefix = this.#useEmojis ? `${this.#emojis[type]} ` : '';

    return this.#isNode && this.#useColors
      ? `${this.#colors[type]}${prefix}${message}${this.#resetColor}`
      : `${prefix}${message}`;
  }
}

/** Default logger instance with emojis and colors enabled */
export const logger: Logger = new Logger();
