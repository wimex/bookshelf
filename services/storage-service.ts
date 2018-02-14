"use strict";

module Bs.Services {
    export class StorageService {
        key: string = "bs-cart";

        getCart(): gapi.client.books.Volume[] {
            var cart = this.$window.localStorage.getItem(this.key);
            return typeof(cart) !== "undefined" && cart != null ? JSON.parse(cart) : [];
        }

        saveCart(cart: gapi.client.books.Volume[]) {
            this.$window.localStorage.setItem(this.key, JSON.stringify(cart));
        }

        clearCart() {
            this.$window.localStorage.removeItem(this.key);
        }
        
        constructor(protected $q: ng.IQService, protected $window: ng.IWindowService) {
            
        }
    }

    angular
        .module("bs.services")
        .service("storageService", ["$q", "$window", StorageService]);
}