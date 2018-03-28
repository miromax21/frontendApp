import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  template: `
    <p>
      page-not-found
    </p>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
