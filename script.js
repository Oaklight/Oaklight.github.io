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
    cat_ai: 'AI / Agent Ecosystem',
    cat_infra: 'Infrastructure / DevOps',
    cat_utils: 'Utilities',
    proj_toolregistry: 'Protocol-agnostic tool management for function-calling LLMs',
    proj_hub: 'Ready-to-use tool collection for LLM agents',
    proj_server: 'Serve custom tools via OpenAPI and MCP',
    proj_rosetta: 'Production-ready LLM API translation layer for Python',
    proj_argo: 'Proxy & translation server for Argo/OpenAI/Anthropic APIs',
    proj_cicada: 'Collaborative Intelligent CAD Automation Design Agent',
    proj_mango: 'Benchmark for evaluating mapping & navigation abilities of LLMs',
    proj_vesper: 'Fault-tolerant distributed KV store using Raft consensus',
    proj_autossh: 'Dockerized SSH tunnel manager using autossh & YAML config',
    proj_composerize: 'Self-hosted composerize suite, minimally dockerized ~7MB',
    proj_onehub: 'OneHub pricing maintenance via API',
    proj_nps: 'Python CLI & library for managing NPS edge servers',
    proj_zerodep: 'Zero-dependency, single-file Python implementations',
    proj_asr2clip: 'CLI tool to convert speech to clipboard text',
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
    cat_ai: 'AI / 智能体生态',
    cat_infra: '基础设施 / DevOps',
    cat_utils: '实用工具',
    proj_toolregistry: '协议无关的函数调用 LLM 工具管理库',
    proj_hub: 'LLM 智能体即用型工具集合',
    proj_server: '通过 OpenAPI 和 MCP 提供自定义工具服务',
    proj_rosetta: '生产级 Python LLM API 翻译层',
    proj_argo: 'Argo/OpenAI/Anthropic API 代理与翻译服务器',
    proj_cicada: '协作式智能 CAD 自动化设计智能体',
    proj_mango: 'LLM 地图理解与导航能力评测基准',
    proj_vesper: '基于 Raft 共识算法的容错分布式键值存储',
    proj_autossh: '基于 autossh 和 YAML 配置的 Docker 化 SSH 隧道管理器',
    proj_composerize: '自托管 composerize 套件，极简 Docker 化 ~7MB',
    proj_onehub: 'OneHub 定价维护 API',
    proj_nps: 'NPS 边缘服务器管理 Python CLI 和库',
    proj_zerodep: '零依赖、单文件 Python 实现集',
    proj_asr2clip: '语音转剪贴板文本 CLI 工具',
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

  // --- Theme switching ---
  const themeButtons = document.querySelectorAll('[data-theme-btn]');
  const savedTheme = localStorage.getItem('theme') || 'catppuccin';
  setTheme(savedTheme);

  themeButtons.forEach((btn) => {
    btn.addEventListener('click', () => setTheme(btn.dataset.themeBtn));
  });

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
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
