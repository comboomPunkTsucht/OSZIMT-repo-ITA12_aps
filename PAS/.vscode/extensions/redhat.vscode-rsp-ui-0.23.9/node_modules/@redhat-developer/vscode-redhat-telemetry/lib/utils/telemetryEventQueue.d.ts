import { TelemetryEvent } from '../interfaces/telemetry';
export declare const MAX_QUEUE_SIZE = 35;
export declare class TelemetryEventQueue {
    events: TelemetryEvent[] | undefined;
    constructor();
    addEvent(e: TelemetryEvent): void;
    emptyQueue(): void;
}
//# sourceMappingURL=telemetryEventQueue.d.ts.map