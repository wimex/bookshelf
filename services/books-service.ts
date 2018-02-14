"use strict";

module Bs.Services {
    export class BooksService {
        private endpoint: string = "https://www.googleapis.com/books/v1";

        search(keyword: string, index: number = 0, count: number= 40): ng.IPromise<object> {
            var url = `${this.endpoint}/volumes?q=${keyword}&startIndex=${index}&maxResults=${count}`;
            return this.$q((resolve, reject) => {
                this.$http
                    .get(url)
                    .then((response: ng.IHttpResponse<object>) => {
                            resolve(response.data);
                        },
                        (response) => {
                            reject(response);
                        });
            });
        }
        
        constructor(protected $q: ng.IQService, protected $http: ng.IHttpService,) {
            
        }
    }

    angular
        .module("bs.services")
        .service("booksService", ["$q", "$http", BooksService]);
}