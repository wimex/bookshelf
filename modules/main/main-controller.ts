"use strict";

module Bs.Controllers {
    export class MainController {
        loading: number = 0;
        query: Models.BookSearchQueryModel = {

        };
        
        onAddToCartClicked(book: gapi.client.books.Volume) {
            this.$scope.global.cart.push(book);
            this.storageService.saveCart(this.$scope.global.cart);
        }
        
        onBottomReached() {
            // Don't allow scrolling when something else is loading
            if (this.loading > 0)
                return;

            this.loading++;
            this.ngProgressLite.start();
            this.booksService.search(this.query.keyword, this.query.result.items.length).then((result: gapi.client.books.Volumes) => {
                this.query.result.items = this.query.result.items.concat(result.items);
            }, (response) => {
                alert("Failed to query the API");
            }).finally(() => {
                this.loading = 0;
                this.ngProgressLite.done();
            });
        }

        onKeywordChanged() {
            if (typeof(this.query.keyword) === "undefined" || this.query.keyword === null || this.query.keyword === "") {
                delete this.query.keyword;
                delete this.query.result;

                return;
            }

            // Remember that a request is necessary
            this.loading++;

            // If the user types too fast, leave
            if (this.loading > 1)
                return;

            this.ngProgressLite.start();
            this.booksService.search(this.query.keyword).then((result: gapi.client.books.Volumes) => {
                this.query.result = result;
            }, (response) => {
                alert("Failed to query the API");
            }).finally(() => {
                var next = this.loading > 1;
                this.loading = 0;
                this.ngProgressLite.done();

                if (!next)
                    return;

                // Search again if there are new letters
                this.onKeywordChanged();
            });
        };

        onClearKeywordClicked() {
            this.$state.go("main", { keyword: "" }, { reload: true });
        }

        onHomeClicked() {
            var keyword = typeof(this.query) !== "undefined" && typeof(this.query.keyword) !== "undefined" && this.query.keyword !== null ? this.query.keyword : null;
            this.$state.go("main", { keyword: keyword });
        }

        constructor(protected $scope: Models.IMainControllerScope, protected $state: ng.ui.IStateService, protected ngProgressLite: any, protected booksService: Services.BooksService, protected storageService: Services.StorageService, query: Models.BookSearchQueryModel) {
            this.query = query;
            this.$scope.global = {
                cart: this.storageService.getCart()
            };
        }
    }

    angular
        .module("bs.main")
        .controller("mainController", ["$scope", "$state", "ngProgressLite", "booksService", "storageService", "query", MainController]);
}