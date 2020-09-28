(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "bootstrap"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = void 0;
    require("bootstrap");
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .developmentLogging();
        // Uncomment the line below to enable animation.
        // aurelia.use.plugin('aurelia-animator-css');
        // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
        // aurelia.use.plugin('aurelia-html-import-template-loader')
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});
