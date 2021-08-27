export class CounterService {
    private toActiveCnt = 0;
    private toInactiveCnt = 0;

    increaseToActiveCnt() {
        console.log(++this.toActiveCnt);
    }

    increaseToInactiveCnt() {
        console.log(++this.toInactiveCnt);
    }
}