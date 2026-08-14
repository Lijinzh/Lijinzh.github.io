const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('.nav-toggle');
const navToggleLabel = navToggle?.querySelector('.sr-only');
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const filters = [...document.querySelectorAll('[data-filter]')];
const projectCards = [...document.querySelectorAll('[data-category]')];
const themeToggle = document.querySelector('[data-theme-toggle]');
const themePanel = document.querySelector('[data-theme-panel]');
const themeButtons = [...document.querySelectorAll('[data-theme]')];
const themeScene = document.querySelector('[data-theme-scene]');
const languageButtons = [...document.querySelectorAll('[data-language]')];
const signalOutput = document.querySelector('[data-signal]');

const translations = {
  'zh-CN': {
    pageTitle: 'JinZhe Li · Golden Philosophy',
    'meta.description': 'JinZhe Li（Golden Philosophy）的个人主页：开源项目、机器人与多模态感知研究，以及正在进行的实验。',
    'meta.ogDescription': '把好奇心做成能运行、能验证、能分享的东西。',
    'a11y.skip': '跳到主要内容',
    'a11y.home': '返回首页',
    'a11y.openNav': '打开导航',
    'a11y.closeNav': '关闭导航',
    'a11y.mainNav': '主导航',
    'a11y.language': '语言选择',
    'a11y.publicOverview': '公开资料概览',
    'a11y.filterProjects': '筛选项目',
    'a11y.openTennisRepo': '打开 Tennis Video Helper 仓库',
    'a11y.openReleaseRepo': '打开公开发布仓库',
    'a11y.openRobotRepo': '打开 RobotARMNN 仓库',
    'nav.projects': '开源项目',
    'nav.research': '研究方向',
    'nav.now': '正在研究',
    'nav.theme': '场景',
    'theme.title': 'SELECT ATMOSPHERE',
    'theme.archive.name': '静默档案',
    'theme.archive.note': '冷绿 · 心理惊悚',
    'theme.cathedral.name': '暗金圣堂',
    'theme.cathedral.note': '雨夜 · 神秘黑色幻想',
    'theme.cosmos.name': '深空观测',
    'theme.cosmos.note': '星海 · 科研探索',
    'hero.title': '把好奇心<br /><span>做成能工作的东西。</span>',
    'hero.lead': '我关注机器人、多模态感知、人机交互与可靠 AI 工具，也把研究问题做成能运行、能验证、能分享的开源项目。',
    'hero.projectsCta': '查看开源项目 <b>↓</b>',
    'hero.logCta': '进入研究日志 <b>→</b>',
    'projects.title': '从真实问题出发的<br /><span>开源项目。</span>',
    'projects.lead': '这里不是陈列柜，而是一组持续生长的实验：从视频理解、AI 图像工具到实体交互设备，每个项目都尽量留下代码、文档和可复现的使用路径。',
    'filters.all': '全部项目',
    'filters.perception': '感知与机器人',
    'filters.tool': '工具与自动化',
    'filters.experience': '数字体验',
    'project.tennis.description': '融合音频瞬态、人体姿态与球拍检测，自动理解网球视频中的击球与回合，并使用 GPU 加速导出。',
    'project.gptImage.description': '通过 OpenAI 兼容中转接口与 CC-Switch 使用 GPT-Image 模型，注重可靠调用与 API Key 安全。',
    'project.handle.description': '把快捷输入、语音、状态反馈与 Agent 工作流装进实体手柄；AutoClipboard 与固件通过公开仓库交付。',
    'project.pptx.description': 'Windows 专用 CLI，调用桌面版 PowerPoint 导出指定幻灯片，保留矢量内容并自动裁掉白边，生成适合论文排版的 PDF。',
    'project.robotArm.description': '在 MuJoCo 中研究机械臂逆运动学与逆动力学，对比 MLP、ESN、LSTM、GRU 等模型的表现。',
    'project.travel.description': '从长沙出发的海南旅行规划页面，把路线、预算、体验项目与移动端阅读体验组织在一起。',
    'links.homepage': '项目主页 ↗',
    'links.source': '源代码 ↗',
    'links.guide': '使用指南 ↗',
    'links.learn': '了解项目 ↗',
    'links.releases': '公开发布 ↗',
    'links.experiment': '查看实验 ↗',
    'links.openPage': '打开页面 ↗',
    'alt.tennis': 'Tennis Video Helper 桌面端界面',
    'alt.gptImage': 'GPT Image 2 CLI 项目网站首页',
    'alt.handle': '米白与青绿色背景中的 ZKO AI 编程手柄像素风英雄图',
    'alt.pptx': 'pptx2pdfcrop 网站展示从带白边幻灯片到紧裁切 PDF 的转换',
    'alt.robotArm': 'RobotARMNN 逆动力学模型对比图',
    'alt.travel': 'Travel Planner 网站的海南与东莞旅行计划首页',
    'research.title': '我感兴趣的<br /><span>研究方向。</span>',
    'research.lead': '我更关心不同技术在真实系统里相遇的地方：感知如何变得可信，模型如何进入设备，人又如何自然地与智能系统协作。',
    'research.multimodal.title': '多模态感知',
    'research.multimodal.description': '把声音、视觉、姿态与时序信息组合起来，让机器看懂动态场景。',
    'research.embodied.title': '具身智能与机器人控制',
    'research.embodied.description': '从运动学、动力学到真实硬件，研究模型如何产生可执行的动作。',
    'research.interaction.title': '人机 / Agent 交互',
    'research.interaction.description': '探索按键、语音、状态反馈与自动化之间更直接、更自然的协作方式。',
    'research.reliable.title': '可靠 AI 工具',
    'research.reliable.description': '关注安全配置、可复现流程、失败边界与真实环境中的交付质量。',
    'now.title': '目前正在<br /><span>研究的内容。</span>',
    'now.lead': '这些不是已经盖章的答案，而是正在被实现、测试与修正的问题。仓库是研究记录的一部分。',
    'log.tennis.status': '<span></span> ACTIVE / 持续验证',
    'log.tennis.title': '网球音画融合回合识别',
    'log.tennis.description': '围绕音频峰值、人体姿态、球拍证据与跨批次时序关系，减少误判，同时保留真实击球的识别能力。',
    'log.handle.status': '<span></span> BUILDING / 系统联调',
    'log.handle.title': 'AI 编程手柄与 AutoClipboard',
    'log.handle.description': '继续打磨实体输入设备、桌面软件、固件与 Agent 工作流之间的连接，让频繁操作变成更自然的肌肉记忆。',
    'log.robot.status': '<span></span> EXPERIMENT / 模型对比',
    'log.robot.title': '机械臂神经网络运动学与动力学',
    'log.robot.description': '在仿真环境中比较不同神经网络对逆运动学、逆动力学问题的拟合方式与误差表现。',
    'contact.title': '有意思的问题，<br /><span>一起把它做出来。</span>',
    'contact.lead': '如果你也在研究机器人、计算机视觉、AI 工具，或者只是对某个开源项目有想法，欢迎通过 GitHub 联系我。',
  },
  en: {
    pageTitle: 'JinZhe Li · Golden Philosophy',
    'meta.description': 'The personal homepage of JinZhe Li / Golden Philosophy, featuring open-source projects, robotics and multimodal perception research, and ongoing experiments.',
    'meta.ogDescription': 'Turning curiosity into things that can run, be tested, and be shared.',
    'a11y.skip': 'Skip to main content',
    'a11y.home': 'Back to homepage',
    'a11y.openNav': 'Open navigation',
    'a11y.closeNav': 'Close navigation',
    'a11y.mainNav': 'Main navigation',
    'a11y.language': 'Language selection',
    'a11y.publicOverview': 'Public work overview',
    'a11y.filterProjects': 'Filter projects',
    'a11y.openTennisRepo': 'Open the Tennis Video Helper repository',
    'a11y.openReleaseRepo': 'Open the public releases repository',
    'a11y.openRobotRepo': 'Open the RobotARMNN repository',
    'nav.projects': 'Open Source',
    'nav.research': 'Research',
    'nav.now': 'Now',
    'nav.theme': 'Scene',
    'theme.title': 'SELECT ATMOSPHERE',
    'theme.archive.name': 'Silent Archive',
    'theme.archive.note': 'Cold green · psychological suspense',
    'theme.cathedral.name': 'Amber Cathedral',
    'theme.cathedral.note': 'Rainy night · dark fantasy',
    'theme.cosmos.name': 'Deep-Space Watch',
    'theme.cosmos.note': 'Starfield · research exploration',
    'hero.title': 'Turn curiosity into<br /><span>things that work.</span>',
    'hero.lead': 'I work across robotics, multimodal perception, human–computer interaction, and reliable AI tools—turning research questions into open-source projects that can run, be tested, and be shared.',
    'hero.projectsCta': 'Explore projects <b>↓</b>',
    'hero.logCta': 'Read field notes <b>→</b>',
    'projects.title': 'Open-source work built<br /><span>from real problems.</span>',
    'projects.lead': 'This is not a display case. It is a growing set of experiments—from video understanding and AI image tools to physical interaction devices—with code, documentation, and reproducible paths wherever possible.',
    'filters.all': 'All projects',
    'filters.perception': 'Perception & robotics',
    'filters.tool': 'Tools & automation',
    'filters.experience': 'Digital experiences',
    'project.tennis.description': 'Combines audio transients, human pose, and racket detection to understand tennis strokes and rallies, with GPU-accelerated export.',
    'project.gptImage.description': 'Uses GPT-Image models through OpenAI-compatible relay APIs and CC-Switch, with an emphasis on reliable calls and API-key safety.',
    'project.handle.description': 'Brings shortcut input, voice, status feedback, and Agent workflows into a physical controller; AutoClipboard and firmware ship through public repositories.',
    'project.pptx.description': 'A Windows-only CLI that uses desktop PowerPoint to export selected slides, preserve vectors, trim white margins, and create publication-ready PDFs.',
    'project.robotArm.description': 'Studies inverse kinematics and inverse dynamics for robot arms in MuJoCo, comparing MLP, ESN, LSTM, GRU, and related models.',
    'project.travel.description': 'A Hainan travel-planning experience from Changsha that brings routes, budgets, activities, and mobile reading into one page.',
    'links.homepage': 'Project site ↗',
    'links.source': 'Source code ↗',
    'links.guide': 'User guide ↗',
    'links.learn': 'Learn more ↗',
    'links.releases': 'Public releases ↗',
    'links.experiment': 'View experiment ↗',
    'links.openPage': 'Open page ↗',
    'alt.tennis': 'Tennis Video Helper desktop interface',
    'alt.gptImage': 'Homepage of the GPT Image 2 CLI project website',
    'alt.handle': 'Pixel-art hero image of the ZKO AI coding handle on a cream and cyan background',
    'alt.pptx': 'The pptx2pdfcrop website showing a slide transformed from wide white margins to a tightly cropped PDF',
    'alt.robotArm': 'RobotARMNN inverse-dynamics model comparison chart',
    'alt.travel': 'Homepage of the Travel Planner website showing Hainan and Dongguan travel plans',
    'research.title': 'Research directions<br /><span>I care about.</span>',
    'research.lead': 'I am most interested in where technologies meet inside real systems: how perception becomes trustworthy, how models enter devices, and how people collaborate naturally with intelligent tools.',
    'research.multimodal.title': 'Multimodal perception',
    'research.multimodal.description': 'Combining audio, vision, pose, and temporal evidence so machines can understand dynamic scenes.',
    'research.embodied.title': 'Embodied intelligence & control',
    'research.embodied.description': 'From kinematics and dynamics to real hardware, studying how models produce executable actions.',
    'research.interaction.title': 'Human / Agent interaction',
    'research.interaction.description': 'Exploring more direct and natural collaboration across buttons, voice, status feedback, and automation.',
    'research.reliable.title': 'Reliable AI tools',
    'research.reliable.description': 'Focusing on secure configuration, reproducible workflows, failure boundaries, and delivery quality in real environments.',
    'now.title': 'What I am<br /><span>working on now.</span>',
    'now.lead': 'These are not finalized answers. They are questions being implemented, tested, and revised, with repositories serving as part of the research record.',
    'log.tennis.status': '<span></span> ACTIVE / CONTINUOUS VALIDATION',
    'log.tennis.title': 'Audio-visual tennis rally recognition',
    'log.tennis.description': 'Reducing false positives through audio peaks, human pose, racket evidence, and cross-batch temporal relationships while retaining real strokes.',
    'log.handle.status': '<span></span> BUILDING / SYSTEM INTEGRATION',
    'log.handle.title': 'AI Coding Handle & AutoClipboard',
    'log.handle.description': 'Refining the connection between physical input, desktop software, firmware, and Agent workflows so repeated actions become natural muscle memory.',
    'log.robot.status': '<span></span> EXPERIMENT / MODEL COMPARISON',
    'log.robot.title': 'Neural kinematics and dynamics for robot arms',
    'log.robot.description': 'Comparing how different neural networks fit inverse-kinematics and inverse-dynamics problems in simulation.',
    'contact.title': 'Have an interesting problem?<br /><span>Let’s build it together.</span>',
    'contact.lead': 'If you are working on robotics, computer vision, AI tools, or have an idea for one of these open-source projects, feel free to reach out on GitHub.',
  },
};

