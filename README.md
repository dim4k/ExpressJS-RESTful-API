ExpressJS RESTful Api
=====
<p>RESTful API using MongoDB, ExpressJs, NodeJs</p>
<p>Integrated API Documentation generator using Twig and Bootstrap</p>
![Screenshot of the API](http://i.imgur.com/cKau4fU.png)

Featuring :
----
* Authentication
* API Documentation generator
<!-- TODO Project requirement and instalation setup -->

Server requirements
----
* NodeJs
* MongoDB

Installation
----

#### Clone Github repository

```sh
git clone https://github.com/dim4k/ExpressJS-RESTful-API.git
```
#### Install the dependencies

At the root of your project, run :

```sh
npm install
```

#### Optional - Create a MongoDB Service (Windows)

First download and install MongoDB from https://www.mongodb.com/download-center

Go in {ProjectDirectoryPath}/config/mongodb.conf-dist, setup the 2 paths for the MongoDB server data and log, rename the file to mongodb.conf

Run :

```sh
mongod -f "{YOUR_PROJECT_DIRECTORY}\mean_stack\config\mongodb.conf" --install --serviceName mdb27017 --serviceDisplayName "MongoDB Server Instance 27017" --serviceDescription "MongoDB Server Instance running on 27017"
```

Find and start the service you just created (named "MongoDB Server Instance 27017").

#### Setup the server

Open {YOUR_PROJECT_DIRECTORY}/config/conf.json-dist, change this configuration file according to your setup and rename it to conf.json

#### Run the server

At the root of your project, run :

```sh
node server.js
```
