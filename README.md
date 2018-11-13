# v5 Playground

- Basic playground for all things v5 related.
- Provides us with a web experience to play with as we build out various things.

## Requirements

1. No Frameworks (Foundation/Bootstrap/Bourbon) allowed -- everything is coded by us, for us.
2. Use FlexBox and CSS Grids -- Support is only getting better, all major browsers already support these.
3. Use the [8-pt layout](https://blog.prototypr.io/the-8pt-grid-consistent-spacing-in-ui-design-with-sketch-577e4f0fd520)
  * Base font size is 16px; 1rem == 16px
  * 0.5rem == 8px
  * 2rem == 32px
4. Follow the [ITCSS Methodology](https://blog.codeminer42.com/how-to-organize-your-styles-with-itcss-3787cbc6dcbf)
5. Don't worry about breaking things. This is a playground.

## Setup

We'll be using a similar setup in here as we did for Xavier One (browsersync, sass) and one additional
piece called HTML includes. No reason to have this run PHP as it's just a playground.

## Getting started

Clone the repository, `npm start` should get it rolling.

## Where to put things

### Stylesheets 

All CSS files should live within the `src/css` directory aligned with where it belongs in the structure and written with `scss` syntax.

### JavaScript

ALL JS files should live within the `src/js` directory and broken down into various components. We will use grunt
to lint, concatenate and minify, as needed.

### HTML Files

All HTML files should live within the `src/html` directory. Files can be written as independent pieces
and then included onto various pages, as needed. HTML Includes does *not* include the ability to process
variables.

Files in the `html` root will be rendered as actual pages. Files in `includes` will not.

### Images 

Images for production use belong in the `src/images` folder, and should be semantically named. All of these
images will be processed via `imagemin` giving us a lighter image footprint. 

## Viewing the playground

Everything we do can be run in the web browser, via browsersync. But it can also be viewed on GitHub pages.
This is set up through the docs folder. All of the HTML files will render out at [xavieruniversity.github.io/v5-playground](https://xavieruniversity.github.io/v5-playground/).

