# @dephub/logger 🪵

> Enhanced console logger for Node.js and browsers, with colors and emojis.

[![NPM version](https://img.shields.io/npm/v/@dephub/logger.svg?style=flat)](https://npmjs.org/package/@dephub/logger)
[![ESM-only](https://img.shields.io/badge/ESM-only-brightgreen?style=flat)](https://nodejs.org/)

---

## Features ✨

- ✅ Log messages with colors in Node.js
- 💡 Optional emojis for quick visual cues
- ⚠️ Supports `success`, `error`, `warn`, `info` message types
- 🧩 Pretty-print objects with environment-aware formatting (`logger.pretty()`)
- 📦 Fully typed for TypeScript

---

## Installation 📦

```bash
# npm
npm install @dephub/logger

# pnpm
pnpm add @dephub/logger

# yarn
yarn add @dephub/logger

# bun
bun add @dephub/logger
```

---

## Usage 🎯

### API 🧩

```ts
import { Logger, logger } from '@dephub/logger';

// Basic logging
logger.success('Operation completed!');
logger.warn('This is a warning.');
logger.error('Something went wrong.');
logger.info('Just FYI...');

// Pretty-print objects
logger.pretty({ user: 'Alice', preferences: { theme: 'dark' } });

// Create a custom logger instance
const customLogger = new Logger({ useEmojis: false, useColors: true });
customLogger.info('Custom logger in action!');
```

### Available Methods

- `success(message, ...params)`
- `warn(message, ...params)`
- `error(message, ...params)`
- `info(message, ...params)`
- `pretty(obj)` — enhanced object inspection
- Full console methods: `log`, `dir`, `table`, `time`, `trace`, etc.

---

## License 📄

MIT License – see [LICENSE](LICENSE) for details.

**Author:** Estarlin R ([estarlincito.com](https://estarlincito.com))
