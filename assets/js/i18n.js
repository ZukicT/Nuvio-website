/** Localized copy with explicit language selection or automatic browser-language matching. */
(function () {
    'use strict';
    const STORAGE_KEY = 'nuvio_language';
    const supported = ['en', 'de-DE', 'es-ES', 'ja-JP', 'ko-KR', 'zh-CN', 'zh-TW'].filter(lang => languageNames[lang]);
    const automaticNames = { en: 'Automatic', 'zh-CN': '自动', 'zh-TW': '自動', 'de-DE': 'Automatisch', 'es-ES': 'Automático', 'ja-JP': '自動', 'ko-KR': '자동' };
    const codes = { en: 'EN', 'zh-CN': '简中', 'zh-TW': '繁中', 'de-DE': 'DE', 'es-ES': 'ES', 'ja-JP': '日本語', 'ko-KR': '한국어' };
    let preference = 'auto';
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'auto' || supported.includes(stored)) preference = stored;
    } catch { /* Browser preferences still work when storage is unavailable. */ }
    function matchLanguage(locale) {
        const value = locale.toLowerCase();
        if (value.startsWith('zh')) return /(?:tw|hk|mo|hant)/.test(value) ? 'zh-TW' : 'zh-CN';
        return supported.find(lang => lang.split('-')[0] === value.split('-')[0]);
    }
    function resolvedLanguage() {
        if (preference !== 'auto') return preference;
        for (const locale of navigator.languages || [navigator.language || 'en']) {
            const match = matchLanguage(locale);
            if (supported.includes(match)) return match;
        }
        return 'en';
    }
    function t(key, lang = resolvedLanguage()) {
        return translations[lang]?.[key] || translations.en[key] || key;
    }
    function closeDropdowns() {
        document.querySelectorAll('.lang-dropdown').forEach(dropdown => {
            dropdown.classList.remove('open');
            dropdown.querySelector('.lang-toggle')?.setAttribute('aria-expanded', 'false');
            const menu = dropdown.querySelector('.lang-menu');
            if (menu) menu.inert = true;
        });
    }
    function render() {
        const lang = resolvedLanguage();
        document.documentElement.lang = lang === 'zh-CN' ? 'zh-Hans' : lang === 'zh-TW' ? 'zh-Hant' : lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const value = t(el.dataset.i18n, lang);
            // Legal copy remains in its authored language when a translation is unavailable.
            if (lang !== 'en' && !translations[lang]?.[el.dataset.i18n]) el.setAttribute('lang', 'en');
            else el.removeAttribute('lang');
            if (el.matches('input, textarea')) {
                if (el.hasAttribute('placeholder')) el.placeholder = value;
            } else if (el.hasAttribute('data-i18n-html')) {
                // This HTML is authored locally in the bundled translation dictionaries.
                el.innerHTML = value;
            } else el.textContent = value;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder, lang); });
        document.querySelectorAll('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAria, lang)));
        document.querySelectorAll('[data-demo-money]').forEach(el => {
            el.textContent = new Intl.NumberFormat(lang, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(Number(el.dataset.demoMoney));
        });
        document.querySelectorAll('[data-app-screen]').forEach(img => {
            const prefix = lang === 'en' ? '' : lang + '/';
            const source = 'assets/images/app/' + prefix + img.dataset.appScreen + '.webp';
            if (img.getAttribute('src') !== source) img.setAttribute('src', source);
        });
        document.querySelectorAll('[data-footer-lang]').forEach(button => {
            const active = button.dataset.footerLang === preference;
            button.setAttribute('aria-pressed', String(active));
            if (button.dataset.footerLang === 'auto') button.textContent = automaticNames[lang];
        });
        document.querySelectorAll('.current-lang').forEach(el => {
            el.textContent = preference === 'auto' ? automaticNames[lang] : codes[lang];
        });
        document.querySelectorAll('.lang-menu').forEach(menu => {
            menu.replaceChildren();
            ['auto', ...supported].forEach(value => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'lang-option';
                button.dataset.lang = value;
                button.setAttribute('aria-pressed', String(value === preference));
                button.classList.toggle('active', value === preference);
                const label = document.createElement('span');
                label.textContent = value === 'auto' ? automaticNames[lang] : languageNames[value].name;
                button.append(label);
                if (value === preference) {
                    const check = document.createElement('span');
                    check.textContent = '✓'; check.setAttribute('aria-hidden', 'true'); button.append(check);
                }
                button.addEventListener('click', () => { setLanguage(value); closeDropdowns(); menu.closest('.lang-dropdown').querySelector('.lang-toggle').focus(); });
                menu.append(button);
            });
        });
    }
    function setLanguage(lang) {
        if (lang !== 'auto' && !supported.includes(lang)) return;
        preference = lang;
        try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* Keep the current selection in memory. */ }
        render();
    }
    function init() {
        render();
        document.querySelectorAll('.lang-dropdown').forEach(dropdown => {
            const toggle = dropdown.querySelector('.lang-toggle');
            const menu = dropdown.querySelector('.lang-menu');
            if (menu) menu.inert = !dropdown.classList.contains('open');
            toggle?.addEventListener('click', event => {
                event.stopPropagation();
                const open = !dropdown.classList.contains('open');
                closeDropdowns();
                dropdown.classList.toggle('open', open);
                if (menu) menu.inert = !open;
                toggle.setAttribute('aria-expanded', String(open));
            });
            toggle?.addEventListener('keydown', event => {
                if (event.key === 'ArrowDown') {
                    event.preventDefault(); closeDropdowns(); dropdown.classList.add('open');
                    toggle.setAttribute('aria-expanded', 'true'); if (menu) menu.inert = false; dropdown.querySelector('.lang-option')?.focus();
                }
            });
            dropdown.addEventListener('keydown', event => {
                if (event.key === 'Escape' && dropdown.classList.contains('open')) { event.stopPropagation(); closeDropdowns(); toggle.focus(); }
            });
        });
        document.querySelectorAll('[data-footer-lang]').forEach(button => {
            button.addEventListener('click', () => setLanguage(button.dataset.footerLang));
        });
        document.addEventListener('click', closeDropdowns);
        window.addEventListener('languagechange', () => { if (preference === 'auto') render(); });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
    window.NuvioI18n = { setLanguage, getLanguage: resolvedLanguage, getPreference: () => preference, t };
})();
