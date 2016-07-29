define( function (require, exports, module) {

    'use strict';

    module.name = 'asaas-widget-login';

    var base = require('base');
    var core = require('core');
    var ui = require('ui');

    var deps = [
        core.name,
        ui.name
    ];

    // @ngInject
    function run() {
        // Module is Bootstrapped
    }

    module.exports = base.createModule(module.name, deps)
        .service(require('./login-service'))
        .controller(require('./controllers'))
        .run(run);
});
