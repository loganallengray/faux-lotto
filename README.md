# Faux Lotto

## Introduction

What is Faux Lotto? It's a gambling site that doesn't use real money, so there is zero risk, but no reward either.

## Purpose and Motivation

I wanted to give people who physically couldn't or didn't want to gamble with real money a site where they could play a few gambling games.

## Development

Faux Lotto was developed with React for Nashville Software School, as my Front-end capstone. It stores all of the data inside of a json file, and besides that it does not use much besides JavaScript, HTML, and CSS.

## How To Install

To run my app, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/) installed.

Once you have that taken care of, clone the repository and go into the directory.

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/loganallengray/faux-lotto.git

# Go into the repository
$ cd faux-lotto
```

Next, serve the database.json file in the "api" folder ("json-server -p 8088 database.json").

```bash
# Go into the API folder
$ cd api

# Serve the json database
$ json-server -p 8088 database.json
```

Open another terminal window/tab and install the npm packages in the faux-lotto directory, then run "npm start".

```bash
# Navigate to faux-lotto folder

# NPM Install
$ npm install

# Start the app
$ npm start
```

## How to Use

Once downloaded, you can log in to an already existing account, found in the database folder, or register a new one.

If you've just made your account, you will have zero funds. To add funds, go to the Funds page and fill out the form to add fake currency to your account.

After that, you can go to the Games page and start gambling. You can choose from three games, Coin Flip, Horse Race, and Blackjack. To play each you specify an amount, click the green button, and the game will start.

Once you've played a few games, you can go to your Profile to view all of your previously played games, and some statistics tied to your account.

## Difficulties

Programming the games was definitely the biggest challenge of this project. Blackjack had a lot of challenges, but there were many examples online of working versions. Using weighted chance on the horse racing game was definitely hard to wrap my head around, but I got it working eventually.
