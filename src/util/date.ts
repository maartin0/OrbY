import {getNumberString} from './number';

const nativeLimit: bigint = BigInt(new Date(10000, 0, 0).valueOf());
const nativeOffset: number = new Date(0, 0, 0).valueOf();
const nativeFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'full',
    timeStyle: 'long'
});

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

