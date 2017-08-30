/*******************************
             Set-up
*******************************/

var
  // npm dependencies
  extend          = require('extend'),
  fs              = require('fs'),
  path            = require('path'),
  requireDotFile  = require('require-dot-file'),

  // theme.json defaults
  defaults        = require('./defaults'),
  config          = require('./project/config'),

  // Final config object
  gulpConfig = {},

  // theme.json settings
  userConfig

;


/*******************************
          User Config
*******************************/

try {
  // looks for config file across all parent directories
  userConfig = requireDotFile('theme.json');
}
catch(error) {
  if(error.code === 'MODULE_NOT_FOUND') {
    console.error('No theme.json config found');
  }
}

// extend user config with defaults
gulpConfig = (!userConfig)
  ? extend(true, {}, defaults)
  : extend(false, {}, defaults, userConfig)
;

/*******************************
       Add Derived Values
*******************************/

// adds calculated values
config.addDerivedValues(gulpConfig);


/*******************************
             Export
*******************************/

module.exports = gulpConfig;

