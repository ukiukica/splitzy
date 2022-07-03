<h1 align="center">splitzy</h1>

<p align="center">splitzy - an original application based off Splitwise - is a full stack application that provides users the ability to search and add other users as friends and bill them for their dues. Users also have the ability to make notes or add comments to existing bills. To make use of these features, users are required to sign up for an account.</p>

<br>

## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/ukiukica/splitzy.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***


*IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on alpine-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

### Dev Containers (OPTIONAL for M1 Users)
The following instructions detail an *optional* development setup for M1 Mac users having issues with the `psycopg` package.

1. Make sure you have the [Microsoft Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed. 
2. Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) installed on your computer. 
3. Clone the repository (only this branch)
   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```
4. Open the repo in VS Code. 
5. Click "Open in Container" when VS Code prompts to open container in the bottom right hand corner. 
6. **Be Patient!** The initial install will take a LONG time, it's building a container that has postgres preconfigured and even installing all your project dependencies. (For both flask and react!)

   **Note:** This will take much less time on future starts because everything will be cached.

7. Once everything is up, be sure to make a `.env` file based on `.env.example` in both the root directory and the *react-app* directory before running your app. You do not need a `DATABASE_URL` in the `.env` file if you are using this Docker setup for development - the URL is already set in the image (see `.devcontainer/Dockerfile` for the URL).

8. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

9. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

<br>

### Application Architecture

splitzy is built with Flask (backend), React and Redux (frontend), and PostgresSQL (database).

<br>

### Technologies Used
* [React.js](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Javascript](https://www.javascript.com/)
* [Python](https://www.python.org/)
* [PostgresSQL](https://www.postgresql.org/)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [Flask](https://flask.palletsprojects.com/en/2.1.x/)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

<br>

### Future Features
We plan to refactor our code to create a dynamic single page application that will mirror that of Splitwise. Refactoring our code will provide enhanced efficiency, fetching required information from the Redux store rather than from backend routes. Our bonus feature, transactions, will also be something to consider including in our splitzy app.

<br>

### Contact Us!
* Uki:  <a href="https://www.linkedin.com/in/ukipavlovic/">Linkedin</a> | <a href="https://github.com/ukiukica/">Github</a> 
* Olivia:  <a href="https://www.linkedin.com/in/olivia-bir-74b16b7b/">Linkedin</a> | <a href="https://github.com/oliviabir">Github</a>
* Danny: <a href="https://www.linkedin.com/in/dannytoan/">Linkedin</a> | <a href="https://github.com/dannytoan">Github</a>
* Caitlin:  <a href="https://www.linkedin.com/in/caitlin-buen-lucas/">Linkedin</a> | <a href="https://github.com/cpualei/">Github</a> 
