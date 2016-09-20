import fs from 'fs';
import nodePath from 'path';

const DEFAULT_CONFIG = require('./default-config.json');

export default class ConfigStore {
  constructor(filename = 'config.json') {
    this.config = {};
    this._configFilePath = nodePath.join(__dirname, filename);
  }

  save() {
    fs.writeFileSync(
      this._configFilePath,
      JSON.stringify(this.config, null, 2)
    );
  }

  load() {
    if (fileExists(this._configFilePath)) {
      console.log('Loading config');
      this.config = JSON.parse(fs.readFileSync(this._configFilePath));
    } else {
      console.log('Config file doesn\'t exist! Using default config');
      this.config = DEFAULT_CONFIG;
      this.save();
    }
  }
}

function fileExists(fullpath) {
  try {
    return fs.statSync(fullpath).isFile();
  } catch (e) {
    return false;
  }
}
