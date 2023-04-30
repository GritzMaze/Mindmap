<div id="top"></div>

<div align="center">

![Contributors](https://img.shields.io/badge/contributors-4-brightgreen)
![Forks](https://img.shields.io/badge/forks-0-blue)
![Stars](https://img.shields.io/badge/stars-0-blue)
![Issues](https://img.shields.io/badge/issues-0%20open-yellow)
![License](https://img.shields.io/badge/license-MIT-green)

 </div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="#">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://i.imgur.com/KyDgAFI.png">
    <source media="(prefers-color-scheme: light)" srcset="https://i.imgur.com/WoKCj3e.png">
    <img src="https://i.imgur.com/KyDgAFI.png" alt="Logo" width="" height="300">
    </picture>
  </a>
</div>
<br>
<br>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#introduction">Introduction</a>
      <ul>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#known-bugs">Known Bugs</a></li>
      </ul>
    </li>
    <li>
      <a href="#installation">Installation</a>
      <ul>
        <li><a href="#development">Development</a></li>
      </ul>
    </li>
    <li><a href="#faq">FAQ</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contributors">Contributors</a></li>
  </ol>
</details>

<br>
<!-- Introduction -->

# Introduction

Mindmap is a web application that allows users to create mind maps and share them with other users. The application is built with React, TypeScript, Node.js, Express, PostgreSQL, Material-UI, Prisma ORM, Docker, Git and Github Actions.

<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>

# Requirements

This project requires the following software:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>

## Built With

The app has been built with the following technologies:

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Material-UI](https://material-ui.com/)
- [Prisma ORM](https://prisma.io/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>

# Known bugs

- TBD
<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>

<!-- GETTING STARTED -->

# Installation

In order to install the project locally, you need to have Docker installed.

## Development

1. Clone the repo

```sh
git clone https://github.com/GritzMaze/Mindmap.git
```

2. Configure the environment variables in the docker-compose.yml file or you can leave the default ones.

```yml
DATABASE_URL:
JWT_KEY:
JWT_EXPIRATION: 
APP_PORT: 
BCRYPT_SALT_ROUNDS:
LOG_LEVEL: 
LOG_OUTPUT:

POSTGRES_PASSWORD:
POSTGRES_USER:
POSTGRES_DB:
```

3. Compose the project

```sh
docker-compose up --build -d
```

<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>

# FAQ

- **How to run the tests?**

  - Currently, only the server has tests. To run them, you need to go to the server directory and run the following command:

  ```sh
    npm run test
    ```

<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>

# License

The project is distributed under `MIT`. <br/>
Description of the license can be found [here](https://opensource.org/licenses/MIT).

<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>

# Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.com/Kamelia24"><img src="https://i.imgur.com/5XntyAW.jpg" width="100px;" alt=""/><br /><sub><b>Kamelia Atanasova</b></sub></a><br /> <a href="#" title="Student">💻</a></td>
    <td align="center"><a href="https://github.com/Martimbuka"><img src="https://i.imgur.com/5XntyAW.jpg" width="100px;" alt=""/><br /><sub><b>Martin Jivkov</b></sub></a><br /> <a href="#" title="Student">💻</a></td>
    <td align="center"><a href="https://github.com/mihaylovak"><img src="https://i.imgur.com/5XntyAW.jpg" width="100px;" alt=""/><br /><sub><b>Mihaela Kolarova</b></sub></a><br /> <a href="#" title="Student">💻</a></td>
    <td align="center"><a href="https://github.com/GritzMaze"><img src="https://i.imgur.com/5XntyAW.jpg" width="100px;" alt=""/><br /><sub><b>Vesselin Jivkov</b></sub></a><br /> <a href="#" title="Student">💻</a></td>
    </tr>
</table>

<div align="right"><p align="right">(<a href="#top">back to top</a>)</p></div>
