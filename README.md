# Anime News Client

**Anime News Client** is the frontend web app for **Anime News** project.
This is the client side of the [**Anime News Server**](https://github.com/jurerick/anime-news-server) api application.
The server api application also needs to be installed for this client project to work properly. 
Please visit [**Anime News Server**](https://github.com/jurerick/anime-news-server) for installation instructions.

For now, let's install the **Anime News Client**

## Features
  - Shows anime news from blogs accross the web. 
  - Ranking news popularity by allowing users to like news item.

## Get Started

### git clone
Clone the repository by typing in your terminal: 
```sh
git clone https://github.com/jurerick/anime-news-client.git
```

### npm install
Install all the dependencies. In the project directory, you can run:
```sh
npm install
```

### .env
Create ```.env``` file in the root of your project and add variable REACT_APP_SERVER_API_URL to it.
```sh
REACT_APP_SERVER_API_URL=http://localhost/api/
```
Assign the would be end point url of the [**Anime News Server**](https://github.com/jurerick/anime-news-server) api application.
In this case ```http://localhost/api/``` is the api server url.

### npm start
This project was bootstrapped with [Create React App](https://create-react-app.dev/). In the same project directory run:
```sh
npm start
```
This will run the app in the development mode. 
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes in code.
You may also see any lint errors in the console.


## Todos

 - Write unit tests
 - User authentication
 - Search news feature
 - News detail page

## License

MIT

