import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, AfterViewInit {
  constructor() {}

  initHeight = 200;
  height = 200;

  @ViewChild('ghostEl') ghostEl: ElementRef<any>;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.ghostEl.nativeElement.style.height = `${this.initHeight}px`;
  }

  onPanUp(event: any) {
    const newHeight = this.height + (event.deltaY * -1 - this.height);
    this.height = newHeight;
    this.ghostEl.nativeElement.style.height = `${this.height}px`;
  }

  onClick() {
    if (this.height !== this.initHeight) {
      this.ghostEl.nativeElement.style.height = `${this.initHeight}px`;
    }
  }

  // onPanDown(event: any) {
  //   const newHeight = this.height - event.deltaY;
  //   this.height = newHeight;
  //   console.log(this.height);
  //   this.ghostEl.nativeElement.style.height = `${this.height}px`;
  // }

  ngOnDestroy(): void {}
}
