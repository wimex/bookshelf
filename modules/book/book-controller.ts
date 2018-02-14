"use strict";

module Bs.Controllers {
    export class BookController {
        constructor(protected $scope: ng.IScope, protected $sce: ng.ISCEService, protected booksService: Services.BooksService, public book: gapi.client.books.Volume) {
            this.book.volumeInfo.description = this.$sce.trustAsHtml(this.book.volumeInfo.description);
        }
    }

    angular
        .module("bs.book")
        .controller("bookController", ["$scope", "$sce", "booksService", "book", BookController]);
}