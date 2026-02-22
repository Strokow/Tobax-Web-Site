# Task Manager

Короткое описание:

Простое приложение для управления задачами — добавление, отметка как выполненное и удаление задач. Оно сделано как пример небольшого фронтенд-проекта для обучения и демонстрации.

Использованные технологии:

- React (компонентный UI)
- Vite (сборка и dev-сервер)
- Bootstrap (CSS фреймворк)
- Bulma (CSS фреймворк)
- Sass (SCSS препроцессор)
- PostCSS + Autoprefixer
- ESLint (статический анализ кода)

Как запустить локально:

1. Установите зависимости:

```bash
npm install
```

2. Запустить dev-сервер:

```bash
npm run dev
```

3. Откройте в браузере http://localhost:5173/ (порт может отличаться)

Дополнительно:
- Перед пушем в удалённый репозиторий GitHub создайте репозиторий и добавьте `origin`, затем запушьте ветку `main` или `master`.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
