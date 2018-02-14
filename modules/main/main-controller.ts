"use strict";

module Bs.Controllers {
    export class MainController {
        loading: number = 0;
        query: Models.BookSearchQueryModel = {

        };

        onKeywordChanged() {
            if (typeof(this.query.keyword) === "undefined" || this.query.keyword === null || this.query.keyword === "") {
                delete this.query.keyword;
                delete this.query.result;

                return;
            }

            this.loading++;

            if (this.loading > 1)
                return;

            this.booksService.search(this.query.keyword).then((result: gapi.client.books.Volumes) => {
                this.query.result = result;
            }, (response) => {
                alert("Failed to query the API");
            }).finally(() => {
                var next = this.loading > 1;
                this.loading = 0;

                if (!next)
                    return;

                this.onKeywordChanged();
            });
        };

        constructor(protected $scope: ng.IScope, protected booksService: Services.BooksService, query: Models.BookSearchQueryModel) {
            this.query = query;
        }
    }

    angular
        .module("bs.main")
        .controller("mainController", ["$scope", "booksService", "query", MainController]);
}