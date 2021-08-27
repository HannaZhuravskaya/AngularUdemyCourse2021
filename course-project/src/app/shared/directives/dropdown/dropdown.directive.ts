import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector: '[app-dropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen: boolean = false;

    @HostListener('document:click', ['$event.target']) toggleOpen(eventTarget: HTMLElement) {
        this.isOpen = this.elementRef.nativeElement.contains(eventTarget) ? !this.isOpen : false;
    }

    constructor(private elementRef: ElementRef) { }
}