const I18N = {
  en: {
    name: 'Peng Ding',
    title: 'PhD Candidate in Computer Science',
    university: 'University of Chicago',
    advisor: 'Advisor',
    tag_agents: 'AI Agents',
    tag_tool: 'Tool Orchestration',
    tag_multiagent: 'Multi-Agent Collaboration',
    tag_llm: 'LLM Systems',
    cat_selected: 'Selected Projects',
    cat_notable: 'Notable Tools',
    proj_toolregistry: 'Protocol-agnostic tool management for function-calling LLMs',
    proj_toolregistry_featured: 'Protocol-agnostic tool management for function-calling LLMs, with a growing server + hub ecosystem',
    proj_hub: 'Ready-to-use tool collection for LLM agents',
    proj_server: 'Serve custom tools via OpenAPI and MCP',
    proj_rosetta: 'Production-ready LLM API translation layer for Python',
    proj_weilink: 'Lightweight Python SDK for WeChat iLink Bot protocol',
    proj_argo: 'Proxy & translation server for Argo/OpenAI/Anthropic APIs',
    proj_asksage: 'OpenAI-compatible proxy server for AskSage API',
    proj_cicada: 'Collaborative Intelligent CAD Automation Design Agent',
    proj_protein: 'Protein folding score inference server using FastAPI',
    proj_mango: 'Benchmark for evaluating mapping & navigation abilities of LLMs',
    proj_vesper: 'Fault-tolerant distributed KV store using Raft consensus',
    proj_autossh: 'Dockerized SSH tunnel manager using autossh & YAML config',
    proj_composerize: 'Self-hosted composerize suite, minimally dockerized ~7MB',
    proj_onehub: 'OneHub pricing maintenance via API',
    proj_openwrt: 'Automatic DFS channel management for OpenWrt',
    proj_nps: 'Python CLI & library for managing NPS edge servers',
    proj_zerodep: 'Zero-dependency, single-file Python implementations',
    proj_zerodep_featured: 'Empirical study of zero-dependency Python libraries built under stdlib-only constraints',
    proj_asr2clip: 'CLI tool to convert speech to clipboard text',
    cv_download: 'download (PDF)',
    pub_rosetta: 'LLM-Rosetta: A Hub-and-Spoke Intermediate Representation for Cross-Provider LLM API Translation',
    pub_toolregistry: 'ToolRegistry: A Protocol-Agnostic Tool Management Library for Function-Calling LLMs',
    pub_bior5: 'BioR5: A Three-Layer Architecture for Biological Reasoning in Scientific AI',
    pub_mango: 'MANGO: A Benchmark for Evaluating Mapping and Navigation Abilities of Large Language Models',
    pub_entropy: 'Entropy-Reinforced Planning with Large Language Models for Drug Discovery',
    pub_tvcg: 'Refocusable Gigapixel Panoramas for Immersive VR Experiences',
  },
  zh: {
    name: '丁鹏',
    title: '计算机科学博士候选人',
    university: '芝加哥大学',
    advisor: '导师',
    tag_agents: 'AI 智能体',
    tag_tool: '工具编排',
    tag_multiagent: '多智能体协作',
    tag_llm: 'LLM 系统',
    cat_selected: '精选项目',
    cat_notable: '值得一提的工具',
    proj_toolregistry: '协议无关的函数调用 LLM 工具管理库',
    proj_toolregistry_featured: '面向函数调用 LLM 的协议无关工具管理框架，配套 server 与 hub 生态持续扩展',
    proj_hub: 'LLM 智能体即用型工具集合',
    proj_server: '通过 OpenAPI 和 MCP 提供自定义工具服务',
    proj_rosetta: '生产级 Python LLM API 翻译层',
    proj_weilink: '轻量级微信 iLink Bot 协议 Python SDK',
    proj_argo: 'Argo/OpenAI/Anthropic API 代理与翻译服务器',
    proj_asksage: 'AskSage API 的 OpenAI 兼容代理服务器',
    proj_cicada: '协作式智能 CAD 自动化设计智能体',
    proj_protein: '基于 FastAPI 的蛋白质折叠评分推理服务器',
    proj_mango: 'LLM 地图理解与导航能力评测基准',
    proj_vesper: '基于 Raft 共识算法的容错分布式键值存储',
    proj_autossh: '基于 autossh 和 YAML 配置的 Docker 化 SSH 隧道管理器',
    proj_composerize: '自托管 composerize 套件，极简 Docker 化 ~7MB',
    proj_onehub: 'OneHub 定价维护 API',
    proj_openwrt: 'OpenWrt 自动 DFS 信道管理',
    proj_nps: 'NPS 边缘服务器管理 Python CLI 和库',
    proj_zerodep: '零依赖、单文件 Python 实现集',
    proj_zerodep_featured: '面向零依赖 Python 库的实证研究，在仅使用标准库约束下构建与评测',
    proj_asr2clip: '语音转剪贴板文本 CLI 工具',
    cv_download: '下载简历 (PDF)',
    pub_rosetta: 'LLM-Rosetta：面向跨提供商 LLM API 翻译的中心辐射型中间表示',
    pub_toolregistry: 'ToolRegistry：面向函数调用 LLM 的协议无关工具管理库',
    pub_bior5: 'BioR5：面向科学 AI 生物推理的三层架构',
    pub_mango: 'MANGO：大语言模型地图理解与导航能力评测基准',
    pub_entropy: '基于大语言模型的熵强化规划用于药物发现',
    pub_tvcg: '面向沉浸式 VR 体验的可重聚焦千兆像素全景图',
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const systemThemeQuery = window.matchMedia('(prefers-color-scheme: light)');

  loadCachedMetrics();

  // --- Theme switching ---
  const themeButtons = document.querySelectorAll('[data-theme-btn]');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme, { persist: false });
  } else {
    applySystemTheme();
    systemThemeQuery.addEventListener('change', () => {
      if (!localStorage.getItem('theme')) applySystemTheme();
    });
  }

  themeButtons.forEach((btn) => {
    btn.addEventListener('click', () => setTheme(btn.dataset.themeBtn));
  });

  function applySystemTheme() {
    setTheme(systemThemeQuery.matches ? 'light' : 'dark', { persist: false });
  }

  function setTheme(theme, options = {}) {
    const { persist = true } = options;
    root.setAttribute('data-theme', theme);
    if (persist) localStorage.setItem('theme', theme);
    themeButtons.forEach((b) => b.classList.toggle('active', b.dataset.themeBtn === theme));
  }

  // --- Language switching ---
  const langButtons = document.querySelectorAll('[data-lang-btn]');
  const savedLang = localStorage.getItem('lang') || 'en';
  setLang(savedLang);

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.dataset.langBtn));
  });

  function setLang(lang) {
    const strings = I18N[lang];
    if (!strings) return;
    root.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);
    langButtons.forEach((b) => b.classList.toggle('active', b.dataset.langBtn === lang));

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (strings[key] !== undefined) {
        el.textContent = strings[key];
      }
    });

    const cvLink = document.getElementById('cv-link');
    if (cvLink) {
      cvLink.href = lang === 'zh'
        ? 'https://people.cs.uchicago.edu/~dingpeng/resume_zh.pdf'
        : 'https://people.cs.uchicago.edu/~dingpeng/resume_en.pdf';
    }
  }

  // --- Live GitHub star counts ---
  fetchGitHubStars();

  async function fetchGitHubStars() {
    try {
      const resp = await fetch(
        'https://api.github.com/users/Oaklight/repos?per_page=100',
      );
      if (!resp.ok) return;
      const repos = await resp.json();

      const starMap = {};
      repos.forEach((repo) => {
        starMap[repo.name.toLowerCase()] = repo.stargazers_count;
      });

      document.querySelectorAll('.project-item').forEach((item) => {
        const link = item.querySelector('a[href*="github.com/Oaklight/"]');
        if (!link) return;
        const repoName = link.href.split('/').pop().toLowerCase();
        const count = starMap[repoName];
        if (count === undefined) return;

        let starSpan = item.querySelector('.stars');
        if (count > 0) {
          if (!starSpan) {
            starSpan = document.createElement('span');
            starSpan.className = 'stars';
            link.after(starSpan);
          }
          starSpan.textContent = '\u2605 ' + count;
        } else if (starSpan) {
          starSpan.remove();
        }
      });
    } catch (_) {
      // Silently fall back to hardcoded values
    }
  }

  async function loadCachedMetrics() {
    try {
      const resp = await fetch('data/metrics.json', { cache: 'no-cache' });
      if (!resp.ok) return;
      const data = await resp.json();
      const projects = data.projects || {};

      document.querySelectorAll('[data-metric-project]').forEach((el) => {
        const project = el.dataset.metricProject;
        const type = el.dataset.metricType;
        const metrics = projects[project];
        if (!metrics) return;

        if (type === 'pypi') {
          if (metrics.pypi_monthly) {
            const value = typeof metrics.pypi_monthly === 'number'
              ? `${formatCompactNumber(metrics.pypi_monthly)}/month`
              : metrics.pypi_monthly;
            el.textContent = `PyPI ${value}`;
          } else {
            el.textContent = 'PyPI';
            el.classList.add('metric-muted');
          }
        }

        if (type === 'docker') {
          if (typeof metrics.docker_pulls === 'number') {
            el.textContent = `Docker ${formatCompactNumber(metrics.docker_pulls)}`;
          } else {
            el.textContent = 'Docker';
            el.classList.add('metric-muted');
          }
        }
      });
    } catch (_) {
      // Keep default labels if cache is unavailable.
    }
  }

  function formatCompactNumber(value) {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
    if (value >= 1000) return `${Math.round(value / 1000)}k`;
    return String(value);
  }

  // --- Email obfuscation ---
  const emailLink = document.getElementById('email-link');
  const emailText = document.getElementById('email-text');
  const user = 'dingpeng';
  const domain = 'uchicago.edu';

  emailText.textContent = user + ' [AT] ' + domain;

  emailLink.addEventListener('click', (e) => {
    e.preventDefault();
    const addr = user + '@' + domain;
    emailText.textContent = addr;
    emailLink.href = 'mailto:' + addr;
  });
});
