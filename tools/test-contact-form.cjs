// Exercise delivery and validation without posting additional Discord messages.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
class Element {
    constructor() { this.listeners = {}; this.children = []; this.dataset = {}; this.style = {}; this.value = ''; this.hidden = true; this.disabled = false; this.classList = { contains: value => (this.className || '').split(' ').includes(value) }; }
    addEventListener(name, fn) { (this.listeners[name] ||= []).push(fn); }
    async emit(name) { for (const fn of this.listeners[name] || []) await fn({ preventDefault() {} }); }
    setAttribute(name, value) { this[name] = value; }
    removeAttribute(name) { delete this[name]; }
    replaceChildren(...children) { this.children = children; }
    append(...children) { this.children.push(...children); }
    focus() { this.focused = true; }
}
function setup(mode = 'success') {
    const elements = Object.fromEntries(['contactForm','attachments','attachment-previews','attachment-error','formStatus','device','customDevice','customDeviceGroup'].map(id => [id,new Element()]));
    const form = elements.contactForm, button = new Element();
    form.fields = { name: '<script>QA</script>', email: 'qa@example.com', subject: 'Bug Report', message: '*'.repeat(2000) };
    form.valid = true;
    form.reportValidity = () => form.valid;
    form.querySelector = () => button;
    form.reset = () => { form.resets = (form.resets || 0) + 1; form.emit('reset'); };
    let calls = [], resolvePending;
    class Data {
        constructor(source) { this.entries = source ? Object.entries(source.fields) : []; }
        get(key) { return this.entries.find(([name]) => name === key)?.[1]; }
        append(...value) { this.entries.push(value); }
    }
    const URLClass = class extends URL { static createObjectURL() { return 'blob:test'; } static revokeObjectURL() {} };
    vm.runInNewContext(fs.readFileSync('assets/js/contact-form.js','utf8'), {
        document: { currentScript: { dataset: { supportWebhook: 'https://example.com/test-webhook' } }, documentElement: { lang: 'en' }, getElementById: id => elements[id], createElement: () => new Element() },
        translations: { en: new Proxy({}, { get: (_, key) => key }) },
        URL: URLClass, FormData: Data, location: { hostname:'localhost' }, crypto: require('node:crypto').webcrypto, AbortController,
        setTimeout, clearTimeout, requestAnimationFrame: fn => fn(),
        createImageBitmap: async file => { if (file.bad) throw Error('decode'); return {width:100,height:100,close(){}}; },
        fetch: async (url, options) => {
            calls.push({url,body:options.body});
            if (mode === 'network') throw Error('network');
            if (mode === 'pending') await new Promise(resolve => { resolvePending=resolve; });
            return {ok:mode !== 'rate',status:mode === 'rate' ? 429 : 200,json:async()=>({id:'test-receipt'})};
        }
    });
    return { elements, form, button, calls, finish:()=>resolvePending(), upload:async files=>{elements.attachments.files=files;await elements.attachments.emit('change');} };
}
(async () => {
    const file = {name:'safe.png',type:'image/png',size:100};
    for (const invalid of [[{...file,type:'image/svg+xml'}],[{...file,size:6*1024*1024}],[file,file,file,file],[{...file,size:3*1024*1024},{...file,size:3*1024*1024},{...file,size:3*1024*1024}],[{...file,bad:true}]]) {
        const test=setup();await test.upload(invalid);assert.equal(test.elements['attachment-error'].hidden,false);assert.equal(test.elements['attachment-previews'].children.length,0);
    }
    console.log('PASS: rejects unsupported, oversized, excessive, total-size, and corrupt images');
    for (const count of [0,1,3]) {
        const test=setup();if(count)await test.upload(Array(count).fill(file));await test.form.emit('submit');
        const payload=JSON.parse(test.calls[0].body.get('payload_json'));
        assert.equal(payload.attachments.length,count);assert.equal(payload.embeds.length,Math.max(1,count));assert.equal(payload.embeds[0].description.length,4000);
        assert.deepEqual(payload.allowed_mentions.parse,[]);assert.equal(test.form.resets,1);assert.equal(test.elements['attachment-previews'].children.length,0);assert.equal(test.button.disabled,false);
    }
    console.log('PASS: text-only, one-image, three-image, full-length escaped message, safe mentions, reset');
    for(const mode of ['rate','network']) {
        const test=setup(mode);await test.upload([file]);await test.form.emit('submit');assert.equal(test.form.resets,undefined);assert.equal(test.elements['attachment-previews'].children.length,1);assert.equal(test.button.disabled,false);assert.equal(test.elements.formStatus.className,'form-status error');assert.equal(test.elements.formStatus.children.at(-1).href.startsWith('mailto:team@nuviomm.com'),true);
    }
    console.log('PASS: rate-limit and network failures preserve inputs/images and provide email fallback');
    const test=setup('pending');await test.upload([file]);const pending=test.form.emit('submit');await test.form.emit('submit');assert.equal(test.calls.length,1);test.finish();await pending;
    const invalid=setup();invalid.form.valid=false;await invalid.form.emit('submit');assert.equal(invalid.calls.length,0);
    const other=setup();other.elements.device.value='Other';await other.elements.device.emit('change');assert.equal(other.elements.customDevice.required,true);other.elements.device.value='iPhone';await other.elements.device.emit('change');assert.equal(other.elements.customDevice.required,false);
    console.log('PASS: duplicate-submit guard, required-field validation, Other-device changes');
})().catch(error=>{console.error(error);process.exitCode=1;});
