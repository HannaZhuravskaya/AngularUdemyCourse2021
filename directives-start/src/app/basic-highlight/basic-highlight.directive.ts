import { Directive, ElementRef, OnInit } from "@angular/core";

// Notes: [] means I can put directive without them into element
@Directive({
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
    constructor(private elementRef: ElementRef) { }

    ngOnInit() {
        this.elementRef.nativeElement.style.backgroundColor = 'lightgreen';
    }
}