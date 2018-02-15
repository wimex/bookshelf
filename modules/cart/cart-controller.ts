"use strict";

module Bs.Controllers {
    export class CartController {
        onClearCartClicked() {
            this.$scope.global.cart = [];
            this.storageService.clearCart();
        }

        constructor(protected $scope: Models.IMainControllerScope, protected $state: ng.ui.IStateService, protected storageService: Services.StorageService) {

        }
    }

    angular
        .module("bs.cart")
        .controller("cartController", ["$scope", "$state", "storageService", CartController]);
}