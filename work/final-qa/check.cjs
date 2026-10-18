'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..'),site=path.join(root,'outputs/shine-skin');
let references=0;
for(const name of ['index.html','styles.css','glass-v2.css','store.css']){
  const text=fs.readFileSync(path.join(site,name),'utf8'),pattern=name.endsWith('.css')?/url\(['"]?([^)'"\s]+)['"]?\)/g:/(?:href|src)="([^"]+)"/g;
  for(const[,value]of text.matchAll(pattern)){if(/^(#|https?:|data:)/.test(value))continue;const file=value.split(/[?#]/)[0];if(file){assert.ok(fs.existsSync(path.resolve(site,decodeURIComponent(file))),`${name}: ${value}`);references++;}}
}
const app=fs.readFileSync(path.join(site,'app.js'),'utf8');
const update=app.slice(app.indexOf('function updateCounts(){'),app.indexOf('\nfunction toast('));
function control(id,withLabel){return{dataset:{wish:id},attributes:{},label:withLabel?{textContent:''}:null,setAttribute(k,v){this.attributes[k]=v;},querySelector(){return this.label;}};}
const buttons=[control('SS08',true),control('SS02',true),control('SS08',false)],nodes={};
const scope={wishes:['SS08'],bag:[{qty:2}],$:selector=>nodes[selector]??=( {textContent:'',hidden:false,setAttribute(k,v){this[k]=v;}} ),$$:()=>buttons,findProduct:id=>({id,name:id})};
vm.createContext(scope);vm.runInContext(update+'\nupdateCounts();',scope);
assert.equal(buttons[0].label.textContent,'찜한 제품에서 빼기');assert.equal(buttons[1].label.textContent,'찜한 제품에 모으기');assert.equal(buttons[2].attributes['aria-pressed'],'true');assert.equal(nodes['#cart-count'].textContent,2);
scope.wishes=[];vm.runInContext('updateCounts()',scope);assert.equal(buttons[0].label.textContent,'찜한 제품에 모으기');assert.equal(buttons[0].attributes['aria-label'],'SS08 찜하기');
const current=fs.readFileSync(path.join(site,'index.html'),'utf8');
const hero=text=>text.slice(text.indexOf('<section class="hero"'),text.indexOf('<section class="routine-section"'));
assert.equal(crypto.createHash('sha256').update(hero(current)).digest('hex'),'3e35794e01a0bfd7515119a69b5072b9d7488167e298cd3c0c6c14629b5b0da0','Approved hero markup must remain unchanged');
const layouts=JSON.parse(fs.readFileSync(path.join(__dirname,'layouts.json')));assert.equal(layouts.length,54);
for(const row of layouts){assert.ok(row.scrollWidth<=row.width);assert.equal(row.unlabeled.length,0);assert.equal(row.unnamedButtons.length,0);assert.equal(row.brokenImages.length,0);assert.equal(row.headings.filter(h=>h[0]==='H1').length,1);}
function luminance(hex){const rgb=hex.slice(1).match(/../g).map(n=>parseInt(n,16)/255).map(n=>n<=.04045?n/12.92:((n+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;}
const contrast=[['primary','#ffffff','#1e5969'],['placeholder','#536f7e','#f7fcff'],['help','#3c6074','#eaf6fb'],['error','#8c3340','#eaf6fb'],['body','#345368','#b9dce9']].map(([name,fg,bg])=>{const l=[luminance(fg),luminance(bg)].sort((a,b)=>b-a),ratio=(l[0]+.05)/(l[1]+.05);assert.ok(ratio>=4.5,`${name}: ${ratio}`);return{name,ratio:Number(ratio.toFixed(2)),note:'Flat-color reference; photo pixels are not measured'};});
const report={result:'PASS',references,wishStates:'PASS',heroMarkup:'UNCHANGED',layouts:layouts.length,contrast};
fs.writeFileSync(path.join(__dirname,'source-checks.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
