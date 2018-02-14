"use strict";

module Bs.Models {
    export class BookSearchQueryModel {
        keyword?: string;
        result?: gapi.client.books.Volumes;
    }
}