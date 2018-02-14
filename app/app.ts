"use strict";

module Bs.App {
    angular
        .module("bs",
            [
                "ui.router",
                "ngProgressLite",

                "bs.main"
            ])
        .config([
            "$stateProvider", "$urlRouterProvider", "$locationProvider",
            ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider, $locationProvider: ng.ILocationProvider,) => {
                $locationProvider.html5Mode(true);
                $urlRouterProvider.otherwise("/");

                $stateProvider
                    .state("main",
                        {
                            url: "/",
                            templateUrl: "./modules/main/main-view.html",
                            controller: "mainController as ctrl"
                        });
            }
        ])
        .run(["$transitions", "ngProgressLite", ($transitions, ngProgressLite) => {
            $transitions.onStart({},
                (transition) => {
                    ngProgressLite.start();
                    transition.promise.finally(() => { ngProgressLite.done(); });
                });
        }]);

    angular.module("bs.main", []);
}