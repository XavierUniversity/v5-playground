# v5 Playground

Basic playground for all things v5. This should be the starting point for all Cascade
Templates, HTML, CSS and planning for the v5 website revision.

## Requirements

1. [Docker](https://www.docker.com), [Lando](https://docs.devwithlando.io) and a good attitude.

## Setup Instructions

1. Download and install [Docker](https://www.docker.com). Register for a [Docker Hub](https://hub.docker.com) account (required to download docker hub images).
2. Download and install [Lando](https://docs.devwithlando.io/installation/macos.html). Latest working version for our environment is [`3.0.0-beta47`](https://github.com/lando/lando/releases/tag/v3.0.0-beta.47)
3. Clone or update your local repository: `git clone/pull git@github.com:XavierUniversity/v5-playground.git`.
4. Inside of your repo folder, run `lando start`, all of the server components will be built and the server setup to run.
5. Run `lando npm i requirejs node-sass && lando npm install` inside of terminal to install the pesky packages that won't work without this
6. Run `lando npm start` to get the watch command to run. 
  - If you don't stop Lando but need to run grunt simply use `lando npm start` to get it running again.
7. LiveReload will be taking over for BrowserSync, you can simply run whatever URL you want from the `lando start` command in your browser.

### Stopping or Rebuilding

If we change components, you'll need to rebuild the Lando containers. To do so you just need to stop `grunt` with `ctrl+c` and then run `lando build`. 

To kill off your Lando environment, run `lando stop`. This will completely stop the web environment.

## Contributing

Contributions are only accepted from members of the Xavier University web team. Other improvements should be submitted as an [issue](https://github.com/XavierUniversity/v5-playground/issues).

### Contribution Guidelines

1. No Frameworks (Foundation/Bootstrap/Bourbon) allowed -- everything is coded by us, for us.
2. Use FlexBox and CSS Grids -- Support is only getting better, all major browsers already support these.
3. Use the [8-pt layout](https://blog.prototypr.io/the-8pt-grid-consistent-spacing-in-ui-design-with-sketch-577e4f0fd520)
    * Base font size is 16px; 1rem == 16px
    * 0.5rem == 8px
    * 2rem == 32px
4. Follow the [ITCSS Methodology](https://blog.codeminer42.com/how-to-organize-your-styles-with-itcss-3787cbc6dcbf)
5. Don't worry about breaking things. This is a playground.

### Where to put things

#### Stylesheets 

All CSS files should live within the `src/css` directory aligned with where it belongs in the structure and written with `scss` syntax.

#### JavaScript

ALL JS files should live within the `src/js` directory and broken down into various components. We will use grunt
to lint, concatenate and minify, as needed.

#### HTML Files

All HTML files should live within the `src/html` directory. Files can be written as independent pieces
and then included onto various pages, as needed. HTML Includes does *not* include the ability to process
variables.

Files in the `html` root will be rendered as actual pages. Files in `includes` will not.

#### Images 

Images for production use belong in the `src/images` folder, and should be semantically named. All of these
images will be processed via `imagemin` giving us a lighter image footprint. 

## Viewing the playground

Everything we do can be run in the web browser. But it can also be viewed on GitHub pages.
This is set up through the docs folder. All of the HTML files will render out at [xavieruniversity.github.io/v5-playground](https://xavieruniversity.github.io/v5-playground/).
