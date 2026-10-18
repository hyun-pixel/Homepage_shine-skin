'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('outputs/shine-skin/hero-ripples.js','utf8');
function environment(options={}){
  const events={},heroEvents={},canvasEvents={},frames=new Map(),calls={layout:0,contexts:0,draws:0,images:0,shaders:[]};
  let now=0,id=0,observer;
  const gl=new Proxy({
    getShaderParameter:()=>options.shader!==false,getProgramParameter:()=>true,
    getUniformLocation:(_,key)=>key,
    shaderSource:(_,text)=>calls.shaders.push(text),
    uniform4fv:(_,values)=>{calls.drops=Array.from(values);},
    drawArrays:()=>calls.draws++,
  },{get:(target,key)=>key in target?target[key]:(/^[A-Z_0-9]+$/.test(key)?1:()=>({}))});
  const rect={left:20,top:-200,width:2089,height:1408};
  const hero={getBoundingClientRect:()=>{calls.layout++;return rect;},addEventListener:(key,cb)=>heroEvents[key]=cb};
  const canvas={width:300,height:150,hidden:true,dataset:{state:'idle'},getContext:(_,attributes)=>{calls.contexts++;calls.contextAttributes=attributes;return options.webgl===false?null:gl;},addEventListener:(key,cb)=>canvasEvents[key]=cb};
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

// Real GPU checks complement the mocked lifecycle checks above.
// Generate with --webgl, serve the repository root, then open the printed path.
if(process.argv.includes('--webgl')){
  const e=environment();e.move();e.load();
  const setup=JSON.stringify({vertex:e.calls.shaders[0],fragment:e.calls.shaders[1],attributes:e.calls.contextAttributes});
  const page=`<!doctype html><html lang="en"><meta charset="utf-8"><title>Ripple WebGL regression check</title><pre id="result">RUNNING</pre><script>
  const setup=${setup},results=[];
  try{
    for(const precision of ['preferred','mediump']){
      const canvas=document.createElement('canvas');canvas.width=256;canvas.height=176;
      const gl=canvas.getContext('webgl',setup.attributes);if(!gl)throw Error('WebGL unavailable');
      const compile=(type,source)=>{const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(shader));return shader;};
      const fragment=precision==='mediump'?setup.fragment.replace(/#ifdef GL_FRAGMENT_PRECISION_HIGH[\\s\\S]*?#endif/,'precision mediump float;'):setup.fragment;
      const program=gl.createProgram();gl.attachShader(program,compile(gl.VERTEX_SHADER,setup.vertex));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);
      if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
      gl.useProgram(program);gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
      const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
      gl.bindTexture(gl.TEXTURE_2D,gl.createTexture());gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([100,160,210,255]));
      gl.uniform1i(gl.getUniformLocation(program,'picture'),0);gl.uniform2f(gl.getUniformLocation(program,'imageSize'),2304,1728);gl.viewport(0,0,canvas.width,canvas.height);
      for(const size of [[1280,720],[2089,1408],[3840,2160]]){
        for(const state of ['idle','active','overlapping','faded']){
          const drops=new Float32Array(24),[width,height]=size;
          if(state==='active')drops.set([width*.5,height*.5,.65,.9]);
          if(state==='overlapping')for(let i=0;i<6;i++)drops.set([width*.5+i*18,height*.5+i*12,.3+i*.1,.9],i*4);
          if(state==='faded')drops.set([width*.5,height*.5,1.7,.9]);
          gl.uniform2f(gl.getUniformLocation(program,'sceneSize'),width,height);gl.uniform4fv(gl.getUniformLocation(program,'drops[0]'),drops);
          gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.drawArrays(gl.TRIANGLES,0,6);
          const pixels=new Uint8Array(canvas.width*canvas.height*4);gl.readPixels(0,0,canvas.width,canvas.height,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
          let active=0,invalid=0,maximumAlpha=0;
          for(let i=0;i<pixels.length;i+=4){const alpha=pixels[i+3];if(alpha)active++;maximumAlpha=Math.max(maximumAlpha,alpha);if(pixels[i]>alpha||pixels[i+1]>alpha||pixels[i+2]>alpha)invalid++;}
          if(invalid||maximumAlpha>225)throw Error('Invalid transparent output: '+precision+' '+size+' '+state);
          if(['idle','faded'].includes(state)?active!==0:active===0||active>canvas.width*canvas.height*.55)throw Error('Unexpected ripple footprint: '+precision+' '+size+' '+state);
          if(gl.getError()!==gl.NO_ERROR)throw Error('WebGL draw error');
          results.push({precision,size,state,activePixels:active,invalidPixels:invalid,maximumAlpha});
        }
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
    document.querySelector('#result').textContent=JSON.stringify({result:'PASS',checks:results.length,results},null,2);
  }catch(error){document.querySelector('#result').textContent=JSON.stringify({result:'FAIL',error:error.message,results},null,2);}
  </script></html>`;
  fs.mkdirSync('work/final-qa',{recursive:true});fs.writeFileSync('work/final-qa/ripple-render-check.html',page);
  console.log('Open /work/final-qa/ripple-render-check.html on a server rooted at this repository to run 24 real WebGL checks.');
}
