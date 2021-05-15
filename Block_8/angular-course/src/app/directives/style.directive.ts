import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { IAdditionStyles } from '../types/interfaces';

@Directive({
  selector: '[appStyle]'
})
export class StyleDirective implements OnInit {

  @Input('appStyle')
  textColor = 'black';

  @Input()
  dStyles: IAdditionStyles = {}

  constructor(private el: ElementRef,
              private r: Renderer2) {
  }

  ngOnInit(): void {
    // this.r.setStyle(this.el.nativeElement, 'color', this.textColor);
  }

  @HostListener('mouseover') mouseOver() {
    this.setShadow();
  }

  @HostListener('mouseleave') mouseLeave() {
    this.removeShadow();
  }

  @HostBinding('style.color') elColor = null;

  setShadow() {
    this.elColor = this.textColor;
    // this.r.setStyle(this.el.nativeElement, 'transition', this.dStyles.transition);
    // this.r.setStyle(this.el.nativeElement, 'boxShadow', this.dStyles.boxShadow);
  }

  removeShadow() {
    this.elColor = null;
    // this.r.setStyle(this.el.nativeElement, 'boxShadow', null);
  }
}
