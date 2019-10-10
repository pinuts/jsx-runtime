# jsx-runtime
JSX runtime: JSX.createElement()

This is a runtime library to render babel-compiled JSX templates
in the browser.

## Example gulp task

```javascript
gulp.task('scripts', function() {
    browserify("./src/js/main.js", {debug: true})
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
        .pipe(fs.createWriteStream("./dist/js/package.js"));
});
```

The magic keywords here are `pragma` and `pragmaFrag` that reference the according
functions from _jsx-runtime_.


# Publish on npm

On master, once all the changes for a new version are in order, run:

1. `npm version [major|minor|patch]`
2. `git push origin master --follow-tags`
3. `npm publish`