const signals = {
  'zh-CN': [
    'AUDIO + POSE + RACKET',
    'HARDWARE + AGENT FEEDBACK',
    'IK + INVERSE DYNAMICS',
    'BUILD + TEST + SHARE',
  ],
  en: [
    'AUDIO + POSE + RACKET',
    'HARDWARE + AGENT FEEDBACK',
    'IK + INVERSE DYNAMICS',
    'BUILD + TEST + SHARE',
  ],
};

const themeLabels = {
  'zh-CN': {
    archive: '像素风静默档案研究场景',
    cathedral: '像素风暗金神秘圣堂研究场景',
    cosmos: '像素风深空观测站研究场景',
  },
  en: {
    archive: 'Pixel-art Silent Archive research scene',
    cathedral: 'Pixel-art amber cathedral research scene',
    cosmos: 'Pixel-art deep-space observatory research scene',
  },
};

const allowedThemes = new Set(['archive', 'cathedral', 'cosmos']);
const normalizeLanguage = (language) => (language?.toLowerCase().startsWith('en') ? 'en' : 'zh-CN');
const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
const storedLanguage = window.localStorage.getItem('gp-language');
let currentLanguage = normalizeLanguage(requestedLanguage || storedLanguage);
let signalIndex = 0;

const translateDocument = (language) => {
  const copy = translations[language];
  document.documentElement.lang = language;
  document.title = copy.pageTitle;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = copy[element.dataset.i18n];
  });
  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    element.innerHTML = copy[element.dataset.i18nHtml];
  });
  document.querySelectorAll('[data-i18n-content]').forEach((element) => {
    element.setAttribute('content', copy[element.dataset.i18nContent]);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    element.setAttribute('aria-label', copy[element.dataset.i18nAriaLabel]);
  });
  document.querySelectorAll('[data-i18n-alt]').forEach((element) => {
    element.setAttribute('alt', copy[element.dataset.i18nAlt]);
  });
};

