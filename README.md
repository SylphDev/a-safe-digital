# A-Safe Digital Technical Test: React Developer with Next.js, TypeScript, and Tailwind CSS

## Description

This project is the result of the technical test submitted by the A-Safe Digital Development team.

The basis of this project is to visually provide the user with data stored in a Database in the form of a Dashboard. For this purpose, a Login view was created to securely log into the application, and a Dashboard view where data is displayed in graphs and tables.

The data managed includes information about people with id, name, email, age, country, and whether they are premium users or not.

The graphs show a breakdown of the number of clients by age, the number of clients by country, and the number of premium or free clients.

The table displays all information paginated and can be filtered by name, email, and subscription type.

Assigned Tasks:

### Task 1: Authentication with Next.js
- Secure routes using NextAuth.js for authentication
- Implement email/password-based authentication
- Do not use third-party authentication providers (Google, GitHub, Facebook, etc.)
### Task 2: Component Development

UI Components

- Create a UI Kit for the project.
- Pay special attention to the component's style, ensuring the application has a nice look and feel.
- Implement a theme system with multiple theme options.

Custom Hook

- Create a custom hook for handling complex logic to be reused across the application.
### Task 3: Dashboard Generation
- Develop a dashboard to show a summary of information.
- This dashboard should include a graph; you can use libraries such as D3.js, Chart.js, etc.
### Task 4: Large Data Set Handling
- Using at least 1000 records, create a view that allows efficient querying and data retrieval.
- Implement an optimal way of displaying information to the user (for example, using pagination).
### Task 5: Performance Optimization
- Make the most of the Next.js 14 features by using server-side rendering, server components, and the streaming technique.
- Optimize the application for mobile performance using Google Lighthouse metrics.
### Task 6: Testing
- Perform unit testing of the application with Jest and/or React Testing Library.
- Perform E2E testing of the application with Cypress.
### Task 7: Documentation
- Provide a detailed README with instructions, architecture overview, and any additional information.


## Dependencies Used

For development, the following were primarily used:

- Next.js as the development framework
- TypeScript as the programming language
- Next-auth for authentication
- Chart.js for graphs
- TanStack for tables
- Material UI as reusable UI components
- Jest for unit testing
- Cypress for E2E testing

## Architecture
At the root of the application, there are all the configuration files for Next.js, Next-auth, Jest, and Cypress.

The only image used within the application can be found in the public folder.

The src directory is divided into:
- components: where reusable components such as fixed rounded boxes, - inputs, graphs, loading icons, and buttons are located.
- context: where the useForm and Material UI theme contexts are stored.
- data: where the test data used in the application is stored.
- hooks: where hooks for generating table columns, fetching user data, and session handling for protected routes are located.
- layouts: where the generic app layouts are stored.
- lib: where all Material UI configuration is located.
- pages: the app's pages (index and the dashboard).
- router: the file where the paths are defined.
- styles: CSS files are located here.
- types: application typings.

## How to Initialize the Project?

1. First, clone the project from https://github.com/SylphDev/a-safe-digital.
2. Install the required dependencies.
3. Create a .env file for environment variables that contains: NEXTAUTH_SECRET (any key) and NEXTAUTH_URL (the base URL of the project, locally it's http://localhost:3000/).
4. Use the command npm run dev to start the project in the browser, and you're all set!

## Other notes:
Valid users:
- User 1: test@example.com / password123
- User 2: user@example.com / password