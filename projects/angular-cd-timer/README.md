# Angular-Cd-Timer

This is a simple, re-usable and inter-operable timer component for [Angular CLI](https://github.com/angular/angular-cli) with multiple options.

`cd-timer` is able to:
- count up / count down.
- manage start time and end time.
- manage several displaying format.

## Demo

Demo is available on this site: [http://angular-cd-timer.clemdesign.fr/](http://angular-cd-timer.clemdesign.fr/)

## Prerequisites

- Angular 4 and upper

## Installation

Execute `npm install angular-cd-timer`

## Usage

`cd-timer` count every seconds.

### Configuration

Import the module as standard [Angular module import](https://angular.io/guide/architecture-modules):

```typescript
import { CdTimerModule } from 'angular-cd-timer';

@NgModule({
  // ...,
  imports: [
    // ...,
    CdTimerModule
  ],
  // ...
})
export class AppModule { }
```

### Basic usage

This simple integration `<cd-timer></cd-timer>` will start the timer with the default options of ticking every 1 second.

### Attributes

`cd-timer` has the following attributes:
- `[startTime]`: Define the start time (tick count) in second. Default: 0.
- `[endTime]`: Define the end time (tick count) in second. Default: 0 (Not enabled).
- `[countdown]`: Countdown if set to true. Default: false.
- `[autoStart]`: Autostart timer if set to true. Default: true.
- `maxTimeUnit`: Define the maximum unit allowed. Default: 'day'.
  - `day`: Timer count up to day. Ex: 2d 12h 04m 12s.
  - `hour`: Timer count up to hour. EX: 00d 60h 04m 12s.
  - `minute`: Timer count up to minute. EX: 00d 00h 3604m 12s.
  - `second`: Timer count up to minute. EX: 00d 00h 00m 216252s.
- `format`: Display timer count in predefined format. Default: 'user' or 'default'.
  - `default`: Display like `0d 0h 0m 0s`.
  - `hms`: Display like `HH:MM:SS`.
  - `intelli`: Display in condensed format:
    - only seconds: 25s
    - minutes and seconds: 02min 12s
    - hours and minutes: 10h 21min
    - days and hours: 2days 12min
  - `user`: Display according user markup in `<cd-timer></cd-timer>`:
    - `[seconds]`: display seconds
    - `[minutes]`: display minutes
    - `[hours]`: display hours
    - `[days]`: display days

### Callbacks

`cd-timer` has the following callbacks (event emitter):
- `(onComplete)`: Called when tick count reach endTime or 0. Argument is `CdTimerComponent`.
- `(onTick)`: Called each tick count. Argument is `TimeInterface`.
- `(onStart)`: Called when timer starts. Argument is `CdTimerComponent`.
- `(onStop)`: Called when timer stop. Argument is `CdTimerComponent`.

### Public methods

`cd-timer` is controlable by the following public methods:

| Method name | Description                                     |
|:----------- |:----------------------------------------------- |
| `start()`   | Start timer from 0.                             |
| `stop()`    | Stop timer.                                     |
| `resume()`  | Resume timer from the last tick count.          |
| `reset()`   | Stop and reset timer.                           |
|  `get()`    | Get time information by `TimeInterface` object. |

Timer shall be bind with `@ViewChild()` in Angular App.

## Contribution

We welcome any or all kinds of contributions! 
Please submit [pull requests](https://github.com/clemdesign/angular-cd-timer/pulls or 
[create issues](https://github.com/clemdesign/angular-cd-timer/issues) to contribute to this project :)

## License

Under MIT
Copyright (c) 2018-2021 clemdesign
