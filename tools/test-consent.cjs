const vm = require('node:vm');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const code = fs.readFileSync('assets/js/consent.js','utf8');
const KEY = 'nuvio_consent_v1';
function setup(record, privacy = {}) {
    const storage = new Map(record ? [[KEY,JSON.stringify(record)]] : []);
    const scripts = [], deleted = [], events = {};
    let reloads = 0;
    const document = { readyState:'loading', head:{append:script=>scripts.push(script)}, createElement:()=>({}), addEventListener:(name,fn)=>{events[name]=fn;} };
    Object.defineProperty(document,'cookie',{get:()=> '_ga=old; _ga_PXFM9GSJ71=old; language=keep',set:value=>deleted.push(value)});
    const context = vm.createContext({document,navigator:privacy,location:{hostname:'nuviomm.com',protocol:'https:',reload:()=>reloads++},Date,URL,CustomEvent:class{constructor(type){this.type=type;}},localStorage:{getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value),removeItem:key=>storage.delete(key)}});
    context.window=context;context.addEventListener=()=>{};context.dispatchEvent=()=>{};
    vm.runInContext(code,context);
    return {api:context.NuvioConsent,context,storage,scripts,deleted,reloads:()=>reloads};
}
const record=(values={})=>({version:1,preferences:false,analytics:false,updated:Date.now(),...values});
const fresh=setup();assert.equal(fresh.scripts.length,0);assert.equal(fresh.api.allows('analytics'),false);assert(fresh.deleted.some(cookie=>cookie.startsWith('_ga=')));assert(!fresh.deleted.some(cookie=>cookie.startsWith('language=')));
fresh.api.setPreferences({preferences:true,analytics:true});assert.equal(fresh.scripts.length,1);assert(fresh.scripts[0].src.startsWith('https://www.googletagmanager.com/'));assert.equal(fresh.api.allows('analytics'),true);
fresh.api.setPreferences({preferences:true,analytics:true});assert.equal(fresh.scripts.length,1);
fresh.api.setPreferences({preferences:false,analytics:false});assert.equal(fresh.api.allows('analytics'),false);assert.equal(fresh.context['ga-disable-G-PXFM9GSJ71'],true);assert.equal(fresh.reloads(),1);
for(const privacy of [{globalPrivacyControl:true},{doNotTrack:'1'}]) {const test=setup(record({analytics:true}),privacy);assert.equal(test.scripts.length,0);test.api.setPreferences({preferences:true,analytics:true});assert.equal(test.api.allows('analytics'),false);}
assert.equal(setup(record({updated:Date.now()-181*86400000,analytics:true})).scripts.length,0);
assert.equal(setup(record({updated:Date.now()+86400000,analytics:true})).scripts.length,0);
assert.equal(setup(record({analytics:true})).scripts.length,1);
assert.equal(setup(record({preferences:true})).scripts.length,0);
assert.equal(setup({...record(),version:2,analytics:true}).scripts.length,0);
console.log('PASS: analytics blocked by default, explicit opt-in, saved consent, reject, revocation, cookie cleanup, expiry, privacy signals, version validation, one-time loading');
const dictionaries={en:{},'es-ES':{},'de-DE':{},'ja-JP':{},'ko-KR':{},'zh-CN':{},'zh-TW':{}};
function language(primary,other,remember=false) {
    const data=new Map([['nuvio_language','zh-CN']]);let prefs=remember;
    const context=vm.createContext({translations:dictionaries,languageNames:dictionaries,navigator:{language:primary,languages:other},localStorage:{getItem:key=>data.get(key)||null,setItem:(key,value)=>data.set(key,value),removeItem:key=>data.delete(key)},document:{readyState:'loading',documentElement:{},querySelectorAll:()=>[],addEventListener:()=>{}},Intl});
    context.window=context;context.NuvioConsent={allows:()=>prefs};context.addEventListener=()=>{};
    vm.runInContext(fs.readFileSync('assets/js/i18n.js','utf8'),context);
    return {api:context.NuvioI18n,data,allow:()=>prefs=true};
}
const us=language('en-US',['zh-CN','en-US']);assert.equal(us.api.getLanguage(),'en');assert.equal(us.data.has('nuvio_language'),false);us.api.setLanguage('es-ES');assert.equal(us.api.getLanguage(),'es-ES');assert.equal(us.data.has('nuvio_language_v2'),false);us.allow();us.api.setLanguage('en');assert.equal(us.data.get('nuvio_language_v2'),'en');
assert.equal(language('es-MX',['en-US']).api.getLanguage(),'es-ES');assert.equal(language('zh-HK',['en-US']).api.getLanguage(),'zh-TW');assert.equal(language('fr-FR',['de-DE']).api.getLanguage(),'de-DE');assert.equal(language('fr-FR',['fr-FR']).api.getLanguage(),'en');
console.log('PASS: U.S. English uses primary browser language, stale choice removed, regional mapping, fallback, manual choice, preference consent controls persistence');
