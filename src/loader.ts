export function remove(): void {
    const loader: HTMLDivElement = document.getElementById('loader') as HTMLDivElement;
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 500);
}
