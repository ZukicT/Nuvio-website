/* Contact delivery uses the existing support webhook configured on this script tag. */
(() => {
    const endpoint = document.currentScript.dataset.supportWebhook;
    const form = document.getElementById('contactForm');
    if (!form) return;
    const input = document.getElementById('attachments');
    const previews = document.getElementById('attachment-previews');
    const error = document.getElementById('attachment-error');
    const status = document.getElementById('formStatus');
    const button = form.querySelector('[type="submit"]');
    const device = document.getElementById('device');
    const custom = document.getElementById('customDevice');
    let images = [];
    let sending = false;
    const text = key => translations[document.documentElement.lang === 'zh-Hans' ? 'zh-CN' : document.documentElement.lang === 'zh-Hant' ? 'zh-TW' : document.documentElement.lang]?.[key] || translations.en[key];
    const escapeMarkdown = value => value.replace(/([\\`*_{}\[\]()#+\-.!|>~])/g, '\\$1');
    const setError = message => { error.textContent = message; error.hidden = !message; input.setAttribute('aria-invalid', String(Boolean(message))); };
    const clearImages = () => { images.forEach(image => URL.revokeObjectURL(image.url)); images = []; input.value = ''; renderImages(); setError(''); };
    function renderImages() {
        previews.replaceChildren();
        images.forEach((image, index) => {
            const item = document.createElement('li');
            const preview = document.createElement('img');
            preview.src = image.url;
            preview.alt = '';
            const label = document.createElement('span');
            label.textContent = image.file.name;
            const remove = document.createElement('button');
            remove.type = 'button';
            remove.textContent = '×';
            remove.setAttribute('aria-label', text('attachment_remove') + ': ' + image.file.name);
            remove.disabled = sending;
            remove.addEventListener('click', () => {
                URL.revokeObjectURL(images[index].url);
                images.splice(index, 1);
                renderImages();
                setError('');
                input.focus();
            });
            item.append(preview, label, remove);
            previews.append(item);
        });
    }
    input.addEventListener('change', async () => {
        const selected = Array.from(input.files);
        input.value = '';
        if (!selected.length) return;
        const supported = new Set(['image/png', 'image/jpeg', 'image/webp']);
        if (images.length + selected.length > 3 || selected.some(file => !supported.has(file.type) || file.size > 5 * 1024 * 1024 || !file.size) || [...images.map(image => image.file), ...selected].reduce((sum, file) => sum + file.size, 0) > 8 * 1024 * 1024) {
            setError(text('attachment_invalid')); return;
        }
        input.disabled = true;
        const pending = [];
        try {
            // Decode before accepting an image, rather than trusting its extension alone.
            for (const file of selected) {
                const bitmap = await createImageBitmap(file);
                const pixels = bitmap.width * bitmap.height;
                bitmap.close();
                if (pixels > 40000000) throw new Error('Image dimensions exceed limit');
                pending.push({ file, url: URL.createObjectURL(file) });
            }
            images.push(...pending);
            setError(''); renderImages();
        } catch {
            pending.forEach(image => URL.revokeObjectURL(image.url));
            setError(text('attachment_invalid'));
        } finally { input.disabled = sending; }
    });
    const updateDevice = () => {
        const other = device.value === 'Other';
        document.getElementById('customDeviceGroup').style.display = other ? 'block' : 'none';
        custom.required = other;
        if (!other) custom.value = '';
    };
    device.addEventListener('change', updateDevice);
    const clearPreviousSuccess = () => { if (!sending && status.classList.contains('success')) status.style.display = 'none'; };
    form.addEventListener('input', clearPreviousSuccess);
    form.addEventListener('change', clearPreviousSuccess);
    form.addEventListener('reset', () => { clearImages(); requestAnimationFrame(updateDevice); });
    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (sending || input.disabled || !form.reportValidity()) return;
        const fields = new FormData(form);
        const data = Object.fromEntries(['name', 'email', 'subject', 'message'].map(key => [key, String(fields.get(key) || '').trim()]));
        if (!data.name || !data.message) { showStatus('error', text('support_empty')); return; }
        data.device = device.value === 'Other' ? custom.value.trim() : device.value || 'Not specified';
        if (device.value === 'Other' && !data.device) { custom.focus(); return; }
        const reference = 'NV-' + crypto.randomUUID().slice(0, 8).toUpperCase();
        const colors = { 'Bug Report': 0xFF4B4B, 'Feature Request': 0x58CC02, 'Business Inquiry': 0xFF9600 };
        const files = images.map((image, index) => ({ file: image.file, name: 'screenshot-' + (index + 1) + '.' + ({'image/png':'png','image/jpeg':'jpg','image/webp':'webp'}[image.file.type]) }));
        const payload = {
            username: 'Nuvio Support',
            allowed_mentions: { parse: [] },
            embeds: [{
                author: { name: 'Nuvio · Website support' },
                title: data.subject,
                description: escapeMarkdown(data.message),
                color: colors[data.subject] || 0x1C7BFF,
                fields: [
                    { name: 'From', value: escapeMarkdown(data.name), inline: true },
                    { name: 'Reply to', value: escapeMarkdown(data.email), inline: true },
                    { name: 'Device', value: escapeMarkdown(data.device), inline: true },
                    { name: 'Language', value: document.documentElement.lang, inline: true },
                    { name: 'Images', value: String(files.length), inline: true }
                ],
                footer: { text: reference + ' · ' + (location.hostname === 'localhost' ? 'Local website test' : 'nuviomm.com') },
                timestamp: new Date().toISOString(),
                ...(files.length ? { image: { url: 'attachment://' + files[0].name } } : {})
            }],
            attachments: files.map((image, id) => ({ id, filename: image.name, description: 'Support screenshot ' + (id + 1) }))
        };
        // Each additional image receives a full-size preview in the same support message.
        files.slice(1).forEach(image => payload.embeds.push({ color: colors[data.subject] || 0x1C7BFF, image: { url: 'attachment://' + image.name } }));
        sending = true; button.disabled = true; input.disabled = true; renderImages();
        form.setAttribute('aria-busy', 'true');
        showStatus('pending', text('support_sending'));
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 30000);
        try {
            const url = new URL(endpoint); url.searchParams.set('wait', 'true');
            const body = new FormData();
            body.append('payload_json', JSON.stringify(payload));
            files.forEach((image, index) => body.append('files[' + index + ']', image.file, image.name));
            const response = await fetch(url, { method: 'POST', body, signal: controller.signal });
            if (!response.ok) throw new Error(response.status === 429 ? 'rate-limit' : 'delivery-failed');
            const receipt = await response.json();
            if (!receipt.id) throw new Error('delivery-unconfirmed');
            form.reset();
            showStatus('success', text('support_success') + ' ' + reference);
        } catch (failure) {
            showStatus('error', text(failure.message === 'rate-limit' ? 'support_rate_limit' : 'support_failure'));
            const link = document.createElement('a');
            const draft = new URL('mailto:team@nuviomm.com');
            draft.searchParams.set('subject', 'Nuvio Support: ' + data.subject);
            draft.searchParams.set('body', 'Name: ' + data.name + '\nDevice: ' + data.device + '\nReference: ' + reference + '\n\n' + data.message);
            link.href = draft.href; link.textContent = text('support_email_fallback');
            status.append(document.createElement('br'), link);
        } finally {
            clearTimeout(timeout); sending = false; button.disabled = false; input.disabled = false;
            form.removeAttribute('aria-busy'); renderImages();
        }
    });
    function showStatus(type, message) {
        status.className = 'form-status ' + type;
        status.textContent = message;
        status.style.display = 'block';
    }
})();
