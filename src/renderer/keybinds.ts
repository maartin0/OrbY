import { moveFocus } from '../overlay/Controller';

document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') moveFocus(-1);
    else if (event.key === 'ArrowLeft') moveFocus(1);
})
