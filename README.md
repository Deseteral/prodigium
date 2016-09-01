# prodigium

Custom new tab page for Google Chrome build using WebComponents.

## Requirements
* Node v6.5.0
* Chrome 52+

## Building

### Chrome extension
Just add `chrome-extension/src` as unpacked extension to Chrome.

### Server
Make sure you have `bower` and `gulp` globally installed. Then install node modules and bower components:

```shell
cd server

npm install
bower install
```
To build use default gulp task, or if you want to build and run:
```shell
gulp # only build server code

npm start # build and run
```

To run already built code:
```shell
node build/index.js
```

To run tests use npm's test command:
```shell
npm test
```

## License
This project is licensed under [MIT license](LICENSE).
