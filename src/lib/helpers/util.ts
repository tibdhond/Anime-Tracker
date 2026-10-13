export function truncate(str: string, n: number): string {
    if (str.length <= n) { return str; }
    const subString1 = str.slice(0, n / 2);
    const subString2 = str.slice(str.length - n / 2, str.length);
    return subString1.slice(0, subString1.lastIndexOf(' ')) + ' ... ' + subString2.slice(subString2.indexOf(' '));
}

export function millisecondsToHumanReadable(mil: number): {days: number, hours: number, minutes: number} {
    const days = Math.floor(mil / 86400); // 60*60*24
    mil -= days * 86400;
    const hours = Math.floor(mil / 3600); // 60 * 60
    mil -= hours * 3600;
    const minutes = Math.floor(mil / 60);

    return { days, hours, minutes };
}