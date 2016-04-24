# Installation

1) Install nodeJS
```
sudo apt-get install python-software-properties python g++ make
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```
2) Install Sails
```
sudo npm -g install sails
```
3) Navigate To Current Directory
```
cd Codelion
```
4) Install dependencies
```
sudo npm install
```
5) Install PostgreSQL
```
sudo apt-get install postgresql postgresql-contrib
```
6) Setup PostgreSQL
```
sudo -i -u postgres
psql
CREATE USER codelion password 'c0dep3q1';
CREATE DATABASE codelion OWNER codelion;
\q
exit
```
7) Run Application
```
sails lift
```
