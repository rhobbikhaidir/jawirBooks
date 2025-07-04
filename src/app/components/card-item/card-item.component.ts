import { Component, inject, input, OnInit } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';
import { GutendexBook } from '../model/list-books.type';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';



@Component({
  selector: 'app-card-item',
  imports: [Tooltip, ButtonModule],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss'
})
export class CardItemComponent {
  cardItem = input.required<GutendexBook>();
  route = inject(Router)


  truncateText(text: string[], maxLength: number = 150): string {
    const val = text.join('')
    if (val.length > maxLength) {
      return val.substring(0, maxLength) + '...';
    }
    return val;
  }

  gotoDetail(id: number) {
    this.route.navigate(['/detail', id])
  }


}
