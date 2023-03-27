import { moveFocus } from '../overlay/Controller';

document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight'
        || event.key === 'ArrowDown') moveFocus(-1);
    else if (event.key === 'ArrowLeft'
            || event.key === 'ArrowUp') moveFocus(1);
})
