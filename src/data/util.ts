/** * Time since the year 0 */
export type EarthTime = BigInteger;
const multiplier: number = 365 * 24 * 60 * 60 * 1000;

export function getDate(time: EarthTime): Date {
    return new Date(time. * multiplier);
}

export function getFormattedTime(time: EarthTime): string {

}
