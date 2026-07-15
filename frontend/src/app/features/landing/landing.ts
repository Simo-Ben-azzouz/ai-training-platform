import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero">
      <div class="hero-grid page-wrap">
        <div class="hero-copy">
          <p class="eyebrow">Apprendre. Pratiquer. Progresser.</p>
          <h1>Plateforme de Formation</h1>
          <p class="lead">Un espace d'apprentissage clair et vivant, qui rassemble vos formations, vos sessions et un coach IA disponible quand vous en avez besoin.</p>
          <div class="hero-actions">
            <a class="primary focus-ring" routerLink="/login">Commencer maintenant <span class="material-symbols-rounded">arrow_forward</span></a>
            <a class="secondary focus-ring" href="#experience">Decouvrir l'experience</a>
          </div>
          <div class="trust-row">
            <span><i class="material-symbols-rounded">verified</i> Parcours structures</span>
            <span><i class="material-symbols-rounded">schedule</i> Sessions en direct</span>
            <span><i class="material-symbols-rounded">neurology</i> Coach IA Anam</span>
          </div>
        </div>
        <div class="product-window" aria-label="Apercu de l'espace apprenant">
          <div class="window-top"><span></span><span></span><span></span><small>Mon espace</small></div>
          <div class="window-body">
            <div class="mini-side">
              <b>f</b><i class="active"></i><i></i><i></i><i></i>
            </div>
            <div class="mini-content">
              <div class="welcome"><small>Bonjour Amine</small><strong>Reprenons la ou vous en etiez.</strong></div>
              <div class="metrics"><div><b>04</b><span>En cours</span></div><div><b>78%</b><span>Progression</span></div><div><b>12h</b><span>Cette semaine</span></div></div>
              <div class="preview-grid">
                <div class="course"><span class="course-tag">Design</span><strong>Design d'interfaces modernes</strong><div class="progress"><i></i></div><small>7 modules sur 10</small></div>
                <div class="ai"><div class="face"><span class="material-symbols-rounded">face_6</span></div><strong>Coach IA</strong><small>Pret pour votre session</small><button>Demarrer</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="experience" class="experience">
      <div class="page-wrap feature-row">
        <div><span class="material-symbols-rounded">route</span><h2>Un parcours lisible</h2><p>Retrouvez l'essentiel sans bruit et avancez a votre rythme.</p></div>
        <div><span class="material-symbols-rounded">groups</span><h2>Des sessions vivantes</h2><p>Rejoignez vos formateurs et gardez vos prochaines dates en vue.</p></div>
        <div><span class="material-symbols-rounded">graphic_eq</span><h2>Une pratique naturelle</h2><p>Discutez en temps reel avec votre coach IA personnalise.</p></div>
      </div>
    </section>
  `,
  styles: [`
    .hero { min-height: min(820px, 94vh); padding: 130px 0 72px; display: flex; align-items: center; overflow: hidden; background: radial-gradient(circle at 78% 24%, color-mix(in srgb, var(--brand) 13%, transparent), transparent 34%), var(--bg); }
    .hero-grid { display: grid; grid-template-columns: minmax(0, .85fr) minmax(520px, 1.15fr); align-items: center; gap: 72px; }
    .eyebrow { margin: 0 0 18px; }
    h1 { max-width: 650px; margin: 0; font-size: clamp(3rem, 6vw, 5.6rem); line-height: .98; letter-spacing: 0; }
    .lead { max-width: 620px; margin: 26px 0 0; color: var(--muted); font-size: 1.08rem; line-height: 1.75; }
    .hero-actions { display: flex; align-items: center; gap: 12px; margin-top: 34px; }
    .primary, .secondary { min-height: 48px; padding: 0 19px; border-radius: 7px; display: inline-flex; align-items: center; justify-content: center; gap: 9px; font-weight: 600; }
    .primary { background: var(--ink); color: var(--surface); } .primary .material-symbols-rounded { font-size: 19px; transition: transform 160ms; } .primary:hover .material-symbols-rounded { transform: translateX(3px); }
    .secondary { border: 1px solid var(--border); background: var(--surface); }
    .trust-row { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 28px; color: var(--muted); font-size: .75rem; }
    .trust-row span { display: flex; align-items: center; gap: 5px; } .trust-row i { color: var(--teal); font-size: 16px; font-style: normal; }
    .product-window { transform: perspective(1300px) rotateY(-5deg) rotateX(2deg); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; background: var(--surface); box-shadow: 0 34px 90px rgba(27, 31, 44, .17); animation: arrive 700ms ease-out both; }
    .window-top { height: 42px; padding: 0 14px; display: flex; align-items: center; gap: 6px; border-bottom: 1px solid var(--border); background: var(--surface-2); }
    .window-top > span { width: 8px; height: 8px; border-radius: 50%; background: #e86a5e; }.window-top > span:nth-child(2){background:#e4ad42}.window-top > span:nth-child(3){background:#5ebc76}.window-top small{margin:auto;color:var(--muted)}
    .window-body { min-height: 420px; display: grid; grid-template-columns: 64px 1fr; }
    .mini-side { padding: 18px 0; display: flex; align-items: center; flex-direction: column; gap: 24px; border-right: 1px solid var(--border); }.mini-side b{width:28px;height:28px;display:grid;place-items:center;border-radius:6px;background:var(--brand);color:white}.mini-side i{width:22px;height:5px;border-radius:2px;background:var(--border)}.mini-side i.active{background:var(--brand)}
    .mini-content { padding: 32px; }.welcome{display:grid;gap:8px}.welcome small{color:var(--muted)}.welcome strong{font-size:1.3rem}.metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:26px 0}.metrics div{padding:16px;border:1px solid var(--border);border-radius:6px;display:grid;gap:5px}.metrics b{font-size:1.15rem}.metrics span{font-size:.67rem;color:var(--muted)}
    .preview-grid{display:grid;grid-template-columns:1.35fr .65fr;gap:12px}.course,.ai{padding:20px;border-radius:7px;background:var(--surface-2);display:flex;flex-direction:column}.course-tag{width:max-content;padding:4px 8px;border-radius:4px;background:color-mix(in srgb,var(--teal) 15%,transparent);color:var(--teal);font-size:.64rem;font-weight:700}.course strong{margin:18px 0 36px;line-height:1.4}.progress{height:5px;border-radius:3px;background:var(--border);overflow:hidden}.progress i{display:block;width:70%;height:100%;background:var(--brand)}.course small,.ai small{margin-top:8px;color:var(--muted);font-size:.65rem}.ai{align-items:center;text-align:center}.face{width:74px;height:74px;margin:2px auto 12px;border-radius:50%;display:grid;place-items:center;color:var(--brand);background:color-mix(in srgb,var(--brand) 12%,var(--surface))}.face span{font-size:42px}.ai button{width:100%;margin-top:auto;padding:8px;border:0;border-radius:5px;background:var(--ink);color:var(--surface);font-size:.7rem}
    .experience { padding: 38px 0 78px; background: var(--surface); border-top: 1px solid var(--border); }
    .feature-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; }.feature-row > div{padding-top:24px;border-top:1px solid var(--border)}.feature-row .material-symbols-rounded{color:var(--brand);font-size:26px}.feature-row h2{margin:15px 0 8px;font-size:1rem}.feature-row p{margin:0;color:var(--muted);line-height:1.6;font-size:.87rem}
    @keyframes arrive { from { opacity: 0; transform: perspective(1300px) rotateY(-10deg) translateY(24px); } }
    @media(max-width:1050px){.hero{min-height:auto}.hero-grid{grid-template-columns:1fr;gap:52px}.product-window{max-width:760px;transform:none}.hero-copy{padding-top:30px}.experience{margin-top:0}}
    @media(max-width:640px){.hero{padding:112px 0 52px}.hero-actions{align-items:stretch;flex-direction:column}.primary,.secondary{width:100%}.product-window{display:none}.feature-row{grid-template-columns:1fr;gap:24px}.trust-row{gap:10px}.experience{padding-bottom:52px}}
  `]
})
export class Landing {}
