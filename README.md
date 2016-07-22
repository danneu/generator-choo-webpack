
# 🚂 generator-choo-webpack [![Build Status](https://travis-ci.org/danneu/generator-choo-webpack.svg?branch=master)](https://travis-ci.org/danneu/generator-choo-webpack) [![NPM version](https://badge.fury.io/js/generator-choo-webpack.svg)](http://badge.fury.io/js/generator-choo-webpack) [![Dependency Status](https://david-dm.org/danneu/generator-choo-webpack.svg)](https://david-dm.org/danneu/generator-choo-webpack)

Create the minimal [Choo][choo] + Babel + Webpack project boilerplate.

[choo]: https://github.com/yoshuawuyts/choo

```
$ yo choo-webpack my-app
> do you want to use Twitter Bootstrap v3? (y/N)
Project generated!
$ cd my-app
$ npm start
Development server listening at <http://localhost:8080>
```

## Features

- **Optional [Twitter Bootstrap (Sass) v3](http://getbootstrap.com/):**
  You can opt-in during the generator prompt. 
  Once you opt-in, you can immediately start using Bootstrap classes
  and it'll just work.
- **[Sass](http://sass-lang.com/) support:** 
  Just write SASS in your `.scss` files if you want it.
- **CSS vendor autoprefixing:** 
  Automatically adds prefixes like `-webkit` to your styles when necessary.
- **Babel plugins:** [es2040][es2040] + `{ ...spread }`

[es2040]: https://github.com/ahdinosaur/es2040

## Install

Install [Yeoman][yeoman] (generator framework) and `generator-choo-webpack` globally:

    $ npm install -g yo generator-choo-webpack

[yeoman]: http://yeoman.io/

## Generate

Generate scaffolding in a target folder:

    $ yo choo-webpack <destinationFolder>

Or in the current folder:

    $ yo choo-webpack .

## Run

### Development

Start the local development server and visit <http://localhost:8080>.

    $ npm start

### Production

Bundle the app into a `dist` folder ready to be deployed.

    $ npm run build

    .
    └── dist
        ├── index.html
        ├── 5df766af1ced8ff1fe0a.css
        ├── 5df766af1ced8ff1fe0a.js
        └── img
            └── ...

To test the production build locally, spin up a static
asset server to avoid broken links.

    $ npm run build && npm run serve
    server listening on http://localhost:8080

## Anatomy of the Scaffolding

Here's the generated project folder:

    .
    ├── README.md          # for your personal use, notes
    ├── package.json       # dependencies, implements the `npm` commands
    ├── src                # your choo application code goes here
    │   └── index.js       # root choo component, begin hacking here
    ├── static             # holds static assets (html, css, js, img, ...)
    │   ├── css
    │   │   ├── index.scss # root css file that should @import other css files
    │   │   └── bootstrap  # if you opted into bootstrap, can customize it here
    │   │       ├── pre-customizations.scss # tweak bootstrap $vars before it loads
    │   │       └── customizations.scss     # override bootstrap after it loads
    │   ├── favicon.ico    # a default favicon for you to replace
    │   ├── index.html     # root html file
    │   └── index.js       # root javascript file, webpack entrypoint
    ├── .bootstraprc       # if you opted into bootstrap, you can configure it here
    ├── webpack.config.js
    └── dist               # the stand-alone folder generated by `npm run build`
        ├── index.html     # throw the contents on a server and open index.html
        ├── <hash>.js
        ├── <hash>.css
        └── ...

## License

MIT © [Dan Neumann](https://github.com/danneu)
