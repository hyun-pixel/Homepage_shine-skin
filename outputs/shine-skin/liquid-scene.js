'use strict';
(() => {
  const hero=document.querySelector('.hero');
  const pane=document.querySelector('.hero-copy');
  const canvas=document.querySelector('#liquid-light');
  const video=document.querySelector('#hero-video');
  const stage=document.querySelector('#hero-stage');
  const saveData=Boolean(navigator.connection?.saveData);
  let playing=!document.body.classList.contains('motion-paused');
  let requested=false;
  let ready=false;
  let gl=null;
  let program=null;
  let frame=0;
  let last=0;
  let time=0;
  let uniforms={};
  const backdrop=new Image();

  function updateVideo(){
    if(!video)return;
    if(!playing||saveData){video.pause();return;}
    if(!requested){requested=true;video.src=matchMedia('(max-width:639px)').matches?video.dataset.mobileSrc:video.dataset.src;video.muted=true;video.load();}
    const play=video.play();
    if(play)play.catch(()=>stage.classList.add('autoplay-blocked'));
  }
  video?.addEventListener('playing',()=>{stage.classList.add('video-ready');stage.classList.remove('autoplay-blocked');});
  video?.addEventListener('error',()=>{stage.classList.remove('video-ready');stage.classList.add('video-unavailable');});

  function compile(type,source){
    const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))throw new Error('Glass shader unavailable');
    return shader;
  }
  function initGlass(){
    try{
      gl=canvas.getContext('webgl',{alpha:true,antialias:false,powerPreference:'low-power'});
      if(!gl){canvas.hidden=true;return;}
      const vertex='attribute vec2 a;varying vec2 uv;void main(){uv=a*.5+.5;gl_Position=vec4(a,0.,1.);}';
      const fragment=`precision mediump float;varying vec2 uv;
        uniform sampler2D picture;uniform vec2 imageSize;uniform vec2 sceneSize;uniform vec4 paneRect;uniform float time;
        vec3 sampleScene(vec2 world){float scale=max(sceneSize.x/imageSize.x,sceneSize.y/imageSize.y);vec2 size=imageSize*scale;vec2 offset=(sceneSize-size)*.5;vec2 p=(world-offset)/size;
          vec2 d=vec2(2.2)/size;vec3 c=texture2D(picture,p).rgb*.4;c+=texture2D(picture,p+d).rgb*.15;c+=texture2D(picture,p-d).rgb*.15;c+=texture2D(picture,p+vec2(d.x,-d.y)).rgb*.15;c+=texture2D(picture,p+vec2(-d.x,d.y)).rgb*.15;return c;}
        void main(){vec2 local=vec2(uv.x,1.-uv.y);vec2 p=local*2.-1.;float edge=smoothstep(.60,1.,max(abs(p.x),abs(p.y)));
          vec2 bend=p*edge*19.+vec2(sin(local.y*6.28+time*.24),cos(local.x*6.28-time*.2))*.85;
          vec2 world=paneRect.xy+local*paneRect.zw+bend;
          vec3 c=sampleScene(world);c=mix(c,vec3(.90,.97,1.),.31);
          float rim=pow(abs(p.x),28.)+pow(abs(p.y),28.);c=mix(c,vec3(.97,1.,1.),min(.50,rim*.35));
          c-=vec3(.03,.025,.01)*edge*local.y;gl_FragColor=vec4(c,.94);}`;
      program=gl.createProgram();gl.attachShader(program,compile(gl.VERTEX_SHADER,vertex));gl.attachShader(program,compile(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);
      if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error('Glass program unavailable');
      gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
      const a=gl.getAttribLocation(program,'a');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
      for(const key of ['picture','imageSize','sceneSize','paneRect','time'])uniforms[key]=gl.getUniformLocation(program,key);
      const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,backdrop);
      gl.uniform1i(uniforms.picture,0);gl.uniform2f(uniforms.imageSize,backdrop.naturalWidth,backdrop.naturalHeight);ready=true;resize();schedule();
    }catch{gl=null;canvas.hidden=true;}
  }
  function resize(){
    if(!gl||!ready)return;
    const h=hero.getBoundingClientRect(),p=canvas.getBoundingClientRect();
    const ratio=Math.min(devicePixelRatio,innerWidth<640?1:1.25);
    canvas.width=Math.max(1,Math.round(p.width*ratio));canvas.height=Math.max(1,Math.round(p.height*ratio));
    gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(uniforms.sceneSize,h.width,h.height);gl.uniform4f(uniforms.paneRect,p.left-h.left,p.top-h.top,p.width,p.height);render();
  }
  function render(){if(!gl||!ready)return;gl.uniform1f(uniforms.time,time);gl.drawArrays(gl.TRIANGLES,0,6);}
  function tick(now){
    frame=0;if(!playing||!ready||!gl)return;
    if(!last||now-last>=50){time+=last?Math.min((now-last)/1000,.12):0;last=now;render();}
    frame=requestAnimationFrame(tick);
  }
  function schedule(){if(playing&&ready&&gl&&!frame){last=0;frame=requestAnimationFrame(tick);}}
  document.addEventListener('shine-motionchange',event=>{
    playing=event.detail.playing;updateVideo();
    if(playing)schedule();else{cancelAnimationFrame(frame);frame=0;}
  });
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();cancelAnimationFrame(frame);frame=0;gl=null;canvas.hidden=true;});
  new ResizeObserver(resize).observe(pane);new ResizeObserver(resize).observe(hero);
  backdrop.onload=initGlass;backdrop.onerror=()=>{canvas.hidden=true;};backdrop.src='assets/iris-backdrop-v2.webp';
  updateVideo();
})();
