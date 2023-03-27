import {getNumberString} from './number';

/** Milliseconds since the year 0 */
export type EarthSec = bigint;

const nativeLimit: bigint = BigInt(new Date(10000, 0, 0).valueOf());
const nativeOffset: number = new Date(0, 0, 0).valueOf();
const nativeFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'full',
    timeStyle: 'long'
});

function getDateStringNative(time: EarthSec): string {
    return nativeFormatter.format(Number(time) + nativeOffset);
}

// Number of milliseconds in a year
export const yearMs: bigint = BigInt(365 * 24 * 60 * 60 * 1000);

const nativeTimeFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(undefined, { timeStyle: 'long' });
const nativePartialFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'full' });
function getDateStringFuture(time: EarthSec): string {
    const yearCount: bigint = time / yearMs;
    const yearString: string = getNumberString(yearCount);
    const dateOffset: Date = new Date(Number(time - (yearCount * yearMs)));
    const replaceYear: string = dateOffset.getFullYear().toString(10);
    const timeString: string = nativeTimeFormatter.format(dateOffset);
    const partialString: string = nativePartialFormatter.format(dateOffset).replace(` ${replaceYear}`, '');
    return `${partialString}, ${timeString}, year ${yearString}`;
}

export function getDateString(time: EarthSec): string {
    return time < nativeLimit
        ? getDateStringNative(time)
        : getDateStringFuture(time);
}

