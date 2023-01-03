let activeTooltip: HTMLElement;
let delayTimeout: number;

type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

interface TooltipOptions {
    message: string;
    tooltipClass?: string;
    placement?: TooltipPlacement;
    offset?: number;
    delay?: number;
    openNextToMouseCursor?: boolean;
}

function createTooltip(node: HTMLElement, options: TooltipOptions, mouseX: number, mouseY: number): HTMLElement {
    let placement: Record<string, string>;

    if (options.openNextToMouseCursor) {
        placement = { left: `${mouseX + 14}px`, top: `${mouseY + 12}px` };
    } else {
        placement = calculatePlacement(node, options.placement || 'bottom', options.offset || 0);
    }

    const div = document.createElement('div');
    div.style.width = 'fit-content';
    div.style.height = 'fit-content';
    div.style.position = 'absolute';
    for (const key in placement) {
        div.style[key] = placement[key];
    }

    if (options.tooltipClass) {
        div.classList.add(options.tooltipClass);
    } else {
        div.style.padding = '0.5rem';
        div.style.backgroundColor = '#eee';
        div.style.boxShadow = '0px 0px 7px 3px rgba(0, 0, 0, 0.2)';
        div.style.border = '1px solid black';
        div.style.borderRadius = '0.1rem';
    }

    div.innerText = options.message;

    document.body.appendChild(div);

    return div;
}

function calculatePlacement(node: HTMLElement, placement: TooltipPlacement, offset: number): {} {
    switch (placement) {
        case 'top':
            return { left: `${node.offsetLeft}px`, bottom: `${window.innerHeight - node.offsetTop + offset}px` };
        case 'right':
            return { left: `${node.offsetLeft + node.offsetWidth + offset}px`, top: `${node.offsetTop}px` };
        case 'bottom':
            return { left: `${node.offsetLeft}px`, top: `${node.offsetTop + node.offsetHeight + offset}px` }
        case 'left':
            return { right: `${window.innerWidth - node.offsetLeft + offset}px`, top: `${node.offsetTop}px` };
        default:
            throw new Error('Unsupported placement ' + placement);
    }
}

function onMouseEnter(event: MouseEvent, node: HTMLElement, options: TooltipOptions): void {
    if (!(event.target as HTMLElement).isEqualNode(node)) {
        return;
    }

    if (!options.message) {
        return;
    }


    if (options.delay && options.delay > 0) {
        delayTimeout = setTimeout(() => {
            activeTooltip = createTooltip(node, options, event.pageX, event.pageY);
        }, options.delay);
    } else {
        activeTooltip = createTooltip(node, options, event.pageX, event.pageY);
    }
}

function onMouseLeave(event: MouseEvent, node: HTMLElement): void {
    if (!(event.target as HTMLElement).isEqualNode(node)) {
        return;
    }

    clearTimeout(delayTimeout);
    if (!activeTooltip) {
        return;
    }

    document.body.removeChild(activeTooltip);
    activeTooltip = null;
}

export function tooltip(node: HTMLElement, options: TooltipOptions): { destroy: () => void } {

    const handleMouseEnter = (event: MouseEvent) => { onMouseEnter(event, node, options); }
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