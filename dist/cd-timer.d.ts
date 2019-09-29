import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
export interface TimeInterface {
    tick_count: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    timer: any;
}
export declare class CdTimerComponent implements AfterViewInit, OnDestroy {
    private elt;
    private renderer;
    private timeoutId;
    private tickCounter;
    private ngContentSchema;
    private seconds;
    private minutes;
    private hours;
    private days;
    startTime: number;
    endTime: number;
    countdown: boolean;
    autoStart: boolean;
    maxTimeUnit: string;
    format: string;
    onStart: EventEmitter<CdTimerComponent>;
    onStop: EventEmitter<CdTimerComponent>;
    onTick: EventEmitter<TimeInterface>;
    onComplete: EventEmitter<CdTimerComponent>;
    constructor(elt: ElementRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Start the timer
     */
    start(): void;
    /**
     * Resume the timer
     */
    resume(): void;
    /**
     * Stop the timer
     */
    stop(): void;
    /**
     * Reset the timer
     */
    reset(): void;
    /**
     * Get the time information
     * @returns TimeInterface
     */
    get(): {
        seconds: number;
        minutes: number;
        hours: number;
        days: number;
        timer: any;
        tick_count: number;
    };
    private initVar;
    private resetTimeout;
    private renderText;
    private clear;
    protected calculateTimeUnits(): void;
    protected startTickCount(): void;
}
