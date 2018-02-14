"use strict";

module Bs.Controllers {
    export class CartController {
        onClearCartClicked() {
            this.$scope.cart = [];
        }

        constructor(protected $scope: Models.IMainControllerScope, protected $state: ng.ui.IStateService) {

        }
    }

    angular
        .module("bs.cart")
        .controller("cartController", ["$scope", "$state", CartController]);
}