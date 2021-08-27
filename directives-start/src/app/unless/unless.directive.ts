import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  // Notes: Do not forget that *appUnless -> [appUnless], so you can use @Input('appUnless') any or @Input() appUnless
  @Input('appUnless') set unless(condition: boolean) {
    if (condition) {
      this.viewContainerRef.clear();
    }
    else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) { }
}