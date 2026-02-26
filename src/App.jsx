import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gipwqnbqdzkjsgzunvua.supabase.co",
  "sb_publishable_G5sOHMeYI-cLvWFYUo0LQg_vCCZ6twC"
);

const ADMIN_USER = "eric";
const ADMIN_PASS = "Disc*06";

const QUESTIONS = [
  { id:1, options:{a:"Prudent et réfléchi",b:"Loyal et attentif à autrui",c:"Influent et démonstratif",d:"Stratège et entreprenant"}},
  { id:2, options:{a:"Sociable et familier",b:"Honnête et discret",c:"Energique et orienté vers le résultat",d:"Méthodique et logique"}},
  { id:3, options:{a:"Calme et d'humeur égale",b:"Déterminé et aimant diriger",c:"Enjoué et rayonnant",d:"Formaliste et factuel"}},
  { id:4, options:{a:"Sûr de lui et volontaire",b:"Ordonné et concis",c:"Familier et stable",d:"Loquace et de bonne humeur"}},
  { id:5, options:{a:"Perspicace et impartial",b:"Exigeant et direct",c:"Constant et attaché aux valeurs",d:"Actif et liant"}},
  { id:6, options:{a:"Accommodant et serviable",b:"Plein d'espoir et expressif",c:"Puissant et sûr de lui",d:"Pensif et maître de soi"}},
  { id:7, options:{a:"Ouvert et persuasif",b:"Appliqué et sélectif dans ses relations",c:"Ferme et entreprenant",d:"Posé et analytique"}},
  { id:8, options:{a:"Déterminé et résolu",b:"Avenant et jovial",c:"Sensible et amical",d:"Logique et correct"}},
  { id:9, options:{a:"Compatissant et diplomate",b:"Précis et mesuré",c:"Encourageant et ouvert aux idées",d:"Orienté résultat et rapide"}},
  { id:10, options:{a:"Responsable et ferme",b:"Réservé et coopératif",c:"Expansif et imaginatif",d:"Méticuleux et minutieux"}},
  { id:11, options:{a:"Esprit d'équipe et spontané",b:"Contrôlé et rationnel",c:"Aimable et prévenant",d:"Opiniâtre et visant le résultat"}},
  { id:12, options:{a:"Analyste et sceptique",b:"Amical et divertissant",c:"Exigeant et solide",d:"Modeste et fidèle"}},
  { id:13, options:{a:"Attaché à ses proches et calme",b:"Affectif et confiant",c:"Observateur et distant",d:"Actif et contrôlant"}},
  { id:14, options:{a:"Volontaire et tenace",b:"Conforme et sans parti pris",c:"Enthousiaste et attachant",d:"Impliqué et consensuel"}},
  { id:15, options:{a:"Formel et à principes",b:"Jovial et populaire",c:"Modérateur et apaisant",d:"Ferme et tranchant"}},
  { id:16, options:{a:"Animé et persuasif",b:"Décideur et pressé",c:"Analytique et aimant la discipline",d:"Tolérant et calme"}},
  { id:17, options:{a:"Patient et empathique",b:"Logique et mesuré",c:"Orienté résultat et prêt au défi",d:"Ouvert aux idées et arrangeant"}},
  { id:18, options:{a:"Influent et décontracté",b:"Discret et philosophe",c:"Réfléchi et circonspect",d:"Opiniâtre et déterminé"}},
  { id:19, options:{a:"Axé procédures et bien préparé",b:"Courageux et autonome",c:"Extraverti et communicatif",d:"Bienveillant et de bon conseil"}},
  { id:20, options:{a:"Puissant et clair",b:"Spontané et vif",c:"Studieux et raisonné",d:"Paisible et aimant l'harmonie"}},
  { id:21, options:{a:"Organisé et prudent",b:"Patient et serviable",c:"Argumenté et sûr de lui",d:"Interactif et ouvert"}},
  { id:22, options:{a:"Indépendant et audacieux",b:"Souple et harmonieux",c:"Factuel et respectueux des normes",d:"Aimable et vivant"}},
  { id:23, options:{a:"Démonstratif et enthousiaste",b:"Directif et réaliste",c:"Compatissant et prévenant",d:"Attentif et soucieux du détail"}},
  { id:24, options:{a:"Stable et altruiste",b:"Objectif et hardi",c:"Consciencieux et introspectif",d:"Sociable et bon vivant"}},
  { id:25, options:{a:"Détaillé et précautionneux",b:"Direct et carré",c:"Expressif et radieux",d:"Tolérant et ferme"}},
];

const SCORING = [
  {D:"d",I:"c",S:"b",C:"a"},{D:"c",I:"a",S:"b",C:"d"},{D:"b",I:"c",S:"a",C:"d"},
  {D:"a",I:"d",S:"c",C:"b"},{D:"b",I:"d",S:"c",C:"a"},{D:"c",I:"b",S:"a",C:"d"},
  {D:"c",I:"a",S:"b",C:"d"},{D:"a",I:"b",S:"c",C:"d"},{D:"d",I:"c",S:"a",C:"b"},
  {D:"a",I:"c",S:"b",C:"d"},{D:"d",I:"a",S:"c",C:"b"},{D:"c",I:"b",S:"d",C:"a"},
  {D:"d",I:"b",S:"a",C:"c"},{D:"a",I:"c",S:"d",C:"b"},{D:"d",I:"b",S:"c",C:"a"},
  {D:"b",I:"a",S:"d",C:"c"},{D:"c",I:"d",S:"a",C:"b"},{D:"d",I:"a",S:"b",C:"c"},
  {D:"b",I:"c",S:"d",C:"a"},{D:"a",I:"b",S:"d",C:"c"},{D:"c",I:"d",S:"b",C:"a"},
  {D:"a",I:"d",S:"b",C:"c"},{D:"b",I:"a",S:"c",C:"d"},{D:"b",I:"d",S:"a",C:"c"},
  {D:"b",I:"c",S:"d",C:"a"},
];

