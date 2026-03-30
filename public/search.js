const kickHostRegex = /(^|\.)kick\.com$/i,
    vodIdRegex = /^([\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12}|\d+)$/i,
    clipIdRegex = /^clip_[\w-]+$/i;

function resolvePathFromInput(input) {
    const trimmed = input.trim();

    if (trimmed.length < 1) return null;

    // normalize full urls (instance urls and kick urls)
    if (/^https?:\/\//i.test(trimmed) || trimmed.includes('.')) {
        try {
            const formatted = /^https?:\/\//i.test(trimmed)
                ? trimmed
                : `https://${trimmed}`;
            const parsed = new URL(formatted);

            if (!kickHostRegex.test(parsed.hostname)) return null;

            const normalizedPath = parsed.pathname.replace(/\/+$/, '');
            const queryClip = parsed.searchParams.get('clip');

            if (queryClip && clipIdRegex.test(queryClip)) {
                const clipQueryChannel = normalizedPath
                    .replace(/^\/+/, '')
                    .split('/')[0];
                if (clipQueryChannel) {
                    return `/${clipQueryChannel}/clips/${queryClip}`;
                }
            }

            const vodMatch = normalizedPath.match(
                /^\/(?:video|videos|[^/]+\/videos)\/([\w-]+)$/i
            );
            if (vodMatch) return `/videos/${vodMatch[1]}`;

            const clipMatch = normalizedPath.match(
                /^\/([^/]+)\/clips\/(clip_[\w-]+)$/i
            );
            if (clipMatch) return `/${clipMatch[1]}/clips/${clipMatch[2]}`;

            const streamerMatch = normalizedPath.match(/^\/([^/]+)$/);
            if (streamerMatch) return `/${streamerMatch[1]}`;
        } catch (err) {
            console.warn('[Search] Unable to parse URL input:', err);
        }
    }

    if (vodIdRegex.test(trimmed)) {
        return `/videos/${trimmed}`;
    }

    if (clipIdRegex.test(trimmed)) return null;

    return `/${trimmed.replace(/^\/+/, '')}`;
}

function _search() {
    const input = document.getElementById('media-txt').value;
    if (input.length == 0) return;

    const resSelect = document.getElementById('media-res'),
        resVal = resSelect.options[resSelect.selectedIndex].text,
        useProxy = document.getElementById('proxy').checked,
        queryParams = new URLSearchParams();

    if (resVal !== 'Resolution') {
        queryParams.set('quality', resVal);
    }

    if (useProxy) {
        queryParams.set('proxy', 'true');
    }

    const targetPath = resolvePathFromInput(input);

    if (!targetPath) return;

    const queryString = queryParams.toString();
    window.location.href = `${targetPath}${queryString.length > 0 ? `?${queryString}` : ''}`;
}
