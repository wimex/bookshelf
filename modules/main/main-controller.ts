"use strict";

module Bs.Controllers {
    export class MainController {
        constructor($scope: ng.IScope) {

        }
    }

    angular
        .module("bs.main")
        .controller("mainController", ["$scope", MainController]);
}