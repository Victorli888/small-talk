# Small Talk


A web application designed to help users practice conversational Chinese through dynamic A-B conversations. The project is built with **TypeScript**, **Preact**, **Tailwind CSS**, and **PostgreSQL**, providing an intuitive and efficient interface to enhance language-learning experiences.

## Features
- **Dynamic Conversations:** Engage in interactive A-B style conversations to improve Chinese speaking and listening skills.
- **Custom Conversation Database:** Powered by a self-designed PostgreSQL database, consisting over 300 phrases of 19 different themes.
- **Modern Frontend:** Built with TypeScript and Preact for a fast and responsive user interface.
- **Stylish Design:** Tailwind CSS for customizable and consistent styling.
- **CRUD:** Create, Edit, & Delete new cantonese phrases to the cantonese database directly from the application
- **Translations** Quickly View the Translation by taping on the conversation messages

## Installation

### Prerequisites
- Deno Fresh
- [PostgreSQL](https://www.postgresql.org/) (v13 or later)
- [Git](https://git-scm.com/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Victorli888/small-talk.git
   cd small-talk
   ```

2. Set up the PostgreSQL database:
   - Create a new database named `small_talk`.
   - Run the SQL scripts in the `/database` folder to set up the schema and seed data.

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/small_talk
     ```


4. Open the application:
   Navigate to `http://localhost:8000` in your browser.

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```
1. Select a conversation topic.
2. Follow the prompts to practice A-B conversations in Chinese.
3. Use the playback and hint features to enhance your learning.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request.

## License
## Acknowledgments

