/* Actu CEE : filtre de listes et simulateur de prime. Aucune dépendance, aucun traceur. */
(function(){
'use strict';
function norm(s){ return String(s == null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
/* ---- filtre : <input data-filtre="sélecteur"> masque les lignes de tableau ou de liste qui ne contiennent pas tous les mots */
var champs = document.querySelectorAll('input[data-filtre]');
for(var i = 0; i < champs.length; i++) (function(inp){
  inp.addEventListener('input', function(){
    var mots = norm(inp.value).split(/\s+/).filter(Boolean), cibles = document.querySelectorAll(inp.getAttribute('data-filtre'));
    for(var j = 0; j < cibles.length; j++){
      var lignes = cibles[j].querySelectorAll('tbody tr, :scope > li');
      for(var k = 0; k < lignes.length; k++){
        var t = lignes[k]._t || (lignes[k]._t = norm(lignes[k].textContent)), ok = true;
        for(var m = 0; m < mots.length; m++) if(t.indexOf(mots[m]) < 0){ ok = false; break; }
        lignes[k].hidden = !ok;
      }
    }
  });
})(champs[i]);

/* ---- simulateur */
var src = document.getElementById('sim-data'), hote = document.getElementById('sim');
if(!src || !hote) return;
var D; try{ D = JSON.parse(src.textContent); }catch(e){ return; }
function isN(v){ return typeof v === 'number' && isFinite(v); }
function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function fr(v, d){ return isN(v) ? v.toLocaleString('fr-FR', {minimumFractionDigits:d, maximumFractionDigits:d}) : '–'; }
function eur(v){ var a = Math.abs(v), r = a >= 10000 ? 100 : a >= 1000 ? 10 : 1; return fr(Math.round(v/r)*r, 0); }
function plage(a, b, f){ var x = f(a), y = f(b); return x === y ? x : x + ' à ' + y; }
function plageU(a, b){ if(!isN(a) || !isN(b)) return '–'; var d = a < 10 ? 2 : a < 100 ? 1 : 0; return plage(a, b, function(x){ return x >= 1000 ? eur(x) : x.toLocaleString('fr-FR', {minimumFractionDigits:d, maximumFractionDigits:d}); }); }
function look(t, keys, v){ var o = t; (keys || []).forEach(function(k){ o = (o && typeof o === 'object') ? o[v[k]] : undefined; }); return o; }
function ev(e, v){
  if(typeof e === 'number') return e;
  if(!e || typeof e !== 'object') return NaN;
  if(e['in'] != null) return typeof v[e['in']] === 'number' ? v[e['in']] : NaN;
  if(e.t != null){ var x = look(e.t, e.k, v); return typeof x === 'number' ? x : NaN; }
  if(e.mul) return e.mul.reduce(function(a, y){ return a*ev(y, v); }, 1);
  if(e.add) return e.add.reduce(function(a, y){ return a + ev(y, v); }, 0);
  if(e.min) return Math.min.apply(null, e.min.map(function(y){ return ev(y, v); }));
  if(e.max) return Math.max.apply(null, e.max.map(function(y){ return ev(y, v); }));
  if(e.sub) return ev(e.sub[0], v) - ev(e.sub[1], v);
  if(e.sum){ var t = look(e.sum.t, e.sum.k, v), s = 0; (v[e.sum.over] || []).forEach(function(u){ if(t && typeof t[u] === 'number') s += t[u]; }); return s; }
  if(e['if']){ var c = e['if'], y = v[c['in']], ok = c.eq != null ? y === c.eq : c.le != null ? y <= c.le : c.lt != null ? y < c.lt : c.ge != null ? y >= c.ge : y > c.gt; return ev(ok ? e.then : e['else'], v); }
  return NaN;
}
var V = {}, BON = true;
D.entrees.forEach(function(e){ var x = D.vals[e.id]; V[e.id] = Array.isArray(x) ? x.slice() : (x === undefined ? (e.type === 'nombre' ? NaN : (e.options || [])[0]) : x); });
var h = '<form>';
D.entrees.forEach(function(e){
  if(e.pour === 'cout') return;
  if(e.type === 'choix') h += '<label>'+esc(e.label)+'<select data-in="'+esc(e.id)+'">'+e.options.map(function(o){ return '<option value="'+esc(o)+'"'+(o === V[e.id] ? ' selected' : '')+'>'+esc(o)+'</option>'; }).join('')+'</select></label>';
  else if(e.type === 'multi') h += '<fieldset><legend>'+esc(e.label)+'</legend><div class="cases">'+e.options.map(function(o){ return '<label><input type="checkbox" data-multi="'+esc(e.id)+'" value="'+esc(o)+'"'+(V[e.id].indexOf(o) >= 0 ? ' checked' : '')+'> '+esc(o)+'</label>'; }).join('')+'</div></fieldset>';
  else h += '<label>'+esc(e.label)+(e.unite ? ' ('+esc(e.unite)+')' : '')+'<input type="number" inputmode="decimal" data-in="'+esc(e.id)+'" value="'+(isN(V[e.id]) ? V[e.id] : '')+'"'+(isN(e.min) ? ' min="'+e.min+'"' : '')+(isN(e.max) ? ' max="'+e.max+'"' : '')+' step="'+(isN(e.pas) ? e.pas : 'any')+'"></label>';
});
if(D.bonif) h += '<fieldset><div class="cases"><label><input type="checkbox" data-bon checked> Appliquer la bonification : '+esc(D.bonif.nom || '')+'</label></div></fieldset>';
h += '</form><output aria-live="polite"></output>';
hote.innerHTML = h;
var out = hote.querySelector('output');
function calc(){
  var bad = false;
  D.entrees.forEach(function(e){ if(e.type === 'nombre' && e.pour !== 'cout'){ var x = V[e.id]; if(!isN(x) || (isN(e.min) && x < e.min) || (isN(e.max) && x > e.max)) bad = true; } });
  var base = ev(D.volume, V), tot = base, note = '';
  if(D.bonif && BON){
    if(D.bonif.volume != null){ var f = ev(D.bonif.volume, V); if(isN(f) && f > 0){ tot = f; note = ' · volume bonifié'; } }
    else { var c = ev(D.bonif.coef, V); if(isN(c) && c > 0){ tot = base*c; note = ' · bonification × ' + fr(c, 0); } else note = ' · pas de bonification pour ce cas'; }
  }
  if(bad || !isN(tot) || tot <= 0){ out.innerHTML = '<span>' + (bad ? 'Une valeur est hors du champ de la fiche.' : 'Ce cas n\'est pas prévu par le barème de la fiche.') + '</span>'; return; }
  var lo = D.prix*(1 - D.dmax/100), hi = D.prix*(1 - D.dmin/100), par = '';
  /* prime par unité (kW, m², véhicule…) quand le générateur a reconnu une grandeur proportionnelle */
  if(D.unite && isN(V[D.unite.id]) && V[D.unite.id] > 0 && V[D.unite.id] !== 1){
    var W = {}; Object.keys(V).forEach(function(k){ W[k] = V[k]; }); W[D.unite.id] = V[D.unite.id]*2;
    var b2 = ev(D.volume, W), t2 = b2;
    if(D.bonif && BON){ if(D.bonif.volume != null){ var f2 = ev(D.bonif.volume, W); if(isN(f2) && f2 > 0) t2 = f2; } else { var c2 = ev(D.bonif.coef, W); if(isN(c2) && c2 > 0) t2 = b2*c2; } }
    if(isN(t2) && Math.abs(t2 - 2*tot) <= 1e-6*tot) par = '<span class="u">soit '+plageU(tot/1000*lo/V[D.unite.id], tot/1000*hi/V[D.unite.id])+' € par '+esc(D.unite.lab)+'</span>';
  }
  out.innerHTML = '<span>Prime CEE estimée</span><b>'+plage(tot/1000*lo, tot/1000*hi, eur)+' €</b>'+par+'<span>'+fr(tot, 0)+' kWhc cumac × '+plage(lo, hi, function(x){ return fr(x, 2); })+' €/MWhc'+esc(note)+'. Spot Emmy '+esc(D.mois)+' : '+fr(D.prix, 2)+' €/MWhc, moins '+D.dmin+' à '+D.dmax+' %.</span>';
}
function maj(e){
  var t = e.target;
  if(t.hasAttribute('data-bon')) BON = t.checked;
  else if(t.hasAttribute('data-multi')){ var id = t.getAttribute('data-multi'), a = []; var cs = hote.querySelectorAll('[data-multi="'+id+'"]'); for(var i = 0; i < cs.length; i++) if(cs[i].checked) a.push(cs[i].value); V[id] = a; }
  else if(t.hasAttribute('data-in')) V[t.getAttribute('data-in')] = t.tagName === 'SELECT' ? t.value : (t.value === '' ? NaN : parseFloat(t.value));
  calc();
}
hote.addEventListener('input', maj); hote.addEventListener('change', maj);
calc();
})();
