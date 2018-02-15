"use strict";

module Bs.App {
    angular
        .module("bs",
            [
                "ui.router",
                "infinite-scroll",
                "ngProgressLite",

                "bs.services",
                "bs.main",
                "bs.book",
                "bs.cart"
            ])
        .config([
            "$stateProvider", "$urlRouterProvider", "$locationProvider",
            ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider, $locationProvider: ng.ILocationProvider,) => {
                $locationProvider.html5Mode(true);

                // Jump to a predefined query when loading the first time
                $urlRouterProvider.otherwise("/search/angular");

                var main = $stateProvider
                    .state("main",
                        {
                            url: "/search/:keyword?",
                            templateUrl: "./modules/main/main-view.html",
                            controller: "mainController as ctrl",
                            resolve: {
                                query: [
                                    "$q", "$stateParams", "booksService", ($q: ng.IQService, $stateParams: any, booksService: Services.BooksService) => {
                                        if (typeof ($stateParams.keyword) === "undefined" || $stateParams.keyword === null || $stateParams.keyword === "")
                                            return undefined;

                                        return $q((resolve, reject) => {
                                            booksService.search($stateParams.keyword).then((result) => {
                                                    resolve({ keyword: $stateParams.keyword, result: result });
                                                },
                                                (response) => {
                                                    reject(response);
                                                });
                                        });
                                    }
                                ]
                            }
                        });

                main.state("main.book",
                    {
                        url: "book/:bookId",
                        templateUrl: "./modules/book/book-view.html",
                        controller: "bookController as ctrl",
                        resolve: {
                            book: [
                                "$stateParams", "booksService", ($stateParams: any, booksService: Services.BooksService) => {
                                    return booksService.getBook($stateParams.bookId);
                                }
                            ]
                        }
                    });

                main.state("main.cart",
                    {
                        url: "^/cart",
                        templateUrl: "./modules/cart/cart-view.html",
                        controller: "cartController as ctrl",
                        params: {
                            keyword: ""
                        }
                    });
            }
        ])
        .run(["$transitions", "$state", "ngProgressLite", ($transitions, $state, ngProgressLite) => {
            $transitions.onStart({},
                (transition) => {
                    ngProgressLite.start();
                    transition.promise.finally(() => { ngProgressLite.done(); });
                });
        }]);

    angular.module("bs.services", []);
    angular.module("bs.main", []);
    angular.module("bs.book", []);
    angular.module("bs.cart", []);
}