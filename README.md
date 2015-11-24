# EcardProject

** Work In Progress. **

A Django app to show, send and share custom e-cards from 
[NLI](http://nli.org.il) image collections.  

Uses [CardKit](https://github.com/times/cardkit).

## Prerequisites

* Python 3.4 +
* node.js (for developing the editor component).
* Clone the repo to your machine.
* bower (to install: `npm install -g bower`)

## Recomended
* virtualenvwrapper

## Installation
* Create yourself a nice virtualenv and switch to it.
* Run:

        pip install -r requirements.txt
        cd editor
        npm install
        bower install
        

## Running
* Run:

        python manage.py runserver

* Browse to [http://localhost:8000/](http://localhost:8000/)

