// From: https://simple.wikipedia.org/wiki/Names_of_large_numbers
const names: string[] = ['hundred','thousand','million','billion','trillion','quadrillion','quintillion','sextillion','septillion','octillion','nonillion','decillion','undecillion','duodecillion','tredecillion','quattuordecillion','quindecillion','sexdecillion','octodecillion','novemdecillion','vigintillion','unvigintillion','quovigintillion','trevigintillion','quattuorvigintillion','quinvigintillion','sexvigintillion','septenvigintillion','octovigintillion','novemvigintillion','trigintillion','untrigintillion','duotrigintillion','googol','tretrigintillion','quarttourtrigintillion','quintrigintillion','sextrigintillion','septemtrigintillion','octotrigintillion','novemtrigintillion','quardragintillion','unquardragintillion','centillion'];
const values: number[] = [2,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,57,60,63,66,69,72,75,78,81,84,87,90,93,96,99,100,102,105,108,111,114,117,120,123,126,303];

// Literal bigint values for backward compatibility
export const l0: bigint = BigInt(0);
export const l1: bigint = BigInt(1);
export const l10: bigint = BigInt(10);

const numberFormat: Intl.NumberFormat = new Intl.NumberFormat(undefined, { useGrouping: false });

export function pow(base: bigint, pow: bigint): bigint {
    let result: bigint = l1;
    while ((pow -= l1) > l0) result *= base;
    return result;
}

export function countDigits(n: bigint): number {
    let i: number = 1;
    while ((n /= l10) >= l1) i++;
    return i;
}

export function getNumberString(n: bigint): string {
    const digitCount: number = countDigits(n);
    let name: string;
    let nameDigits: number;
    for (let i: number = values.length - 1; i >= 0; i--) {
        const n: number = values[i];
        if (n < digitCount) {
            name = names[i];
            nameDigits = n;
            break;
        }
    }
    const nReduced: number = Number(n); // Higher precision not required
    return name
        ? `${numberFormat.format(nReduced)
            .slice(0, digitCount - nameDigits)} ${name}`
        : Number(nReduced).toString(10);
}
