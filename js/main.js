const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const sky = $('.sky'), R = Math.random;
const flower = (s, c = '#fff') => `<svg viewBox="-20 -20 40 40" width="${s}" height="${s}"><g fill="${c}" stroke="#9fc6e6" stroke-width=".8">${[0, 90, 180, 270].map(a => `<ellipse rx="7" ry="9" cy="-9" transform="rotate(${a})"/>`).join('')}</g><circle r="3" fill="#cfe5f6"/></svg>`;
const cluster = c => { let h = ''; for (let i = 0; i < 9; i++)h += `<span style="left:${R() * 70}%;top:${R() * 70}%;--d:${4 + R() * 5}s">${flower(26 + R() * 30)}</span>`; return `<div class="deco ${c}">${h}</div>` };
let h = '<div class="waves"><i></i><i></i><i></i></div>' + cluster('tr') + cluster('bl');
for (let i = 0; i < 18; i++) { const z = 8 + R() * 14; h += `<svg class="st" style="left:${R() * 98}%;top:${R() * 90}%;animation-delay:-${R() * 4}s" width="${z}" height="${z}" viewBox="-11 -11 22 22"><path d="M0-10Q1-1 10 0Q1 1 0 10Q-1 1-10 0Q-1-1 0-10Z" fill="#2f78d0"/></svg>` }
for (let i = 0; i < 7; i++)h += `<span class="petal" style="left:${R() * 100}%;animation-duration:${22 + R() * 18}s;animation-delay:-${R() * 30}s">${flower(12 + R() * 8)}</span>`;
h += '<svg class="cat" viewBox="0 0 80 70"><path d="M12 24 16 4 31 15ZM68 24 64 4 49 15Z" fill="#fff" stroke="#bcd9ee"/><ellipse cx="40" cy="42" rx="32" ry="24" fill="#fff" stroke="#bcd9ee" stroke-width="1.5"/><circle cx="28" cy="40" r="2.5" fill="#2a4565"/><circle cx="52" cy="40" r="2.5" fill="#2a4565"/><ellipse cx="21" cy="47" rx="4" ry="2.5" fill="#f9c5d1"/><ellipse cx="59" cy="47" rx="4" ry="2.5" fill="#f9c5d1"/><path d="M37 46q3 3 6 0" stroke="#2a4565" fill="none" stroke-linecap="round"/></svg>';
sky.insertAdjacentHTML('beforeend', h);
const menu = $('.menu'), nav = $('.nav nav'); menu.onclick = () => menu.setAttribute('aria-expanded', nav.classList.toggle('open'));
$$('a[href$=".html"]').forEach(a => a.addEventListener('click', e => { if (e.metaKey || e.ctrlKey || a.target) return; e.preventDefault(); document.body.classList.add('out'); setTimeout(() => location.href = a.href, 250) }));
addEventListener('pageshow', () => document.body.classList.remove('out'));
const top_ = $('.top'); addEventListener('scroll', () => top_.classList.toggle('on', scrollY > 400), { passive: true }); top_.onclick = () => scrollTo({ top: 0 });
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target) } }), { threshold: .15 }); $$('.r').forEach(el => io.observe(el));
$$('[data-reveal]').forEach(b => b.onclick = () => { const t = $(b.dataset.reveal); t.hidden = false; t.scrollIntoView({ behavior: 'smooth', block: 'center' }) });
$$('[data-answer]').forEach(b => b.onclick = () => { $$('.answer').forEach(a => a.hidden = true); $(b.dataset.answer).hidden = false });
const env = $('#env'); if (env) $('#envBtn').onclick = () => env.classList.toggle('open');
const kb = $('#keepBtn'); if (kb) kb.onclick = () => { const bu = $('#burst'); for (let i = 0; i < 24; i++) { const s = document.createElement('span'); s.textContent = i % 2 ? '💙' : '🤍'; s.style.left = Math.random() * 100 + '%'; s.style.animationDelay = Math.random() * .8 + 's'; bu.append(s); setTimeout(() => s.remove(), 4000) } kb.textContent = 'Kept 💙' };
const g = $('#gallery'); if (g) {
  const tabs = $('.tabs'), lb = $('#lb'); let cur = "All";
  const show = () => {
    g.innerHTML = ''; const list = PHOTOS.filter(p => cur === "All" || p.cat === cur); $('#empty').hidden = list.length > 0;
    list.forEach(p => { const b = document.createElement('button'); b.className = 'photo'; const v = p.type === 'video'; b.innerHTML = `<img loading="lazy" alt="${p.caption}" src="${v ? p.poster : p.src}">${v ? '<span class="play" aria-hidden="true">▶</span>' : ''}<span>${p.caption}</span><small>${p.date}</small>`; b.onclick = () => { const vi = $('video', lb), im = $('img', lb); vi.hidden = !v; im.hidden = v; if (v) { vi.src = p.src; vi.poster = p.poster || '' } else { im.src = p.src; im.alt = p.caption } $('figcaption', lb).textContent = p.caption + ' — ' + p.date; lb.hidden = false; $('.close').focus() }; g.append(b) })
  };
  CATEGORIES.forEach(c => { const b = document.createElement('button'); b.textContent = c; b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', c === cur); b.onclick = () => { cur = c; $$('button', tabs).forEach(x => x.setAttribute('aria-selected', x === b)); show() }; tabs.append(b) });
  const close = () => { lb.hidden = true; const v = $('video', lb); v.pause(); v.removeAttribute('src') }; $('.close').onclick = close; lb.onclick = e => { if (e.target === lb) close() }; addEventListener('keydown', e => { if (e.key === 'Escape') close() }); show()
}

function sendAnswer(a) { if (typeof WEB3FORMS_KEY === 'undefined' || !WEB3FORMS_KEY) return; fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: 'Her answer 💙', from_name: 'Our Little World', answer: a, time: new Date().toLocaleString() }) }).catch(() => { }) }
$$('[data-answer]').forEach(b => b.addEventListener('click', () => sendAnswer(b.textContent.trim())));
