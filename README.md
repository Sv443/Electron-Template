# TS Electron Template
TypeScript, Electron, Vite, ESLint and NodeNext/ESNext template repository.  
This is a blank slate and other libraries like React can easily be retrofitted.

<br>

## Setup
1. Have Node.js, pnpm and Git installed
2. Create a new repository using this template [here](https://github.com/Sv443/Electron-Template/generate)
3. Clone the repository to your local machine
4. Run `pnpm i` to install all dependencies
5. Copy `.env.template` to `.env` and configure it to your needs
6. Edit `package.json`, `electron-builder.json5` and `public/manifest.json` to your liking

<br>

## Commands
- `pnpm run dev` - Starts the app in dev mode and refreshes it when a source file has changed
- `pnpm run build` - Builds the app for all platforms
- `pnpm run build-win` - Builds the app for Windows
- `pnpm run build-mac` - Builds the app for MacOS
- `pnpm run build-linux` - Builds the app for Linux
- `pnpm run lint` - Lints the code using ESLint, then runs TSC to check for syntax and type errors
- `pnpm run format` - Formats the code using ESLint to fix common problems

<br>

## License
Licensed under the [WTFPL.](./LICENSE.txt)  
Do whatever you want with this code, including changing the license.
