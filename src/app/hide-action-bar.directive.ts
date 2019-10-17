import { Directive } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';

@Directive({
    selector: '[hideActionBar]'
})
export class HideActionBarDirective {
    constructor(private page: Page) {
        this.page.actionBarHidden = true;
    }
}