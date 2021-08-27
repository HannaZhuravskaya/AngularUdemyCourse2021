import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})

// Notes: diff approaches
// Use Renderer2, Renderer2 + HostListener, HostListener + HostBinding, HostListener + HostBinding + Input for customisation
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'black';
  @Input() highlightColor: string = 'white';
  @HostBinding('style.color') color: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.color = this.defaultColor;
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'lightblue');
  }

  @HostListener('mouseleave') onMouseLeave(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
    this.color = this.defaultColor;
  }

  @HostListener('mouseenter') onMouseOver(eventData: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'lightblue');
    this.color = this.highlightColor;
  }
}