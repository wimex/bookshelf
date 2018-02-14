"use strict";

module Bs.Controllers {
    export class MainController {
        loading: number = 0;
        query: Models.BookSearchQueryModel = {

        };

        cart: gapi.client.books.Volume[] = [];

        onAddToCartClicked(book: gapi.client.books.Volume) {
            this.cart.push(book);
        }
        
        onBottomReached() {
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

            this.loading++;

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

                this.onKeywordChanged();
            });
        };

        onClearKeywordClicked() {
            this.$state.go("main", { keyword: "" }, { reload: true });
        }

        onHomeClicked() {
            this.$state.go("main");
        }

        constructor(protected $scope: Models.IMainControllerScope, protected $state: ng.ui.IStateService, protected ngProgressLite: any, protected booksService: Services.BooksService, query: Models.BookSearchQueryModel) {
            this.query = query;
            this.$scope.cart = this.cart;
        }
    }

    angular
        .module("bs.main")
        .controller("mainController", ["$scope", "$state", "ngProgressLite", "booksService", "query", MainController]);
}