const PROFILES = {
  D:{label:"Dominant",disc:"D",color:"#E8393A",bg:"rgba(232,57,58,0.12)",tagline:"Directeur · Décideur",quote:"\"Le succès appartient à ceux qui osent agir.\"",description:"Vous êtes une personnalité déterminée, orientée résultats et action. Vous aimez relever des défis, prendre des décisions rapides et avoir le contrôle. Votre leadership naturel et votre assurance vous permettent d'avancer là où d'autres hésitent.",goodDay:["Décidé","Autonome","Courageux","Direct","Leader"],badDay:["Impatient","Autoritaire","Agressif","Intransigeant"],loves:["Compétition","Contrôle","Succès","Défis"],fears:["Perdre le contrôle","L'échec"],dos:["Être direct et aller à l'essentiel","Se concentrer sur les résultats","Proposer des options claires"],donts:["Hésiter sans raison","Se focaliser sur les émotions","Perdre du temps en détails inutiles"],compat:{D:"Deux D ensemble : dynamique et productif, mais attention aux conflits d'ego. Clarifiez les rôles dès le départ.",I:"D + I : duo d'action ! Le D fixe les objectifs, le I motive l'équipe. Le D doit laisser de l'espace à la créativité du I.",S:"D + S : complémentaires. Le D avance vite, le S assure la stabilité. Le D doit ralentir pour ne pas brusquer le S.",C:"D + C : efficace si bien calibré. Le D décide, le C analyse. Le D doit accepter les questions du C comme une valeur, pas un frein."}},
  I:{label:"Influent",disc:"I",color:"#D4A800",bg:"rgba(212,168,0,0.12)",tagline:"Motivateur · Communicant",quote:"\"L'enthousiasme est le moteur de toutes les grandes réussites.\"",description:"Vous rayonnez d'enthousiasme et d'énergie communicative ! Vous aimez interagir, convaincre et inspirer les autres. Optimiste et créatif, vous savez fédérer une équipe et créer une atmosphère positive et dynamique.",goodDay:["Enthousiaste","Persuasif","Sociable","Créatif","Optimiste"],badDay:["Impulsif","Désorganisé","Manipulateur","Imprévisible"],loves:["Reconnaissance","Liberté","Interactions","Nouveauté"],fears:["Le rejet","La routine","L'isolement"],dos:["Être amical et enthousiaste","Valoriser leurs idées","Créer un environnement stimulant"],donts:["Les noyer sous les détails","Imposer une routine","Les isoler"],compat:{D:"I + D : duo d'action ! Le I apporte l'enthousiasme, le D la direction. Bien calibré, c'est imbattable.",I:"Deux I ensemble : énergie et créativité à fond ! Attention à rester focus sur les objectifs concrets.",S:"I + S : duo chaleureux. Le I dynamise, le S stabilise. Le I doit respecter le rythme tranquille du S.",C:"I + C : opposés complémentaires. Le I apporte l'élan, le C la rigueur. Ils doivent apprendre à se respecter mutuellement."}},
  S:{label:"Stable",disc:"S",color:"#3A9E6B",bg:"rgba(58,158,107,0.12)",tagline:"Supporteur · Harmonisateur",quote:"\"La patience est la plus grande des vertus.\"",description:"Vous êtes une personne chaleureuse, fiable et tournée vers les autres. Vous valorisez l'harmonie, la stabilité et la coopération. Votre patience et votre écoute font de vous un pilier essentiel dans toute équipe.",goodDay:["Patient","Fiable","Empathique","Loyal","Calme"],badDay:["Passif","Résistant au changement","Trop conciliant"],loves:["Harmonie","Stabilité","Confiance","Entraide"],fears:["Conflits","Changements brusques","L'instabilité"],dos:["Être patient et à l'écoute","Demander leur avis","Créer un climat de confiance"],donts:["Presser leurs décisions","Profiter de leur gentillesse","Changer sans prévenir"],compat:{D:"S + D : complémentaires. Le S absorbe les tensions créées par le D. Le D doit apprendre à ralentir et écouter.",I:"S + I : duo chaleureux et humain. Excellente ambiance garantie. Attention à ne pas perdre de vue les objectifs.",S:"Deux S ensemble : harmonie parfaite, mais risque d'éviter les conflits nécessaires. Osez vous challenger !",C:"S + C : tous deux introvertis et réfléchis. Bonne complémentarité, mais attention à ne pas manquer d'initiative."}},
  C:{label:"Consciencieux",disc:"C",color:"#1B7FC4",bg:"rgba(27,127,196,0.12)",tagline:"Analyste · Expert",quote:"\"La qualité n'est jamais un accident, c'est le résultat d'un effort intelligent.\"",description:"Vous êtes analytique, méthodique et rigoureux. Vous aimez comprendre en profondeur, vous appuyer sur des données fiables et produire un travail de qualité irréprochable. Votre précision est un véritable atout.",goodDay:["Précis","Organisé","Rigoureux","Fiable","Analytique"],badDay:["Perfectionniste excessif","Sur la défensive","Distant","Anxieux"],loves:["Exactitude","Ordre","Qualité","Logique"],fears:["Erreurs","Désorganisation","Critiques"],dos:["Fournir des données complètes","Mettre les infos par écrit","Respecter les processus"],donts:["Ignorer les détails","Changer les règles sans explication","Précipiter les décisions"],compat:{D:"C + D : efficace si bien calibré. Le C analyse, le D décide. Le C doit accepter que tout ne soit pas parfait.",I:"C + I : opposés complémentaires. Le C structure, le I inspire. Ils s'enrichissent mutuellement s'ils se respectent.",S:"C + S : duo réfléchi et fiable. Tous deux introvertis, ils construisent des relations solides et durables.",C:"Deux C ensemble : travail de haute qualité garanti ! Attention à ne pas tomber dans la sur-analyse et le perfectionnisme."}},
};

function calculateScores(answers){
  const s={D:0,I:0,S:0,C:0};
  QUESTIONS.forEach((q,i)=>{ const c=answers[q.id]; if(!c) return; Object.entries(SCORING[i]).forEach(([col,l])=>{ if(l===c) s[col]++; }); });
  return s;
}
function getDominant(s){ return Object.entries(s).sort((a,b)=>b[1]-a[1])[0][0]; }
function fullName(p){ return [p.name, p.lastname].filter(Boolean).join(" "); }

function exportCSV(participants, teams){
  const headers=["Prénom","Groupe","Profil dominant","Score D","Score I","Score S","Score C","Date"];
  const rows=participants.map(p=>{ const team=teams.find(t=>t.id===p.team_id); return [fullName(p),team?.name||"—",PROFILES[p.dominant]?.label||p.dominant,p.scores?.D||0,p.scores?.I||0,p.scores?.S||0,p.scores?.C||0,new Date(p.created_at).toLocaleDateString("fr-FR")]; });
  const csv=[headers,...rows].map(r=>r.join(";")).join("\n");
  const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="disc_groupes.csv"; a.click();
}

function DonutChart({data}){
  const total=Object.values(data).reduce((a,b)=>a+b,0)||1; let offset=0; const r=40,cx=60,cy=60,stroke=18,circ=2*Math.PI*r;
  const slices=["D","I","S","C"].map(k=>{ const pct=data[k]/total,dash=pct*circ; const sl={key:k,dasharray:`${dash} ${circ-dash}`,offset:circ-offset,color:PROFILES[k].color}; offset+=dash; return sl; });
  return(<svg width="120" height="120" viewBox="0 0 120 120">{slices.map(s=>(<circle key={s.key} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={stroke} strokeDasharray={s.dasharray} strokeDashoffset={s.offset} style={{transform:"rotate(-90deg)",transformOrigin:"60px 60px"}}/>))}<text x={cx} y={cy+5} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">{total}</text><text x={cx} y={cy+18} textAnchor="middle" fill="#666" fontSize="9">total</text></svg>);
}

function QuadrantMap({participants}){
  if(!participants.length) return <div style={{textAlign:"center",color:"#444",padding:"30px 0"}}>Aucun participant</div>;
  return(<div style={{position:"relative",width:"100%",paddingBottom:"100%",maxWidth:380,margin:"0 auto"}}><div style={{position:"absolute",inset:0,border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,overflow:"hidden"}}><div style={{position:"absolute",top:0,left:0,width:"50%",height:"50%",background:"rgba(232,57,58,0.06)"}}/><div style={{position:"absolute",top:0,right:0,width:"50%",height:"50%",background:"rgba(212,168,0,0.06)"}}/><div style={{position:"absolute",bottom:0,left:0,width:"50%",height:"50%",background:"rgba(27,127,196,0.06)"}}/><div style={{position:"absolute",bottom:0,right:0,width:"50%",height:"50%",background:"rgba(58,158,107,0.06)"}}/><div style={{position:"absolute",top:8,left:12,fontSize:11,fontWeight:700,color:"#E8393A",opacity:.7}}>D</div><div style={{position:"absolute",top:8,right:12,fontSize:11,fontWeight:700,color:"#D4A800",opacity:.7}}>I</div><div style={{position:"absolute",bottom:8,left:12,fontSize:11,fontWeight:700,color:"#1B7FC4",opacity:.7}}>C</div><div style={{position:"absolute",bottom:8,right:12,fontSize:11,fontWeight:700,color:"#3A9E6B",opacity:.7}}>S</div><div style={{position:"absolute",top:"50%",left:0,right:0,height:1,background:"rgba(255,255,255,0.07)"}}/><div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:"rgba(255,255,255,0.07)"}}/>{participants.map((p,i)=>{ if(!p.scores) return null; const{D,I,S,C}=p.scores,tot=(D+I+S+C)||1; const x=((D+I)/tot)*100,y=((D+C)/tot)*100; const prof=PROFILES[p.dominant]; return(<div key={i} title={`${fullName(p)} (${prof.disc})`} style={{position:"absolute",left:`${x}%`,top:`${y}%`,transform:"translate(-50%,-50%)",width:28,height:28,borderRadius:"50%",background:prof.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,color:"#fff",cursor:"default",boxShadow:"0 0 0 2px rgba(0,0,0,0.5)",zIndex:2,fontFamily:"'DM Serif Display',serif"}}>{(p.name||"?").charAt(0).toUpperCase()}</div>); })}</div></div>);
}

