"use strict";

module Bs.App {
    angular
        .module("bs",
            [
                "ui.router",
                "ngProgressLite",

                "bs.services",
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
                            url: "/:keyword?",
                            templateUrl: "./modules/main/main-view.html",
                            controller: "mainController as ctrl",
                            resolve: {
                                query: [
                                    "$q", "$stateParams", "booksService", ($q: ng.IQService, $stateParams: any, booksService: Services.BooksService) => {
                                        var keyword = typeof ($stateParams.keyword) !== "undefined" && $stateParams.keyword !== null && $stateParams.keyword !== "" ? $stateParams.keyword : "angular";
                                        return $q((resolve, reject) => {
                                            booksService.search(keyword).then((result) => {
                                                    resolve({ keyword: keyword, result: result });
                                                },
                                                (response) => {
                                                    reject(response);
                                                });
                                        });
                                    }
                                ]
                            }
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

    angular.module("bs.services", []);
    angular.module("bs.main", []);
}