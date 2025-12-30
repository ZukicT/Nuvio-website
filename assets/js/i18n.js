/**
 * Nuvio Website Internationalization (i18n) System
 * Handles language switching and text translation
 * 
 * Last edited: 2025-12-30
 */

(function() {
  'use strict';
  
  const STORAGE_KEY = 'nuvio_language';
  const DEFAULT_LANG = 'en';
  const SUPPORTED_LANGS = ['en', 'zh-CN', 'zh-TW'];
  
  /**
   * Get user's preferred language from storage or browser
   */
  function getPreferredLanguage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) {
      return stored;
    }
    
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('zh')) {
      return browserLang.includes('TW') || browserLang.includes('HK') ? 'zh-TW' : 'zh-CN';
    }
    
    return DEFAULT_LANG;
  }
  
  /**
   * Save language preference
   */
  function saveLanguage(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }
  
  /**
   * Get translation for a key
   */
  function t(key, lang) {
    if (!translations || !translations[lang]) {
      return key;
    }
    return translations[lang][key] || translations[DEFAULT_LANG][key] || key;
  }
  
  /**
   * Update all elements with data-i18n attribute
   */
  function updatePageContent(lang) {
    document.documentElement.lang = lang === 'zh-CN' ? 'zh-Hans' : lang === 'zh-TW' ? 'zh-Hant' : lang;
    
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      const key = el.getAttribute('data-i18n');
      const translation = t(key, lang);
      
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.hasAttribute('placeholder')) {
          el.placeholder = translation;
        }
      } else if (el.tagName === 'OPTION') {
        el.textContent = translation;
      } else if (el.hasAttribute('data-i18n-html') || translation.includes('<')) {
        el.innerHTML = translation;
      } else {
        el.textContent = translation;
      }
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key, lang);
    });
    
    document.querySelectorAll('[data-i18n-aria]').forEach(function(el) {
      const key = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', t(key, lang));
    });
  }
  
  /**
   * Update language dropdown display
   */
  function updateDropdownDisplay(lang) {
    const currentLangSpans = document.querySelectorAll('.current-lang');
    currentLangSpans.forEach(function(span) {
      if (languageNames && languageNames[lang]) {
        span.textContent = languageNames[lang].flag + ' ' + languageNames[lang].name;
      }
    });
    
    document.querySelectorAll('.lang-option').forEach(function(option) {
      const optionLang = option.getAttribute('data-lang');
      option.classList.toggle('active', optionLang === lang);
    });
  }
  
  /**
   * Initialize language dropdown
   */
  function initDropdown() {
    const dropdowns = document.querySelectorAll('.lang-dropdown');
    
    dropdowns.forEach(function(dropdown) {
      const toggle = dropdown.querySelector('.lang-toggle');
      const menu = dropdown.querySelector('.lang-menu');
      
      if (toggle && menu) {
        toggle.addEventListener('click', function(e) {
          e.stopPropagation();
          dropdown.classList.toggle('open');
          
          document.querySelectorAll('.lang-dropdown').forEach(function(d) {
            if (d !== dropdown) {
              d.classList.remove('open');
            }
          });
        });
        
        menu.querySelectorAll('.lang-option').forEach(function(option) {
          option.addEventListener('click', function(e) {
            e.preventDefault();
            const newLang = this.getAttribute('data-lang');
            
            if (newLang && SUPPORTED_LANGS.includes(newLang)) {
              saveLanguage(newLang);
              updatePageContent(newLang);
              updateDropdownDisplay(newLang);
              dropdown.classList.remove('open');
            }
          });
        });
      }
    });
    
    document.addEventListener('click', function() {
      document.querySelectorAll('.lang-dropdown').forEach(function(d) {
        d.classList.remove('open');
      });
    });
  }
  
  /**
   * Initialize i18n system
   */
  function init() {
    const lang = getPreferredLanguage();
    updatePageContent(lang);
    updateDropdownDisplay(lang);
    initDropdown();
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  window.NuvioI18n = {
    setLanguage: function(lang) {
      if (SUPPORTED_LANGS.includes(lang)) {
        saveLanguage(lang);
        updatePageContent(lang);
        updateDropdownDisplay(lang);
      }
    },
    getLanguage: function() {
      return localStorage.getItem(STORAGE_KEY) || getPreferredLanguage();
    },
    t: t
  };
})();
