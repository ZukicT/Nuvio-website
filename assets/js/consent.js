/* Basic consent: optional Google resources are never requested before an explicit opt-in. */
(() => {
    'use strict';
    const KEY = 'nuvio_consent_v1';
    const DAYS = 180;
    const GA = 'G-PXFM9GSJ71';
    const production = location.hostname === 'nuviomm.com' || location.hostname === 'www.nuviomm.com';
    let saved = read();
    let loaded = false;
    let panel, banner, launcher, analytics, preferences, previousFocus;
    const signal = () => navigator.globalPrivacyControl === true || navigator.doNotTrack === '1' || window.doNotTrack === '1';
    function read() {
        try {
            const value = JSON.parse(localStorage.getItem(KEY));
            if (value?.version === 1 && typeof value.analytics === 'boolean' && typeof value.preferences === 'boolean' && Number.isFinite(value.updated) && value.updated <= Date.now() && Date.now() - value.updated < DAYS * 86400000) return value;
        } catch { /* The page works without persistent browser storage. */ }
        return null;
    }
    const allowed = category => Boolean(saved?.[category]) && (category !== 'analytics' || !signal());
    function clearAnalyticsCookies() {
        const names = document.cookie.split(';').map(cookie => cookie.trim().split('=')[0]).filter(name => /^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name));
        const host = location.hostname;
        const domains = ['', host, '.' + host];
        const labels = host.split('.');
        for (let i = 1; i < labels.length - 1; i++) domains.push('.' + labels.slice(i).join('.'));
        names.forEach(name => domains.forEach(domain => {
            document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax' + (domain ? '; Domain=' + domain : '') + (location.protocol === 'https:' ? '; Secure' : '');
        }));
    }
    function apply() {
        const enabled = allowed('analytics');
        window['ga-disable-' + GA] = !enabled;
        if (!allowed('preferences')) {
            try { localStorage.removeItem('nuvio_language_v2'); localStorage.removeItem('nuvio_language'); } catch {}
        }
        if (!enabled) clearAnalyticsCookies();
        if (enabled && production && !loaded) {
            loaded = true;
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () { window.dataLayer.push(arguments); };
            window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
            window.gtag('js', new Date());
            window.gtag('config', GA, { allow_google_signals: false, allow_ad_personalization_signals: false, cookie_expires: DAYS * 86400 });
            const script = document.createElement('script');
            script.id = 'nuvio-analytics'; script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA;
            document.head.append(script);
        }
    }
    function save(values) {
        const reload = loaded && !(values.analytics && !signal());
        saved = { version: 1, preferences: Boolean(values.preferences), analytics: Boolean(values.analytics) && !signal(), updated: Date.now() };
        try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch {}
        apply();
        window.dispatchEvent(new CustomEvent('nuvio:consentchange'));
        if (banner) banner.hidden = true;
        if (panel?.open) panel.close();
        if (launcher) launcher.hidden = false;
        // Remove already-loaded analytics listeners after withdrawing consent.
        if (reload) location.reload();
    }
    function translate(key) { return window.NuvioI18n?.t(key) || key; }
    function open() {
        if (!panel) return;
        previousFocus = document.activeElement;
        analytics.checked = allowed('analytics'); analytics.disabled = signal();
        preferences.checked = allowed('preferences');
        document.getElementById('privacy-signal-note').hidden = !signal();
        panel.showModal();
        panel.querySelector('[data-consent-close]').focus();
    }
    function init() {
        const root = document.createElement('div');
        root.id = 'nuvio-privacy';
        // This fixed markup contains no user-supplied content.
        root.innerHTML = `<section class="consent-banner" aria-labelledby="consent-title" hidden>
          <div><h2 id="consent-title" data-i18n="cookie_title">Your privacy, your choice.</h2><p data-i18n="cookie_intro">We use essential browser storage to remember your privacy choices. Optional analytics helps us understand visits and downloads. You decide what to allow.</p><a href="cookies.html" data-i18n="cookie_policy">Cookie Policy</a></div>
          <div class="consent-actions"><button type="button" data-consent-reject data-i18n="cookie_reject">Reject optional</button><button type="button" data-consent-open data-i18n="cookie_customize">Customize</button><button type="button" data-consent-accept data-i18n="cookie_accept">Accept optional</button></div>
        </section>
        <button type="button" class="privacy-launcher" data-consent-open data-i18n-aria="cookie_choices" aria-label="Privacy choices"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.2A9 9 0 1 1 11.8 3a4 4 0 0 0 5.1 5.1A4 4 0 0 0 21 12.2Z"/><circle cx="8" cy="9" r="1" fill="currentColor" stroke="none"/><circle cx="8" cy="15" r="1" fill="currentColor" stroke="none"/><circle cx="13" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="16" r="1" fill="currentColor" stroke="none"/></svg></button>
        <dialog class="consent-dialog" aria-labelledby="privacy-title"><div class="consent-dialog-header"><h2 id="privacy-title" data-i18n="cookie_settings">Cookie & tracking choices</h2><button type="button" data-consent-close aria-label="Close privacy settings" data-i18n-aria="cookie_close">×</button></div>
          <p data-i18n="cookie_settings_intro">Optional features stay off until you choose them. You can change your choices at any time.</p>
          <label class="consent-category"><span><strong data-i18n="cookie_essential">Essential storage</strong><small data-i18n="cookie_essential_body">Remembers your privacy choices. Always on; no analytics.</small></span><input type="checkbox" checked disabled><span class="consent-switch" aria-hidden="true"></span></label>
          <label class="consent-category"><span><strong data-i18n="cookie_preferences">Remember my language</strong><small data-i18n="cookie_preferences_body">Saves your chosen language on this browser. With this off, a language change lasts for this page only.</small></span><input type="checkbox" id="consent-preferences"><span class="consent-switch" aria-hidden="true"></span></label>
          <label class="consent-category"><span><strong data-i18n="cookie_analytics">Website analytics</strong><small data-i18n="cookie_analytics_body">Allows Google Analytics to measure page visits and download clicks. Website ad tracking is not enabled.</small></span><input type="checkbox" id="consent-analytics"><span class="consent-switch" aria-hidden="true"></span></label>
          <p id="privacy-signal-note" data-i18n="cookie_signal" hidden>Your browser privacy signal keeps analytics off.</p>
          <p class="consent-policy-links"><a href="cookies.html" data-i18n="cookie_policy">Cookie Policy</a><a href="privacy.html" data-i18n="nav_privacy">Privacy Policy</a></p>
          <div class="consent-actions"><button type="button" data-consent-reject data-i18n="cookie_reject">Reject optional</button><button type="button" data-consent-save data-i18n="cookie_save">Save choices</button></div>
        </dialog>`;
        document.body.append(root);
        banner = root.querySelector('.consent-banner'); panel = root.querySelector('dialog'); launcher = root.querySelector('.privacy-launcher');
        analytics = document.getElementById('consent-analytics'); preferences = document.getElementById('consent-preferences');
        root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = translate(el.dataset.i18n); });
        panel.querySelector('[data-consent-close]').setAttribute('aria-label', translate('cookie_close'));
        launcher.setAttribute('aria-label', translate('cookie_choices'));
        document.addEventListener('click', event => {
            if (event.target.closest('[data-consent-open]')) open();
            else if (event.target.closest('[data-consent-reject]')) save({ preferences: false, analytics: false });
            else if (event.target.closest('[data-consent-accept]')) save({ preferences: true, analytics: true });
            else if (event.target.closest('[data-consent-save]')) save({ preferences: preferences.checked, analytics: analytics.checked });
            else if (event.target.closest('[data-consent-close]')) panel.close();
        });
        panel.addEventListener('close', () => { if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true }); });
        banner.hidden = Boolean(saved); launcher.hidden = false;
        window.addEventListener('storage', event => { if (event.key === KEY) { const wasLoaded = loaded; saved = read(); apply(); window.dispatchEvent(new CustomEvent('nuvio:consentchange')); banner.hidden = Boolean(saved); launcher.hidden = false; if (wasLoaded && !allowed('analytics')) location.reload(); } });
    }
    window.NuvioConsent = { allows: allowed, open, setPreferences: save, getPreferences: () => ({ essential: true, preferences: allowed('preferences'), analytics: allowed('analytics') }) };
    apply();
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
