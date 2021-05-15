import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStyle]'
})
export class StyleDirective {
  constructor(private el: ElementRef, private r: Renderer2) {
    this.r.setStyle(this.el.nativeElement, 'color', 'red');
  }

  @HostListener('mouseover') mouseOver() {
    this.setShadow();
  }

  @HostListener('mouseleave') mouseLeave() {
    this.removeShadow();
  }

  setShadow() {
    this.r.setStyle(this.el.nativeElement, 'boxShadow', 'inset 0px 0px 8px 3px rgb(60 60 60 / 25%)');
  }

  removeShadow() {
    this.r.setStyle(this.el.nativeElement, 'boxShadow', null);
  }
}
