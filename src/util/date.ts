import { getNumberString, l1 } from './number';

const nativeLimit: bigint = BigInt(new Date(10000, 0, 0).valueOf());
const nativeOffset: number = -new Date(0, 0, 0).valueOf();
const nativeFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'full',
    timeStyle: 'long'
});

export const now: () => bigint = () => BigInt(Date.now() - nativeOffset);
export const programStart: bigint = now();

function getDateStringNative(time: bigint): string {
    return nativeFormatter.format(Number(time) + nativeOffset);
}

// Number of milliseconds in a year
export const yearMs: bigint = BigInt(365 * 24 * 60 * 60 * 1000);

const nativeTimeFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(undefined, { timeStyle: 'long' });
const nativePartialFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'full' });
function getDateStringFuture(ms: bigint): string {
    const yearCount: bigint = ms / yearMs;
    const yearString: string = getNumberString(yearCount);
    const dateOffset: Date = new Date(Number(ms - (yearCount * yearMs)));
    const replaceYear: string = dateOffset.getFullYear().toString(10);
    const timeString: string = nativeTimeFormatter.format(dateOffset);
    const partialString: string = nativePartialFormatter.format(dateOffset).replace(` ${replaceYear}`, '');
    return `${partialString}, ${timeString}, year ${yearString}`;
}

export function getDateString(ms: bigint): string {
    return ms < nativeLimit
        ? getDateStringNative(ms)
        : getDateStringFuture(ms);
}

const unit: {[name: string]: number} = {
    year: 365 * 24 * 60 * 60,
    month: 30 * 24 * 60 * 60,
    week: 7 * 24 * 60 * 60,
    day: 24 * 60 * 60,
    hour: 60 * 60,
    minute: 60,
    second: 1,
}

export function getSpeedString(speed: bigint): string {
    const calc = (unit: number, name: string): string => {
        const result: bigint = speed / BigInt(unit);
        return `${getNumberString(result)} ${name}${result === l1 ? '' : 's'}`
    }
    return `${
        speed < l1
        ? 'NaN'
        : speed == l1
        ? '1 second'
        : (speed > unit.year)
        ? calc(unit.year, 'year')
        : (speed > unit.month)
        ? calc(unit.month, 'month')
        : (speed > unit.hour)
        ? calc(unit.hour, 'hour')
        : (speed > unit.minute) 
        ? calc(unit.minute, 'minute')
        : (speed > unit.second) 
        ? calc(unit.second, 'second')
        : speed == l1
        ? '1 second'
        : 'NaN'
    } per second`;
}
