import { animate, group, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      transition("normal <=> highlighted", animate(300))
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition("normal => highlighted", animate(300)),
      transition("highlighted => normal", animate(800)),
      transition("shrunken <=> *", [
        style({
          'background-color': 'orange'
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500)
      ])
    ]),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      //Notes: in - in the DOM, void - haven't been added
      transition("void => *", [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)]),
      transition("* => void", [
        animate(300, style({
          opacity: 0,
          transform: 'translateX(100px)'
        }))])
    ]),
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      //Notes: in - in the DOM, void - haven't been added
      transition("void => *", animate(1000, keyframes([
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
          offset: 0
        }),
        style({
          opacity: 0.5,
          transform: 'translateX(-50px)',
          offset: 0.3
        }),
        style({
          opacity: 1,
          transform: 'translateX(-20px)',
          offset: 0.8
        }),
        style({
          opacity: 1,
          transform: 'translateX(0px)',
          offset: 1
        })
      ]))),
      transition("* => void", [
        // Notes: group - animations start execution at the same time, animations can have diff times
        group([
          animate(2000, style({
            opacity: 0,
            transform: 'translateX(100px)'
          })),
          animate(0, style({
            color: 'red'
          }))
        ])
      ])
    ])
  ]
})
export class AppComponent {
  list = ['Milk', 'Sugar', 'Bread'];
  divState = 'normal';
  wildState = 'normal';

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  }

  onAnimate() {
    this.divState = this.divState === 'normal' ? 'highlighted' : 'normal';
    this.wildState = this.wildState === 'normal' ? 'highlighted' : 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  animationStarted($event) {
    console.log($event);
  }

  animationEnded($event) {
    console.log($event);
  }
}
