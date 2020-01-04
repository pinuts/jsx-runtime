# jsx-runtime
JSX runtime: JSX.createElement()

This is a runtime library to render babel-compiled JSX templates
in the browser.


## Using jsx-runtime

Add jsx-runtime as a dependency:
```bash
npm i @pinuts/jsx-runtime --save
```

To use the runtime in an arbitrary module, import _JSX_ like this to add it to the current scope:
```javascript
import JSX from '@pinuts/jsx-runtime';

function foo() {
    return <h1>Hello World</h1>;
}
```

## Example gulpfile.js

Install gulp 4, browserify, babelify and friends:
```bash
npm i gulp@4 browserify babelify @babel/core @babel/preset-env @babel/plugin-syntax-jsx @babel/plugin-transform-react-jsx --save-dev
```

```javascript
const gulp = require('gulp');
const browserify  = require('browserify');
const fs = require('fs');
const outputDir = 'dist';

// Transpile ES6, Modules and JSX
function compileScripts() {
    const jsOutputDir = outputDir + '/js';
    fs.mkdirSync(jsOutputDir, {recursive: true});
    
    return browserify('./src/js/main.js', {debug: true})
        .transform('babelify', {
            presets: ['@babel/preset-env'],
            highlightCode: true,
            plugins: [
                '@babel/plugin-syntax-jsx',
                ['@babel/plugin-transform-react-jsx', { pragma: 'JSX.createElement', pragmaFrag: 'JSX.Fragment' }]
            ]
        })
        .bundle()
        .on('error', handleError)
        .pipe(fs.createWriteStream(jsOutputDir + '/package.js'));
}

function handleError(error) {
    console.error(error.toString());
    this.emit('end');
}

gulp.task('default', compileScripts);
```

The magic keywords here are `pragma` and `pragmaFrag` that reference the according
functions from _jsx-runtime_.

# Publish on npm

On master, once all the changes for a new version are in order, run:

1. `npm version [major|minor|patch]`
2. `git push origin master --follow-tags`
3. `npm publish`
