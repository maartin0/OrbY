import Body from './body';

function moveFocus(n: number): void {
    let i: number = 0;
    for (let body of Body.bodies) {
        if (body.focused) break;
        i++;
    }
    const length: number = Body.bodies.length;
    Body.bodies[((i + n) % length + length) % length].focus();
}

document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight'
        || event.key === 'ArrowDown') moveFocus(-1);
    else if (event.key === 'ArrowLeft'
            || event.key === 'ArrowUp') moveFocus(1);
})
