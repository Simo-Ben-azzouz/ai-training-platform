import { Component, computed, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CategoriesService } from '../../services/categories.service';
import { FormationsService } from '../../services/formations.service';
import { SessionsService } from '../../services/sessions.service';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { SkeletonGrid } from '../../shared/components/skeleton-grid/skeleton-grid';

@Component({
  selector: 'app-dashboard', standalone: true,
  imports: [RouterLink, DatePipe, PageHeader, SkeletonGrid],
  template: `
    <app-page-header eyebrow="Vue d'ensemble" [title]="'Bonjour, ' + (auth.currentUser()?.name ?? 'apprenant')" description="Voici ce qui vous attend aujourd'hui et la suite de votre parcours." />
    <section class="metrics" aria-label="Statistiques d'apprentissage">
      <div><span class="icon brand material-symbols-rounded">local_library</span><p>Formations disponibles</p><strong>{{ formations.formations().length }}</strong><small>Catalogue actif</small></div>
      <div><span class="icon teal material-symbols-rounded">calendar_month</span><p>Sessions a venir</p><strong>{{ upcomingCount() }}</strong><small>Planifiees prochainement</small></div>
      <div><span class="icon amber material-symbols-rounded">bookmark</span><p>Mes inscriptions</p><strong>{{ sessions.mySessions().length }}</strong><small>Parcours suivis</small></div>
      <div><span class="icon rose material-symbols-rounded">neurology</span><p>Coach IA</p><strong>24/7</strong><small>Disponible a tout moment</small></div>
    </section>
    <div class="dashboard-grid">
      <section class="main-column">
        <div class="section-head"><div><h2>Prochaines sessions</h2><p>Votre agenda de formation</p></div><a routerLink="/sessions">Tout voir <span class="material-symbols-rounded">arrow_forward</span></a></div>
        @if (sessions.loading()) { <app-skeleton-grid [count]="2" /> }
        @else {
          <div class="session-list">
            @for (session of upcoming(); track session.id) {
              <a [routerLink]="['/sessions', session.id]" class="session-row">
                <time><b>{{ session.startDate | date:'dd' }}</b><span>{{ session.startDate | date:'MMM' }}</span></time>
                <div class="session-copy"><span>Session en direct</span><strong>{{ session.title }}</strong><small><i class="material-symbols-rounded">schedule</i>{{ session.startDate | date:'HH:mm' }} - {{ session.endDate | date:'HH:mm' }}</small></div>
                <span class="arrow material-symbols-rounded">chevron_right</span>
              </a>
            } @empty { <p class="empty-inline">Aucune session a venir.</p> }
          </div>
        }
      </section>
      <aside class="side-column">
        <div class="coach-panel">
          <div class="coach-head"><span class="material-symbols-rounded">neurology</span><i>En ligne</i></div>
          <h2>Un doute sur votre cours ?</h2><p>Votre coach IA vous aide a pratiquer et clarifier les points complexes.</p>
          <a routerLink="/anam">Ouvrir le coach <span class="material-symbols-rounded">arrow_forward</span></a>
        </div>
        <div class="category-panel panel"><div class="section-head compact"><div><h2>Categories</h2><p>Explorer par domaine</p></div></div>
          @for (category of categories.categories().slice(0, 4); track category.id; let index = $index) {
            <a [routerLink]="['/formations']" [queryParams]="{category: category.id}"><span class="category-icon material-symbols-rounded">{{ categoryIcons[index % categoryIcons.length] }}</span><strong>{{ category.name }}</strong><span class="material-symbols-rounded">chevron_right</span></a>
          }
        </div>
      </aside>
    </div>
  `,
  styles: [`
    .metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:32px}.metrics>div{padding:20px;border:1px solid var(--border);border-radius:8px;background:var(--surface);display:grid;grid-template-columns:auto 1fr;column-gap:12px}.metrics .icon{grid-row:span 2;width:38px;height:38px;border-radius:7px;display:grid;place-items:center;font-size:20px}.icon.brand{color:var(--brand);background:color-mix(in srgb,var(--brand) 12%,transparent)}.icon.teal{color:var(--teal);background:color-mix(in srgb,var(--teal) 12%,transparent)}.icon.amber{color:var(--amber);background:color-mix(in srgb,var(--amber) 12%,transparent)}.icon.rose{color:var(--danger);background:color-mix(in srgb,var(--danger) 10%,transparent)}.metrics p{margin:0;color:var(--muted);font-size:.76rem}.metrics strong{grid-column:2;margin-top:9px;font-size:1.5rem}.metrics small{grid-column:1/-1;margin-top:15px;padding-top:13px;border-top:1px solid var(--border);color:var(--muted);font-size:.68rem}.dashboard-grid{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(280px,.7fr);gap:24px}.main-column,.category-panel{padding:24px;background:var(--surface);border:1px solid var(--border);border-radius:8px}.section-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}.section-head h2{margin:0;font-size:1rem}.section-head p{margin:5px 0 0;color:var(--muted);font-size:.75rem}.section-head>a{display:flex;align-items:center;gap:5px;color:var(--brand-strong);font-size:.75rem;font-weight:600}.section-head>a span{font-size:16px}.session-list{display:grid}.session-row{min-height:92px;display:flex;align-items:center;gap:18px;border-top:1px solid var(--border);transition:background 150ms ease}.session-row:first-child{border-top:0}.session-row:hover{background:var(--surface-2)}time{width:52px;height:58px;border:1px solid var(--border);border-radius:6px;display:grid;place-items:center;align-content:center;line-height:1}time b{font-size:1.25rem}time span{margin-top:6px;color:var(--muted);font-size:.63rem;text-transform:uppercase}.session-copy{display:grid;gap:5px;min-width:0;flex:1}.session-copy>span{color:var(--teal);font-size:.65rem;font-weight:700}.session-copy strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.86rem}.session-copy small{display:flex;align-items:center;gap:5px;color:var(--muted);font-size:.7rem}.session-copy small i{font-size:15px}.arrow{color:var(--muted);font-size:20px}.empty-inline{padding:30px;text-align:center;color:var(--muted)}.side-column{display:grid;align-content:start;gap:18px}.coach-panel{padding:24px;border-radius:8px;background:#292c35;color:white}.coach-head{display:flex;align-items:center;justify-content:space-between}.coach-head>span{width:42px;height:42px;display:grid;place-items:center;border-radius:7px;background:#787af0}.coach-head i{font-style:normal;font-size:.65rem;color:#6fe0be}.coach-head i:before{content:'';display:inline-block;width:6px;height:6px;margin-right:5px;border-radius:50%;background:currentColor}.coach-panel h2{margin:28px 0 9px;font-size:1.25rem}.coach-panel p{margin:0;color:rgba(255,255,255,.67);font-size:.78rem;line-height:1.6}.coach-panel a{margin-top:24px;padding:10px 12px;display:flex;align-items:center;justify-content:space-between;border-radius:6px;background:white;color:#22242c;font-size:.75rem;font-weight:700}.coach-panel a span{font-size:17px}.category-panel{padding:22px}.section-head.compact{margin-bottom:12px}.category-panel>a{min-height:54px;display:flex;align-items:center;gap:10px;border-top:1px solid var(--border)}.category-panel>a:first-of-type{border-top:0}.category-panel a strong{flex:1;font-size:.76rem}.category-panel a>.material-symbols-rounded:last-child{font-size:17px;color:var(--muted)}.category-icon{width:30px;height:30px;display:grid;place-items:center;border-radius:6px;background:var(--surface-2);color:var(--brand);font-size:17px}
    @media(max-width:1100px){.metrics{grid-template-columns:repeat(2,1fr)}.dashboard-grid{grid-template-columns:1fr}}@media(max-width:600px){.metrics{grid-template-columns:1fr 1fr;gap:10px}.metrics>div{padding:15px}.metrics small{display:none}.main-column{padding:16px}.session-row{gap:11px}.session-copy strong{max-width:190px}.dashboard-grid{gap:16px}}@media(max-width:420px){.metrics{grid-template-columns:1fr}.metrics small{display:block}}
  `]
})
export class Dashboard implements OnInit {
  readonly auth=inject(AuthService); readonly categories=inject(CategoriesService); readonly formations=inject(FormationsService); readonly sessions=inject(SessionsService);
  readonly categoryIcons=['code','palette','campaign','finance_mode','language'];
  readonly upcoming=computed(()=>this.sessions.sessions().filter(s=>new Date(s.endDate)>=new Date()).sort((a,b)=>a.startDate.localeCompare(b.startDate)).slice(0,3));
  readonly upcomingCount=computed(()=>this.sessions.sessions().filter(s=>new Date(s.endDate)>=new Date()).length);
  ngOnInit():void{this.categories.load();this.formations.load();this.sessions.load();}
}
