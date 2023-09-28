export function setTextContent(parent, selector, text) {
    if (!parent) return;

    const element = parent.querySelector(selector);
    if (element) element.textContent = text;
}

export function truncate(text, maxLength) {
    if (text.length <= maxLength) return text;

    return `${text.slice(0, maxLength - 1)}…`;
}

export function setFiledValue(form, selector, value) {
    if (!form) return;

    const field = form.querySelector(selector);
    if (field) field.value = value ? value : '';
}

export function setBackgroundImage(parent, selector, imageUrl) {
    if (!parent) return;

    const element = parent.querySelector(selector);
    if (element) element.style.backgroundImage = `url("${imageUrl}")`;
}