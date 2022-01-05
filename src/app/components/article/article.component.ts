import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

const enum Status {
  OFF = 0,
  RESIZE = 1,
  MOVE = 2,
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit, AfterViewInit {
  constructor() {}

  status: Status = Status.OFF;
  initHeight = 200;

  @ViewChild('ghostEl') ghostEl: ElementRef<any>;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.ghostEl.nativeElement.style.height = `${this.initHeight}px`;
  }

  setStatus(event: MouseEvent, status: number) {
    if (this.status === Status.OFF) {
      this.status = status;
    } else {
      this.status = Status.OFF;
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.status === Status.RESIZE) {
      const newHeight =
        this.initHeight + (event.screenY * -1 - this.initHeight);
      this.ghostEl.nativeElement.style.height = `${newHeight}px`;
    }
  }

  ngOnDestroy(): void {}
}
