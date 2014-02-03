epaaad
======

Set of [rich text editing](http://en.wikipedia.org/wiki/Online_rich-text_editor) related AngularJS modules and components

## Introduction

WARNING! This project is under HEAVY development and it's not even in alpha state.
Currently i'm taking features in and out, they are moved around, so api can change at any time.

GOALS:

1. plugins support - any kind of angular module or component set should be able to register itself as epaaad plugin
2. events management - keyboard (including hotkeys) and mouse
3. actions management - simple callback registry with common interface
4. basic user experience - ready to use RTE viewport
5. solutions for most popular/typical contentEditable problems - carets management, selections, code cleanup etc.
6. support for directives inside of user created content
7. css framework support - it's raw css atm, but i'll be targeting into less i think
8. live collaboration compatibility - interface for receiving/inserting/sending text patches without concrete OT implementation

## Development setup

```
git clone https://github.com/epaaad/epaaad.git;
cd epaaad;
npm install -d;
npm run example
```

Navigate your browser to [http://localhost:8014](http://localhost:8014)

This setup is using express and browserify middleware, so You can start hacking right away.

## Installation

### NPM

```todo...```

### BOWER

```todo...```

### CDN

```todo...```

## Contribution

Keep in mind, that i'm not trying to design EPAAAD as a full featured RTE, so please let us brainstorm over things You want to add into core.

* fork that repo
* git clone https://github.com/YOUR_USER/epaaad.git
* create your feature branch
* hack on it
* commit & push
* send a pull request

## LICENSE

MIT