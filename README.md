# GEMINI-WABOT

A simple WhatsApp personal assistant using Gemini API.

## Table of Contents

- [GEMINI-WABOT](#gemini-wabot)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Usage](#usage)
  - [Environment Variables](#environment-variables)
  - [Project Structure](#project-structure)
  - [Key Files and Directories](#key-files-and-directories)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/razikdontcare/gemini-wabot.git
    cd gemini-wabot
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Copy the example environment file and update it with your configuration:
    ```sh
    cp .env.example .env
    ```

## Database Setup

1. Log in to MySQL as the root user:
    ```sh
    mysql -u root -p
    ```

2. Create a new database (replace `your_database_name` with the desired name):
    ```sql
    CREATE DATABASE your_database_name;
    ```

3. Create a new MySQL user and grant privileges to the new database (replace `your_username`, `your_password`, and `your_database_name` with the desired values):
    ```sql
    CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'your_password';
    GRANT ALL PRIVILEGES ON your_database_name.* TO 'your_username'@'localhost';
    FLUSH PRIVILEGES;
    ```

4. Update your `.env` file:
    ```plaintext
    DB_HOST=localhost
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_NAME=your_database_name
    ```

## Usage

To start the application, run:
```sh
npm start
```

## Environment Variables

The following environment variables are used in this project:
- `OWNER_NUMBER`: The phone number of the owner of the bot.
- `GEMINI_API_KEY`: The API key for the Gemini API. Get one [from here](https://aistudio.google.com/)
- `SESSION_NAME`: The name of the session for storing data.
- `LOG_LEVEL`: The level of logging to use (e.g. `info`, `warn`, `error`).
- `DB_HOST`: The hostname of the MySQL database.
- `DB_USER`: The username of the MySQL user.
- `DB_PASSWORD`: The password of the MySQL user.
- `DB_NAME`: The name of the MySQL database.

## Project Structure

```
[`.env.example`](.env.example)
.gitignore
[`eslint.config.mjs`](eslint.config.mjs)
[`history.json`](history.json)
[`package.json`](package.json)
[`README.md`](README.md)
src/
    db/
        index.ts
    index.ts
    handler.ts
    types.ts
    lib/
        dateformat.ts
        gemini/
            history.ts
            index.ts
            system.ts
    types.ts
[`tsconfig.json`](tsconfig.json )
```

## Key Files and Directories

- **src/index.ts**: The entry point of the application.
- **src/handler.ts**: The main handler for incoming messages.
- **src/types.ts**: Shared types used throughout the application.
- **src/db/index.ts**: Database connection and query functions.
- **src/lib/dateformat.ts**: Utility function for formatting dates.
- **src/lib/gemini/index.ts**: Gemini API client.
- **src/lib/gemini/history.ts**: Functions for retrieving historical data from Gemini.
- **src/lib/gemini/system.ts**: System instructions for Gemini.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.