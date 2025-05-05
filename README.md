# eCommerce Application

**Welcome to our eCommerce application!**

This is a Single Page Application built on **CommerceTools**, the most adaptable commerce platform for enterprise businesses. This platform replicates real-world shopping experiences in a digital environment 🏪. It's a comprehensive online shopping portal that provides an interactive and seamless experience to users. Users can explore various products, read detailed descriptions, save their favorite items to a basket, and complete purchases at checkout.

This is the final assignment for [RS School's JS-FE-2024-Q4 course](https://rs.school/courses/javascript).

Developed by team **LEAN_CODE** 👩‍💻 👨‍💻 👨‍💻:

*   [l-liubou](https://github.com/l-liubou) - Liubou Levitskaya
*   [jakshazbi](https://github.com/jakshazbi) - Egor Romenski
*   [Intrstng](https://github.com/intrstng) - Andrei Babich

### Key Pages:

*   Registration and Registration 🖥️
*   Main Page 🏠
*   Catalog Product Page 📋
*   Detailed Product Page 🔎
*   User Profile Page 👤
*   Basket Page 🛒
*   About Us Page 🙋‍♂️🙋‍♀️

## Technology Stack 💻📚

*   CommerceTools
*   TypeScript
*   React
*   Redux Toolkit
*   React Router Dom
*   React Hook Form
*   Yup
*   Vite
*   Vitest
*   ESLint
*   Prettier
*   Commitlint
*   Stylelint
*   Husky
*   Material UI
*   SCSS
*   Toastify
*   i18next
*   ... (Add other technologies here)

## Deploy 🌐

*   [Deploy link](https://www.netlify.com/)

## Getting Started 🚀

Follow these steps to run the application locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Intrstng/eCommerce-Application.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd eCommerce-Application
    ```

3.  **Switch to the `develop` branch:**

    ```bash
    git checkout develop
    ```

4.  **Install dependencies:**

    ```bash
    npm install
    ```

5.  **Configure environment variables:**

    *   Create a `.env` file in the root directory based on the `.env.example` file.
    *   Fill in the required credentials in the `.env` file.

6.  **Start the development server:**

    ```bash
    npm run dev
    ```

7.  **Access the application:**

    *   Open your browser and navigate to the link provided in the CLI.

## Available Scripts ⚙️

*   **`build`:** 📦 Builds the application for production.

    ```bash
    npm run build
    ```

*   **`dev`:** 💻 Starts the Vite development server.

    ```bash
    npm run dev
    ```

*   **`start`:** 🚀 Starts the Vite development server (same as `dev`).

    ```bash
    npm run start
    ```

*   **`type:check`:** ⌨️Performs a TypeScript type check without emitting any output files.

    ```bash
    npm run type:check
    ```

*   **`stylelint:check`:** 🎨 Checks SCSS files for stylelint errors.

    ```bash
    npm run stylelint:check
    ```

*   **`stylelint:fix`:** 🔧 Automatically fixes SCSS stylelint errors.

    ```bash
    npm run stylelint:fix
    ```

*   **`format:check`:** ✅ Checks code formatting with Prettier.

    ```bash
    npm run format:check
    ```

*   **`format:fix`:** ✨ Automatically formats code with Prettier.

    ```bash
    npm run format:fix
    ```

*   **`lint:check`:** 🔍 Runs ESLint to check for code quality issues.

    ```bash
    npm run lint:check
    ```

*   **`lint:fix`:** 🐛 Automatically fixes ESLint errors.

    ```bash
    npm run lint:fix
    ```

*   **`preview`:** 👀 Starts a local server to preview the production build.

    ```bash
    npm run preview
    ```

*   **`test`:** 🧪 Runs tests with Vitest in "watch" mode

    ```bash
    npm run test
    ```

*   **`test:check`:** 🚦 Runs tests with Vitest in "run" mode (non-watch mode).

    ```bash
    npm run test:check
    ```

*   **`coverage`:** 📊 Runs tests with Vitest and generates a coverage report.

    ```bash
    npm run coverage
    ```

*   **`prepare`:** ⚙️A lifecycle script that Husky uses to set up Git hooks. This is automatically run after `npm install`.

    ```bash
    npm run prepare
    ```

*   **Commit-msg Hooks (Husky):** 📝 Commitlint is triggered by Git after a *user* has entered a *commit message* but before the commit is actually created.

*   **Pre-commit Hooks (Husky):** 🔒 ESLint, Prettier and Stylelint are automatically run during `git commit` operations.

*   **Pre-push Hooks (Husky):** 🛡️ Tests are automatically executed before any code is pushed.