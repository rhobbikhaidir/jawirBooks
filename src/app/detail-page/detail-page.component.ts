import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Toast, ToastModule } from 'primeng/toast';
import { catchError } from 'rxjs';
import { BookListService } from '../services/book-list.service';
import { SafeUrlPipe } from './safe-url.pipe';


@Component({
  selector: 'app-detail-page',
  imports: [SafeUrlPipe, ToastModule, ButtonModule, Toast, NgIf],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss',
  providers: [MessageService]
})
export class DetailPageComponent implements OnInit {
  booksService = inject(BookListService);
  routerParams = inject(ActivatedRoute);
  messageService = inject(MessageService);
  route = inject(Router);
  tempLink = '';
  loading: boolean = false;


  onToastClose() {
    this.route.navigate(['/'], { replaceUrl: true })
  }


  showError(error?: any) {
    const message = error?.error?.message || 'Book Not found';

    this.messageService.add({ severity: 'error', summary: 'Error', detail: message, life: 3000, });
  }
  getDetailBooks() {
    const id = this.routerParams.snapshot.paramMap.get('id'); // return string | null
    if (id?.length) {
      this.loading = true;
      this.booksService.getDetailBooks({
        id: id,
      }).pipe(catchError((err) => {
        this.loading = false;
        this.showError(err);
        console.log(err)
        throw err
      })).subscribe((data) => {
        if (data?.results?.length === 0) {
          this.loading = false;
          this.showError();
        }
        const bookId = data.results[0].id;
        const url = `https://www.gutenberg.org/cache/epub/${bookId}/pg${bookId}-images.html`
        this.tempLink = url;
        this.loading = false;
      })
    }




  }

  ngOnInit(): void {
    this.getDetailBooks()
  }
}

