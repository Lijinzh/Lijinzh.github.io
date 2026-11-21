// 调研页：同一份评级贯穿型号视图与候选卡；模型仅用于观察几何。
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const model = (key, name, card, dims, thumb, links, options = {}) =>
    ({key, name, card, dims, thumb, links, ...options});
  const models = [
    model('dex5s', '宇树 Dex5-S（标准版）', 'unitree',
      '原厂 102 × 187 × 26 mm，按官网原顺序；不套用到 Pro。',
      '零关节预览中，拇指贴近食指一侧并朝指尖方向伸；从侧面检查背贴能否跨过根部外壳与缝。',
      [['原厂规格', 'https://www.unitree.com/Dex5-S/'], ['右手 URDF 与网格', 'https://github.com/unitreerobotics/unitree_ros/tree/157ff950351e5f535e03c5d85a16b7d594b3dbcc/robots/dexterous_hand_description/dex5_s']]),
    model('shadow', 'Shadow E3M5（Hand E）', 'shadow',
      '原厂全长 449 mm 含前臂，四指并拢宽 90 mm（不含拇指）；预览排除前臂与腕部外件。',
      '默认显示中拇指斜伸向掌侧上方。看拇指根台阶和外壳；这不代表对掌极限。',
      [['原厂技术 PDF', 'https://shadowrobot.com/wp-content/uploads/2025/09/shadow_dexterous_hand_e_technical_specification.pdf#page=4'], ['E3M5 仿真文件', 'https://github.com/google-deepmind/mujoco_menagerie/tree/370c43965323c0944b433b202aac5058b5f907a9/shadow_hand']]),
    model('dex021', '灵巧智能 DexHand021（基础款）', 'item-07',
      '下列模型包络包含腕端外壳，不能当裸手长。另有官方简化 STEP；此结果不适用于 Pro。',
      '官方右手模型中，指端朝 +Z、拇指在 −X 一侧；默认姿态接近横伸。重点用贴片模板查拇指根的横向偏置。',
      [['左右 STEP、URDF 与网格', 'https://github.com/DexRobot/dexrobot_urdf/tree/eb5ecde3c71d5e88964d4bc37685bdaafea8e949']]),
    model('wuji1', '舞肌 Wuji Hand 第一代（实测反例）', 'wuji1',
      '厂商给出 201 × 75 × 50 mm；厂商 STEP 是简化骨架。网页使用含软部件外形的原厂 URDF。',
      '本组实物的拇指布局难让贴片对位，运转时手面过烫。此经验只针对手头第一代，不外推其他产品。',
      [['原厂第一代规格', 'https://docs.wuji.tech/docs/en/wuji-hand/v1/overview.md'], ['原厂模型', 'https://github.com/wuji-technology/wuji-description/tree/ffeb47f18545e135abba4386ff745c940cb8ce28/hand']]),
    model('wuji22', '舞肌 Wuji Hand 2.2（带盖右手）', 'item-16',
      '原厂给出约 180 × 80 × 40 mm，指伸直并拢；其他版本不可套用。',
      '优先从侧面比较 2.2 与第一代的拇指根偏置、背面接线避让，再做相同动作下的实温测试。',
      [['官方规格', 'https://docs.wuji.tech/docs/zh/wuji-hand/latest/overview'], ['2.2 URDF／MJCF', 'https://github.com/wuji-technology/wuji-description/tree/ffeb47f18545e135abba4386ff745c940cb8ce28/hand2/hand2_2']]),
    model('sharpa', 'Sharpa Wave', 'item-05', '页面以静态外包络粗比；未将模型测量当原厂外形公差。',
      '从拇指侧看关节外缘和掌面落差，实际可贴面及可读角度待验机。',
      [['原厂 URDF、USD 与 MJCF', 'https://github.com/sharpa-robotics/sharpa-urdf-usd-xml/tree/main/wave_01/right_sharpa_wave']]),
    model('linker20', '灵心巧手 Linker L20（非 Lite）', 'item-10',
      '官方右手 URDF 的零关节包络含掌底基座，不能套用给 L20 Lite。',
      '默认姿态拇指接近横伸，从侧面核对拇指和掌面落差。原模型中部分关节为 mimic，不能据此当作独立测角。',
      [['原厂 L20 URDF', 'https://github.com/linker-bot/linkerhand-urdf/tree/49f26021b0a91ff5c33150df22970c07bb548672/L20/right']]),
    model('apex', '源升 Apex Hand', 'item-12', '21 个机械轴，16 主动、5 被动；尺寸以同版几何或实物复核。',
      '零关节预览中拇指接近横伸。原厂说明 CMC 有外展、旋转和屈伸，MCP 与 IP 耦合；用模板检验背面能否跨过近端轴。',
      [['原厂左右整手 STP', 'https://github.com/RysenRobotics/rysen-description/tree/7c9fb7d3233f00fcc3cf45a896ec61db597b91d8/apex_hand/cad_models'], ['原厂仿真', 'https://github.com/RysenRobotics/rysen-description/tree/7c9fb7d3233f00fcc3cf45a896ec61db597b91d8/apex_hand']]),
    model('robotis', 'ROBOTIS HX5-D20（Rev2 右手）', 'item-13',
      '取原厂 Rev2 的 MJCF 可视几何；原厂同时提供 Rev1 与 Rev2，选购前核实版本。',
      '从侧面检查根部与外壳，贴面及实测温升暂无确认。',
      [['原厂 Xacro / MJCF 与网格', 'https://github.com/ROBOTIS-GIT/robotis_hand/tree/7730b76bbac51786b122023a7ab2afc17afc7d12/robotis_hand_description']]),
    model('tesollo', 'Tesollo DG-5F-M（右手标准模型）', 'item-14',
      '取原厂 dg5f_right.urdf；移除安装件，非 FT/Short 版本。',
      '查看默认姿态下的拇指根偏置和背壳，按验机模板确认。',
      [['官方 URDF / DAE 与碰撞网格', 'https://github.com/tesollodelto/tesollo_model/tree/2ce9aca00945af09bb1ad038f3f509824167119e/dg5f']]),
    model('revo3', '强脑 Revo 3（U21）', 'revo',
      '原厂 216 × 108 × 50 mm；整机外形口径与腕纹到指尖、四指根掌宽不可直接等同。',
      '可用厂商尺寸图看拇指所在侧；可贴面、对掌路径和发热需实物验收。',
      [['原厂参数及尺寸图', 'https://www.brainco-hz.com/docs/revolimb-hand-dev/revo3/parameters.html'], ['原厂 URDF / MJCF', 'https://github.com/BrainCoTech/brainco-description/tree/main/revo3_system']],
      {reason:'官方几何未给出明确的再发布许可，本页保留原厂模型下载入口。'}),
    model('flex2', '曦诺 Flex 2 / Prima 1（分别下载）', 'item-11',
      '暂无同口径尺寸。两种机型的模型不得互用。',
      '拇指朝向与贴装未核。',
      [['Flex 2 官方 URDF ZIP', 'https://github.com/xynova-tech/Flex2/releases/tag/Urdf-V1.1.0'], ['Prima 1 官方 URDF ZIP', 'https://github.com/xynova-tech/Prima1/releases/tag/URDF-V1.0.2']],
      {reason:'原厂条款限制修改与传播，仅提供原厂链接。'}),
    model('rice-ut', 'UT ReNeu｜单指被动测角夹具', 'cad-ut-fixture',
      '原件含单指、安装座与台面；单指夹具的外形尺寸不涉及手长或掌宽。Rice ZIP 另含单指 SolidWorks 装配。',
      '没有拇指。旋转找指节、轴端与磁编码器布置；网页几何不是可打印 CAD。',
      [['项目原文', 'https://mahilab.rice.edu/research/open-source-passive-instrumented-mannequins-wearable-robots'], ['UT 单指 STEP ZIP', 'https://mahilab.rice.edu/sites/default/files/project-files/UT_ReNeu_Archive_1.zip'], ['Rice 单指 SolidWorks ZIP', 'https://mahilab.rice.edu/sites/default/files/project-files/Rice_MAHI_Archive.zip']],
      {reason:'原件可从项目下载；暂未核实网页预览的再发布许可。', noCompare:true, scope:'单指夹具'}),
    model('icl-hinge', '被动指根铰链｜V2 Hinge', 'cad-passive-hinge',
      'MIT 分件 STEP；为手拨机构的结构零件，不是整指、整手或已装传感器的夹具。',
      '没有拇指。在右侧看指根铰链的构型，轴端要另留编码器和线束空间。',
      [['V2 Hinge STEP / V3 指节 STEP', 'https://github.com/obsdnx/prosthetics-summer-project/tree/04677b052f6310ec065f4a419bd40b92990bad55/cad/step-files']],
      {noCompare:true, scope:'铰链零件'}),
    model('leap2', 'LEAP Hand V2 Advanced｜动力原型', 'cad-leap',
      '右手原厂 URDF 的装配构型；原厂 STEP 为拆散摆放，供 SolidWorks 用。',
      '橙色标出拇指。旋转可查看拇指根与掌内机构；柔性段不能当作单一刚性铰轴。',
      [['原厂 CAD', 'https://v2-adv.leaphand.com/leap_cad'], ['原厂右手 URDF ZIP', 'https://v2-adv.leaphand.com/static/cad/leap_v2_adv_right.zip'], ['右手 STP', 'https://v2-adv.leaphand.com/static/cad/full_hand/leap_v2_full_assembly_right.stp']],
      {noCompare:true}),
    model('orca-v1', 'ORCA Hand v1｜整手总装', 'cad-orca',
      '由作者 v1 整手 STEP 转换；非 v2.1，不将总装外包络当裸手尺寸。',
      '可旋转看根部形态与掌背盖板；静态姿态不能证明实际可贴面或运动范围。',
      [['原厂整手 STEP', 'https://github.com/orcahand/orcahand_hardware/blob/main/orca_v1/ORCA_Assembly/ORCA_v1.step']],
      {noCompare:true}),
    model('newdex', 'New Dexterity｜手部 22 轴', 'cad-newdex',
      '作者整手 STEP 含掌体、五指、腕端机构。',
      '建议看拇指根球窝与背面跨度；单枚编码器无法直接拆分球窝的转动。',
      [['作者整手 STEP', 'https://raw.githubusercontent.com/newdexterity/24dof-robotic-hand/main/CAD/assembly/step/robot_hand_assembly.step']],
      {noCompare:true, reason:'作者提供总装 STEP 下载；暂未核实网页预览的再发布许可。'}),
    model('uji', 'UJI-Hand MK4｜无电机、机械联动', 'cad-uji',
      '作者列整手 STEP 和打印附件，掌罩另有 STL；未测到可以对照的手长与掌宽。',
      '作者说明拇指可另调方向。手指联动，不能直接逐关节做独立扫角。',
      [['作者 STEP 和打印件', 'https://zenodo.org/records/21489522']],
      {reason:'作者列出了整手 STEP；附件端点未成功取得，暂无旋转预览。'}),
    model('maker22', 'MakerWorld｜仿生 22 轴被动手', 'cad-maker22',
      '作者展示可手拨的五指与掌弓；未找到可核的毫米版尺寸和整手 STEP。',
      '作者展示了对掌机构；照片不能确定你的拇指贴片能否贴平。',
      [['作者图片、打印配置', 'https://makerworld.com/en/models/3145492-anatomically-inspired-articulated-robotic-hand']],
      {reason:'仅核到打印发布；现有许可不支持重新分发预览网格。'}),
    model('rapid', '中山大学 RAPID｜动力原型', 'cad-rapid',
      '论文图 13：长 260.5 mm、四指区宽 154 mm、含拇指宽 263.5 mm、掌区厚 45.5 mm。四指区宽不是掌宽；图示明显大于示例人手。',
      '图 13 中拇指横伸。公开结构拇指只有 2 轴，若用于冷态贴装与对掌，需要重做近端。',
      [['论文尺寸图', 'https://arxiv.org/html/2506.07490v1'], ['总装 STEP／分件', 'https://github.com/SYSU-RoboticsLab/RAPID-Hand/tree/main/RapidHandHardware/mechanical_structure']],
      {noCompare:true}),
    model('bidex', 'BiDexHand V4｜腱驱总装', 'cad-bidex',
      '下列为作者 STEP 装配的坐标包络，含腕侧机构，不当成裸手长。',
      '装配中可检查拇指外形与指根位置；拇指 IP 与四长指 PIP/DIP 有耦合。',
      [['作者仓库与分件', 'https://github.com/wengmister/BiDexHand'], ['V4 总装 STEP', 'https://media.githubusercontent.com/media/wengmister/BiDexHand/6cd2c754f53393cad13f752c16c3ea51cfce3b21/cad_asset/_stp/bidexhand%20v4.STEP']],
      {noCompare:true}),
    model('aero', 'Aero Hand Open｜仿真外形', 'cad-aero',
      '预览排除安装架；打印 CAD 和仿真几何为不同资源。',
      '拇指侧看掌壳和根部。腱绳耦合多，不适合直接作为独立 20 多轴测角基准。',
      [['原厂 STEP／3MF', 'https://github.com/Chestnut-Robotics/aero-hand-open/tree/main/hardware/CAD'], ['仿真 MJCF', 'https://github.com/google-deepmind/mujoco_menagerie/tree/370c43965323c0944b433b202aac5058b5f907a9/tetheria_aero_hand_open']])
  ];
  const ratings = [['0','未评级'],['5','★★★★★ 首选'],['4','★★★★ 优先复核'],
    ['3','★★★ 备选'],['2','★★ 仅作结构参考'],['1','★ 暂缓'],['-1','已淘汰']];
  const storageKey = 'avatar-hand-survey-ratings-v1';
  const assets = window.handSurveyMeshes || {};
  const filterEvent = () => document.dispatchEvent(new Event('hand-survey-filter'));

  // 平滑光照、深度遮挡和正投影均在本页计算；无需连外部三维服务。
  function viewer(canvas) {
    const gl = canvas.getContext('webgl', {alpha:true, antialias:true});
    if (!gl) return null;
    const program = gl.createProgram();
    function shader(type, src) {
      const id = gl.createShader(type);
      gl.shaderSource(id, src); gl.compileShader(id);
      if (!gl.getShaderParameter(id, gl.COMPILE_STATUS)) throw Error(gl.getShaderInfoLog(id));
      gl.attachShader(program, id); gl.deleteShader(id);
    }
    shader(gl.VERTEX_SHADER, `
      attribute vec3 p; attribute vec3 n;
      uniform vec4 orbit; uniform vec3 scale;
      varying vec3 normal;
      vec3 rotate(vec3 v) {
        vec3 w=vec3(orbit.x*v.x+orbit.y*v.z,v.y,-orbit.y*v.x+orbit.x*v.z);
        return vec3(w.x,orbit.z*w.y-orbit.w*w.z,orbit.w*w.y+orbit.z*w.z);
      }
      void main(){normal=rotate(n);gl_Position=vec4(rotate(p)*scale,1.);}
    `);
    shader(gl.FRAGMENT_SHADER, `
      precision mediump float;
      uniform vec3 color; varying vec3 normal;
      void main(){
        vec3 n=normalize(normal)*(gl_FrontFacing?1.:-1.);
        float l=.45+.49*max(0.,dot(n,normalize(vec3(-.45,.74,.68))))+.10*max(0.,n.z);
        gl_FragColor=vec4(color*l,1.);
      }
    `);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);
    gl.enable(gl.DEPTH_TEST);
    // 屏幕深度反号使默认正视从模型的 +Z 一侧观察。
    const [orbit, scale, color] = ['orbit','scale','color'].map(name => gl.getUniformLocation(program,name));
    const [pos, nor] = ['p','n'].map(name => gl.getAttribLocation(program,name));
    gl.enableVertexAttribArray(pos); gl.enableVertexAttribArray(nor);
    function decode(encoded, signed) {
      const raw = atob(encoded), bytes = new Uint8Array(raw.length);
      for (let i=0; i<raw.length; i++) bytes[i]=raw.charCodeAt(i);
      const view = new DataView(bytes.buffer);
      return (signed ? Int16Array : Uint16Array).from(
        {length:bytes.length/2}, (_, i) => signed ? view.getInt16(i*2,true) : view.getUint16(i*2,true));
    }
    function buffer(target, data) {
      const id=gl.createBuffer(); gl.bindBuffer(target,id); gl.bufferData(target,data,gl.STATIC_DRAW); return id;
    }
    let parts=[], radius=1, yaw=.38, pitch=-.24, zoom=1, frame=0;
    function paint() {
      frame=0;
      const dpr=Math.min(2,window.devicePixelRatio || 1);
      const w=Math.round(canvas.clientWidth*dpr), h=Math.round(canvas.clientHeight*dpr);
      if (!w || !h || !parts.length) return;
      if (canvas.width!==w || canvas.height!==h) {canvas.width=w; canvas.height=h;}
      gl.viewport(0,0,w,h); gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
      const fit=.88*zoom/radius;
      gl.uniform3f(scale,fit*Math.min(1,h/w),fit*Math.min(1,w/h),-.7/radius);
      gl.uniform4f(orbit,Math.cos(yaw),Math.sin(yaw),Math.cos(pitch),Math.sin(pitch));
      for (const x of parts) {
        gl.uniform3fv(color,x.color);
        gl.bindBuffer(gl.ARRAY_BUFFER,x.p); gl.vertexAttribPointer(pos,3,gl.FLOAT,false,0,0);
        gl.bindBuffer(gl.ARRAY_BUFFER,x.n); gl.vertexAttribPointer(nor,3,gl.FLOAT,false,0,0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,x.f); gl.drawElements(gl.TRIANGLES,x.count,gl.UNSIGNED_SHORT,0);
      }
    }
    function refresh() { if (!frame) frame=requestAnimationFrame(paint); }
    function preset(name) {
      [yaw,pitch]=name==='front'?[0,0]:name==='side'?[Math.PI/2,0]:[.38,-.24];
      zoom=1; refresh();
    }
    new ResizeObserver(refresh).observe(canvas.parentElement);
    let drag=null;
    canvas.addEventListener('pointerdown',e=>{
      if (e.button!==0) return;
      drag=[e.pointerId,e.clientX,e.clientY]; canvas.setPointerCapture(e.pointerId); canvas.focus();
    });
    canvas.addEventListener('pointermove',e=>{
      if (drag?.[0]!==e.pointerId) return;
      yaw+=(e.clientX-drag[1])*.011; pitch+=(e.clientY-drag[2])*.011;
      drag=[e.pointerId,e.clientX,e.clientY]; refresh();
    });
    canvas.addEventListener('lostpointercapture',()=>{drag=null;});
    const zoomBy=factor=>{zoom=Math.max(.58,Math.min(2.6,zoom*factor)); refresh();};
    canvas.addEventListener('wheel',e=>{ e.preventDefault(); zoomBy(Math.exp(-e.deltaY*.0014)); },{passive:false});
    canvas.addEventListener('keydown',e=>{
      const dirs={ArrowLeft:[-.16,0],ArrowRight:[.16,0],ArrowUp:[0,-.16],ArrowDown:[0,.16]};
      if (dirs[e.key]) {const [x,y]=dirs[e.key]; yaw+=x; pitch+=y; refresh();}
      else if (e.key==='+' || e.key==='=') zoomBy(1.15);
      else if (e.key==='-') zoomBy(1/1.15);
      else return;
      e.preventDefault();
    });
    return {preset, load(mesh) {
      for (const p of parts) for (const handle of [p.p,p.n,p.f]) gl.deleteBuffer(handle);
      radius=1; parts=[];
      for (const item of mesh?.parts || []) {
        const xyz=Float32Array.from(decode(item.v,true),x=>x/50), ids=decode(item.f,false);
        const norms=new Float32Array(xyz.length);
        for (let i=0;i<xyz.length;i+=3) radius=Math.max(radius,Math.hypot(xyz[i],xyz[i+1],xyz[i+2]));
        for (let i=0;i<ids.length;i+=3) {
          const a=ids[i]*3,b=ids[i+1]*3,c=ids[i+2]*3;
          const abx=xyz[b]-xyz[a],aby=xyz[b+1]-xyz[a+1],abz=xyz[b+2]-xyz[a+2];
          const acx=xyz[c]-xyz[a],acy=xyz[c+1]-xyz[a+1],acz=xyz[c+2]-xyz[a+2];
          const x=aby*acz-abz*acy,y=abz*acx-abx*acz,z=abx*acy-aby*acx;
          for (const j of [a,b,c]) {norms[j]+=x; norms[j+1]+=y; norms[j+2]+=z;}
        }
        parts.push({p:buffer(gl.ARRAY_BUFFER,xyz),n:buffer(gl.ARRAY_BUFFER,norms),
          f:buffer(gl.ELEMENT_ARRAY_BUFFER,ids),count:ids.length,color:item.thumb?[1,.56,.28]:[.84,.89,.80]});
      }
      preset('reset');
    }};
  }

  // 构造型号资料和卡片控件。未评级不继承厂商优先度；平台与站点之间不共享存储。
  window.initHandSurvey = function () {
    const stored=Object.create(null), fields=new Map(), badges=new Map();
    try {Object.assign(stored,JSON.parse(localStorage.getItem(storageKey) || '{}'));} catch {}
    let persistFailed=false;
    const all=[...document.querySelectorAll('.record, .cad-card')];
    const cards=all.filter(card=>card.classList.contains('cad-card'));
    const minimum=$('min-stars'), choice=$('model-choice'), facts=$('model-facts');
    const status=$('model-message'), stage=$('hand-model'), bar=$('model-bar'), legend=$('model-legend');
    const selected=()=>models.find(m=>m.key===choice.value);
    const pane=$('model-view'), dock=$('model-dock'), dockEmpty=$('dock-empty');
    let activeSlot=null;
    // 单一 GPU 上下文在展开的条目之间移动，浏览整页也不需要为每张卡加载一个上下文。
    function dockTo(slot) {
      if (activeSlot) {
        activeSlot.card.classList.remove('model-active');
        activeSlot.launch.hidden=false;
        activeSlot.close.hidden=true;
        activeSlot.brief.hidden=true;
      }
      activeSlot=slot;
      dockEmpty.hidden=!slot;
      if (slot) {
        slot.card.classList.add('model-active');
        slot.launch.hidden=true;
        slot.close.hidden=false;
        slot.brief.hidden=false;
        slot.slot.append(pane);
      } else {
        dock.append(pane);
      }
    }
    $('return-model').addEventListener('click',()=>{dockTo(null); show(selected()); stage.focus();});
    function inlineModel(card,item,record) {
      const parent=record ? card.querySelector('.detail') : card;
      // 把照片与出处整体放左侧；暂无实拍时，左侧保留说明。
      const photo=parent.querySelector('.gallery');
      if (!photo) return;
      const media=document.createElement('div'), slot=document.createElement('div');
      const left=document.createElement('div'), brief=document.createElement('div');
      media.className='card-media'; slot.className='card-model'; left.className='card-media-copy';
      brief.className='card-model-brief'; brief.hidden=true;
      photo.before(media); left.append(photo,brief); media.append(left,slot);
      const launch=document.createElement('button');
      launch.type='button'; launch.className='card-model-launch';
      const sub=document.createElement('small');
      sub.textContent='可拖动、旋转和缩放';
      launch.append('旋转查看'+(item.scope || '整手'),sub);
      const close=document.createElement('div'); close.className='card-model-buttons'; close.hidden=true;
      const end=document.createElement('button'); end.type='button'; end.textContent='收起模型';
      close.append(item.name,end);
      slot.append(launch,close);
      const target={slot,card,launch,close,brief,key:item.key};
      launch.addEventListener('click',()=>{
        choice.value=item.key; dockTo(target); show(item);
        if (!stage.hidden) stage.focus({preventScroll:true});
      });
      end.addEventListener('click',()=>{dockTo(null); show(selected()); launch.focus({preventScroll:true});});
      if (record) card.addEventListener('toggle',()=>{if (!card.open && activeSlot===target) dockTo(null);});
    }

    function rating(key,label) {
      const wrapper=document.createElement('label'), select=document.createElement('select');
      wrapper.append('我的评级 ',select);
      select.setAttribute('aria-label',label+'：我的评级');
      for (const [v,t] of ratings) select.add(new Option(t,v));
      if (!fields.has(key)) fields.set(key,new Set());
      fields.get(key).add(select); select.value=stored[key] || '0';
      select.addEventListener('change',()=>{
        stored[key]=select.value;
        try {localStorage.setItem(storageKey,JSON.stringify(stored));} catch {persistFailed=true;}
        for (const other of fields.get(key)) other.value=select.value;
        if (badges.has(key)) badges.get(key).textContent=stamp(key);
        filterEvent();
      });
      return wrapper;
    }
    const stamp=key=>stored[key]==='-1'?'已淘汰':'★'.repeat(Math.max(0,Number(stored[key]) || 0));
    let render=null, unavailable=false, current=null, detailRating=null;
    function factsFor(item) {
      const mesh=assets[item.key], title=document.createElement('h3'), list=document.createElement('dl');
      title.textContent=item.name;
      function row(k,v) {
        const dt=document.createElement('dt'),dd=document.createElement('dd');
        dt.textContent=k; dd.textContent=v; list.append(dt,dd);
      }
      const comp=(n,ref)=>{
        if (!ref.checkValidity() || !ref.value) return '';
        const d=Math.round(n)-Number(ref.value);
        return d ? `（比输入${d>0?'大':'小'}约 ${Math.abs(d)} mm）` : '（与输入近似）';
      };
      row('尺寸口径',item.dims);
      if (mesh) {
        const [w,l,t]=mesh.dims.map(x=>Math.round(x/10));
        const msg=item.noCompare ? `投影纵向 ${l} × 横向 ${w} × 厚 ${t} mm。`
          : `纵向约 ${l} mm${comp(l,$('ref-length'))}；含拇外宽约 ${w} mm，厚约 ${t} mm。`
            +(mesh.palm ? `掌体包络宽约 ${mesh.palm} mm${comp(mesh.palm,$('ref-width'))}。` : '');
        row(item.noCompare ? '网页模型包络' : '静态模型粗比',msg);
      }
      row('拇指／贴片',item.thumb);
      const links=document.createElement('p'); links.className='model-links';
      for (const [name,href] of item.links) {
        const a=document.createElement('a'); a.href=href; a.textContent=name+' ↗'; a.target='_blank'; a.rel='noopener noreferrer'; links.append(a);
      }
      for (const [label,path] of window.handSurveyLocalFiles?.[item.key] || []) {
        const a=document.createElement('a'); a.href=path; a.textContent=label+' ↓'; a.download=''; links.append(a);
      }
      const parent=document.getElementById(item.card);
      if (parent) {
        const a=document.createElement('a'); a.href='#'+item.card; a.textContent='原调研卡 ↓'; links.append(a);
      }
      if (!detailRating || current!==item.key) {
        if (detailRating) fields.get(detailRating.key).delete(detailRating.node.querySelector('select'));
        const node=document.createElement('div'); node.className='review-row'; node.append(rating(item.card,item.name));
        detailRating={node,key:item.card};
      }
      facts.replaceChildren(title,list,links,detailRating.node);
      if (activeSlot?.key===item.key) activeSlot.brief.replaceChildren(list.cloneNode(true),links.cloneNode(true));
    }
    function show(item) {
      if (!item) return;
      factsFor(item); current=item.key;
      const mesh=assets[item.key];
      if (mesh && !render && !unavailable) {
        try {render=viewer(stage);} catch (e) {console.warn(e);}
        unavailable=!render;
      }
      const ready=Boolean(render && mesh);
      stage.hidden=bar.hidden=!ready; status.hidden=ready;
      legend.hidden=!ready || !mesh.parts.some(p=>p.thumb);
      if (ready) render.load(mesh);
      else status.textContent=unavailable && mesh ? '当前浏览器无法启用 WebGL。左侧仍可查看尺寸和下载原件。'
        : item.reason || '未附网页网格；左侧可查看原厂文件。';
    }
    choice.replaceChildren();
    choice.disabled=false;
    const modelGroups=['整手可旋转','夹具与零件可旋转','资料与原件入口'].map(label=>{
      const group=document.createElement('optgroup');
      group.label=label; choice.append(group);
      return group;
    });
    for (const m of models) {
      const group=assets[m.key] ? (m.scope ? 1 : 0) : 2;
      modelGroups[group].append(new Option(m.name,m.key));
    }
    $('hand-measure').hidden=false;
    const fromURL=new URLSearchParams(location.search).get('model');
    if (models.some(m=>m.key===fromURL)) choice.value=fromURL;
    choice.addEventListener('change',()=>{dockTo(null); show(selected());});
    for (const id of ['ref-length','ref-width']) $(id).addEventListener('input',()=>factsFor(selected()));
    for (const button of bar.querySelectorAll('button')) button.addEventListener('click',()=>render?.preset(button.dataset.angle));
    for (const card of all) {
      const record=card.classList.contains('record'), name=card.querySelector('.name strong, h4').textContent;
      const tools=document.createElement('div'); tools.className='review-row';
      tools.append(rating(card.id,name));
      const matches=models.filter(m=>m.card===card.id);
      const inline=matches.find(item=>assets[item.key]);
      if (inline) inlineModel(card,inline,record);
      for (const item of matches) {
        if (!assets[item.key] && item.reason) {
          const note=document.createElement('small'); note.textContent=item.reason;
          note.className='model-unavailable';
          (record ? card.querySelector('.detail') : card).append(note);
        }
      }
      for (const item of matches) {
        const button=document.createElement('button'); button.type='button';
        button.textContent='尺寸／文件'+(matches.length>1?' · '+item.name:'');
        button.addEventListener('click',()=>{
          choice.value=item.key; dockTo(null); show(item); $('models').scrollIntoView({block:'start'}); choice.focus({preventScroll:true});
        });
        tools.append(button);
      }
      (record?card.querySelector('.detail'):card).append(tools);
      if (record) {
        const chip=document.createElement('span'); chip.className='review-chip'; chip.textContent=stamp(card.id);
        card.querySelector('.name').append(chip); badges.set(card.id,chip);
      }
    }
    function matches(card) {
      const level=Number(stored[card.id] || 0);
      if (minimum.value==='0') return true;
      if (minimum.value==='not-rejected') return level>=0;
      if (minimum.value==='-1') return level===-1;
      return level>=Number(minimum.value);
    }
    minimum.addEventListener('change',filterEvent);
    $('review-filter').hidden=false;
    show(selected());
    return {matches, resetFilter(){minimum.value='0';}, filterCards() {
      for (const card of cards) card.hidden=!matches(card);
      for (const group of document.querySelectorAll('.cad-group')) group.hidden=!group.querySelector('.cad-card:not([hidden])');
      if (activeSlot && activeSlot.card.hidden) dockTo(null);
      const n=all.filter(card=>matches(card)).length;
      $('review-numbers').textContent=`评级命中 ${n} / ${all.length} 张卡；`
        +(persistFailed?'浏览器未允许保存，本页关闭后评级会丢失。':'评级保存于当前浏览器，不改变原调研优先度。');
    }};
  };
})();
