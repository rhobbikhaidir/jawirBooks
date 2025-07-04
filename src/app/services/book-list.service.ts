import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GutendexResponse, PartialDetail, PartialListBooks } from '../components/model/list-books.type';

@Injectable({
  providedIn: 'root'
})
export class BookListService {

  http = inject(HttpClient)

  getListBooks(payload: PartialListBooks) {
   return  this.http.get<GutendexResponse>('https://gutendex.com/books/', {
      params: {
        page: payload.page,
        search: payload.search  ? payload.search : ''
      }
    })
  }
  getBookById(id: number) {
    return this.http.get<GutendexResponse>('https://gutendex.com/books/', {
      params: { ids: id }
    });
  }
  

  getDetailBooks(payload: PartialDetail) {

    return  this.http.get<GutendexResponse>('https://gutendex.com/books/', {
      params: {
        ids: payload.id
      }
    })
  }
}
