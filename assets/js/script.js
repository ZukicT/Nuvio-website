document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-nav');
    const setMenuOpen = (open) => {
        if (!menuButton || !menu) return;
        menu.classList.toggle('mobile-nav-open', open);
        menuButton.classList.toggle('mobile-menu-btn-open', open);
        menuButton.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('mobile-menu-open', open);
        if (!open && menu.contains(document.activeElement)) menuButton.focus();
        menu.inert = !open;
    };
    if (menuButton && menu) {
        menu.inert = true;
        menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
        menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') setMenuOpen(false);
        });
        document.addEventListener('click', event => {
            if (!menu.contains(event.target) && !menuButton.contains(event.target)) setMenuOpen(false);
        });
        const desktop = window.matchMedia('(min-width: 851px)');
        desktop.addEventListener('change', event => { if (event.matches) setMenuOpen(false); });
    }
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a, .mobile-nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.setAttribute('aria-current', 'page');
    });
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
});

// Rotate benefit stories while visible. Manual selection restarts the eight-second timer.
document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('features');
    const tabs = Array.from(document.querySelectorAll('.product-tabs [role="tab"]'));
    const toggle = section?.querySelector('.rotation-toggle');
    if (!section || !tabs.length || !toggle) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let paused = reduced.matches;
    let visible = false;
    let timer;
    const current = () => Math.max(0, tabs.findIndex(tab => tab.getAttribute('aria-selected') === 'true'));
    const restart = () => {
        clearTimeout(timer);
        section.classList.remove('is-cycling');
        if (paused || !visible || document.hidden || section.querySelector('[role="tabpanel"]:focus-within')) return;
        // The separate playback track uses the same duration as the timer.
        void section.offsetWidth;
        section.classList.add('is-cycling');
        timer = setTimeout(() => activate(tabs[(current() + 1) % tabs.length]), 8000);
    };
    const activate = (tab, focus = false) => {
        tabs.forEach(item => {
            const selected = item === tab;
            item.setAttribute('aria-selected', String(selected));
            item.tabIndex = selected ? 0 : -1;
            const panel = document.getElementById(item.getAttribute('aria-controls'));
            if (panel) panel.hidden = !selected;
        });
        section.querySelector('.story-count').innerHTML = String(tabs.indexOf(tab) + 1).padStart(2, '0') + ' <span>/ 04</span>';
        if (focus) tab.focus();
        restart();
    };
    const renderToggle = () => {
        toggle.setAttribute('aria-pressed', String(paused));
        toggle.querySelector('.rotation-icon').textContent = paused ? '▶' : 'Ⅱ';
        const label = toggle.querySelector('[data-i18n]');
        label.dataset.i18n = paused ? 'habit_play' : 'habit_pause';
        label.textContent = window.NuvioI18n?.t(label.dataset.i18n) || (paused ? 'Play' : 'Pause');
        restart();
    };
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activate(tab));
        tab.addEventListener('keydown', event => {
            let next;
            if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
            if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
            if (event.key === 'Home') next = 0;
            if (event.key === 'End') next = tabs.length - 1;
            if (next !== undefined) { event.preventDefault(); activate(tabs[next], true); }
        });
    });
    toggle.addEventListener('click', () => { paused = !paused; renderToggle(); });
    section.addEventListener('focusin', restart);
    section.addEventListener('focusout', () => requestAnimationFrame(restart));
    document.addEventListener('visibilitychange', restart);
    reduced.addEventListener('change', event => { paused = event.matches; renderToggle(); });
    new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting;
        restart();
    }, { threshold: .25 }).observe(section.querySelector('.feature-panel').parentElement);
    renderToggle();
});

// Measure outbound intent through the existing Google Analytics tag, excluding local previews.
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-download-location]').forEach(link => {
        link.addEventListener('click', () => {
            if (location.hostname !== 'nuviomm.com' || typeof window.gtag !== 'function') return;
            window.gtag('event', 'app_store_click', {
                placement: link.dataset.downloadLocation,
                link_url: link.href
            });
        });
    });
});

