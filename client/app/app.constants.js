'use strict';

import angular from 'angular';

export default angular.module('hackathonRevampedApp.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