const updateNavToggleLabel = () => {
  if (!navToggleLabel) return;
  const open = navToggle?.getAttribute('aria-expanded') === 'true';
  navToggleLabel.textContent = translations[currentLanguage][open ? 'a11y.closeNav' : 'a11y.openNav'];
};

const updateLanguageUrl = (language) => {
  const url = new URL(window.location.href);
  if (language === 'en') url.searchParams.set('lang', 'en');
  else url.searchParams.delete('lang');
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
};

const applyLanguage = (language, { syncUrl = false } = {}) => {
  currentLanguage = normalizeLanguage(language);
  translateDocument(currentLanguage);
  languageButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.language === currentLanguage));
  });
  themeScene?.setAttribute('aria-label', themeLabels[currentLanguage][document.documentElement.dataset.theme || 'archive']);
  if (signalOutput) signalOutput.textContent = signals[currentLanguage][signalIndex];
  updateNavToggleLabel();
  window.localStorage.setItem('gp-language', currentLanguage);
  if (syncUrl) updateLanguageUrl(currentLanguage);
};

document.querySelector('[data-year]').textContent = new Date().getFullYear();
applyLanguage(currentLanguage);

languageButtons.forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.language, { syncUrl: true }));
});

const storedTheme = window.localStorage.getItem('gp-theme');
const initialTheme = allowedThemes.has(storedTheme) ? storedTheme : 'archive';

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  themeButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.theme === theme));
  });
  themeScene?.setAttribute('aria-label', themeLabels[currentLanguage][theme]);
  window.localStorage.setItem('gp-theme', theme);
};

