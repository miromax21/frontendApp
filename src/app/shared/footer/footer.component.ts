import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.less"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  year: number = new Date().getFullYear();
  
  constructor() { }

  ngOnInit() {}

}
