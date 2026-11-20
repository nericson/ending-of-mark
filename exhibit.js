'use strict';
const byId = id => document.getElementById(id);
const all = selector => Array.from(document.querySelectorAll(selector));
const greekText = window.MARK_DATA.greek;
const englishText = {
  8:'They went out and fled from the tomb, for trembling and astonishment had seized them. They said nothing to anyone, for they were afraid.',
  brief:'They briefly reported everything they had been told to those around Peter. Afterward Jesus himself sent out through them, from east to west, the holy and imperishable proclamation of eternal salvation. Amen.',
  9:'After rising early on the first day of the week, he appeared first to Mary Magdalene, from whom he had cast out seven demons.',
  10:'She went and told those who had been with him, as they mourned and wept.',
  11:'When they heard that he was alive and had been seen by her, they did not believe it.',
  12:'After this he appeared in a different form to two of them as they were walking into the countryside.',
  13:'They went back and told the rest, but the rest did not believe them either.',
  14:'Later he appeared to the Eleven while they were at table. He reproached them for their unbelief and hardness of heart, because they had not believed those who had seen him after he was raised.',
  15:'He said to them, “Go into all the world and proclaim the good news to all creation.',
  16:'Whoever believes and is baptized will be saved, but whoever does not believe will be condemned.',
  17:'These signs will accompany those who believe. In my name they will cast out demons. They will speak in new tongues.',
  18:'They will pick up snakes, and if they drink anything deadly it will do them no harm. They will lay hands on the sick, and they will recover.”',
  19:'Then the Lord Jesus, after speaking to them, was taken up into heaven and sat down at the right hand of God.',
  20:'They went out and proclaimed the message everywhere. The Lord worked with them and confirmed the word through the signs that accompanied it.'
};
const readings = [
  {name:'At verse 8', kind:'The tomb narrative', label:'Mark 16:8', numbers:[8], note:'The last γάρ explains the women’s silence. Resurrection has already been announced in verse 6, and the meeting in Galilee has been promised in verse 7.'},
  {name:'The brief supplement',kind:'An unnumbered conclusion',label:'After Mark 16:8',numbers:['brief'], note:'This short paragraph moves from the women’s silence to a report reaching Peter’s circle. Codex Regius places it before the Longer Ending. The Old Latin Codex Bobiensis has the brief conclusion alone after a modified verse 8.'},
  {name:'The Longer Ending',kind:'Twelve additional verses',label:'Mark 16:9–20',numbers:[9,10,11,12,13,14,15,16,17,18,19,20],note:'The text moves from appearances to a commission, ascension, and worldwide preaching. It never identifies an appearance as taking place in Galilee. Irenaeus explicitly cites verse 19 as Mark around AD 180.'}
];
let readingIndex=0, language='en', expanded=false;
const choices=byId('reading-options');
readings.forEach((r,i)=>{
 const b=document.createElement('button'); b.type='button'; b.className='read-btn';
 b.innerHTML='<span>'+r.name+'</span><small>'+r.kind+'</small>';
 b.addEventListener('click',()=>{readingIndex=i;expanded=false;renderReading()}); choices.append(b);
});
function renderReading(){
 const r=readings[readingIndex], long=r.numbers.length>3;
 const list=long&&!expanded?r.numbers.slice(0,3):r.numbers;
 byId('passage-label').textContent=r.label;byId('reading-note').textContent=r.note;
 Array.from(choices.children).forEach((b,i)=>b.setAttribute('aria-pressed',i===readingIndex));
 all('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===language));
 const body=document.createElement('div');body.className='verse-lines';body.lang=language==='en'?'en':'grc';
 const source=language==='en'?englishText:greekText;
 list.forEach(n=>{const p=document.createElement('p');if(typeof n==='number'){const v=document.createElement('sup');v.textContent=n;p.append(v)}p.append(document.createTextNode(source[n]));body.append(p)});
 const container=byId('read-text');container.replaceChildren(body);
 if(long){const b=document.createElement('button');b.className='more';b.type='button';b.textContent=expanded?'Show opening verses':'Read all twelve verses';b.setAttribute('aria-expanded',expanded);b.onclick=()=>{expanded=!expanded;renderReading();byId('read-text').querySelector('.more').focus({preventScroll:true})};container.append(b)}
}
all('[data-lang]').forEach(b=>b.onclick=()=>{language=b.dataset.lang;renderReading()});
renderReading();
const hypotheses=[
 ['Mark intended to stop at 16:8','At the tomb the young man announces that Jesus has risen. Fear is a recognizable response to revelation in Mark. The final clause makes grammatical sense and leaves the audience holding the promise given to the disciples.','The meeting in Galilee is predicted at 14:28 and promised again at 16:7. Peter is named. An audience could reasonably expect to see that encounter.','Elizabeth Shively on narrative expectations','https://doi.org/10.1353/cbq.2018.0051'],
 ['An original final scene was lost','A Galilean reunion would resolve a specific promise in the narrative. A loss before surviving witnesses diverged would account for the same boundary in later copies.','No surviving witness gives us the wording of such a Markan scene. Matthew’s Galilean appearance can show what a fulfillment looks like, but it cannot reconstruct a missing page.','Robert Stein on the Galilee promise','https://www.galaxie.com/article/bbr18-1-04'],
 ['Mark wrote verses 9–20','The Longer Ending has a wide transmission and appears early enough for Irenaeus to quote it. Features such as unbelief and worldwide proclamation continue themes elsewhere in Mark.','Verse 9 resets the time and introduces Mary Magdalene afresh. That cluster of changes falls precisely where the manuscripts diverge. The twelve verses themselves never name the promised meeting place.','Nicholas Lunn’s defense of the Longer Ending','https://doi.org/10.2307/j.ctt1cgf5pt']
];
const makeLink=(url,label)=>{const a=document.createElement('a');a.href=url;a.textContent=label;a.target='_blank';a.rel='noopener';return a};
hypotheses.forEach((h,i)=>{
 const d=document.createElement('details');d.open=i===0;const s=document.createElement('summary');s.textContent=h[0];d.append(s);
 const body=document.createElement('div');body.className='hyp-body';
 [['The case for it',h[1]],['The difficulty',h[2]]].forEach(([label,copy],j)=>{const section=document.createElement('div');const heading=document.createElement('h4');heading.textContent=label;const p=document.createElement('p');p.textContent=copy;section.append(heading,p);if(!j)section.append(makeLink(h[4],h[3]));body.append(section)});
 d.append(body);byId('hypotheses').append(d)
});
const historyItems=[
 ['c. 170','Tatian’s Gospel harmony','The arrangement of the resurrection material in later Latin and Arabic harmonies suggests that Tatian knew substantial portions of the Longer Ending. This evidence depends on reconstructing an earlier harmony.','Nicholas Zola’s study','https://doi.org/10.25592/uhhfdm.12541'],
 ['c. 180','Irenaeus names Mark','Irenaeus quotes 16:19 near the end of Mark’s Gospel and connects Christ’s enthronement to Psalm 110:1. His explicit attribution predates the great fourth-century Greek codices.','Against Heresies 3.10.5','https://www.newadvent.org/fathers/0103310.htm'],
 ['4th century','Eusebius knows both forms','Asked how to reconcile the resurrection accounts, Eusebius offers two answers. One appeals to copies ending at verse 8. The other retains verse 9 and punctuates it differently. Jerome subsequently draws on the same discussion.','To Marinus 1, pp. 96–101','https://bibletranslation.ws/down/Eusebius_Gospel_problems_and_solutions_2010.pdf'],
 ['Early versions','Syriac, Latin, and Coptic readers','The Sinaitic Syriac ends at verse 8 and immediately begins Luke. The fragmentary Curetonian Syriac preserves verses 17b–20. The fifth-century Sahidic manuscript sa 1 closes Mark after verse 8. Revised Sahidic forms transmit both supplements.','Boud’hors and Torallas Tovar on Coptic evidence','https://doi.org/10.25592/uhhfdm.12451'],
 ['2026 study','A Georgian palimpsest','Jost Gippert identifies traces of verses 17 and 20 in the erased text of Tbilisi A-844, a seventh- or eighth-century palimpsest. He calls for multispectral verification. If confirmed, the find moves the Georgian history of the Longer Ending back several centuries.','Gippert, pp. 44–45','https://titus.uni-frankfurt.de/personal/jg/pdf/jg2025e.pdf']
];
historyItems.forEach((h,i)=>{const d=document.createElement('details');d.className='history-item';d.open=i===1;const s=document.createElement('summary');s.innerHTML='<span class="history-date">'+h[0]+'</span><span class="history-name">'+h[1]+'</span>';const p=document.createElement('p');p.append(h[2]+' ',makeLink(h[4],h[3]));d.append(s,p);byId('history-list').append(d)});
const num = new Intl.NumberFormat('en-US');
const slider=byId('threshold'),sample=byId('sample');
function renderStudy(){
 const n=Number(slider.value),counts=window.MARK_DATA.samples[sample.value];
 const total=counts.reduce((a,b)=>a+b),meets=counts.slice(n).reduce((a,b)=>a+b),peak=Math.max(...counts);
 byId('chart-scale').textContent='Passages per bar · scale 0–'+num.format(peak);
 const hist=byId('hist');hist.replaceChildren();
 counts.forEach((c,i)=>{const b=document.createElement('span');b.className='bar'+(i>=n?' hit':'');b.style.height=(c/peak*100)+'%';b.title=i+' exclusive headwords: '+num.format(c)+' passages';hist.append(b)});
 byId('threshold-val').value=String(n);byId('threshold-val').textContent=n;
 const pct=(meets/total*100).toFixed(1);
 byId('sample-result').innerHTML='<b>'+pct+'%</b> of passages ('+num.format(meets)+' of '+num.format(total)+') have at least '+n+' exclusive headword'+(n===1?'':'s')+'.';
 hist.setAttribute('aria-label','Histogram of the number of passages by exclusive headwords. '+pct+' percent reach the selected threshold of '+n+'.');
}
slider.addEventListener('input',renderStudy);sample.addEventListener('change',renderStudy);byId('reset-study').onclick=()=>{slider.value=16;renderStudy()};renderStudy();
const bibliog=[
 ['Manuscripts and critical editions',[
 ['NTVMR · Regius, fol. 113r, transcription','https://ntvmr.uni-muenster.de/community/vmr/api/transcript/get/?docID=20019&indexContent=Mark%2016:6-9&pageID=2300&format=html'],
 ['NTVMR · Sinaiticus, Mark 16, full-page transcription','https://ntvmr.uni-muenster.de/community/api/transcript/get/?docID=20001&indexContent=Mark.16&format=tei&fullPage=true'],
 ['Vatican Library · Vat. gr. 1209, p. 1303','https://digi.vatlib.it/view/MSS_Vat.gr.1209/1307'],
 ['Institute for New Testament Textual Research · The Editio Critica Maior of Mark','https://ntvmr.uni-muenster.de/intfblog/-/blogs/ecm-mark-has-arrived'],
 ['MARK16 · Manuscript evidence and scribal commentary','https://ntvmr.uni-muenster.de/web/mark16/mark16']]],
 ['Textual and narrative arguments',[
 ['Patrick Andrist · Codicology of Sinaiticus, Vaticanus, and Alexandrinus (2022)','https://doi.org/10.25592/uhhfdm.12434'],
 ['H. A. G. Houghton · The catena manuscripts GA 239 and 304 (2023)','https://doi.org/10.1017/S0028688522000224'],
 ['Mina Monier · A different reading of GA 304 (2025), pp. 130–32','https://brill.com/display/book/9789004738799/BP000008.pdf'],
 ['Elizabeth E. Shively · How an ancient audience might hear 16:8 (2018)','https://doi.org/10.1353/cbq.2018.0051'],
 ['Robert H. Stein · The promise of a meeting in Galilee (2008)','https://www.galaxie.com/article/bbr18-1-04'],
 ['Nicholas P. Lunn · A defense of Markan authorship (2014)','https://doi.org/10.2307/j.ctt1cgf5pt'],
 ['Joan E. Taylor · A historical case for the priority of the Longer Ending (2022)','https://doi.org/10.25592/uhhfdm.12466']]],
 ['Greek text and vocabulary data',[
 ['SBL Greek New Testament · Michael W. Holmes, ed. © 2010 Society of Biblical Literature and Logos Bible Software','https://sblgnt.com/'],
 ['SBLGNT license · CC BY 4.0. Apparatus marks and brackets omitted for display. English renderings by the project.','https://creativecommons.org/licenses/by/4.0/'],
 ['James K. Tauber, ed. · MorphGNT: SBLGNT Edition, v6.12 (2017)','https://doi.org/10.5281/zenodo.376200'],
 ['Pinned Mark data file · MorphGNT 6.12; parsing and lemmatization licensed CC BY-SA 3.0','https://github.com/morphgnt/sblgnt/blob/6.12/62-Mk-morphgnt.txt']]],
 ['Facsimiles and image credits',[
 ['Sinaiticus · Kirsopp and Helen Lake, 1911 facsimile, fol. 228r. Public domain.','https://archive.org/details/per_the-ancient-biblical-manuscripts_codex-sinaiticus-new-te_helen-and-kirsopp-lake/page/n92/mode/1up'],
 ['Vaticanus · Vercellone and Cozza, 1868 typographical facsimile, p. 69, reproduced 1982. Manuscript p. 1303.','https://archive.org/details/CodexVaticanusNT/page/n69/mode/1up'],
 ['Vaticanus gallery detail · Scrivener, 1894, plate VIII. Lithograph after a photograph by Burgon.','https://archive.org/details/aplainintroducti00scriuoft/page/n138/mode/1up'],
 ['Regius · Folio photograph taken in 1869 and published in John W. Burgon, The Last Twelve Verses (1871). Public domain.','https://www.gutenberg.org/files/26134/26134-h/26134-h.html'],
 ['Washingtonianus · Henry A. Sanders, 1912 facsimile, plate 193a. Public domain. The hero shows a toned detail.','https://commons.wikimedia.org/wiki/File:Codex_Washingtonianus_W_(032)_Mk_16,12-17.JPG'],
 ['Washingtonianus · Following page with verse 20, plate 193b','assets/washingtonianus-end.webp'],
 ['Saints Mark and Luke · Freer Gallery of Art, F1906.298. Public-domain reproduction via Wikimedia Commons.','https://commons.wikimedia.org/wiki/File:St._Mark_and_St.Luke%3B_Right_cover_of_The_Washington_Manuscript_of_the_Gospels.jpg']]]
];
bibliog.forEach(([title,entries])=>{const d=document.createElement('details');d.className='source-group';const s=document.createElement('summary');s.textContent=title;const ul=document.createElement('ul');entries.forEach(([label,url])=>{const li=document.createElement('li');li.append(makeLink(url,label));ul.append(li)});d.append(s,ul);byId('source-list').append(d)});
const menu=document.querySelector('.mobile-menu'),nav=byId('mainnav');
function toggleMenu(open){menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open)}
menu.addEventListener('click',()=>toggleMenu(menu.getAttribute('aria-expanded')!=='true'));
nav.addEventListener('click',()=>toggleMenu(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){toggleMenu(false);menu.focus()}});
function setNav(){let current='#top';const map=[['top','#top'],['manuscripts','#manuscripts'],['readings','#readings'],['argument','#argument'],['word-study','#argument'],['reception','#argument'],['sources','#sources']];
 map.forEach(([id,target])=>{if(byId(id).getBoundingClientRect().top<window.innerHeight*.38)current=target});
 if(Math.ceil(window.scrollY+window.innerHeight)>=document.documentElement.scrollHeight-2)current='#sources';
 all('#mainnav a').forEach(a=>{const on=a.getAttribute('href')===current;a.classList.toggle('nav-active',on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
}
let scheduled=false;window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{setNav();scheduled=false})}},{passive:true});setNav();
