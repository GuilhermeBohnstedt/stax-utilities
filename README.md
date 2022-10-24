<a href="https://gitmoji.dev">
  <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>

# Stax Utilities

![](screenshot.png)

Project to group common utilities into a single project.

## Why?

This project is part of my personal portfolio, so, I'll be happy if you could provide me any feedback about the project, code, structure or anything that you can report that could make me a better developer!

## Roadmap Utilities
- [ ] Plugins System
- [ ] CLI for Plugins
- [ ] Dashboard
- [ ] Plugin System (Svelte project build in lib mode)
- [ ] Stopwatch
- [ ] Password Manager (like KeePass)
- [ ] Calculator (with extra features)
- [ ] Financial System
- [ ] Data and Utilies for System (like HWiNFO or like `lshw` in Linux)
- [ ] External MiniKeyboard (like Stream Deck)
- [ ] Notepad
- [ ] Email Reader


## Built With
- [Electron JS](https://www.electronjs.org) - Create multiplaform desktop apps with JavaScript, HTML and CSS
- [Svelte JS](http://svelte.dev) - Cybernetically enhanced web apps
- [TypeScript](https://www.typescriptlang.org/) - TypeScript Language
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Tailwind](https://tailwindcss.com/) - Rapidly build modern websites without ever leaving your HTML
- [Flowbite](https://flowbite-svelte.com) - Build websites even faster with components on top of Tailwind CSS
- [gitmoji](https://gitmoji.carloscuesta.me/) - Emoji for commit messages

## Running locally

Clone the Repository

```sh
$ git clone https://github.com/GuilhermeBohnstedt/stax-utilities.git
```

Install dependencies and start the development server

```sh
$ cd stax-utilities

$ npm i

$ npm run dev
```

### Using WSL 2
WSL 2 have support to graphical apps. So you only need install some packages. When install Chromium all needed packages are installed, so install it and sheeshhh.

Normal install and execute project.

## Packing
If you want run app in OS X using OS X in development environment, use (Using Linux to build app for use in Linux):

```sh
$ npm run make
```

If you are dev in Linux enviroment and want build for use in Windows, fist need install ``wine`` and:

```sh
$ npm run make -- --platform=win32
```

### Notes for Arch Linux
For Arch linux need build and install wine using ``makepkg``:

```sh
$ git clone https://aur.archlinux.org/wine-stable.git 

$ makepkg -si
```

## CLI
This project contains a CLI to help developer create plugins. To run:

```sh
$ npm run stax:plugin
```

Read documentation [here](plugins/cli/README.md).

## Contact

Email-me: - guibohnstedt@gmail.com

Connect with me at [Linkedin](https://www.linkedin.com/in/guilherme-bohnstedt-68145611a/)

## License

This project is licensed under the MIT License - see [LICENSE](https://github.com/GuilhermeBohnstedt/stax-utilities/blob/master/LICENSE) for more information.