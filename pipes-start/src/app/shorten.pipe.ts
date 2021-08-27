import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
    transform(value: any, limit: number, numberOfDots: number = 3) {
        if (value.length > limit)
            return value.substr(0, limit) + '.'.repeat(numberOfDots);
        else
            return value;
    }
}