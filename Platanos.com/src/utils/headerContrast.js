const DARK_TEXT = "#1a1a1a";
const LIGHT_TEXT = "#ffffff";

function luminance(channels) {
    const linear = channels.map((channel) => {
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });

    return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

export function getContrastingTextColor(background) {
    const backgroundLuminance = luminance(background);
    const whiteContrast = 1.05 / (backgroundLuminance + 0.05);
    const darkContrast = (backgroundLuminance + 0.05) / (luminance([26, 26, 26]) + 0.05);

    return whiteContrast > darkContrast ? LIGHT_TEXT : DARK_TEXT;
}

// Read CSS surfaces, not text or image pixels. Composite translucent backgrounds
// so the light map card takes precedence over its darker surrounding panel.
export function getBackgroundBehindElement(element, header) {
    const { left, top, width, height } = element.getBoundingClientRect();
    const document = element.ownerDocument;
    const layers = document.elementsFromPoint(left + width / 2, top + height / 2);
    const background = [0, 0, 0];
    let opacity = 0;

    for (const layer of layers) {
        if (header.contains(layer)) continue;

        const color = document.defaultView.getComputedStyle(layer).backgroundColor;
        if (!/^rgba?\(/.test(color)) continue;

        const channels = color.match(/[\d.]+/g).map(Number);
        const weight = (channels[3] ?? 1) * (1 - opacity);
        background.forEach((_, index) => {
            background[index] += channels[index] * weight;
        });
        opacity += weight;
        if (opacity >= 0.999) break;
    }

    return background.map((channel) => channel + 255 * (1 - opacity));
}
