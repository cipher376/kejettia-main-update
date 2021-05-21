import { Directive, ElementRef, Input, AfterViewInit, AfterContentInit } from '@angular/core';

@Directive({
    selector: '[background-image]'
})
export class BackgroundImageDirective implements AfterViewInit, AfterContentInit {
    private el: HTMLElement;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }


    @Input('background-image') backgroundImage: string;
    @Input('background-position') backgroundPosition: string;
    @Input('background-size') backgroundSize: string;
    @Input('background-repeat') backgroundRepeat: string;

    ngAfterViewInit() {

    }

    ngAfterContentInit(): void {
        if (this.backgroundImage) {
            this.el.style.backgroundImage = 'url(' + this.backgroundImage + ')';
        }
        this.el.style.backgroundPosition = 'center';
        this.el.style.backgroundSize = 'cover';
        this.el.style.backgroundRepeat = 'no-repeat';
    }

}
