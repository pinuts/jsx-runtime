# jsx-runtime
JSX runtime: JSX.createElement()

This is a runtime library to render babel-compiled JSX templates
in the browser.

## Example gulp 4 task

```javascript
const gulp = require('gulp');
const browserify  = require('browserify');
const fs = require("fs");

// Transpile ES6, Modules and JSX
function compileScripts() {
    return browserify("./src/js/main.js", {debug: true})
        .transform("babelify", {
            presets: ["@babel/preset-env"],
            highlightCode: true,
            plugins: [
                "@babel/plugin-syntax-jsx",
                ["@babel/plugin-transform-react-jsx", { pragma: "JSX.createElement", pragmaFrag: "JSX.Fragment" }]
            ]
        })
        .bundle()
        .on('error', handleError)
        .pipe(fs.createWriteStream(outputDir + '/js/package.js'));
}
```

The magic keywords here are `pragma` and `pragmaFrag` that reference the according
functions from _jsx-runtime_.

## Using jsx-runtime

Add jsx-runtime as a dependency:
```bash
npm i @pinuts/jsx-runtime
```

To use the runtime in an arbitrary module, import _JSX_ like this to add it to the current scope:
```javascript
import JSX from '@pinuts/jsx-runtime';

function foo() {
    return <h1>Hello World</h1>;
}
```


# Publish on npm

On master, once all the changes for a new version are in order, run:

1. `npm version [major|minor|patch]`
2. `git push origin master --follow-tags`
3. `npm publish`
