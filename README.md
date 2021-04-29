### POC_SCOUT ###

Projet pour le stage Beweb Scout
Le projet contient deux sous-dossiers : /scoutFront et /scoutBack_nodeJs

## Préparation de la Base de donnée ##

# PostgreSql #
# VERSION UTILISEE #
psql (PostgreSQL) 10.15 

Pour les installations,se référer aux documentations
# Mise en place #
Créer une base de donnée à partir du fichier BDD_scout.sql

## scoutBack_nodeJs 
# VERSION UTILISEE #
Node : v14.13.1 

accéder via le terminal au dossier /scoutBack_nodeJs afin de procéder aux étapes suivantes:

# Configuration de la base de donnée dans le serveur#
Dans le fichier dont le lien est le suivant : /scoutBack_nodeJs/config/data.config.js , configurer les paramètres d'accès à la BDD, et le nom du dossier où seront stocker les données des collectes (photo, vidéo, audio)
# Mise en place de l'environnement #
commande terminal : npm install
# lancer l'application #
commande terminal : npm start
Ce message apparaîtra dans la terminal :
    Example app listening at http://localhost:3000
    Executing (default): SELECT 1+1 AS result
    BDD Connection réussie

## scoutFront ##
# VERSION UTILISEE #
Angular CLI: 11.0.7
Angular: 11.0.9
... animations, common, compiler, compiler-cli, core, forms
... localize, platform-browser, platform-browser-dynamic, router
Ivy Workspace: Yes

accéder via le terminal au dossier /scoutFront afin de procéder aux étapes suivantes:

# Configuration des constantes #
Ouvrir le fichier qui se trouve : scoutFront /src/app/config/const.ts
Paramétrer le lien serveur (exemple : http://localhost:3000/)
# Mise en place de l'environnement #
commande terminal : npm install
# lancer l'application #
commande terminal : ng serve
cliquer sur lien proposé dans le terminal (exemple : http://localhost:4200/)





