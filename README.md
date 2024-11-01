# GEMINI-WABOT

A simple WhatsApp personal assistant using Gemini API.

## Table of Contents

- [GEMINI-WABOT](#gemini-wabot)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Usage](#usage)
  - [Model Behavior](#model-behavior)
  - [Environment Variables](#environment-variables)
  - [Key Files and Directories](#key-files-and-directories)
  - [TODO](#todo)
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
    # npm
    npm install
    # yarn
    yarn
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
# npm
npm start
# yarn
yarn start
```

## Model Behavior

Edit the `src/lib/gemini/system.ts` file to modify the behavior of the bot.
If your bot's response is blocked by the Gemini API, refer to the [Safety Settings Docs](https://ai.google.dev/gemini-api/docs/safety-settings) for more information on how to adjust the safety settings. This can be useful if your bot's behavior is determined as "unsafe" by the API. For example, if you want the bot to respond with a message that contains potentially harmful content, you can disable the safety settings.

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

## Key Files and Directories

- **src/index.ts**: The entry point of the application.
- **src/handler.ts**: The main handler for incoming messages.
- **src/types.ts**: Shared types used throughout the application.
- **src/db/index.ts**: Database connection and query functions.
- **src/lib/dateformat.ts**: Utility function for formatting dates.
- **src/lib/gemini/index.ts**: Gemini API client.
- **src/lib/gemini/history.ts**: Functions for retrieving historical data from Gemini.
- **src/lib/gemini/system.ts**: System instructions for Gemini.

## TODO

- [ ] Prompt with Media (Iamge and Video)
- [ ] Search something on the internet

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.