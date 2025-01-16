# E-commerce Application

[Live Deployment Link](https://fulstackmahmood.netlify.app/?query=&sort=default&page=1)

## Overview

This is a front-end project developed for an e-commerce application as part of the Integrify Academy Full Stack course. It connects to a custom backend API hosted [here](https://testazuredevops-euephrc9ewffdqgn.canadacentral-01.azurewebsites.net/). The store operates fully using mock data, meaning there are no actual products or transactions involved. The purpose is to demonstrate e-commerce features within a simulated environment.

Developing this project allowed me to enhance my skills in building complex e-commerce applications using React. It served as a realistic scenario, simulating industry-like conditions where I had to create a working product under tight deadlines.

## Table of Contents

- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Project Structure

- `pages`: Contains files for each individual page of the application.
  - Each page is built using components, which are located in the `components` folder.
- `components`: This directory is organized according to Atomic Design principles:
  - `atoms/`: Basic UI elements (buttons, inputs, etc.).
  - `molecules/`: Small combinations of atoms (form groups, input groups).
  - `organisms/`: Complex components formed from molecules (product listings, navigation bars).
- `features`: Includes folders corresponding to different functional parts of the project.
  - Each folder contains:
    - An API module (`api.ts`) for interacting with backend services related to that feature.
    - Type definitions (`types.ts`) for managing data models.

## Installation

- Fork this repository and clone the fork onto your local environment.
- Fetch all the data from the fork.
- Run `npm install` to install the necessary dependencies.
- Execute `npm run start` to launch the application.

**Note:** Before launching the frontend, ensure that the backend is properly set up and running. Visit the backend repository and follow the installation steps provided. Without the backend, the frontend won't operate as expected.

## Tech Stack

This project utilizes React along with the following libraries and tools:

- [Axios](https://github.com/axios/axios): Used for making API requests.
- [React Query](https://tanstack.com/query/latest): Manages server-side state efficiently.
- [Redux](https://redux.js.org/): State management library for global application state.
- [React Router DOM](https://reactrouter.com/): Enables routing between different pages in the application.
- [Material UI](https://mui.com/): A popular library for UI components and styling.
- [React Hook Form](https://react-hook-form.com/): Simplifies form handling and validation.
- [Zod](https://zod.dev/): Used for schema-based validation to ensure data integrity.

## Credits

This project was completed independently as a part of an assignment for [Integrify Academy](https://www.integrify.io/).

## License

This project is intended for educational use only. You are free to use, modify, and contribute to it.
