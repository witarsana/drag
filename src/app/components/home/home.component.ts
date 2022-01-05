import {
  Component,
  OnDestroy,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticleCard } from 'src/app/models/article';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  articleCards: ArticleCard[] = [];

  subscription: Subscription;

  height = 30;
  initHeight = 30;

  @ViewChild('ghostEl') ghostEl: ElementRef<any>;

  constructor(private articleService: ArticlesService) {
    this.subscription = this.articleService
      .getArticleCards()
      .subscribe((cards) => {
        this.articleCards = cards;
      });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.ghostEl.nativeElement.style.height = `${this.height}px`;
  }

  cdkDragEnded(event: any) {
    const droppedElement = this.ghostEl;
    // const { top, left } = droppedElement.getBoundingClientRect();
    // console.log(top);
    const t = droppedElement.nativeElement.style.transform;
    if (t.length > 0) {
      const test = t.toString();
      const tArr = test.split(',');
      const h = Number(tArr[1].replace('px', '')) * -1;
      console.log(h);
      this.height = this.initHeight + h;

      this.ghostEl.nativeElement.style.height = `${this.height}px`;
      // this.ghostEl.nativeElement.style.top = `${this.height}px`;
    }
    // this.height = event.target.clientHeight;
    // console.log(this.height);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
