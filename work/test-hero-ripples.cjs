'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('outputs/shine-skin/hero-ripples.js','utf8');
function environment(options={}){
  const events={},heroEvents={},canvasEvents={},frames=new Map(),calls={layout:0,contexts:0,draws:0,images:0};
  let now=0,id=0,observer;
  const gl=new Proxy({
    getShaderParameter:()=>options.shader!==false,getProgramParameter:()=>true,
    getUniformLocation:(_,key)=>key,
    uniform4fv:(_,values)=>{calls.drops=Array.from(values);},
    drawArrays:()=>calls.draws++,
  },{get:(target,key)=>key in target?target[key]:(/^[A-Z_0-9]+$/.test(key)?1:()=>({}))});
  const rect={left:20,top:-200,width:2089,height:1408};
  const hero={getBoundingClientRect:()=>{calls.layout++;return rect;},addEventListener:(key,cb)=>heroEvents[key]=cb};
  const canvas={width:300,height:150,hidden:true,dataset:{state:'idle'},getContext:()=>{calls.contexts++;return options.webgl===false?null:gl;},addEventListener:(key,cb)=>canvasEvents[key]=cb};
  const media={matches:options.fine!==false,addEventListener:(key,cb)=>events.media=cb};
  const document={hidden:false,body:{classList:{contains:()=>Boolean(options.paused)}},querySelector:key=>key==='.hero'?hero:canvas,addEventListener:(key,cb)=>events[key]=cb};
  const images=[];
  const sandbox={document,navigator:{connection:{saveData:Boolean(options.saveData)}},matchMedia:()=>media,scrollX:0,scrollY:200,Float32Array,Math,Boolean,Error,
    performance:{now:()=>now},requestAnimationFrame:cb=>{frames.set(++id,cb);return id;},cancelAnimationFrame:key=>frames.delete(key),
    Image:class{constructor(){calls.images++;this.naturalWidth=2304;this.naturalHeight=1728;images.push(this);}},
    ResizeObserver:class{constructor(cb){observer=cb;}observe(){}},
  };
  vm.runInNewContext(source,sandbox);
  return {canvas,document,media,calls,frames,rect,
    move:(x=300,y=400,type='mouse')=>heroEvents.pointermove({pageX:x,pageY:y,pointerType:type}),
    load:()=>images[0].onload(),step:ms=>{now=ms;const batch=[...frames.values()];frames.clear();batch.forEach(cb=>cb(now));},
    time:ms=>now=ms,resize:()=>observer(),motion:playing=>events['shine-motionchange']({detail:{playing}}),
    loseContext:()=>canvasEvents.webglcontextlost({preventDefault(){}}),
  };
}
let checks=0;
function check(name,fn){fn();checks++;console.log('PASS '+name);}
check('lazy start; touch, coarse pointer, data saver and paused preference do not allocate WebGL',()=>{
  for(const options of [{fine:false},{saveData:true},{paused:true},{}]){
    const e=environment(options);assert.equal(e.calls.images,0);e.move(300,400,'touch');assert.equal(e.calls.images,0);
    if(Object.keys(options).length){e.move();assert.equal(e.calls.images,0);}
  }
});
check('document coordinates, render budget, frame cap and no hot-path layout reads',()=>{
  const e=environment();e.move();assert.equal(e.calls.contexts,0);e.load();assert.equal(e.canvas.hidden,false);
  assert.ok(e.canvas.width*e.canvas.height<=1000000);assert.ok(e.canvas.width<=1440);
  const reads=e.calls.layout;e.step(100);assert.equal(e.calls.draws,1);assert.equal(e.calls.drops[0],280);assert.equal(e.calls.drops[1],400);
  e.step(115);assert.equal(e.calls.draws,1);e.step(140);assert.equal(e.calls.draws,2);assert.equal(e.calls.layout,reads);
  e.rect.width=390;e.rect.height=844;e.resize();assert.equal(e.canvas.width,390);assert.equal(e.canvas.height,844);
});
check('bounded waves, finite lifetime and no idle animation loop',()=>{
  const e=environment();e.move();e.load();
  for(let i=1;i<=12;i++){e.time(i*70);e.move(300+i*40,400);}
  e.step(900);assert.equal(e.calls.drops.filter((value,i)=>i%4===3&&value>0).length,6);
  e.step(2600);assert.equal(e.canvas.dataset.state,'idle');assert.equal(e.frames.size,0);
});
check('shared motion control interrupts immediately and resumes only after new mouse input',()=>{
  const e=environment();e.move();e.load();e.step(100);e.motion(false);assert.equal(e.canvas.dataset.state,'idle');assert.equal(e.frames.size,0);
  e.move();assert.equal(e.frames.size,0);e.motion(true);assert.equal(e.frames.size,0);e.move();assert.equal(e.frames.size,1);
  e.document.hidden=true;e.step(200);assert.equal(e.frames.size,0);e.move();assert.equal(e.frames.size,0);
});
check('unavailable WebGL, failed shader and lost context keep the overlay hidden without exceptions',()=>{
  for(const options of [{webgl:false},{shader:false},{}]){
    const e=environment(options);e.move();e.load();if(!Object.keys(options).length)e.loseContext();
    assert.equal(e.canvas.hidden,true);assert.equal(e.canvas.dataset.state,'unavailable');assert.equal(e.frames.size,0);
    e.move();assert.equal(e.calls.images,1);
  }
});
console.log(`${checks} groups passed`);