function FullResult({participant}){
  const{name,scores,dominant}=participant; const prof=PROFILES[dominant]; if(!prof||!scores) return null;
  const displayName=fullName(participant);
  return(<div>
    <div style={{textAlign:"center",marginBottom:32}}>
      <div style={{fontSize:11,color:"#555",letterSpacing:2,textTransform:"uppercase",fontWeight:600,marginBottom:8}}>{displayName}</div>
      <div style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(60px,12vw,100px)",lineHeight:1,color:prof.color,marginBottom:4}}>{prof.disc}</div>
      <div style={{fontFamily:"'DM Serif Display',serif",fontSize:"clamp(20px,4vw,30px)",color:"#fff",marginBottom:6}}>{prof.label}</div>
      <div style={{fontSize:12,color:prof.color,letterSpacing:1,textTransform:"uppercase",fontWeight:600,marginBottom:16}}>{prof.tagline}</div>
      <div style={{fontStyle:"italic",fontSize:14,color:"#777",padding:"12px 20px",borderLeft:`3px solid ${prof.color}`,borderRadius:"0 10px 10px 0",background:"rgba(255,255,255,0.02)",maxWidth:440,margin:"0 auto",textAlign:"left"}}>{prof.quote}</div>
    </div>
    <div style={{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:22,marginBottom:18}}>
      <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#333",marginBottom:14}}>Profil DISC complet</div>
      {Object.entries(PROFILES).map(([key,p])=>(<div key={key} style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}><div style={{width:120,fontSize:13,fontWeight:700,color:p.color,flexShrink:0}}>{p.disc} — {p.label}</div><div style={{flex:1,height:8,background:"rgba(255,255,255,0.05)",borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",borderRadius:4,background:p.color,width:`${(scores[key]/25)*100}%`,transition:"width 1s ease"}}/></div><div style={{width:22,fontSize:13,fontWeight:700,color:p.color,textAlign:"right"}}>{scores[key]}</div></div>))}
    </div>
    <div style={{background:"rgba(255,255,255,0.025)",border:`1px solid ${prof.color}25`,borderRadius:16,padding:22,marginBottom:16}}><p style={{fontSize:15,lineHeight:1.8,color:"#bbb"}}>{prof.description}</p></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
      {[{title:"Dans un bon jour ☀️",items:prof.goodDay,cls:"good"},{title:"Dans un mauvais jour 🌧️",items:prof.badDay,cls:"bad"},{title:"Ce que j'aime 💛",items:prof.loves,cls:"neutral"},{title:"Ce que je crains 😰",items:prof.fears,cls:"bad"}].map(({title,items,cls})=>(<div key={title} style={{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:16}}><div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#444",marginBottom:10}}>{title}</div><div style={{display:"flex",flexWrap:"wrap",gap:6}}>{items.map(t=>(<span key={t} style={{padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:500,background:cls==="good"?"rgba(58,158,107,0.13)":cls==="bad"?"rgba(232,57,58,0.1)":"rgba(255,255,255,0.05)",color:cls==="good"?"#5ecb90":cls==="bad"?"#f87171":"#888"}}>{t}</span>))}</div></div>))}
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
      <div style={{borderRadius:14,padding:16,background:"rgba(58,158,107,0.07)",border:"1px solid rgba(58,158,107,0.18)"}}><div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#5ecb90",marginBottom:10}}>✅ Ce qui fonctionne</div>{prof.dos.map((d,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:7,fontSize:13,lineHeight:1.5,color:"#bbb"}}><span>→</span><span>{d}</span></div>))}</div>
      <div style={{borderRadius:14,padding:16,background:"rgba(232,57,58,0.06)",border:"1px solid rgba(232,57,58,0.18)"}}><div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#f87171",marginBottom:10}}>❌ À éviter</div>{prof.donts.map((d,i)=>(<div key={i} style={{display:"flex",gap:8,marginBottom:7,fontSize:13,lineHeight:1.5,color:"#bbb"}}><span>→</span><span>{d}</span></div>))}</div>
    </div>
    <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#444",marginBottom:12}}>🤝 Compatibilité</div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      {Object.entries(PROFILES).map(([key,p])=>(<div key={key} style={{borderRadius:12,padding:14,background:p.bg,border:`1px solid ${p.color}30`}}><div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:p.color,marginBottom:4}}>{p.disc}</div><div style={{fontSize:11,fontWeight:700,color:p.color,marginBottom:6}}>{p.label}</div><div style={{fontSize:12,lineHeight:1.6,color:"#999"}}>{prof.compat[key]}</div></div>))}
    </div>
  </div>);
}

const css=`
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'DM Sans',sans-serif;background:#0F1117;color:#E8E8E8;min-height:100vh}
  .app{min-height:100vh;display:flex;flex-direction:column}
  .header{padding:15px 28px;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(255,255,255,0.07);position:sticky;top:0;background:rgba(15,17,23,0.96);backdrop-filter:blur(14px);z-index:100}
  .logo-mark{width:32px;height:32px;background:#F5D800;border-radius:7px;display:flex;align-items:center;justify-content:center;font-weight:900;color:#0F1117;font-size:14px}
  .logo-text{font-family:'DM Serif Display',serif;font-size:18px;color:#fff}
  .logo-text span{color:#F5D800}
  .header-nav{margin-left:auto;display:flex;gap:7px}
  .nav-btn{padding:7px 13px;border-radius:20px;border:1px solid rgba(255,255,255,0.1);background:transparent;color:#666;font-size:12px;cursor:pointer;transition:all .2s;font-family:inherit;white-space:nowrap}
  .nav-btn:hover,.nav-btn.active{background:rgba(245,216,0,0.1);border-color:#F5D800;color:#F5D800}
  .nav-btn.admin-btn{border-color:rgba(147,51,234,0.35);color:#9b7fe8}
  .nav-btn.admin-btn:hover,.nav-btn.admin-btn.active{background:rgba(147,51,234,0.12);border-color:#a78bfa;color:#a78bfa}

  /* Welcome */
  .welcome-screen{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 24px;text-align:center}
  .welcome-badge{display:inline-block;background:rgba(245,216,0,0.1);border:1px solid rgba(245,216,0,0.25);color:#F5D800;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;padding:6px 16px;border-radius:20px;margin-bottom:28px}
  .welcome-title{font-family:'DM Serif Display',serif;font-size:clamp(36px,6vw,66px);line-height:1.1;color:#fff;margin-bottom:18px;letter-spacing:-1.5px}
  .welcome-title em{color:#F5D800;font-style:italic}
  .welcome-sub{font-size:16px;color:#666;max-width:440px;line-height:1.75;margin-bottom:36px}
  .disc-badges{display:flex;gap:10px;margin-bottom:40px;justify-content:center;flex-wrap:wrap}
  .disc-badge{padding:8px 18px;border-radius:24px;font-size:13px;font-weight:700;animation:float 3s ease-in-out infinite}
  .disc-badge:nth-child(2){animation-delay:.4s}.disc-badge:nth-child(3){animation-delay:.8s}.disc-badge:nth-child(4){animation-delay:1.2s}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}

  /* Start form */
  .start-form{width:100%;max-width:460px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:28px;text-align:left}
  .form-label{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#555;margin-bottom:8px;display:block}
  .name-input{width:100%;padding:13px 16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#fff;font-size:15px;font-family:inherit;outline:none;transition:border-color .2s;margin-bottom:16px}
  .name-input:focus{border-color:#F5D800}
  .name-input::placeholder{color:#444}
  .group-label{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#555;margin-bottom:8px;display:flex;align-items:center;gap:8px}
  .group-label span{background:rgba(245,216,0,0.1);color:#F5D800;font-size:10px;padding:2px 8px;border-radius:10px;letter-spacing:1px}
  .group-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;margin-bottom:20px}
  .group-card{padding:10px 14px;border-radius:12px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.02);cursor:pointer;transition:all .2s;text-align:center;font-size:13px;font-weight:600;color:#777}
  .group-card:hover{border-color:rgba(255,255,255,0.2);color:#fff;background:rgba(255,255,255,0.04)}
  .group-card.selected{border-color:#F5D800;background:rgba(245,216,0,0.08);color:#F5D800}
  .group-card-none{border-style:dashed;font-weight:400;font-size:12px;color:#444;font-style:italic}
  .group-card-none.selected{border-color:#555;background:rgba(255,255,255,0.03);color:#888}
  .btn-start{width:100%;padding:15px;background:#F5D800;color:#0F1117;border:none;border-radius:12px;font-size:16px;font-weight:700;font-family:inherit;cursor:pointer;transition:all .2s}
  .btn-start:hover{background:#FFE033;transform:translateY(-1px)}
  .btn-start:disabled{opacity:.35;cursor:not-allowed;transform:none}

  /* Quiz */
  .quiz-screen{flex:1;max-width:700px;width:100%;margin:0 auto;padding:32px 24px}
  .progress-info{display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px;color:#555}
  .progress-info span:first-child{color:#F5D800;font-weight:600}
  .progress-track{height:6px;background:rgba(255,255,255,0.05);border-radius:3px;overflow:hidden;display:flex;gap:1px;margin-bottom:28px}
  .progress-seg{height:100%;flex:1;border-radius:2px;transition:background .3s}
  .question-card{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:30px;margin-bottom:18px;animation:slideIn .3s ease}
  @keyframes slideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  .question-number{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#F5D800;margin-bottom:10px}
  .question-text{font-family:'DM Serif Display',serif;font-size:18px;color:#fff;margin-bottom:22px;line-height:1.45}
  .options-grid{display:grid;gap:8px}
  .option-btn{display:flex;align-items:center;gap:13px;padding:14px 17px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:12px;cursor:pointer;transition:all .15s;text-align:left;font-family:inherit;color:#bbb;font-size:15px}
  .option-btn:hover{background:rgba(245,216,0,0.06);border-color:rgba(245,216,0,0.25);color:#fff}
  .option-btn.selected{background:rgba(245,216,0,0.1);border-color:#F5D800;color:#fff}
  .option-letter{width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#555;flex-shrink:0;text-transform:uppercase;transition:all .15s}
  .option-btn.selected .option-letter{background:#F5D800;color:#0F1117}
  .quiz-nav{display:flex;justify-content:space-between;align-items:center;gap:12px}
  .btn-ghost{padding:11px 20px;background:transparent;border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#666;font-size:14px;font-family:inherit;cursor:pointer;transition:all .2s}
  .btn-ghost:hover{border-color:#fff;color:#fff}
  .btn-ghost:disabled{opacity:.3;cursor:not-allowed}
  .q-dots{display:flex;gap:4px;flex-wrap:wrap;justify-content:center;max-width:220px}
  .q-dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,0.07);cursor:pointer;transition:all .2s}
  .q-dot.answered{background:#F5D800}
  .q-dot.current{background:#fff;transform:scale(1.3)}

  /* Results */
  .results-screen{flex:1;max-width:800px;width:100%;margin:0 auto;padding:40px 24px 80px}
  .share-bar{display:flex;gap:10px;justify-content:center;align-items:center;margin-top:28px;flex-wrap:wrap}
  .btn-share{padding:11px 20px;background:rgba(245,216,0,0.1);border:1px solid rgba(245,216,0,0.3);border-radius:12px;color:#F5D800;font-size:13px;font-weight:600;font-family:inherit;cursor:pointer;transition:all .2s}
  .btn-share:hover{background:rgba(245,216,0,0.18)}
  .btn-outline{padding:11px 22px;background:transparent;border:1.5px solid rgba(255,255,255,0.1);border-radius:12px;color:#777;font-size:13px;font-weight:600;font-family:inherit;cursor:pointer;transition:all .2s}
  .btn-outline:hover{border-color:#fff;color:#fff}
  .copy-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#F5D800;color:#0F1117;padding:10px 20px;border-radius:12px;font-size:13px;font-weight:700;z-index:9999;animation:toastIn .3s ease}
  @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
  .saving-msg{font-size:13px;color:#3A9E6B;text-align:center;margin-bottom:14px;padding:8px;background:rgba(58,158,107,0.08);border-radius:8px}

  /* Admin */
  .login-screen{flex:1;display:flex;align-items:center;justify-content:center;padding:40px 24px}
  .login-card{background:rgba(147,51,234,0.06);border:1px solid rgba(147,51,234,0.2);border-radius:24px;padding:48px 40px;width:100%;max-width:400px;text-align:center}
  .login-icon{font-size:40px;margin-bottom:16px}
  .login-title{font-family:'DM Serif Display',serif;font-size:28px;color:#fff;margin-bottom:6px}
  .login-sub{font-size:14px;color:#555;margin-bottom:32px}
  .login-field{width:100%;padding:13px 16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#fff;font-size:15px;font-family:inherit;outline:none;margin-bottom:12px;transition:border-color .2s;display:block}
  .login-field:focus{border-color:#a78bfa}
  .login-field::placeholder{color:#444}
  .btn-admin-login{width:100%;padding:14px;background:linear-gradient(135deg,#7c3aed,#a78bfa);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;transition:all .2s;margin-top:4px}
  .btn-admin-login:hover{opacity:.9;transform:translateY(-1px)}
  .login-error{color:#f87171;font-size:13px;margin-top:10px;padding:8px;background:rgba(232,57,58,0.1);border-radius:8px}
  .admin-screen{flex:1;max-width:1100px;width:100%;margin:0 auto;padding:32px 24px 80px}
  .admin-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px}
  .admin-top h2{font-family:'DM Serif Display',serif;font-size:26px;color:#fff;margin-bottom:3px}
  .admin-top p{color:#444;font-size:13px}
  .admin-tabs{display:flex;gap:0;margin-bottom:24px;border-bottom:1px solid rgba(255,255,255,0.07);flex-wrap:wrap}
  .admin-tab{padding:10px 20px;border:none;border-bottom:2px solid transparent;background:transparent;color:#555;font-size:13px;font-weight:600;font-family:inherit;cursor:pointer;transition:all .2s;margin-bottom:-1px}
  .admin-tab:hover{color:#fff}
  .admin-tab.active{color:#F5D800;border-bottom-color:#F5D800}
  .btn-sm{padding:8px 14px;border-radius:10px;font-size:12px;font-family:inherit;cursor:pointer;transition:all .2s;font-weight:600;border:1px solid}
  .btn-sm.ghost{background:transparent;border-color:rgba(255,255,255,0.12);color:#777}
  .btn-sm.ghost:hover{border-color:#fff;color:#fff}
  .btn-sm.danger{background:rgba(232,57,58,0.08);border-color:rgba(232,57,58,0.25);color:#f87171}
  .btn-sm.danger:hover{background:rgba(232,57,58,0.18)}
  .btn-sm.purple{background:rgba(147,51,234,0.1);border-color:rgba(147,51,234,0.3);color:#a78bfa}
  .btn-sm.purple:hover{background:rgba(147,51,234,0.2)}
  .btn-sm.green{background:rgba(58,158,107,0.1);border-color:rgba(58,158,107,0.3);color:#5ecb90}
  .btn-sm.green:hover{background:rgba(58,158,107,0.2)}
  .btn-sm.yellow{background:rgba(245,216,0,0.1);border-color:rgba(245,216,0,0.3);color:#F5D800}
  .btn-sm.yellow:hover{background:rgba(245,216,0,0.2)}
  .kpi-row{display:grid;grid-template-columns:auto 1fr;gap:16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:20px;margin-bottom:20px;align-items:center}
  .kpi-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
  @media(max-width:600px){.kpi-stats{grid-template-columns:repeat(2,1fr)}.kpi-row{grid-template-columns:1fr}}
  .stat-card{border-radius:14px;padding:16px;text-align:center}
  .stat-num{font-family:'DM Serif Display',serif;font-size:32px;margin-bottom:2px}
  .stat-label{font-size:10px;opacity:.65;font-weight:700;text-transform:uppercase;letter-spacing:1.5px}
  .groups-layout{display:grid;grid-template-columns:260px 1fr;gap:20px}
  @media(max-width:700px){.groups-layout{grid-template-columns:1fr}}
  .groups-sidebar{display:flex;flex-direction:column;gap:8px}
  .group-sidebar-item{padding:12px 16px;border-radius:12px;border:1px solid rgba(255,255,255,0.07);background:rgba(255,255,255,0.02);cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:space-between;gap:8px}
  .group-sidebar-item:hover{border-color:rgba(255,255,255,0.15);background:rgba(255,255,255,0.04)}
  .group-sidebar-item.active{border-color:#F5D800;background:rgba(245,216,0,0.06)}
  .group-sidebar-name{font-weight:600;font-size:14px;color:#fff}
  .group-sidebar-item.active .group-sidebar-name{color:#F5D800}
  .group-sidebar-count{font-size:11px;color:#555;background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:10px;white-space:nowrap}
  .group-add-btn{padding:11px 16px;border-radius:12px;border:1px dashed rgba(255,255,255,0.12);background:transparent;color:#555;font-size:13px;font-family:inherit;cursor:pointer;transition:all .2s;text-align:left;width:100%}
  .group-add-btn:hover{border-color:#F5D800;color:#F5D800}
  .group-detail{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:24px;min-height:300px}
  .group-detail-header{display:flex;align-items:center;gap:12px;margin-bottom:20px;flex-wrap:wrap}
  .group-detail-name{font-family:'DM Serif Display',serif;font-size:22px;color:#fff;flex:1}
  .group-name-edit{font-family:'DM Serif Display',serif;font-size:20px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#fff;padding:6px 12px;outline:none;flex:1}
  .group-name-edit:focus{border-color:#F5D800}
  .mini-stats-row{display:flex;gap:8px;margin-bottom:18px;flex-wrap:wrap}
  .mini-chip-stat{padding:5px 12px;border-radius:20px;font-size:12px;font-weight:700}
  .members-table{width:100%;border-collapse:collapse}
  .members-table th{text-align:left;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#333;padding:8px 10px;border-bottom:1px solid rgba(255,255,255,0.06)}
  .members-table td{padding:10px;border-bottom:1px solid rgba(255,255,255,0.04);font-size:14px;vertical-align:middle}
  .members-table tr:last-child td{border-bottom:none}
  .members-table tr:hover td{background:rgba(255,255,255,0.015)}
  .assign-select{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#aaa;font-size:12px;font-family:inherit;padding:5px 10px;cursor:pointer;outline:none;transition:border-color .2s}
  .assign-select:focus{border-color:#F5D800}
  .assign-select option{background:#1a1d27}
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.82);display:flex;align-items:flex-start;justify-content:center;z-index:500;backdrop-filter:blur(6px);overflow-y:auto;padding:24px}
  .modal-box{background:#13161f;border:1px solid rgba(255,255,255,0.08);border-radius:24px;width:100%;max-width:760px;margin:auto;overflow:hidden;animation:modalIn .35s cubic-bezier(.22,1,.36,1)}
  @keyframes modalIn{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}
  .modal-header{display:flex;align-items:center;justify-content:space-between;padding:18px 24px;border-bottom:1px solid rgba(255,255,255,0.06);position:sticky;top:0;background:#13161f;z-index:10}
  .modal-header h3{font-family:'DM Serif Display',serif;font-size:20px;color:#fff}
  .modal-header p{font-size:12px;color:#555;margin-top:2px}
  .modal-close{width:34px;height:34px;border-radius:10px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#888;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;font-family:inherit;flex-shrink:0}
  .modal-close:hover{background:rgba(255,255,255,0.12);color:#fff}
  .modal-body{padding:28px 24px}
  .confirm-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:1000;backdrop-filter:blur(4px)}
  .confirm-box{background:#1a1d27;border:1px solid rgba(232,57,58,0.3);border-radius:20px;padding:36px;max-width:360px;width:90%;text-align:center}
  .confirm-box h3{font-family:'DM Serif Display',serif;font-size:22px;color:#fff;margin-bottom:10px}
  .confirm-box p{color:#666;font-size:14px;margin-bottom:28px;line-height:1.6}
  .confirm-btns{display:flex;gap:10px;justify-content:center}
  .btn-cancel{padding:11px 22px;background:transparent;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#777;font-size:14px;font-family:inherit;cursor:pointer}
  .btn-cancel:hover{border-color:#fff;color:#fff}
  .btn-confirm-del{padding:11px 22px;background:#E8393A;border:none;border-radius:10px;color:#fff;font-size:14px;font-weight:700;font-family:inherit;cursor:pointer}
  .btn-confirm-del:hover{background:#ff4444}
  .empty{text-align:center;padding:50px 24px;color:#444}
  .empty p{font-size:15px;margin-top:12px}
  .error-msg{background:rgba(232,57,58,0.08);border:1px solid rgba(232,57,58,0.18);color:#f87171;border-radius:10px;padding:12px 16px;font-size:14px;margin-bottom:16px}
  .rt-wrap{background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:16px;overflow:hidden}
  .rt-head{display:grid;grid-template-columns:1fr 130px 160px 110px 110px;padding:10px 16px;border-bottom:1px solid rgba(255,255,255,0.06);font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#333}
  .rt-row{display:grid;grid-template-columns:1fr 130px 160px 110px 110px;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.04);align-items:center;transition:background .15s}
  .rt-row:last-child{border-bottom:none}
  .rt-row:hover{background:rgba(255,255,255,0.02)}
  .mini-chip{padding:3px 7px;border-radius:10px;font-size:11px;font-weight:700}
  .pill{padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;display:inline-block}
  .row-actions{display:flex;gap:5px;align-items:center}
  .btn-icon{width:30px;height:30px;border-radius:8px;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;font-family:inherit;border:1px solid}
  .btn-icon.view{background:rgba(245,216,0,0.08);border-color:rgba(245,216,0,0.2);color:#F5D800}
  .btn-icon.view:hover{background:rgba(245,216,0,0.18)}
  .btn-icon.share{background:rgba(58,158,107,0.08);border-color:rgba(58,158,107,0.2);color:#5ecb90}
  .btn-icon.share:hover{background:rgba(58,158,107,0.18)}
  .btn-icon.del{background:rgba(232,57,58,0.08);border-color:rgba(232,57,58,0.18);color:#f87171}
  .btn-icon.del:hover{background:rgba(232,57,58,0.22);border-color:#f87171}
  @media(max-width:700px){.rt-head{grid-template-columns:1fr 100px 110px}.rt-head .col-sc,.rt-head .col-grp{display:none}.rt-row{grid-template-columns:1fr 100px 110px}.rt-sc,.rt-grp{display:none}}
`;

export default function App(){
  const [view,setView]=useState("welcome");
  const [name,setName]=useState("");
  const [lastname,setLastname]=useState("");
  const [selectedGroupId,setSelectedGroupId]=useState(null); // null = no group (optionnel)
  const [currentQ,setCurrentQ]=useState(0);
  const [answers,setAnswers]=useState({});
  const [scores,setScores]=useState(null);
  const [saving,setSaving]=useState(false);
  const [toast,setToast]=useState(null);
  const [sharedResult,setSharedResult]=useState(null);
  const [participants,setParticipants]=useState([]);
  const [groups,setGroups]=useState([]);
  const [loadingP,setLoadingP]=useState(false);
  const [adminLogged,setAdminLogged]=useState(false);
  const [loginUser,setLoginUser]=useState("");
  const [loginPass,setLoginPass]=useState("");
  const [loginError,setLoginError]=useState("");
  const [adminTab,setAdminTab]=useState("overview");
  const [deleteTarget,setDeleteTarget]=useState(null);
  const [error,setError]=useState(null);
  const [viewingResult,setViewingResult]=useState(null);
  const [selectedGroup,setSelectedGroup]=useState(null);
  const [editingName,setEditingName]=useState(false);
  const [editingNameVal,setEditingNameVal]=useState("");
  const [newGroupName,setNewGroupName]=useState("");
  const [showNewGroup,setShowNewGroup]=useState(false);
  const [deleteGroupTarget,setDeleteGroupTarget]=useState(null);

  useEffect(()=>{
    const hash=window.location.hash;
    if(hash.startsWith("#result/")){ loadSharedResult(hash.slice(8)); }
    // Load groups on mount for welcome screen
    loadGroups();
  },[]);

  useEffect(()=>{
    if(view==="admin"){ loadParticipants(); loadGroups(); }
  },[view]);

  async function loadGroups(){
    try{
      const{data,error}=await supabase.from("teams").select("*").order("name",{ascending:true});
      if(error) throw error;
      setGroups(data||[]);
    }catch(e){console.error(e);}
  }

  async function loadParticipants(){
    setLoadingP(true);
    try{
      const{data,error}=await supabase.from("results").select("*").order("created_at",{ascending:false});
      if(error) throw error;
      setParticipants(data||[]);
    }catch(e){setError("Erreur : "+e.message);}
    setLoadingP(false);
  }

  async function loadSharedResult(id){
    try{
      const{data,error}=await supabase.from("results").select("*").eq("id",id).single();
      if(error||!data) return;
      setSharedResult(data); setView("shared");
    }catch(e){console.error(e);}
  }

  async function saveResult(n,ln,s,groupId){
    setSaving(true);
    try{
      const payload={name:n,lastname:ln||"",scores:s,dominant:getDominant(s)};
      if(groupId) payload.team_id=groupId;
      const{data,error}=await supabase.from("results").insert(payload).select().single();
      if(error) throw error;
      setSaving(false);
      return data?.id;
    }catch(e){console.error(e); setSaving(false);}
  }

  async function deleteOne(id){
    try{
      const{error}=await supabase.from("results").delete().eq("id",id);
      if(error) throw error;
      setParticipants(prev=>prev.filter(p=>p.id!==id));
    }catch(e){setError("Suppression impossible : "+e.message);}
    setDeleteTarget(null);
  }

  async function assignGroup(participantId,groupId){
    try{
      const{error}=await supabase.from("results").update({team_id:groupId||null}).eq("id",participantId);
      if(error) throw error;
      setParticipants(prev=>prev.map(p=>p.id===participantId?{...p,team_id:groupId||null}:p));
    }catch(e){setError("Erreur : "+e.message);}
  }

  async function createGroup(){
    if(!newGroupName.trim()) return;
    try{
      const{data,error}=await supabase.from("teams").insert({name:newGroupName.trim()}).select().single();
      if(error) throw error;
      setGroups(prev=>[...prev,data].sort((a,b)=>a.name.localeCompare(b.name)));
      setNewGroupName(""); setShowNewGroup(false); setSelectedGroup(data);
    }catch(e){setError("Erreur : "+e.message);}
  }

  async function renameGroup(id,name){
    if(!name.trim()) return;
    try{
      const{error}=await supabase.from("teams").update({name:name.trim()}).eq("id",id);
      if(error) throw error;
      setGroups(prev=>prev.map(g=>g.id===id?{...g,name:name.trim()}:g).sort((a,b)=>a.name.localeCompare(b.name)));
      setSelectedGroup(prev=>prev?.id===id?{...prev,name:name.trim()}:prev);
    }catch(e){setError("Erreur : "+e.message);}
    setEditingName(false);
  }

  async function deleteGroup(id){
    try{
      await supabase.from("results").update({team_id:null}).eq("team_id",id);
      const{error}=await supabase.from("teams").delete().eq("id",id);
      if(error) throw error;
      setGroups(prev=>prev.filter(g=>g.id!==id));
      setParticipants(prev=>prev.map(p=>p.team_id===id?{...p,team_id:null}:p));
      if(selectedGroup?.id===id) setSelectedGroup(null);
    }catch(e){setError("Erreur : "+e.message);}
    setDeleteGroupTarget(null);
  }

  function shareParticipant(p){
    const url=`${window.location.origin}${window.location.pathname}#result/${p.id}`;
    navigator.clipboard.writeText(url).then(()=>showToast(`🔗 Lien de ${fullName(p)} copié !`)).catch(()=>{});
  }

  function showToast(msg){ setToast(msg); setTimeout(()=>setToast(null),3000); }

  function handleLogin(e){
    e.preventDefault();
    if(loginUser===ADMIN_USER&&loginPass===ADMIN_PASS){ setAdminLogged(true); setLoginError(""); setView("admin"); }
    else setLoginError("Identifiants incorrects.");
  }

  function startQuiz(e){
    e.preventDefault();
    if(!name.trim()) return;
    setCurrentQ(0); setAnswers({}); setScores(null); setView("quiz");
  }

  async function submitQuiz(){
    const s=calculateScores(answers);
    setScores(s);
    const id=await saveResult(name,lastname,s,selectedGroupId);
    if(id) window.history.replaceState(null,"",`#result/${id}`);
    setView("results");
  }

  const answeredCount=Object.keys(answers).length;
  const dominant=scores?getDominant(scores):null;
  const profile=dominant?PROFILES[dominant]:null;
  const liveTally=Object.entries(answers).reduce((acc,[qId,letter])=>{ const idx=QUESTIONS.findIndex(q=>q.id===parseInt(qId)); if(idx<0) return acc; Object.entries(SCORING[idx]).forEach(([col,l])=>{ if(l===letter) acc[col]=(acc[col]||0)+1; }); return acc; },{D:0,I:0,S:0,C:0});

  const groupMembers=(gId)=>participants.filter(p=>p.team_id===gId);
  const unassigned=participants.filter(p=>!p.team_id);

  return(
    <>
      <style>{css}</style>
      <div className="app">
        <header className="header">
          <div className="logo-mark">D</div>
          <div className="logo-text">DISC <span>Discovery</span></div>
          <nav className="header-nav">
            <button className={`nav-btn ${view!=="admin"&&view!=="adminlogin"?"active":""}`} onClick={()=>{setView("welcome");window.history.replaceState(null,"","#");}}>Passer le test</button>
            <button className={`nav-btn admin-btn ${view==="admin"||view==="adminlogin"?"active":""}`} onClick={()=>adminLogged?setView("admin"):setView("adminlogin")}>🔒 Admin</button>
          </nav>
        </header>

        {/* ── Welcome ── */}
        {view==="welcome"&&(
          <div className="welcome-screen">
            <span className="welcome-badge">Modèle DISC · 25 questions</span>
            <h1 className="welcome-title">Quel est votre<br/><em>profil DISC ?</em></h1>
            <p className="welcome-sub">Identifiez votre style comportemental dominant et apprenez à mieux communiquer avec votre entourage.</p>
            <div className="disc-badges">
              {Object.values(PROFILES).map(p=>(<div key={p.disc} className="disc-badge" style={{background:p.bg,color:p.color,border:`1.5px solid ${p.color}40`}}>{p.disc} — {p.label}</div>))}
            </div>

            <form className="start-form" onSubmit={startQuiz}>
              <label className="form-label">Prénom</label>
              <input className="name-input" type="text" placeholder="Votre prénom..." value={name} onChange={e=>setName(e.target.value)} maxLength={40}/>
              <label className="form-label">Nom</label>
              <input className="name-input" type="text" placeholder="Votre nom..." value={lastname} onChange={e=>setLastname(e.target.value)} maxLength={60}/>

              {groups.length>0&&(
                <>
                  <div className="group-label">
                    Votre groupe
                    <span>Optionnel</span>
                  </div>
                  <div className="group-grid">
                    {groups.map(g=>(
                      <div key={g.id} className={`group-card ${selectedGroupId===g.id?"selected":""}`} onClick={()=>setSelectedGroupId(selectedGroupId===g.id?null:g.id)}>
                        {g.name}
                      </div>
                    ))}
                    <div className={`group-card group-card-none ${selectedGroupId===null?"selected":""}`} onClick={()=>setSelectedGroupId(null)}>
                      Aucun groupe
                    </div>
                  </div>
                </>
              )}

              <button className="btn-start" type="submit" disabled={!name.trim()}>
                Commencer le test →
              </button>
            </form>
          </div>
        )}

        {/* ── Quiz ── */}
        {view==="quiz"&&(
          <div className="quiz-screen">
            <div className="progress-info">
              <span>Question {currentQ+1} / {QUESTIONS.length}</span>
              <span style={{display:"flex",gap:6,alignItems:"center"}}>
                {Object.entries(liveTally).map(([k,v])=>v>0&&<span key={k} style={{fontSize:11,fontWeight:700,color:PROFILES[k].color}}>{k}:{v}</span>)}
              </span>
            </div>
            <div className="progress-track">
              {QUESTIONS.map((q,i)=>{const ans=answers[q.id];let col="rgba(255,255,255,0.07)";if(ans){const disc=Object.entries(SCORING[i]).find(([,l])=>l===ans)?.[0];if(disc) col=PROFILES[disc].color;}return <div key={i} className="progress-seg" style={{background:col}}/>;})}</div>
            <div className="question-card" key={currentQ}>
              <div className="question-number">Question {currentQ+1}</div>
              <div className="question-text">Choisissez la paire d'adjectifs qui vous correspond le mieux :</div>
              <div className="options-grid">
                {Object.entries(QUESTIONS[currentQ].options).map(([letter,text])=>(
                  <button key={letter} className={`option-btn ${answers[QUESTIONS[currentQ].id]===letter?"selected":""}`}
                    onClick={()=>{const newA={...answers,[QUESTIONS[currentQ].id]:letter};setAnswers(newA);if(currentQ<QUESTIONS.length-1) setTimeout(()=>setCurrentQ(c=>c+1),260);}}>
                    <span className="option-letter">{letter}</span><span>{text}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="quiz-nav">
              <button className="btn-ghost" onClick={()=>setCurrentQ(c=>c-1)} disabled={currentQ===0}>← Précédent</button>
              <div className="q-dots">{QUESTIONS.map((q,i)=>(<div key={i} className={`q-dot ${answers[q.id]?"answered":""} ${i===currentQ?"current":""}`} onClick={()=>setCurrentQ(i)}/>))}</div>
              {currentQ<QUESTIONS.length-1
                ?<button className="btn-ghost" onClick={()=>setCurrentQ(c=>c+1)} disabled={!answers[QUESTIONS[currentQ].id]}>Suivant →</button>
                :<button className="btn-start" style={{padding:"11px 22px",width:"auto"}} onClick={submitQuiz} disabled={answeredCount<QUESTIONS.length}>{saving?"Enregistrement...":"Voir mes résultats ✨"}</button>}
            </div>
          </div>
        )}

        {/* ── Results & Shared ── */}
        {(view==="results"&&scores&&profile)||(view==="shared"&&sharedResult)?(
          <div className="results-screen">
            {view==="results"&&saving&&<div className="saving-msg">✓ Résultat enregistré{selectedGroupId?" dans votre groupe":""}</div>}
            {view==="shared"&&<div style={{textAlign:"center",marginBottom:8}}><span style={{fontSize:11,color:"#555",letterSpacing:2,textTransform:"uppercase",fontWeight:600}}>Profil partagé</span></div>}
            <FullResult participant={view==="results"?{name,lastname,scores,dominant}:sharedResult}/>
            <div className="share-bar">
              {view==="results"&&<button className="btn-share" onClick={()=>{navigator.clipboard.writeText(window.location.href).then(()=>showToast("🔗 Lien copié !"));}}>🔗 Partager mon profil</button>}
              {view==="shared"&&<button className="btn-start" style={{padding:"12px 24px"}} onClick={()=>{setView("welcome");window.history.replaceState(null,"","#");}}>Passer le test à mon tour →</button>}
              <button className="btn-outline" onClick={()=>{setView("welcome");window.history.replaceState(null,"","#");}}>Recommencer</button>
            </div>
          </div>
        ):null}

        {/* ── Admin Login ── */}
        {view==="adminlogin"&&(
          <div className="login-screen">
            <div className="login-card">
              <div className="login-icon">🔐</div>
              <h2 className="login-title">Espace Admin</h2>
              <p className="login-sub">Accès réservé à l'administrateur</p>
              <form onSubmit={handleLogin}>
                <input className="login-field" type="text" placeholder="Identifiant" value={loginUser} onChange={e=>setLoginUser(e.target.value)} autoComplete="username"/>
                <input className="login-field" type="password" placeholder="Mot de passe" value={loginPass} onChange={e=>setLoginPass(e.target.value)} autoComplete="current-password"/>
                <button className="btn-admin-login" type="submit">Se connecter</button>
                {loginError&&<div className="login-error">⚠️ {loginError}</div>}
              </form>
            </div>
          </div>
        )}

        {/* ── Admin ── */}
        {view==="admin"&&adminLogged&&(
          <div className="admin-screen">
            <div className="admin-top">
              <div><h2>🔒 Portail Admin</h2><p>{participants.length} participant{participants.length>1?"s":""} · {groups.length} groupe{groups.length>1?"s":""}</p></div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <button className="btn-sm green" onClick={()=>exportCSV(participants,groups)}>⬇ Export CSV</button>
                <button className="btn-sm purple" onClick={()=>{setAdminLogged(false);setLoginUser("");setLoginPass("");setView("welcome");}}>Déconnexion</button>
              </div>
            </div>

            <div className="admin-tabs">
              {[{id:"overview",label:"📊 Vue d'ensemble"},{id:"groups",label:"👥 Groupes"},{id:"results",label:"📋 Tous les résultats"}].map(t=>(
                <button key={t.id} className={`admin-tab ${adminTab===t.id?"active":""}`} onClick={()=>setAdminTab(t.id)}>{t.label}</button>
              ))}
            </div>

            {error&&<div className="error-msg">⚠️ {error}</div>}

            {/* Overview */}
            {adminTab==="overview"&&(
              <>
                <div className="kpi-row">
                  <DonutChart data={participants.reduce((acc,p)=>{acc[p.dominant]=(acc[p.dominant]||0)+1;return acc;},{D:0,I:0,S:0,C:0})}/>
                  <div className="kpi-stats">
                    {Object.entries(PROFILES).map(([key,p])=>{ const count=participants.filter(pt=>pt.dominant===key).length; return(<div key={key} className="stat-card" style={{background:p.bg,border:`1px solid ${p.color}30`,padding:"14px"}}><div className="stat-num" style={{color:p.color,fontSize:28}}>{count}</div><div className="stat-label" style={{color:p.color}}>{p.disc} · {p.label}</div></div>); })}
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12,marginTop:8}}>
                  {groups.map(g=>{
                    const members=groupMembers(g.id);
                    const tally=members.reduce((acc,p)=>{acc[p.dominant]=(acc[p.dominant]||0)+1;return acc;},{D:0,I:0,S:0,C:0});
                    return(<div key={g.id} style={{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:18,cursor:"pointer"}} onClick={()=>{setAdminTab("groups");setSelectedGroup(g);}}>
                      <div style={{fontWeight:700,fontSize:15,color:"#fff",marginBottom:2}}>{g.name}</div>
                      <div style={{fontSize:12,color:"#555",marginBottom:14}}>{members.length} membre{members.length>1?"s":""}</div>
                      {members.length>0?(
                        <div style={{display:"flex",alignItems:"center",gap:12}}>
                          <DonutChart data={tally}/>
                          <div style={{flex:1}}>
                            {Object.entries(PROFILES).map(([k,p])=>{ const c=tally[k]||0; const pct=Math.round((c/members.length)*100); return c>0&&<div key={k} style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}><span style={{fontSize:11,fontWeight:700,color:p.color,width:20}}>{p.disc}</span><div style={{flex:1,height:5,background:"rgba(255,255,255,0.05)",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:p.color,width:`${pct}%`}}/></div><span style={{fontSize:10,color:"#555",width:28,textAlign:"right"}}>{c} ({pct}%)</span></div>; })}
                          </div>
                        </div>
                      ):<span style={{fontSize:12,color:"#333"}}>Vide</span>}
                    </div>);
                  })}
                  {unassigned.length>0&&(<div style={{background:"rgba(255,255,255,0.015)",border:"1px dashed rgba(255,255,255,0.08)",borderRadius:14,padding:18}}><div style={{fontWeight:700,fontSize:15,color:"#555",marginBottom:4}}>Sans groupe</div><div style={{fontSize:12,color:"#444"}}>{unassigned.length} participant{unassigned.length>1?"s":""}</div></div>)}
                </div>
              </>
            )}

            {/* Groups */}
            {adminTab==="groups"&&(
              <div className="groups-layout">
                <div className="groups-sidebar">
                  {groups.map(g=>(
                    <div key={g.id} className={`group-sidebar-item ${selectedGroup?.id===g.id?"active":""}`} onClick={()=>{setSelectedGroup(g);setEditingName(false);}}>
                      <div><div className="group-sidebar-name">{g.name}</div><div style={{fontSize:11,color:"#555",marginTop:2}}>{groupMembers(g.id).length} membre{groupMembers(g.id).length>1?"s":""}</div></div>
                      <span className="group-sidebar-count">{groupMembers(g.id).length}</span>
                    </div>
                  ))}
                  {showNewGroup?(
                    <div style={{padding:"10px 12px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(245,216,0,0.3)",borderRadius:12}}>
                      <input autoFocus style={{width:"100%",background:"transparent",border:"none",outline:"none",color:"#fff",fontSize:14,fontFamily:"inherit",marginBottom:8}} placeholder="Nom du groupe..." value={newGroupName} onChange={e=>setNewGroupName(e.target.value)} onKeyDown={e=>{if(e.key==="Enter") createGroup(); if(e.key==="Escape"){setShowNewGroup(false);setNewGroupName("");}}}/>
                      <div style={{display:"flex",gap:6}}><button className="btn-sm yellow" onClick={createGroup} style={{flex:1}}>Créer</button><button className="btn-sm ghost" onClick={()=>{setShowNewGroup(false);setNewGroupName("");}}>✕</button></div>
                    </div>
                  ):(
                    <button className="group-add-btn" onClick={()=>setShowNewGroup(true)}>+ Nouveau groupe</button>
                  )}
                </div>

                <div className="group-detail">
                  {!selectedGroup?(<div className="empty"><span style={{fontSize:40}}>👥</span><p>Sélectionnez un groupe<br/>ou créez-en un nouveau.</p></div>):(
                    <>
                      <div className="group-detail-header">
                        {editingName?(
                          <><input className="group-name-edit" autoFocus value={editingNameVal} onChange={e=>setEditingNameVal(e.target.value)} onKeyDown={e=>{if(e.key==="Enter") renameGroup(selectedGroup.id,editingNameVal); if(e.key==="Escape") setEditingName(false);}}/><button className="btn-sm yellow" onClick={()=>renameGroup(selectedGroup.id,editingNameVal)}>✓</button><button className="btn-sm ghost" onClick={()=>setEditingName(false)}>✕</button></>
                        ):(
                          <><div className="group-detail-name">{selectedGroup.name}</div><button className="btn-sm ghost" onClick={()=>{setEditingName(true);setEditingNameVal(selectedGroup.name);}}>✏️ Renommer</button><button className="btn-sm danger" onClick={()=>setDeleteGroupTarget(selectedGroup.id)}>🗑 Supprimer</button></>
                        )}
                      </div>
                      {groupMembers(selectedGroup.id).length>0&&(
                        <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:16,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:14,padding:16,marginBottom:18,alignItems:"center"}}>
                          <DonutChart data={groupMembers(selectedGroup.id).reduce((acc,p)=>{acc[p.dominant]=(acc[p.dominant]||0)+1;return acc;},{D:0,I:0,S:0,C:0})}/>
                          <div>
                            <div style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"#333",marginBottom:10}}>Répartition DISC</div>
                            <div className="mini-stats-row" style={{marginBottom:0}}>
                              {Object.entries(PROFILES).map(([k,p])=>{ const c=groupMembers(selectedGroup.id).filter(m=>m.dominant===k).length; const pct=Math.round((c/groupMembers(selectedGroup.id).length)*100); return c>0&&<div key={k} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><span className="mini-chip-stat" style={{background:p.bg,color:p.color,border:`1px solid ${p.color}30`,minWidth:36,textAlign:"center"}}>{p.disc} {c}</span><div style={{flex:1,height:6,background:"rgba(255,255,255,0.05)",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:p.color,width:`${pct}%`,transition:"width .8s ease"}}/></div><span style={{fontSize:11,color:"#555",width:32,textAlign:"right"}}>{pct}%</span></div>; })}
                            </div>
                          </div>
                        </div>
                      )}
                      {groupMembers(selectedGroup.id).length===0?(<div className="empty" style={{padding:"30px 0"}}><p style={{color:"#555"}}>Aucun membre dans ce groupe pour l'instant.</p></div>):(
                        <table className="members-table">
                          <thead><tr><th>Participant</th><th>Profil</th><th>Scores</th><th>Actions</th></tr></thead>
                          <tbody>
                            {groupMembers(selectedGroup.id).map(p=>{ const prof=PROFILES[p.dominant]; return(
                              <tr key={p.id}>
                                <td><div style={{fontWeight:600,color:"#fff"}}>{fullName(p)}</div><div style={{fontSize:11,color:"#444"}}>{new Date(p.created_at).toLocaleDateString("fr-FR")}</div></td>
                                <td><span className="pill" style={{background:prof.color,color:"#fff"}}>{prof.disc} — {prof.label}</span></td>
                                <td><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{p.scores&&Object.entries(PROFILES).map(([k,pr])=>(<span key={k} className="mini-chip" style={{background:pr.color+"18",color:pr.color}}>{k}{p.scores[k]}</span>))}</div></td>
                                <td><div className="row-actions">
                                  <button className="btn-icon view" onClick={()=>setViewingResult(p)} title="Voir résultat">👁</button>
                                  <button className="btn-icon share" onClick={()=>shareParticipant(p)} title="Partager">🔗</button>
                                  <button className="btn-icon del" onClick={()=>assignGroup(p.id,null)} title="Retirer du groupe">✕</button>
                                </div></td>
                              </tr>
                            );})}
                          </tbody>
                        </table>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* All results */}
            {adminTab==="results"&&(
              <>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:10}}>
                  <div style={{fontSize:13,color:"#555"}}>Assignez un groupe via le menu · 👁 voir · 🔗 partager</div>
                  <div style={{display:"flex",gap:8}}>
                    <button className="btn-sm ghost" onClick={loadParticipants}>↻ Actualiser</button>
                    {participants.length>0&&<button className="btn-sm danger" onClick={()=>setDeleteTarget("all")}>🗑 Tout supprimer</button>}
                  </div>
                </div>
                {loadingP?<div className="empty"><p>Chargement...</p></div>
                :participants.length===0?<div className="empty"><span style={{fontSize:40}}>📭</span><p>Aucun résultat.</p></div>
                :(<div className="rt-wrap">
                  <div className="rt-head"><span>Participant</span><span className="col-grp">Groupe</span><span className="col-sc">Scores</span><span>Profil</span><span>Actions</span></div>
                  {participants.map(p=>{ const prof=PROFILES[p.dominant]; return(
                    <div key={p.id} className="rt-row">
                      <div><div style={{fontWeight:600,color:"#fff",fontSize:14}}>{fullName(p)}</div><div style={{fontSize:11,color:"#444"}}>{new Date(p.created_at).toLocaleDateString("fr-FR",{day:"2-digit",month:"short",year:"numeric"})}</div></div>
                      <div className="rt-grp">
                        <select className="assign-select" value={p.team_id||""} onChange={e=>assignGroup(p.id,e.target.value||null)}>
                          <option value="">— Sans groupe —</option>
                          {groups.map(g=>(<option key={g.id} value={g.id}>{g.name}</option>))}
                        </select>
                      </div>
                      <div className="rt-sc" style={{display:"flex",gap:4,flexWrap:"wrap"}}>{p.scores&&Object.entries(PROFILES).map(([k,pr])=>(<span key={k} className="mini-chip" style={{background:pr.color+"18",color:pr.color}}>{k}{p.scores[k]}</span>))}</div>
                      <div><span className="pill" style={{background:prof.color,color:"#fff"}}>{prof.disc} — {prof.label}</span></div>
                      <div className="row-actions">
                        <button className="btn-icon view" onClick={()=>setViewingResult(p)}>👁</button>
                        <button className="btn-icon share" onClick={()=>shareParticipant(p)}>🔗</button>
                        <button className="btn-icon del" onClick={()=>setDeleteTarget(p.id)}>✕</button>
                      </div>
                    </div>
                  );})}
                </div>)}
              </>
            )}
          </div>
        )}

        {/* Result modal */}
        {viewingResult&&(
          <div className="modal-overlay" onClick={e=>{if(e.target.classList.contains("modal-overlay")) setViewingResult(null);}}>
            <div className="modal-box">
              <div className="modal-header">
                <div><h3>Résultat — {fullName(viewingResult)}</h3><p>{new Date(viewingResult.created_at).toLocaleDateString("fr-FR",{day:"2-digit",month:"long",year:"numeric"})} · {groups.find(g=>g.id===viewingResult.team_id)?.name||"Sans groupe"}</p></div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <button className="btn-sm green" onClick={()=>shareParticipant(viewingResult)}>🔗 Partager</button>
                  <button className="modal-close" onClick={()=>setViewingResult(null)}>✕</button>
                </div>
              </div>
              <div className="modal-body"><FullResult participant={viewingResult}/></div>
            </div>
          </div>
        )}

        {/* Confirm delete */}
        {deleteTarget&&(
          <div className="confirm-overlay">
            <div className="confirm-box">
              <h3>Confirmer la suppression</h3>
              <p>{deleteTarget==="all"?`Supprimer les ${participants.length} résultats ?`:"Supprimer ce résultat ?"} Action irréversible.</p>
              <div className="confirm-btns">
                <button className="btn-cancel" onClick={()=>setDeleteTarget(null)}>Annuler</button>
                <button className="btn-confirm-del" onClick={()=>{ if(deleteTarget==="all"){supabase.from("results").delete().neq("id","00000000-0000-0000-0000-000000000000").then(()=>{setParticipants([]);setDeleteTarget(null)});}else deleteOne(deleteTarget); }}>Supprimer</button>
              </div>
            </div>
          </div>
        )}

        {/* Confirm delete group */}
        {deleteGroupTarget&&(
          <div className="confirm-overlay">
            <div className="confirm-box">
              <h3>Supprimer le groupe ?</h3>
              <p>Les membres seront désassignés mais leurs résultats conservés.</p>
              <div className="confirm-btns">
                <button className="btn-cancel" onClick={()=>setDeleteGroupTarget(null)}>Annuler</button>
                <button className="btn-confirm-del" onClick={()=>deleteGroup(deleteGroupTarget)}>Supprimer</button>
              </div>
            </div>
          </div>
        )}

        {toast&&<div className="copy-toast">{toast}</div>}
      </div>
    </>
  );
}