applyTheme(initialTheme);

themeToggle?.addEventListener('click', () => {
  const open = themeToggle.getAttribute('aria-expanded') === 'true';
  themeToggle.setAttribute('aria-expanded', String(!open));
  themePanel.hidden = open;
});

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    applyTheme(button.dataset.theme);
    themeToggle?.setAttribute('aria-expanded', 'false');
    themePanel.hidden = true;
  });
});

document.addEventListener('click', (event) => {
  if (!themePanel || themePanel.hidden || themePanel.contains(event.target) || themeToggle?.contains(event.target)) return;
  themeToggle?.setAttribute('aria-expanded', 'false');
  themePanel.hidden = true;
});

navToggle?.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!open));
  header.classList.toggle('nav-open', !open);
  updateNavToggleLabel();
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navToggle?.setAttribute('aria-expanded', 'false');
    header.classList.remove('nav-open');
    updateNavToggleLabel();
  });
});

filters.forEach((button) => {
  button.setAttribute('aria-pressed', String(button.classList.contains('is-active')));
  button.addEventListener('click', () => {
    filters.forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle('is-active', active);
      candidate.setAttribute('aria-pressed', String(active));
    });
    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.hidden = !visible;
    });
  });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('[data-reveal]');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
}

const sections = [...document.querySelectorAll('main section[id]')];
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle('is-current', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-35% 0px -55%', threshold: 0 },
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

if (signalOutput && !reduceMotion) {
  window.setInterval(() => {
    signalIndex = (signalIndex + 1) % signals[currentLanguage].length;
    signalOutput.classList.add('is-switching');
    window.setTimeout(() => {
      signalOutput.textContent = signals[currentLanguage][signalIndex];
      signalOutput.classList.remove('is-switching');
    }, 180);
  }, 2800);
}

window.addEventListener(
  'scroll',
  () => header.classList.toggle('is-scrolled', window.scrollY > 12),
  { passive: true },
);
