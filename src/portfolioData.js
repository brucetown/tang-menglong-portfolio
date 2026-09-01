import { assetPath } from "./assetPath";

const withDeploymentAssetPaths = (value) => {
  if (typeof value === "string") {
    return value.startsWith("/assets/") ? assetPath(value) : value;
  }

  if (Array.isArray(value)) return value.map(withDeploymentAssetPaths);

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, withDeploymentAssetPaths(nestedValue)]),
    );
  }

  return value;
};

const portfolioData = {
  name: "唐梦龙",
  englishName: "BRUCE TANG",
  role: "AI 影像创意导演",
  contact: {
    phone: "13439547303",
    email: "tangmenglong1225@yeah.net",
    city: "北京",
  },
  hero: {
    headline: "BRUCE TANG",
    directorLine: "AI MOVING IMAGE CREATIVE DIRECTOR",
    chineseLine: "唐梦龙 / AI 影像创意导演",
    subline:
      "从 10 年商业视频与后期经验出发，把分镜、布光、运镜、Prompt 工程和生成式视频工作流合成一套可交付的影像方法。",
    video: "/assets/hero-loop.mp4",
    videoType: "video/mp4",
    poster: "/assets/optimized/hero-loop-poster.jpg",
  },
  nav: [
    { label: "个人标签", href: "#tags" },
    { label: "个人经历", href: "#experience" },
    { label: "项目索引", href: "#work-index" },
    { label: "作品集放映", href: "#screening" },
    { label: "摄影作品", href: "#unsplash-impact" },
    { label: "AI 共创", href: "#ai-builds" },
    { label: "联系", href: "#contact" },
  ],
  tagLines: [
    ["导演思维", "剪辑判断"],
    ["AIGC 工作流", "商业交付"],
    ["角色一致性", "导演表达"],
  ],
  metrics: [
    { value: "10", suffix: "年", label: "影像经验" },
    { value: "70", suffix: "+", label: "品牌项目" },
    { value: "220", suffix: "+", label: "10w+ 播放内容" },
    { value: "40", suffix: "+", label: "百万播放内容" },
  ],
  profile: {
    workPortrait: "/assets/optimized/profile-on-set.jpg",
    headshot: "/assets/optimized/profile-headshot.jpg",
    summary:
      "单兵具备编导策划、实拍制片、后期交付与新媒体运营能力，熟悉 ChatGPT / Gemini / Codex 等 LLM 与本地 Agent，紧跟AIGC潮流，擅长无限画布工作流制作AI短片内容，能将抽象业务诉求转化为可执行的视频方案，并通过自然流量爆款、矩阵增长与留资转化漏斗服务商业结果。",
    facts: [
      "熟悉可灵、即梦、Runway 等生成式视频工具",
      "具备角色一致性、空间连续性、运动轨迹控制经验",
      "可用 ChatGPT / Gemini / Codex 拆解脚本、提示词与工作流",
      "覆盖策划、拍摄、后期、运营、商业转化的全链路交付",
    ],
    timeline: [
  {
    period: "2017 — 2018",
    company: "电影小镇",
    shortCompany: "电影小镇",
    title: "影视自媒体编导 / 运营",
    highlight: "影视选题策划 · 自媒体内容制作",
    detail:
      "从0到1打造影视自媒体矩阵「电影小镇」，18个月内实现全网零投放自然涨粉30万，其中B站单平台破10万，累计播放量近1亿。多次获得B站、人人视频首页Banner推荐；获选“微博电影之夜”章子怡官方混剪作者，作品多次获微博官方转发。",
    images: [
      {
        src: "/assets/optimized/experience-movie-town-overview.jpg",
        alt: "电影小镇自媒体矩阵作品",
        crop: "wide",
      },
      {
        src: "/assets/optimized/experience-movie-town-editing.jpg",
        alt: "电影小镇浅谈剪辑项目",
        crop: "square",
      },
    ],
  },
  {
    period: "2018 — 2019",
    company: "CCTV6",
    shortCompany: "CCTV6",
    title: "融媒体内容运营",
    highlight: "融媒体矩阵搭建 · 影视热点内容",
    detail:
      "负责CCTV6电影频道融媒体账号的0-1搭建与数据增长，头条号涨粉100万，百家号涨粉30万；独立操盘并建立B站官方账号，5个月即突破10w粉丝。参与“建国70周年”“成龙国际动作电影周”“华语十佳电影评选”等行业级活动的线上宣发策划与项目执行。",
    images: [
      {
        src: "/assets/optimized/experience-cctv6-interview.jpg",
        alt: "CCTV6融媒体项目现场",
        crop: "wide",
      },
      {
        src: "/assets/optimized/experience-cctv6-badge.jpg",
        alt: "CCTV6成龙国际动作电影周工作证",
        crop: "square",
      },
    ],
  },
      {
        period: "2020 — 2021",
        company: "36氪",
        shortCompany: "36氪",
        title: "短视频编导",
        highlight: "泛知识栏目 · 10w+ 点赞与转发",
        detail:
          "核心参与泛知识栏目「氪星研究所」编导工作，核心子栏目「氪大事」首位主创制作者。代表作「互联网隐私」单条爆款获得微信视频号10w+点赞、10w+转发。",
        images: [
          {
            src: "/assets/optimized/experience-36kr-main-new.jpg",
            alt: "36氪编导工作现场",
            crop: "wide",
          },
          {
            src: "/assets/optimized/experience-36kr-badge-new.jpg",
            alt: "36氪工作证与身份记录",
            crop: "square",
          },
        ],
      },
      {
        period: "2022 — 2025",
        company: "国投人力",
        shortCompany: "国投人力",
        title: "视频剪辑 / 政企视频项目统筹",
        highlight: "70+ 政企项目 · 112 万矩阵粉丝",
        detail:
          "主导蒙牛、国家能源、中远海运、中国联通、国投集团 30 周年等 70 余个项目；零投放自然流量推动官方矩阵粉丝增至 112 万。",
        mobilePeriod: "2023 — 2025",
        mobileDetail:
          "统筹并主导蒙牛、国家能源、中远海运、中工国际、中国联通、国投集团30周年等70余个央国企及品牌项目。在职期间产出全网10w+播放视频220余条，100W+播放视频40余条。依靠零投放，自然流量推动官方矩阵全网粉丝增至112万，净增270%。",
        mobileImages: [
          {
            src: "/assets/optimized/experience-guotou-main.jpg",
            alt: "国投人力项目现场",
            crop: "guotou-main",
          },
          {
            src: "/assets/optimized/experience-guotou-small.jpg",
            alt: "国投人力拍摄现场",
            crop: "guotou-small",
          },
        ],
      },
      {
        period: "2025 — 2026",
        company: "新东方-欧亚教育",
        shortCompany: "新东方",
        title: "核心项目总编导",
        highlight: "20+ 高管访谈 · 集团开场片",
        detail:
          "担任欧亚教育10周年核心主管会开场片总导演，成片获新东方CEO周成刚及集团高层认可；单人携设备赴港完成宣传片拍摄任务；负责新东方CEO周成刚等高层专访实拍，制定并执行影视级布光与现场制景标准；从0到1搭建内部视频资料库，提升跨渠道视觉输出的一致性。",
        images: [
          {
            src: "/assets/optimized/experience-xdf-covers.jpg",
            alt: "新东方欧亚教育项目作品封面",
            crop: "covers",
          },
          {
            src: "/assets/optimized/experience-xdf-on-set.jpg",
            alt: "新东方欧亚教育项目访谈拍摄现场",
            crop: "on-set",
          },
        ],
      },
    ],
  },
  unsplashImpact: {
    title: "一张照片\n被世界看见",
    description:
      "这张从低机位仰望高达背影的照片，成为我在 Unsplash 上传播最广的摄影作品。它把我对尺度、留白与未来感的判断，带到了更大的公共视野。",
    image: "/assets/optimized/unsplash-gundam-impact.jpg",
    alt: "蓝天下从背后仰拍的高达立像",
    metrics: [
      { value: "1200", suffix: "万", label: "浏览量", english: "VIEWS" },
      { value: "12", suffix: "万", label: "下载量", english: "DOWNLOADS" },
    ],
  },
  photography: {
    title: "摄影作品",
    subtitle: "LIGHT / COLOR / STREET",
    leftRail: [
      {
        src: "/assets/optimized/photo-red-wall.jpg",
        alt: "故宫红墙",
        shape: "landscape",
      },
      {
        src: "/assets/optimized/photo-sakura.jpg",
        alt: "樱花烂漫时",
        shape: "portrait",
      },
      {
        src: "/assets/optimized/photo-concrete-alley.jpg",
        alt: "校园内",
        shape: "landscape",
      },
      {
        src: "/assets/optimized/photo-portrait-uniform.jpg",
        alt: "人物肖像",
        shape: "portrait",
      },
      {
        src: "/assets/optimized/photo-mels-drive-in.jpg",
        alt: "复古餐厅",
        shape: "portrait",
      },
      {
        src: "/assets/optimized/photo-blossom-lamp.jpg",
        alt: "蓝调时刻花枝环绕的路灯",
        shape: "portrait",
      },
      {
        src: "/assets/optimized/photo-birch-autumn.jpg",
        alt: "秋日白桦树干",
        shape: "portrait",
      },
    ],
    rightRail: [
      {
        src: "/assets/optimized/photo-forest-roof.jpg",
        alt: "山林与屋檐",
        shape: "portrait",
      },
      {
        src: "/assets/optimized/photo-tokyo-alley.jpg",
        alt: "大阪巷道",
        shape: "portrait",
      },
      {
        src: "/assets/optimized/photo-xiamen-bookstore.jpg",
        alt: "厦门街景",
        shape: "portrait",
      },
      {
        src: "/assets/optimized/photo-soft-shadow.jpg",
        alt: "晨光中的窗帘与影子",
        shape: "portrait",
      },
      {
        src: "/assets/optimized/photo-vintage-motorcycles.jpg",
        alt: "展墙上的复古越野摩托车",
        shape: "portrait",
      },
      {
        src: "/assets/optimized/photo-edinburgh-street.jpg",
        alt: "爱丁堡街景",
        shape: "portrait",
      },
      {
        src: "/assets/optimized/photo-stone-figure.jpg",
        alt: "暗光中的石像细节",
        shape: "portrait",
      },
    ],
  },
  projects: [
    {
      title: "AI短片与AI创意工作流",
      category: "AIGC",
      type: "AIGC 导演 / 2026",
      image: "/assets/optimized/project-homeward.jpg",
      stat: "Prompt 工程 · 角色一致性 · 空间连续性",
      disciplines: ["角色一致性", "空间连续性", "运动轨迹控制"],
      description:
        "以影视叙事、分镜设计、布光运镜为核心，把可灵、即梦、Runway 等工具串联为可复用的 AI 影像生产流程。",
    },
    {
      title: "新东方欧亚教育 10 周年开场片",
      category: "商业影像",
      type: "总导演 / 2025",
      image: "/assets/optimized/project-xdf-10th.jpg",
      stat: "20+ 高管访谈 · 集团高层认可",
      disciplines: ["核心概念", "高管访谈", "跨部门统筹"],
      description:
        "主导企划、跨部门协同、拍摄排期与后期品控，在多线任务并行下保障开场片按期交付。",
    },
    {
      title: "国聘+CCTV6政企品牌视频矩阵",
      category: "商业影像",
      type: "策划+运营 / 2024",
      image: "/assets/optimized/project-guopin-mobile.jpg",
      stat: "70+ 项目 · 112 万矩阵粉丝",
      disciplines: ["政企叙事", "矩阵内容", "标准化交付"],
      description:
        "将抽象政企诉求转译为镜头语言与执行脚本，沉淀模块化剪辑工程模板与标准化交付流程。",
    },
    {
      title: "36氪商业知识内容与品牌商单",
      category: "内容增长",
      type: "编导+后期 / 2021",
      image: "/assets/optimized/project-36kr-wages.jpg",
      stat: "B站均播 31w+ · 抖音均播 50w+",
      disciplines: ["知识叙事", "黄金 5 秒", "商业定制"],
      description:
        "参与「氪星研究所」头部矩阵内容，负责选题、脚本结构和开篇 Hook 设计，并交付品牌商业定制内容。",
    },
    {
      title: "自媒体《电影小镇》",
      category: "内容增长",
      type: "自媒体大V / 2018",
      image: "/assets/optimized/project-film-town-cover.jpg",
      stat: "1905 电影网总榜第 7 名",
      disciplines: ["影视选题", "账号运营", "短视频内容"],
      description:
        "负责自媒体《电影小镇》的影视选题、短视频制作与账号运营，持续将电影热点转化为面向大众的内容表达。",
    },
  ],
  screening: [
    {
      id: "homeward",
      title: "AI 短片《返乡》",
      credit: "AI FILM / 2026",
      ratio: "16:9",
      size: "primary",
      src: "/assets/screening-homeward.mp4",
      poster: "/assets/optimized/screening-homeward-poster.jpg",
    },
    {
      id: "showreel-2026",
      title: "导演作品集 2026",
      credit: "DIRECTING SHOWREEL / 2026",
      ratio: "16:9",
      size: "secondary",
      src: "/assets/screening-showreel-2026.mp4",
      poster: "/assets/optimized/screening-showreel-2026-poster.jpg",
    },
  ],
  strengths: [
    {
      title: "AI 影像创作",
      text: "能把角色设定、镜头语言、空间连续性和运动轨迹拆解成可执行的生成式视频指令。",
    },
    {
      title: "影视化表达",
      text: "以剪辑节奏、叙事结构、布光制景和分镜逻辑控制画面，而不是只追求单张视觉奇观。",
    },
    {
      title: "商业视频统筹",
      text: "能从抽象业务目标出发，完成脚本、拍摄、后期、审片、交付和复盘。",
    },
    {
      title: "内容增长判断",
      text: "熟悉短视频矩阵、爆款选题、黄金 5 秒 Hook、平台节奏和自然流量增长。",
    },
    {
      title: "后期工程化",
      text: "能搭建模板、素材库和 SOP，把高频视频交付变成可复制的生产系统。",
    },
    {
      title: "LLM 工作流",
      text: "可用大模型完成脚本拆解、提示词迭代、素材管理和轻量网页工具原型。",
    },
  ],
  aiBuilds: [
    {
      index: "01",
      title: "个人作品集网站",
      summary: "一套为职业转型而生的动态个人作品集",
      category: "DESIGN + FRONTEND",
      year: "2026",
      images: [
        {
          src: "/assets/hero-mk1-poster.png",
          alt: "唐梦龙个人作品集网站首页",
        },
        {
          src: "/assets/optimized/ai-portfolio-mobile-preview.jpg",
          alt: "个人作品集网站移动端预览",
        },
      ],
      outcomes: ["视觉系统", "响应式开发", "浏览器 QA"],
      role: "视觉方向、内容结构、交互判断与最终验收",
      aiContribution: "响应式前端、滚动动效与自动化测试",
      description: "从视觉方向、交互原型到响应式前端，把个人职业转型整理成一条连续的浏览叙事。",
    },
    {
      index: "02",
      title: "Skill Signal Console",
      summary: "把本地 AI Skills 管理变成一套可视化工具",
      category: "LOCAL AI TOOL",
      year: "2026",
      images: [
        {
          src: "/assets/optimized/ai-skill-console-white.jpg",
          alt: "Skill Signal Console 白色技能管理界面",
        },
        {
          src: "/assets/optimized/ai-skill-console-dark.jpg",
          alt: "Skill Signal Console 深色技能管理界面",
        },
      ],
      outcomes: ["本地扫描", "风险审核", "安全备份"],
      role: "产品定义、功能优先级、界面判断与测试验收",
      aiContribution: "工具开发、状态逻辑与批量处理",
      description: "面向本地 AI Skills 的扫描、风险检查、备份与清理工具，让复杂配置变得可见、可控。",
    },
    {
      index: "03",
      title: "《返乡》剧本分镜",
      summary: "为 90 秒 AI 短片建立可审阅的分镜生产系统",
      category: "AI FILM SYSTEM",
      year: "2026",
      images: [
        {
          src: "/assets/optimized/ai-homeward-storyboard-s17.jpg",
          alt: "《返乡》剧本分镜场次 S17 审阅界面",
        },
        {
          src: "/assets/optimized/ai-homeward-character-turnaround.jpg",
          alt: "《返乡》角色三视图",
        },
      ],
      outcomes: ["29 镜", "46 帧", "V15.1 版本控制"],
      role: "剧本判断、镜头设计、连续性标准与版本审核",
      aiContribution: "分镜拆解、提示词整理与审阅页面生成",
      description: "把 90 秒剧本拆成 29 镜、46 帧，并建立角色连续性、镜头提示词和版本审阅系统。",
    },
  ],
};

export const portfolio = withDeploymentAssetPaths(portfolioData);
