import nodePath from 'path';
import express from 'express';
import bodyParser from 'body-parser';

export default function(app) {
  app.use(bodyParser.text());

  return {
    staticFiles() {
      app.use('/', express.static(nodePath.join(__dirname, 'app')));
      app.use('/widgets',
        express.static(nodePath.join(__dirname, 'app/widgets')));
      app.use('/bower_components',
        express.static(nodePath.join(__dirname, 'bower_components'))
      );

      return this;
    },

    setupRoute(url, routes) {
      if (routes.get) {
        app.get(url, routes.get);
      }

      if (routes.put) {
        app.put(url, routes.put);
      }

      if (routes.post) {
        app.post(url, routes.post);
      }

      if (routes.delete) {
        app.delete(url, routes.delete);
      }

      return this;
    }
  };
}
