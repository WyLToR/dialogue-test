# Documentation for Next.js CMS System

## Overview

This project depicts a CMS system implemented using Next.js. It fetches basic data from a local mock.ts file, but it allows users to add, delete, and modify elements, which disappear after the page refresh.

## Language Localization

The application supports English and Hungarian languages. Translations are stored in the [src/language](./src/language) directory.

## Styling

Styling is achieved using Tailwind CSS.

## Modal

Modal functionality is implemented using the react-modal library.

## Language Switching

Language switching is facilitated by i18n and i18n-react libraries.

## Installation and Setup

1. Clone the git repository.

```bash
git clone https://github.com/WyLToR/dialogue-test.git
```

2. Install dependencies using

```bash
yarn
```

3. Run the application. By default, it will start on port 3000.

```bash
yarn run dev
```

## Dependencies

The application utilizes the following libraries:

- i18next: For language localization and translation.
- next: Next.js framework.
- react: React library.
- react-dom: For React DOM manipulation.
- react-i18next: For handling language localization in React applications.
- react-modal: For displaying and managing modal windows.

These libraries are essential for the functionality and operation of the application.