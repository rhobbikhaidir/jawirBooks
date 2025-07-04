import { NgIf } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from "primeng/floatlabel";
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Toast, ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Skeleton } from 'primeng/skeleton';
import { CardItemComponent } from "../components/card-item/card-item.component";
import { GutendexBook } from '../components/model/list-books.type';
import { BookListService } from '../services/book-list.service';
import { catchError } from 'rxjs';



@Component({
  selector: 'app-home',
  imports: [
    InputIconModule,
    IconFieldModule,
    FloatLabelModule,
    InputTextModule,
    FormsModule,
    CardModule,
    ButtonModule,
    NgIf,
    Skeleton,
    PaginatorModule,
    CardItemComponent,
    Toast,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  searchVal: string | undefined = '';
  booksService = inject(BookListService);
  messageService = inject(MessageService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  booksList = signal<GutendexBook[]>([])
  itemPerpage = 0;
  loading = false;
  isListRender = false;
  page: number = 1;
  first: number = 0;
  rows: number = 1;
  totalRecord = 0;
  arraySkeleton = [...Array(10).keys()];

  showError(error?: any) {
    const message = error?.error?.message || 'Terjadi kesalahan saat memproses data';

    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life: 4000
    });
  }

  // getListbooks() {
  //   this.route.queryParams.subscribe((params) => {
  //     this.loading = true;
  //     this.isListRender = false;
  //     this.booksService.getListBooks({
  //       page: params['page'],
  //       search: params['search']
  //     }).subscribe((data) => {
  //       this.page = params['page']
  //       this.itemPerpage = data.count < 32 ? 32 : data.count;
  //       this.totalRecord = data.count < 32 ? 0 : Math.floor(data.count / 32);
  //       this.booksList.set(data.results);
  //       this.loading = false;
  //       if (data?.results?.length > 0 && !this.loading) this.isListRender = true
  //     })

  //   })

  // }
  getListbooks(page: string = '1', search: string = '') {
    this.loading = true;
    this.isListRender = false;
    this.booksService.getListBooks({
      page: page,
      search: search
    }).pipe(catchError((err) => {
      this.loading = false;
      this.showError(err)
      console.log(err);
      throw err
    })).subscribe((data) => {
      this.itemPerpage = data.count < 32 ? 32 : data.count;
      this.totalRecord = data.count < 32 ? 0 : Math.floor(data.count / 32);
      this.booksList.set(data.results);
      this.loading = false;
      if (data?.results?.length > 0 && !this.loading) this.isListRender = true
    })


  }

  // updatePath(currPage: string = '1', search: string = '') {
  //   this.route.queryParams.subscribe(() => {
  //     this.router.navigate(['/'], {
  //       queryParams: {
  //         page: currPage,
  //         search,
  //       }
  //     })
  //   });
  //   this.getListbooks();
  // }

  ngOnInit(): void {
    // this.updatePath('1', '');
    this.getListbooks()
  }




  truncateText(text: string[], maxLength: number = 150): string {
    const val = text.join('')
    if (val.length > maxLength) {
      return val.substring(0, maxLength) + '...';
    }
    return val;
  }

  searchBooks(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      console.log('jalan');
      // this.updatePath('1', this.searchVal)
      this.getListbooks('1', this.searchVal)

    }
  }

  onPageChange(event: PaginatorState) {
    this.page = event.first ? event.first + 1 : 1;
    if (this.searchVal?.length) {
      // this.updatePath(String(this.page), this.searchVal);
      this.getListbooks(String(this.page), this.searchVal);

    } else {
      // this.updatePath(String(this.page));
      this.getListbooks(String(this.page));


    }
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 1;
  }
}
