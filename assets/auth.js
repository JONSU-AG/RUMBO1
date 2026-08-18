// ===========================================================
// RUMBO — Control de acceso (assets/auth.js)
// -----------------------------------------------------------
// Antes de ver cualquier página, se pide usuario y contraseña.
// Las cuentas válidas viven en assets/users.js: para dar o
// quitar acceso, se edita ese archivo directamente en GitHub.
// Los visitantes NO pueden crear ni cambiar cuentas, solo
// ingresar con las que tú les compartas.
//
// La sesión iniciada solo se recuerda mientras la pestaña del
// navegador sigue abierta (sessionStorage): no queda nada
// guardado de forma permanente ni se comparte entre personas.
// ===========================================================

const RUMBO_SESSION_KEY = 'rumbo_session_ok';

function rumboUnlock(){
  document.documentElement.classList.remove('rumbo-locked');
  sessionStorage.setItem(RUMBO_SESSION_KEY, '1');
}

function rumboLock(){
  document.documentElement.classList.add('rumbo-locked');
  sessionStorage.removeItem(RUMBO_SESSION_KEY);
}

function rumboCheckLogin(user, pass){
  if (typeof USERS === 'undefined') return false;
  const u = (user || '').trim().toLowerCase();
  return USERS.some(acc => acc.user.toLowerCase() === u && acc.pass === pass);
}

function rumboShowQuote(){
  const el = document.querySelector('#gate-quote');
  const el2 = document.querySelector('#home-quote');
  const el3 = document.querySelector('#footer-quote');
  const el4 = document.querySelector('#course-quote-text');
  if (typeof FRASES === 'undefined' || FRASES.length === 0) return;
  const pick = () => FRASES[Math.floor(Math.random() * FRASES.length)];
  if (el) el.textContent = pick();
  if (el2) el2.textContent = pick();
  if (el3) el3.textContent = pick();
  if (el4) el4.textContent = pick();
}

function initGate(){
  const form = document.querySelector('#gate-form');

  rumboShowQuote();

  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.querySelector('#gate-user').value;
      const pass = document.querySelector('#gate-pass').value;
      const error = document.querySelector('#gate-error');
      if (rumboCheckLogin(user, pass)){
        error.textContent = '';
        form.reset();
        rumboUnlock();
      } else {
        error.textContent = 'Usuario o contraseña incorrectos.';
      }
    });
  }

  const logoutLink = document.querySelector('#logout-link');
  if (logoutLink){
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      rumboLock();
      window.location.reload();
    });
  }
}

document.addEventListener('DOMContentLoaded', initGate);
