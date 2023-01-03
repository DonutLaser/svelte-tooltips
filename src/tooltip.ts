let activeTooltip: HTMLElement;

function onMouseEnter(event: MouseEvent, node: HTMLElement, message: string): void {
    if (!(event.target as HTMLElement).isEqualNode(node)) {
        return;
    }

    if (!message) {
        return;
    }

    const top = node.offsetTop + node.offsetHeight + 5;
    const left = node.offsetLeft;

    const div = document.createElement('div');
    div.style.width = 'fit-content';
    div.style.height = 'fit-content';
    div.style.position = 'absolute';
    div.style.top = `${top}px`;
    div.style.left = `${left}px`;
    div.style.padding = '0.5rem';
    div.style.backgroundColor = '#eee';
    div.style.boxShadow = '0px 0px 7px 3px rgba(0, 0, 0, 0.2)';
    div.style.border = '1px solid black';
    div.style.borderRadius = '0.1rem';
    div.innerText = message;

    document.body.appendChild(div);

    activeTooltip = div;
}

function onMouseLeave(event: MouseEvent, node): void {
    if (!(event.target as HTMLElement).isEqualNode(node)) {
        return;
    }

    if (!activeTooltip) {
        return;
    }

    document.body.removeChild(activeTooltip);
    activeTooltip = null;
}

export function tooltip(node: HTMLElement, message): { destroy: () => void } {

    const handleMouseEnter = (event: MouseEvent) => { onMouseEnter(event, node, message); }
    const handleMouseLeave = (event: MouseEvent) => { onMouseLeave(event, node); }

    node.addEventListener('mouseenter', handleMouseEnter, true);
    node.addEventListener('mouseleave', handleMouseLeave, true);

    return {
        destroy() {
            node.removeEventListener('mouseenter', handleMouseEnter, true);
            node.removeEventListener('mouseleave', handleMouseLeave, true);
        }
    };
}