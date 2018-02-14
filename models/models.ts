"use strict";

module Bs.Models {
    export class BookSearchQueryModel {
        keyword?: string;
        result?: gapi.client.books.Volumes;
    }

    export interface IMainControllerScope extends ng.IScope {
        cart: gapi.client.books.Volume[];
    }
}