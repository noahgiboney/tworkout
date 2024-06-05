# Tworkout

For anyone who goes to the gym, our app helps make going to the gym easier, more enjoyable, and more effective. Unlike mainstream workout trackers, our product is free. Tworkout had full login/logout authentication, where you can log your daily workouts, view a comprehensive calendar or daily view and track your progress. Other features include a personalized profile with avatar selection and a tracker to see your daily workout streak.

## Developers

- Kendrick Tran 
- Martin Wise
- Melika Dabiri
- Noah Giboney
- Sadie Fisher

## UI Prototype

Our [UI Prototype](https://www.figma.com/design/wVXWMdEo0yLpJXAPOgD2Ni/Tworkout?node-id=0-1&t=cawFrs1So6fO68zR-0) were last updated May 28th, 2024.

## Diagrams 

Our [UML Diagmram and Sequence Diagrams](https://github.com/noahgiboney/tworkout/blob/main/docs/wikipage.md) were last updated on June 4th, 2024.

## Installation

### Prerequisites

Make sure you have the following software installed on your local machine:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Setting Up the Project

1. **Clone the repository:**

    ```sh
    git clone https://github.com/noahgiboney/tworkout
    cd tworkout
    ```

2. **Install dependencies:**

    Using npm:

    ```sh
    npm install
    ```

    Or using Yarn:

    ```sh
    yarn install
    ```


4. **Create an environment file:**

    Create a `.env.local` file in the root of the project and add your environment variables:

    ```sh
    touch .env.local
    ```

    Example content:

    ```env
    NEXT_PUBLIC_API_URL=https://api.example.com
    NEXT_PUBLIC_API_KEY=your-api-key
    ```

## Usage

### Running the Development Server

To start the development server, run the following command:

Using npm:

```sh
npm run dev
