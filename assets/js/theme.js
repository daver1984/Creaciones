(function(){
  const STORAGE_KEY = 'theme-preference';
  const root = document.documentElement;
  function getPreference(){
    const stored = localStorage.getItem(STORAGE_KEY);
    if(stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function applyTheme(value){
    root.setAttribute('data-theme', value);
    document.querySelectorAll('[data-theme-label]').forEach(el=>{
      el.textContent = value === 'dark' ? '🌙 Oscuro' : '☀️ Claro';
    });
  }
  function toggleTheme(){
    const current = root.getAttribute('data-theme') || getPreference();
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }
  window.addEventListener('DOMContentLoaded', ()=>{
    applyTheme(getPreference());
    document.querySelectorAll('[data-theme-toggle]').forEach(btn=>btn.addEventListener('click', toggleTheme));
  });
})();