// Give each section one brief arrival, without keeping anything moving while it is read.
document.addEventListener('DOMContentLoaded', () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
    const activeAnimations = new Set();
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            if (!reducedMotion.matches) {
                const animation = entry.target.animate([
                    { opacity: 0, transform: 'translateY(14px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], { duration: 420, easing: 'cubic-bezier(.2,.8,.2,1)' });
                activeAnimations.add(animation);
                animation.addEventListener('finish', () => activeAnimations.delete(animation));
            }
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.landing-section-heading, .privacy-layout, .start-heading, .setup-steps, .questions-layout').forEach(section => observer.observe(section));
    reducedMotion.addEventListener('change', event => {
        if (event.matches) {
            activeAnimations.forEach(animation => animation.cancel());
            activeAnimations.clear();
        }
    });
});

// Animate scrolling directly so embedded WebKit does not need native smooth-scroll support.
document.addEventListener('DOMContentLoaded', () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let scrollFrame;
    const stopScroll = () => { cancelAnimationFrame(scrollFrame); scrollFrame = undefined; };
    const scrollToSection = (top, immediate) => {
        stopScroll();
        const start = window.scrollY;
        const end = Math.max(0, Math.min(top, document.documentElement.scrollHeight - window.innerHeight));
        const distance = end - start;
        if (immediate || Math.abs(distance) < 2) {
            window.scrollTo({ top: end, behavior: 'instant' });
            return;
        }
        const duration = Math.min(850, Math.max(480, Math.abs(distance) * .22));
        const started = performance.now();
        const step = now => {
            const progress = Math.min(1, (now - started) / duration);
            const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
            window.scrollTo({ top: start + distance * eased, behavior: 'instant' });
            if (progress < 1) scrollFrame = requestAnimationFrame(step);
            else scrollFrame = undefined;
        };
        scrollFrame = requestAnimationFrame(step);
    };
    window.addEventListener('wheel', stopScroll, { passive: true });
    window.addEventListener('touchstart', stopScroll, { passive: true });
    window.addEventListener('keydown', event => {
        if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Escape', ' '].includes(event.key)) stopScroll();
    });
    reduced.addEventListener('change', stopScroll);
    document.addEventListener('click', event => {
        const link = event.target.closest('a[href]');
        if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank') return;
        const url = new URL(link.href, location.href);
        if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
        let target;
        try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
        if (!target) return;
        event.preventDefault();
        const headerHeight = document.querySelector('.header')?.getBoundingClientRect().height || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 24;
        if (location.hash !== url.hash) history.pushState(null, '', url.hash);
        if (event.detail === 0 || link.classList.contains('skip-link')) {
            if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
            target.focus({ preventScroll: true });
        }
        scrollToSection(top, reduced.matches || link.classList.contains('skip-link'));
    });

    // Keep content rendered during collapse so both opening and closing animate in native details.
    document.querySelectorAll('.question-list details').forEach(details => {
        const summary = details.querySelector('summary');
        let animation;
        let expanded = details.open;
        const finish = () => {
            details.open = expanded;
            details.style.overflow = '';
            details.classList.remove('is-closing');
            summary.removeAttribute('aria-expanded');
            animation = undefined;
        };
        summary.addEventListener('click', event => {
            event.preventDefault();
            const startHeight = details.getBoundingClientRect().height;
            animation?.cancel();
            expanded = !expanded;
            if (reduced.matches) { finish(); return; }
            details.open = true;
            details.style.overflow = 'hidden';
            details.classList.toggle('is-closing', !expanded);
            summary.setAttribute('aria-expanded', String(expanded));
            const style = getComputedStyle(details);
            const endHeight = expanded ? details.getBoundingClientRect().height : summary.getBoundingClientRect().height + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
            animation = details.animate([
                { height: startHeight + 'px' },
                { height: endHeight + 'px' }
            ], { duration: 300, easing: 'cubic-bezier(.2,.8,.2,1)' });
            animation.onfinish = finish;
        });
        reduced.addEventListener('change', event => {
            if (event.matches && animation) { animation.cancel(); finish(); }
        });
    });
});

// Enhance contact selects while keeping native values, validation, and form submission intact.
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.contact-form .select-wrapper select').forEach(select => {
        const wrapper = select.closest('.select-wrapper');
        const label = document.querySelector('label[for="' + select.id + '"]');
        const trigger = document.createElement('button');
        const value = document.createElement('span');
        const arrow = document.createElement('span');
        const panel = document.createElement('div');
        const error = document.createElement('p');
        const labelID = select.id + '-label';
        label.id = labelID;
        trigger.type = 'button';
        trigger.className = 'support-select-trigger';
        trigger.setAttribute('role', 'combobox');
        trigger.setAttribute('aria-haspopup', 'listbox');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-labelledby', labelID + ' ' + select.id + '-value');
        trigger.setAttribute('aria-controls', select.id + '-options');
        if (select.required) trigger.setAttribute('aria-required', 'true');
        value.id = select.id + '-value';
        arrow.className = 'support-select-chevron';
        arrow.setAttribute('aria-hidden', 'true');
        trigger.append(value, arrow);
        panel.className = 'support-select-panel';
        panel.id = select.id + '-options';
        panel.setAttribute('role', 'listbox');
        panel.setAttribute('aria-labelledby', labelID);
        panel.inert = true;
        error.className = 'support-select-error';
        error.id = select.id + '-error';
        error.hidden = true;
        wrapper.querySelector('.select-icon')?.remove();
        wrapper.classList.add('custom-select');
        select.classList.add('native-select-source');
        select.tabIndex = -1;
        select.setAttribute('aria-hidden', 'true');
        wrapper.append(trigger, panel, error);
        let active = select.selectedIndex;
        let options = [];
        let typeBuffer = '';
        let typeTimer;
        const isOpen = () => trigger.getAttribute('aria-expanded') === 'true';
        const close = () => {
            trigger.setAttribute('aria-expanded', 'false');
            trigger.removeAttribute('aria-activedescendant');
            wrapper.dataset.open = 'false';
            panel.inert = true;
        };
        const highlight = (index, scroll = true) => {
            active = Math.max(0, Math.min(index, options.length - 1));
            options.forEach((option, position) => option.classList.toggle('is-highlighted', position === active));
            trigger.setAttribute('aria-activedescendant', options[active].id);
            if (isOpen() && scroll) options[active].scrollIntoView({ block: 'nearest' });
        };
        const choose = index => {
            select.selectedIndex = index;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            close();
            trigger.focus({ preventScroll: true });
        };
        const render = () => {
            const selected = select.options[select.selectedIndex];
            value.textContent = selected?.textContent || '';
            trigger.classList.toggle('is-placeholder', !select.value);
            panel.replaceChildren();
            options = Array.from(select.options).map((native, index) => {
                const option = document.createElement('div');
                option.id = select.id + '-option-' + index;
                option.className = 'support-select-option';
                option.setAttribute('role', 'option');
                option.setAttribute('aria-selected', String(index === select.selectedIndex));
                option.textContent = native.textContent;
                option.addEventListener('pointermove', () => highlight(index, false));
                option.addEventListener('click', () => choose(index));
                panel.append(option);
                return option;
            });
            active = select.selectedIndex;
        };
        const open = () => {
            const rect = trigger.getBoundingClientRect();
            const below = window.innerHeight - rect.bottom - 16;
            const above = rect.top - 16;
            const upward = below < 230 && above > below;
            wrapper.classList.toggle('opens-up', upward);
            panel.style.maxHeight = Math.min(280, Math.max(120, upward ? above : below)) + 'px';
            trigger.setAttribute('aria-expanded', 'true');
            wrapper.dataset.open = 'true';
            panel.inert = false;
            highlight(select.selectedIndex);
        };
        // Keep focus on the combobox until the option click commits its value.
        // Otherwise focusout closes the inert list before click can run.
        panel.addEventListener('pointerdown', event => event.preventDefault());
        trigger.addEventListener('click', () => isOpen() ? close() : open());
        trigger.addEventListener('keydown', event => {
            if (event.key === 'Tab') { close(); return; }
            if (event.key === 'Escape') { event.preventDefault(); close(); return; }
            if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
                event.preventDefault();
                const wasOpen = isOpen();
                if (!wasOpen) open();
                if (event.key === 'Home') highlight(0);
                else if (event.key === 'End') highlight(options.length - 1);
                else if (wasOpen) highlight((active + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length);
                return;
            }
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                if (isOpen()) choose(active); else open();
                return;
            }
            if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
                event.preventDefault();
                clearTimeout(typeTimer);
                typeBuffer += event.key.toLocaleLowerCase();
                const match = options.findIndex(option => option.textContent.toLocaleLowerCase().startsWith(typeBuffer));
                if (!isOpen()) open();
                if (match >= 0) highlight(match);
                typeTimer = setTimeout(() => { typeBuffer = ''; }, 600);
            }
        });
        select.addEventListener('focus', () => trigger.focus());
        select.addEventListener('change', () => {
            render();
            if (select.validity.valid) { error.hidden = true; trigger.removeAttribute('aria-invalid'); trigger.removeAttribute('aria-describedby'); }
        });
        select.addEventListener('invalid', event => {
            event.preventDefault();
            error.textContent = select.validationMessage;
            error.hidden = false;
            trigger.setAttribute('aria-invalid', 'true');
            trigger.setAttribute('aria-describedby', error.id);
            trigger.focus();
        });
        select.form.addEventListener('reset', () => requestAnimationFrame(() => {
            close(); render(); error.hidden = true; trigger.removeAttribute('aria-invalid'); trigger.removeAttribute('aria-describedby');
        }));
        document.addEventListener('click', event => { if (!wrapper.contains(event.target)) close(); });
        wrapper.addEventListener('focusout', event => { if (!wrapper.contains(event.relatedTarget)) close(); });
        new MutationObserver(render).observe(select, { subtree: true, childList: true, characterData: true });
        render();
    });
});
