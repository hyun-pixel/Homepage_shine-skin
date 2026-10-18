'use strict';
(() => {
  const hero=document.querySelector('.hero'),canvas=document.querySelector('#hero-ripples');
  if(!hero||!canvas)return;
  const finePointer=matchMedia('(hover:hover) and (pointer:fine)');
  const saveData=Boolean(navigator.connection?.saveData);
  const maxDrops=6,lifetime=1700,frameInterval=1000/30;
  const values=new Float32Array(maxDrops*4);
  let playing=!document.body.classList.contains('motion-paused');
  let gl,program,uniforms,ready=false,loading=false,failed=false;
  let drops=[],pending=null,frame=0,lastFrame=0,lastDrop=-Infinity,lastPoint=null;
  let originX=0,originY=0,width=0,height=0,scale=1;
  const canRun=()=>playing&&finePointer.matches&&!saveData&&!document.hidden;

  function clear(){
    cancelAnimationFrame(frame);frame=0;drops=[];pending=null;lastPoint=null;lastDrop=-Infinity;
    if(gl){gl.disable(gl.SCISSOR_TEST);gl.clear(gl.COLOR_BUFFER_BIT);}
    if(ready)canvas.dataset.state='idle';
  }
  function measure(){
    if(!ready)return;
    const rect=hero.getBoundingClientRect();
    originX=rect.left+scrollX;originY=rect.top+scrollY;width=rect.width;height=rect.height;
    if(!width||!height){clear();return;}
    scale=Math.min(1,1440/width,Math.sqrt(1000000/(width*height)));
    const pixelsWide=Math.max(1,Math.floor(width*scale)),pixelsHigh=Math.max(1,Math.floor(height*scale));
    if(canvas.width!==pixelsWide||canvas.height!==pixelsHigh){
      clear();canvas.width=pixelsWide;canvas.height=pixelsHigh;
      gl.viewport(0,0,pixelsWide,pixelsHigh);gl.uniform2f(uniforms.sceneSize,width,height);
    }
  }
  function shader(type,source){
    const result=gl.createShader(type);gl.shaderSource(result,source);gl.compileShader(result);
    if(!gl.getShaderParameter(result,gl.COMPILE_STATUS))throw new Error('Ripple shader unavailable');
    return result;
  }
  function fail(){clear();failed=true;ready=false;canvas.hidden=true;canvas.dataset.state='unavailable';}
  function init(){
    if(loading||failed)return;
    loading=true;
    const image=new Image();
    image.onerror=fail;
    image.onload=()=>{
      try{
        gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:false,antialias:false,powerPreference:'low-power'});
        if(!gl){fail();return;}
        const vertex='attribute vec2 position;varying vec2 uv;void main(){uv=position*.5+.5;gl_Position=vec4(position,0.,1.);}';
        const fragment=`precision mediump float;varying vec2 uv;
          uniform sampler2D picture;uniform vec2 imageSize;uniform vec2 sceneSize;uniform vec4 drops[6];
          void main(){
            vec2 point=vec2(uv.x,1.-uv.y)*sceneSize;vec2 offset=vec2(0.);float sheen=0.;float coverage=0.;
            for(int i=0;i<6;i++){
              if(drops[i].w>0.){
                vec2 delta=point-drops[i].xy;float distance=length(delta);float age=drops[i].z;
                float front=14.+age*185.;float band=front-distance;
                float fade=smoothstep(0.,.08,age)*(1.-smoothstep(.9,1.7,age));
                float envelope=exp(-abs(band)*.027)*fade*drops[i].w;
                float wave=sin(band*.115)*envelope;vec2 normal=delta/max(distance,1.);
                offset+=normal*wave*8.;sheen+=wave*(.10+dot(normal,vec2(-.6,-.8))*.055);
                coverage=max(coverage,envelope*1.25);
              }
            }
            float cover=max(sceneSize.x/imageSize.x,sceneSize.y/imageSize.y);vec2 size=imageSize*cover;
            vec2 samplePoint=(point+offset-(sceneSize-size)*.5)/size;
            vec3 color=texture2D(picture,samplePoint).rgb;
            float veil=.12*clamp(1.-point.x/(sceneSize.x*.62),0.,1.);
            color=mix(color,vec3(.859,.941,.973),veil)+vec3(sheen*.88,sheen*.97,sheen);
            gl_FragColor=vec4(color,min(.88,coverage));
          }`;
        program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);
        if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error('Ripple program unavailable');
        gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
        const position=gl.getAttribLocation(program,'position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
        uniforms={};for(const key of ['picture','imageSize','sceneSize'])uniforms[key]=gl.getUniformLocation(program,key);
        uniforms.drops=gl.getUniformLocation(program,'drops[0]');
        const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);
        gl.uniform1i(uniforms.picture,0);gl.uniform2f(uniforms.imageSize,image.naturalWidth,image.naturalHeight);gl.clearColor(0,0,0,0);
        const point=pending;ready=true;measure();canvas.hidden=false;
        if(point&&canRun())addDrop(point.pageX-originX,point.pageY-originY,performance.now());
      }catch{fail();}
    };
    image.src='assets/iris-backdrop-v2.webp';
  }
  function addDrop(x,y,now){
    if(x<0||y<0||x>width||y>height)return;
    const distance=lastPoint?Math.hypot(x-lastPoint.x,y-lastPoint.y):80;
    if(now-lastDrop<65||distance<24)return;
    drops.push({x,y,birth:now,strength:Math.min(.9,.5+distance/240)});
    if(drops.length>maxDrops)drops.shift();
    lastDrop=now;lastPoint={x,y};canvas.dataset.state='active';
    if(!frame){lastFrame=0;frame=requestAnimationFrame(tick);}
  }
  function tick(now){
    frame=0;if(!canRun()||!ready){clear();return;}
    drops=drops.filter(drop=>now-drop.birth<lifetime);
    if(!drops.length){clear();return;}
    if(!lastFrame||now-lastFrame>=frameInterval){
      lastFrame=now;values.fill(0);let left=width,top=height,right=0,bottom=0;
      drops.forEach((drop,i)=>{
        const age=(now-drop.birth)/1000,radius=14+age*185+175;
        values.set([drop.x,drop.y,age,drop.strength],i*4);
        left=Math.min(left,drop.x-radius);top=Math.min(top,drop.y-radius);right=Math.max(right,drop.x+radius);bottom=Math.max(bottom,drop.y+radius);
      });
      gl.disable(gl.SCISSOR_TEST);gl.clear(gl.COLOR_BUFFER_BIT);gl.enable(gl.SCISSOR_TEST);
      const x=Math.max(0,Math.floor(left*scale)),y=Math.max(0,Math.floor((height-bottom)*scale));
      gl.scissor(x,y,Math.max(1,Math.min(canvas.width-x,Math.ceil((right-left)*scale))),Math.max(1,Math.min(canvas.height-y,Math.ceil((bottom-top)*scale))));
      gl.uniform4fv(uniforms.drops,values);gl.drawArrays(gl.TRIANGLES,0,6);
    }
    frame=requestAnimationFrame(tick);
  }
  hero.addEventListener('pointermove',event=>{
    if(event.pointerType!=='mouse'||!canRun()||failed)return;
    if(!ready){pending={pageX:event.pageX,pageY:event.pageY};init();return;}
    addDrop(event.pageX-originX,event.pageY-originY,performance.now());
  },{passive:true});
  hero.addEventListener('pointerleave',()=>{lastPoint=null;});
  document.addEventListener('shine-motionchange',event=>{playing=event.detail.playing;if(!canRun())clear();});
  finePointer.addEventListener('change',()=>{if(!canRun())clear();});
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();clear();gl=null;failed=true;ready=false;canvas.hidden=true;canvas.dataset.state='unavailable';});
  new ResizeObserver(measure).observe(hero);
})();
