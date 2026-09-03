import { GafaCreativeType, GAFA_TYPE_MAP, GafaMbtiCode, ALLOWED_GAFA_NAMES } from './types';

/**
 * GAFA-TI 16 种原生艺术创作状态唯一完整数据库
 * 
 * 广州美术学院 迎新特别企划
 * 严格依据官方唯一映射表定义，包含每种状态约 350-500 字深度艺术创作行为画像。
 */
export const GAFA_TYPES: Record<GafaMbtiCode, GafaCreativeType> = {
  INTJ: {
    code: 'INTJ',
    mbtiCode: 'INTJ',
    id: 'GT-01',
    name: '精准构建型',
    englishName: 'PRECISION BUILDER',
    number: 'GT-01',
    title: '精准构建型',
    enTitle: 'PRECISION BUILDER',
    category: '概念架构系',
    slogan: '以严密的结构推演与终局思维，在虚空中搭建秩序分明的形式神殿。',
    tagline: '以严密的结构推演与终局思维，在虚空中搭建秩序分明的形式神殿。',
    keywords: ['结构推演', '理性严谨', '终局思维', '拓扑网格', '独立把控'],
    color: {
      accent: '#7C3AED',
      soft: '#F5F3FF',
      border: '#DDD6FE',
      text: '#4C1D95',
    },
    dimensions: {
      energy: '向内沉浸 78% · 22% 向外共振',
      perception: '概念构想 84% · 16% 实感观察',
      judgement: '结构推演 82% · 18% 感性表达',
      process: '计划构建 74% · 26% 即兴探索',
      ie: { leftLabel: '向内沉浸', rightLabel: '向外共振', leftScore: 78, rightScore: 22 },
      ns: { leftLabel: '概念构想', rightLabel: '实感观察', leftScore: 84, rightScore: 16 },
      tf: { leftLabel: '结构推演', rightLabel: '感性表达', leftScore: 82, rightScore: 18 },
      jp: { leftLabel: '计划构建', rightLabel: '即兴探索', leftScore: 74, rightScore: 26 },
    },
    spectrum: {
      ie: { leftLabel: '向内沉浸', rightLabel: '向外共振', leftScore: 78, rightScore: 22 },
      ns: { leftLabel: '概念构想', rightLabel: '实感观察', leftScore: 84, rightScore: 16 },
      tf: { leftLabel: '结构推演', rightLabel: '感性表达', leftScore: 82, rightScore: 18 },
      jp: { leftLabel: '计划构建', rightLabel: '即兴探索', leftScore: 74, rightScore: 26 },
    },
    fullAnalysis:
      '你的灵感鲜少来自毫无头绪的瞬间顿悟，而是源自对复杂系统、空间几何与底层逻辑规律的长时间思索。面对一个创作命题，你不会急于在画纸或软件上盲目涂抹，而是习惯先退后一步，拆解命题内核，搜集海量文献与结构参考，在脑海中完成整套视觉秩序与信息层级的虚拟搭建。在媒介与视觉语言的选择上，你极具克制力与洁癖感，天然倾向于几何网格、参数化模数、冷峻克制的调色板与高精度结构。做出创作决断时，你只信任逻辑自洽与推演必然性，从不轻易因同伴随口一句“感觉不够好看”而摇摆，修改方案必须有坚实的推导依据。面对Deadline，你拥有令人敬畏的倒排工期能力，极少经历手忙脚乱的狼狈熬夜；但在团队协作中，你对缺乏逻辑或执行涣散的成员容易失去耐性。你的主要创作瓶颈往往在于“过度沉溺于前期的系统完善”，当方案推演至无可挑剔时，可能反而对物理材料的真实阻力与意外瑕疵缺乏包容心。',
    strengths: [
      '极强的宏观概念架构能力与逻辑统摄力',
      '清晰严谨的信息层级与克制优雅的形式控制',
      '卓越的时间节点掌控与终局目标导向意识',
    ],
    challenges: [
      '方案初期容易因过度推演而迟迟不肯动手实操',
      '对偶发性的材料偶然性或团队散漫缺乏容忍度',
    ],
    inspirationMode: '阅读建筑平面图、分析参数化空间，或在深夜空无一人的工作室里纯粹进行逻辑思维实验。',
    deadlineMode: '严格按照倒排计划推进，倒计时前早已完成核心渲染或模型封箱，冷静微调细节。',
    teamworkMode: '天然的首席架构师与底线守护者，把控技术规范与叙事主线，但对散漫缺乏逻辑的提案零容忍。',
    creativeAdvice: '尝试允许方案在物理制作中发生一次“受控的失控”，偶然的材料瑕疵常常能赋予结构更动人的生命力。',
    sections: {
      status01: '草图本里密布着拓扑网格与推演公式，下笔前已在脑海中完成整套方案的受力与尺度测试。',
      advantage02: '超强的概念架构能力与多维全局统摄力，能把复杂混沌的命题提炼成极具张力的几何秩序。',
      block03: '过度追求方案的逻辑无懈可击，容易在推演初期自我否定，迟迟不肯进入物理实操材料阶段。',
      spark04: '阅读建筑平面图、分析参数化算法，或者在深夜空无一人的工作室里纯粹进行思维实验。',
      deadline05: '按照甘特图精确推进，倒计时最后一天早已完成终审渲染或模型封箱，冷静喝茶改细节。',
      teamwork06: '天然的首席架构师与底线守护者，把控技术规范与叙事主线，但对散漫或缺乏逻辑的提案零容忍。',
      keywords07: ['拓扑网格', '模数推演', '冷峻克制', '全维统领', '终局思维'],
    },
  },

  INTP: {
    code: 'INTP',
    id: 'GT-02',
    name: '理性推演型',
    englishName: 'LOGICAL EXPLORER',
    number: 'GT-02',
    title: '理性推演型',
    enTitle: 'LOGICAL EXPLORER',
    category: '概念架构系',
    slogan: '拆解既定视觉语法的底层假设，在哲学思辨与实验探索中追索艺术原点。',
    tagline: '拆解既定视觉语法的底层假设，在哲学思辨与实验探索中追索艺术原点。',
    keywords: ['问题意识', '本体解构', '逻辑实验', '先锋思辨', '开放结论'],
    color: {
      accent: '#4F46E5',
      soft: '#EEF2FF',
      border: '#C7D2FE',
      text: '#312E81',
    },
    dimensions: {
      energy: '向内沉浸 85% · 15% 向外共振',
      perception: '概念构想 88% · 12% 实感观察',
      judgement: '结构推演 79% · 21% 感性表达',
      process: '即兴探索 68% · 32% 计划构建',
    },
    spectrum: {
      ie: { leftLabel: '向内沉浸', rightLabel: '向外共振', leftScore: 85, rightScore: 15 },
      ns: { leftLabel: '概念构想', rightLabel: '实感观察', leftScore: 88, rightScore: 12 },
      tf: { leftLabel: '结构推演', rightLabel: '感性表达', leftScore: 79, rightScore: 21 },
      jp: { leftLabel: '计划构建', rightLabel: '即兴探索', leftScore: 32, rightScore: 68 },
    },
    fullAnalysis:
      '对于你而言，艺术创作不是单纯的美化形式，而是一场严肃的认知实验与哲学思辨。拿到命题的一瞬间，你最先发动的往往不是审美直觉，而是挑衅式的怀疑：“这个概念的底层假设是什么？为什么默认要用这种媒介表现？”你极其擅长将看似不相干的科学定律、冷门理论或媒介本体论拆解重组，转化为极具智性挑战的实验原型。在视觉语言上，你偏爱去中心化的结构、算法生成、偶发性实验与带有“元概念”色彩的解构主义。做出创作决断时，你更享受推导过程本身的精妙，甚至常常故意保留多重开放性的可能结论。面对修改建议，你最看重对方逻辑是否有漏洞，若批评具有学术洞见你会兴奋探讨，若只是平庸的套路则会彻底漠视。临近Deadline，你最大的危机是探索支线过于庞杂，不断推倒重来导致物理实体难以收尾交付。在小组作业中，你是毫无疑问的概念武器库与破除盲点的质询者，但极度需要有人在时间节点上硬性拉着你落地。',
    strengths: [
      '敏锐深刻的问题意识与颠覆常识的批判性思维',
      '极强的跨学科概念迁移能力与底层本体论洞察',
      '善于构建富有思想纵深的开放性实验语系',
    ],
    challenges: [
      '思维支线无节制发散，容易产生大量半成品却难以收束',
      '对世俗化的“漂亮好看”缺乏热情，易在终期制作环节脱节',
    ],
    inspirationMode: '在图书馆角落翻阅冷门先锋理论，研究跨学科现象（如量子态、赛博符号学或拓扑几何）。',
    deadlineMode: '最后一晚突然重构整套策展文本，用极简而硬核的原型切片在终评现场直接引发学术讨论。',
    teamworkMode: '概念武器库与逻辑质疑者，负责戳破常识盲点，但需要有人拽着你按时交作业。',
    creativeAdvice: '给自己的每一个智性实验设定严格的物理边界，将一个闪光的推论完整收尾，比留下十个宏大猜想要有力得多。',
    sections: {
      status01: '关注媒介本身的哲学本体论，比起好看的画面，更痴迷于探寻“为什么这个形式存在”。',
      advantage02: '惊人的批判性思辨与概念重构力，常提出令指导老师耳目一新的学术提问与实验路径。',
      block03: '在海量的理论参考与支线实验中无限发散，常常产出100个精妙草图但无一落地收尾。',
      spark04: '在图书馆角落翻阅冷门先锋理论，研究跨学科现象（如量子态、赛博符号学或拓扑几何）。',
      deadline05: '最后一晚突然重写整套策展文本，用极简而硬核的原型切片在终评现场直接引发学术讨论。',
      teamwork06: '概念武器库与逻辑质疑者，负责戳破常识盲点，但需要有人拽着你按时交作业。',
      keywords07: ['元概念', '语言裂隙', '推演假设', '跨界实验', '纯粹本体'],
    },
  },

  ENTJ: {
    code: 'ENTJ',
    id: 'GT-03',
    name: '全局掌控型',
    englishName: 'SYSTEM DIRECTOR',
    number: 'GT-03',
    title: '全局掌控型',
    enTitle: 'SYSTEM DIRECTOR',
    category: '概念架构系',
    slogan: '统摄跨媒介要素与空间调度，以绝对的执行意志驱动宏大艺术宣言。',
    tagline: '统摄跨媒介要素与空间调度，以绝对的执行意志驱动宏大艺术宣言。',
    keywords: ['系统统筹', '空间调度', '战略执行', '高势能落地', '决断统领'],
    color: {
      accent: '#6D28D9',
      soft: '#FAF5FF',
      border: '#E9D5FF',
      text: '#581C87',
    },
    dimensions: {
      energy: '向外共振 76% · 24% 向内沉浸',
      perception: '概念构想 80% · 20% 实感观察',
      judgement: '结构推演 83% · 17% 感性表达',
      process: '计划构建 76% · 24% 即兴探索',
    },
    spectrum: {
      ie: { leftLabel: '向内沉浸', rightLabel: '向外共振', leftScore: 24, rightScore: 76 },
      ns: { leftLabel: '概念构想', rightLabel: '实感观察', leftScore: 80, rightScore: 20 },
      tf: { leftLabel: '结构推演', rightLabel: '感性表达', leftScore: 83, rightScore: 17 },
      jp: { leftLabel: '计划构建', rightLabel: '即兴探索', leftScore: 76, rightScore: 24 },
    },
    fullAnalysis:
      '你的创作从不甘心局限在单件孤立的画幅或器物之内，在你的视野里，一件成熟的作品必然是涵盖了空间场域、媒介交互、技术工程与文本传播的立体战役。拿到命题时，你习惯直接从展览最终呈现的高势能状态进行逆向推导，迅速明确核心论点与资源配置。你偏好大体量装置、沉浸式多屏空间、工业级精密构造或具有强烈宣言气质的视觉形态。在决策时，你果断决绝、目标极其清晰，能够毫不犹豫地剔除影响整体张力的冗余细节。面对评画与反馈，只要对方能指出更高效达成震撼效果的路径，你会展现极强的吸收迭代能力，迅速调整作战方案。面对Deadline，你是掌控全局的铁血统帅，早在倒计时前就已敲定打样与布展预案；在小组作业中，你天然成为核心主心骨与统筹发言人，善于调动每个人最擅长的技术模块。然而，你有时容易忽视微观情感的细腻波动，也可能在技术落地遭遇不可控物理阻滞时产生强烈的焦躁。',
    strengths: [
      '无与伦比的大尺度空间调度与多媒介整合能力',
      '决断迅速、目标极其坚定的高强度执行魄力',
      '极强的资源整合与公开答辩场域说服力',
    ],
    challenges: [
      '对微小的个人私密情绪缺乏耐心，容易陷入宏大叙事',
      '遇到技术瓶颈或不可抗力时容易给团队施加过大压强',
    ],
    inspirationMode: '勘察巨大尺度的建筑遗址、美术馆挑高空间，或者浏览当代双年展的策展结构图。',
    deadlineMode: '团队高效分工的总调度，甚至在DDL前两周就完成了展览物料的打样与预展演练。',
    teamworkMode: '公认的小组组长与对外发言人，能够快速拍板定方案并精准分配每个成员的任务工期。',
    creativeAdvice: '给宏大框架留出一些脆弱而柔软的细节缝隙，往往是那些微小的感性瞬间最能击中观众的内心深处。',
    sections: {
      status01: '从不局限于单个作品，作品往往是一整套覆盖空间、灯光、交互、印刷物与学术出版的系统工程。',
      advantage02: '强大的领导气场与决断力，极擅长动员资源与把控大体量项目，提案演讲时极具说服力。',
      block03: '对细枝末节的纯感性微小体验缺乏耐心，方案若遭遇不可控技术故障易产生强迫焦虑。',
      spark04: '勘察巨大尺度的建筑遗址、美术馆挑高空间，或者浏览当代双年展的策展结构图。',
      deadline05: '团队高效分工的总调度，甚至在DDL前两周就完成了展览物料的激光雕刻与打样打孔。',
      teamwork06: '公认的小组组长与对外发言人，能够快速拍板定方案并精准分配每个成员的任务工期。',
      keywords07: ['系统工程', '宣言式表达', '空间调度', '战略执行', '高势能输出'],
    },
  },

  ENTP: {
    code: 'ENTP',
    id: 'GT-04',
    name: '创意破局型',
    englishName: 'CREATIVE DISRUPTOR',
    number: 'GT-04',
    title: '创意破局型',
    enTitle: 'CREATIVE DISRUPTOR',
    category: '概念架构系',
    slogan: '在规则边界与逆向思维中玩味反转，用破坏性构想引爆视觉震荡。',
    tagline: '在规则边界与逆向思维中玩味反转，用破坏性构想引爆视觉震荡。',
    keywords: ['跨界颠覆', '反常规联想', '概念爆破', '敏捷原型', '自发突破'],
    color: {
      accent: '#8B5CF6',
      soft: '#F3E8FF',
      border: '#D8B4FE',
      text: '#6B21A8',
    },
    dimensions: {
      energy: '向外共振 72% · 28% 向内沉浸',
      perception: '概念构想 84% · 16% 实感观察',
      judgement: '结构推演 71% · 29% 感性表达',
      process: '即兴探索 78% · 22% 计划构建',
    },
    spectrum: {
      ie: { leftLabel: '向内沉浸', rightLabel: '向外共振', leftScore: 28, rightScore: 72 },
      ns: { leftLabel: '概念构想', rightLabel: '实感观察', leftScore: 84, rightScore: 16 },
      tf: { leftLabel: '结构推演', rightLabel: '感性表达', leftScore: 71, rightScore: 29 },
      jp: { leftLabel: '计划构建', rightLabel: '即兴探索', leftScore: 22, rightScore: 78 },
    },
    fullAnalysis:
      '你对墨守成规的艺术范式与学院派标准答案有着天然的免疫与厌倦。拿到任何平淡无奇的题目，你的第一反应往往是“如果把规则反过来玩会怎样？”你的灵感来源于高频的跨领域冲撞——从次文化梗、流行符号、黑客精神到荒诞派戏剧，一切都能成为你概念爆破的引信。在媒介选择上，你极少受单一画种束缚，擅长使用拼贴、互动装置、假想品牌与恶搞机制打破观众的心理预期。你的决策节奏极快，三分钟内就能蹦出十个完全不同的点子，并能迅速制作粗糙但极具冲击力的概念原型。在面对反馈时，批评反而能激起你的辩论欲与恶作剧心态，顺势把评委的质疑反向编织进作品的自嘲逻辑中。你的核心挑战在于对繁琐枯燥的深入刻画缺乏耐性，方案容易停留在“好玩的段子”层面。Deadline来临前，你往往凭借极限冲刺与神来之笔险胜，是小组中打破僵局、点燃亢奋气氛的绝佳破局者。',
    strengths: [
      '惊人的发散联想力与反叛常规的逆向思维',
      '极强的现场互动感与用荒诞解构严肃的幽默感',
      '善于在胶着困境中另辟蹊径，快速破局',
    ],
    challenges: [
      '容易喜新厌旧，对工艺深入与枯燥打磨缺乏耐性',
      '方案若缺乏实质精神重量，易滑向轻浮的表层玩梗',
    ],
    inspirationMode: '在深夜的社交网络、二手旧货市场与反常识科技新闻中抓取充满戏剧张力的荒诞火花。',
    deadlineMode: '在最后24小时极限爆发，用极其聪明甚至反叛的现场策展形式化险为夷。',
    teamworkMode: '头脑风暴时的超级发动机与气氛引爆者，随时提出令所有人震惊的破局提案。',
    creativeAdvice: '试着为一个看似玩世不恭的讽刺外壳，注入一个真正严肃不可动摇的深沉内核，反差感会产生巨大的艺术震撼。',
    sections: {
      status01: '从不按常规出牌，善于在大家思维定势的地方扔下一颗概念手榴弹，制造出人意料的反差。',
      advantage02: '极具爆发力的跨界联想力与打破规训的敏锐直觉，能用低成本方式产生极高话题度。',
      block03: '想法太多导致难以聚焦，常常在方案推进到80%时被更新奇的想法吸引走神。',
      spark04: '浏览亚文化论坛、黑客松成果，或者在二手旧货市场淘那些用途不明的古怪零件。',
      deadline05: '在最后一秒用充满戏剧感的方式化险为夷，甚至把制作过程中的瑕疵直接转化为作品观念的一部分。',
      teamwork06: '头脑风暴的主角与反思者，常常一句话打破全组的死气沉沉，但需要别人督促收尾。',
      keywords07: ['逆向思维', '荒诞幽默', '敏捷原型', '跨界拼贴', '观念突击'],
    },
  },

  INFJ: {
    code: 'INFJ',
    id: 'GT-05',
    name: '沉浸创想型',
    englishName: 'IMMERSIVE VISIONARY',
    number: 'GT-05',
    title: '沉浸创想型',
    enTitle: 'IMMERSIVE VISIONARY',
    category: '概念架构系',
    slogan: '以深邃的精神洞察与隐喻织体，在宁静之中构建唤醒心灵的精神场域。',
    tagline: '以深邃的精神洞察与隐喻织体，在宁静之中构建唤醒心灵的精神场域。',
    keywords: ['精神隐喻', '深度共情', '观念织体', '社会洞察', '内在理想'],
    color: {
      accent: '#0D9488',
      soft: '#F0FDFA',
      border: '#CCFBF1',
      text: '#115E59',
    },
    dimensions: {
      energy: '向内沉浸 84% · 16% 向外共振',
      perception: '概念构想 86% · 14% 实感观察',
      judgement: '感性表达 68% · 32% 结构推演',
      process: '计划构建 72% · 28% 即兴探索',
    },
    spectrum: {
      ie: { leftLabel: '向内沉浸', rightLabel: '向外共振', leftScore: 84, rightScore: 16 },
      ns: { leftLabel: '概念构想', rightLabel: '实感观察', leftScore: 86, rightScore: 14 },
      tf: { leftLabel: '结构推演', rightLabel: '感性表达', leftScore: 32, rightScore: 68 },
      jp: { leftLabel: '计划构建', rightLabel: '即兴探索', leftScore: 72, rightScore: 28 },
    },
    fullAnalysis:
      '你的创作动机往往深植于对人类生存处境、社会隐形秩序与内在精神困境的敏锐感知。面对创作命题，你不会立刻追逐表层的视觉炫技，而是让命题在内心静默沉淀数日，直到它与你的某段深层哲学体悟或历史隐喻产生回响。在视觉语言上，你偏爱富有精神厚度的媒介——无论是如梦似幻的影调、带有历史包浆的综合材料，还是充满神圣感与冥想意味的光影装置，都在为你构建独特的视界。你做出决断时极度珍视“内在纯粹性”，如果一个改动违背了你试图传达的核心寓意，即便技术上再华丽你也会断然拒绝。面对批评，你表面温和安静，内心却有着极坚固的审美底线；负面评价若触及作品灵魂容易让你陷入内耗。Deadline下，你会逼迫自己按部就班收尾，但总觉得现实物理成品不及内心幻象的十分之一。在团队中，你是敏锐的观念灵魂守望者，擅长赋予作品超越常规的深度与诗性温度。',
    strengths: [
      '穿透表象的深度隐喻构建力与精神象征提炼',
      '极强的审美自律与作品内在完整性守护力',
      '对观众深层无意识心智与情感共鸣的敏锐把握',
    ],
    challenges: [
      '对物理材料的有限性感到失落，容易产生创作自我怀疑',
      '倾向独自消化重度精神压力，不善于早期向外界寻求技术协助',
    ],
    inspirationMode: '在深夜阅读神秘学诗歌、聆听环境氛围音乐，或在老城区的黄昏光影里沉浸漫游。',
    deadlineMode: '克制且极度自律地按部就班推进，在静默中点亮展厅角落里最耐人寻味的精神光斑。',
    teamworkMode: '小组的理念压舱石与灵魂把控者，总能把平凡的项目升华为触动人心的精神载体。',
    creativeAdvice: '不必苛求物质世界能百分之百复刻内心的完美意象，学会拥抱作品在落地过程中的残缺，残缺本身也是一种诗意。',
    sections: {
      status01: '草图本中布满了密密麻麻的隐喻笔记与象征图式，作品往往承载着宏大的历史记忆或精神关怀。',
      advantage02: '深邃的情感洞察力与超然物外的审美格调，能创造出令人久久伫立、产生冥想的安静场域。',
      block03: '内心构想的精神世界过于完满，常常在现实物理材料的有限性面前感到无力与疲惫。',
      spark04: '独自在安静的宗教建筑、幽暗的树林漫步，或者阅读东方美学与存在主义哲学文本。',
      deadline05: '在自律的静默节奏中悄然完成整套布展，展出的那一刻散发出超越日常经验的沉静光晕。',
      teamwork06: '团队的哲学向导与道德良心，不常争抢话语权，但关键时刻的一句话往往能定下整部作品的精神高度。',
      keywords07: ['精神空间', '隐性隐喻', '深层通感', '神圣几何', '心灵沉降'],
    },
  },

  INFP: {
    code: 'INFP',
    id: 'GT-06',
    name: '感性表达型',
    englishName: 'EMOTIVE CREATOR',
    number: 'GT-06',
    title: '感性表达型',
    enTitle: 'EMOTIVE CREATOR',
    category: '感知表现系',
    slogan: '将隐秘的心绪、个体记忆与诗意触觉，凝结为直击心灵的情感物证。',
    tagline: '将隐秘的心绪、个体记忆与诗意触觉，凝结为直击心灵的情感物证。',
    keywords: ['个人叙事', '诗意触觉', '情绪共振', '生命经验', '真诚抒情'],
    color: {
      accent: '#059669',
      soft: '#ECFDF5',
      border: '#A7F3D0',
      text: '#065F46',
    },
    dimensions: {
      energy: '向内沉浸 86% · 14% 向外共振',
      perception: '概念构想 64% · 36% 实感观察',
      judgement: '感性表达 88% · 12% 结构推演',
      process: '即兴探索 74% · 26% 计划构建',
    },
    spectrum: {
      ie: { leftLabel: '向内沉浸', rightLabel: '向外共振', leftScore: 86, rightScore: 14 },
      ns: { leftLabel: '概念构想', rightLabel: '实感观察', leftScore: 64, rightScore: 36 },
      tf: { leftLabel: '结构推演', rightLabel: '感性表达', leftScore: 12, rightScore: 88 },
      jp: { leftLabel: '计划构建', rightLabel: '即兴探索', leftScore: 26, rightScore: 74 },
    },
    fullAnalysis:
      '对于你来说，艺术创作是一场不可替代的个体心灵救赎与真诚告白。你的灵感往往从极其私密的瞬间萌发：一封旧信的泛黄折痕、雨后南方空气中的潮湿气味，或是某个无法言说的情绪切片。拿到命题时，你必须先在其中锚定属于自己的生命经验与价值共鸣，否则任何空洞的形式探索都会让你感到虚伪和痛苦。在视觉语言上，你擅长极富个人触觉的手作感、私日记式的影像叙事、温润或带有些许伤痛感的色彩，以及充满偶发性细节的笔触。做决策时，你几乎完全依托于直觉的情感纯度：“它是否击中了我自己？”面对严苛的逻辑评画，你容易感到个人创伤被暴露，需要时间在独处中自我重组。面对Deadline，你容易因情绪波动或追求情感表达的“绝对真诚”而迟迟无法封笔。在团队中，你也许不是那个发号施令的人，但作品中那股无法伪装的动人力量，往往让所有人为你动容。',
    strengths: [
      '极度细腻真实的情感投射力与不可伪装的动人诗意',
      '敏锐捕捉脆弱美感与个体生命记忆的感知触角',
      '独一无二的个人化色彩与带有体温的手作触感',
    ],
    challenges: [
      '创作状态极度依赖内在情绪周期，低落期容易产生创作阻滞',
      '面对冰冷的理性评估容易感到自我价值受挫，需增强抗辩防御',
    ],
    inspirationMode: '翻阅童年旧照片、收集街角拾来的落叶与废弃物件，或在雨夜倾听一首私藏的独立民谣。',
    deadlineMode: '在情绪与灵感的拉扯中反复润色，在最后的微明曙光中为作品点上饱含深情的一笔。',
    teamworkMode: '情绪敏感的情感原点，用最真挚细腻的语言赋予冰冷的设计方案以触动人心的柔软肌理。',
    creativeAdvice: '学会在沉浸的私人世界与公共的视觉法则之间搭建一座小桥，你的真挚值得被更多人清晰地读懂。',
    sections: {
      status01: '画室案头宛如一座微型个人记忆博物馆，旧书信、风干植物与手写诗行交织成私密的抒情网。',
      advantage02: '极具共情力与诗意感性的情绪传达，能用看似微小的细节狠狠戳中观众内心中最柔软的角落。',
      block03: '情绪起伏直接影响推进节奏，一旦失去对主题的情感共鸣，便极难机械地强迫自己下笔。',
      spark04: '一场突如其来的暴雨、一段泛黄的旧磁带录音，或者一个人在画室里安静看天色暗下去。',
      deadline05: '常常在最后一晚边流泪边通宵打磨，最终交出的作品带有一种无可挑剔的脆弱之美。',
      teamwork06: '团队的情感催化剂与故事讲述者，用真挚打动所有人，但需要温和的工期督促。',
      keywords07: ['私密叙事', '诗意触觉', '情感标本', '微光呢喃', '绝对真诚'],
    },
  },

  ENFJ: {
    code: 'ENFJ',
    id: 'GT-07',
    name: '共创引领型',
    englishName: 'COLLABORATIVE LEADER',
    number: 'GT-07',
    title: '共创引领型',
    enTitle: 'COLLABORATIVE LEADER',
    category: '感知表现系',
    slogan: '以关系美学与公共共情为纽带，汇聚众人能量点亮公共艺术的温度。',
    tagline: '以关系美学与公共共情为纽带，汇聚众人能量点亮公共艺术的温度。',
    keywords: ['关系美学', '公共对话', '群体共情', '能量激发', '社区共生'],
    color: {
      accent: '#047857',
      soft: '#F0FDF4',
      border: '#BBF7D0',
      text: '#064E3B',
    },
    dimensions: {
      energy: '向外共振 80% · 20% 向内沉浸',
      perception: '概念构想 68% · 32% 实感观察',
      judgement: '感性表达 74% · 26% 结构推演',
      process: '计划构建 76% · 24% 即兴探索',
    },
    spectrum: {
      ie: { leftLabel: '向内沉浸', rightLabel: '向外共振', leftScore: 20, rightScore: 80 },
      ns: { leftLabel: '概念构想', rightLabel: '实感观察', leftScore: 68, rightScore: 32 },
      tf: { leftLabel: '结构推演', rightLabel: '感性表达', leftScore: 26, rightScore: 74 },
      jp: { leftLabel: '计划构建', rightLabel: '即兴探索', leftScore: 76, rightScore: 24 },
    },
    fullAnalysis:
      '你始终坚信艺术的力量不在于封闭画室里的自我陶醉，而在于人与人相遇时迸发的生命温度。面对创作命题，你首先思考的是：“这件作品将如何与公众产生连接？它能为观众或社区带来怎样的启示与抚慰？”你极其擅长参与式艺术、社区艺术、社会介入项目以及需要观众行为才能最终闭环的共创装置。在视觉语言的选择上，你注重平易近人却不失崇高感的形式，善于运用易于参与的道具、温和包容的空间动线与具有治愈感的光色。在决策过程中，你天然具备照顾全场情绪与各方视角的同理心，擅长把不同人看似矛盾的观点熔铸成和谐的宏大声部。面对评画，你极其诚恳虚心，视批评为完善公共沟通的宝贵契机。在团队中，你是天生的黏合剂、精神领袖与情绪推进器，能让整个小组在疲惫中重燃信念；但你有时会因过度顾及每一个人的感受，而在作品核心主线上面临妥协分散的隐患。',
    strengths: [
      '卓越的公共艺术组织力与激发他人参与的共振能量',
      '极高情商的沟通协调力，能将复杂诉求化为合力',
      '敏锐把握社会公众心理需求的温暖大局观',
    ],
    challenges: [
      '过度追求人人满意的和谐，可能弱化了艺术作品必要的锋芒与批判性',
      '承担过多他人的期待与情绪垃圾，容易在后期精力透支',
    ],
    inspirationMode: '深入社区走访、聆听不同阶层人群的生活故事，或参与一场热火朝天的共创工作坊。',
    deadlineMode: '带领整支团队有序推进，即使在最困顿的熬夜时刻也能点燃全场士气，温暖收官。',
    teamworkMode: '无可替代的队长与精神支柱，懂得发现每个组员的闪光点并予以最大程度的赋能。',
    creativeAdvice: '艺术有时需要刺痛人而非仅仅拥抱人，敢于在作品中保留一部分尖锐的质询，作品的社会力量会更深刻。',
    sections: {
      status01: '从不把艺术当作象牙塔里的独白，极其热衷于策划能让人群走进来、坐下来共同创作的场域。',
      advantage02: '极具感染力的公众沟通与组织协调力，能将散漫的人群凝聚成强大的艺术共生力量。',
      block03: '过度在意每个参与者的感受与反馈，容易在方案取舍时陷入妥协，导致核心锋芒被磨平。',
      spark04: '走访广州老城街巷、参与市集社群互动，或者与不同专业背景的同学围坐畅谈。',
      deadline05: '团队最温暖的后盾与精神导师，一边盯紧每个环节落地，一边为疲惫的组员加油打气。',
      teamwork06: '天生的小组领导者，不仅能把控艺术水准，更能让每个成员在合作中感到被尊重与被激发。',
      keywords07: ['社会介入', '关系共振', '赋能连接', '温情场域', '公共共创'],
    },
  },

  ENFP: {
    code: 'ENFP',
    id: 'GT-08',
    name: '灵感迸发型',
    englishName: 'IDEA SPARKER',
    number: 'GT-08',
    title: '灵感迸发型',
    enTitle: 'IDEA SPARKER',
    category: '感知表现系',
    slogan: '让万物互联的想象自由流淌，在跨媒介的跃迁中创造充满生机的奇境。',
    tagline: '让万物互联的想象自由流淌，在跨媒介的跃迁中创造充满生机的奇境。',
    keywords: ['万物通感', '色彩狂想', '跨媒介跃迁', '即兴催化', '丰沛生命力'],
    color: {
      accent: '#10B981',
      soft: '#ECFDF5',
      border: '#A7F3D0',
      text: '#047857',
    },
    dimensions: {
      energy: '向外共振 85% · 15% 向内沉浸',
      perception: '概念构想 82% · 18% 实感观察',
      judgement: '感性表达 78% · 22% 结构推演',
      process: '即兴探索 88% · 12% 计划构建',
    },
    spectrum: {
      ie: { leftLabel: '向内沉浸', rightLabel: '向外共振', leftScore: 15, rightScore: 85 },
      ns: { leftLabel: '概念构想', rightLabel: '实感观察', leftScore: 82, rightScore: 18 },
      tf: { leftLabel: '结构推演', rightLabel: '感性表达', leftScore: 22, rightScore: 78 },
      jp: { leftLabel: '计划构建', rightLabel: '即兴探索', leftScore: 12, rightScore: 88 },
    },
    fullAnalysis:
      '你的大脑就像一座永不停歇的超新星发生器，任何一丁点微小的视觉刺点都能点燃一整片绚烂的宇宙。拿到命题时，你根本不需要漫长的痛苦憋稿，瞬间就能在脑海中并联出二十种跨越插画、动态图形、声音装置与潮流服装的奇思妙想。你热烈拥抱高饱和度的色彩撞击、异质材料的异想天开混搭，以及充满生命活力的有机形态。对于你而言，最痛苦的不是没有想法，而是不得不从十个极其好玩的方向中痛下决心砍掉九个。做决定时你容易被更新鲜的支线诱惑，常常在半途突然推翻重来。面对修改意见，你擅长从别人的零星短句中逆向脑补出更加惊艳的新故事。面对Deadline，你永远是工作室里在最后二十四小时创造奇迹的“通宵战神”；在团队合作中，你是无与伦比的活力源泉，随时能带给同伴无尽的惊喜，但极度需要一个稳重靠谱的搭档帮你收拢战线、落实打样与排版细节。',
    strengths: [
      '泉涌般的联想想象力与高频输出创意的超强脑力',
      '对色彩节奏与生动视听语言的天生敏锐直觉',
      '永不枯竭的好奇心与感染周围所有人的创作活力',
    ],
    challenges: [
      '执行收拢力较弱，容易在大量闪耀的点子中迷失主线',
      '后期枯燥的文件整理与标准化落地阶段容易出现疲软',
    ],
    inspirationMode: '漫游于潮流手办展、实验声光剧场，或是随身携带速写本在热闹的咖啡馆捕捉市井灵光。',
    deadlineMode: '最后的极限冲刺狂人，伴随着躁动的音乐在天光放亮前奇迹般交出一套令人惊叹的生动画卷。',
    teamworkMode: '无尽的点子发动机与开心果，只要有你在，整个创作小组就绝不会陷入灵感枯竭的沉闷。',
    creativeAdvice: '学会为你喷薄而出的灵感建造一个坚固的“重力锚”，选定一个点深挖到底，你的才华将爆发出倍增的力量。',
    sections: {
      status01: '速写本上涂满了五彩斑斓的狂想图式与跳跃词汇，永远在尝试将两种八竿子打不着的媒介揉在一起。',
      advantage02: '永不枯竭的充沛好奇心与惊人的跨界联想力，能在极短时间内为任何题目注入鲜活的元气。',
      block03: '方案推进时容易被更新奇的点子诱惑而偏离主干，最后往往陷入赶工的极限危机。',
      spark04: '逛潮流玩具展、看实验动画，或者把几首完全不同风格的音乐混在一起边听边画。',
      deadline05: '凭借惊人的临场爆发力，在最后一晚靠纯粹的热爱创造出视觉奇迹，展出时总能吸引全场目光。',
      teamwork06: '小组的活力催化剂与灵感源泉，能瞬间点燃沉闷的讨论氛围，但需要靠谱队友帮忙稳住工期。',
      keywords07: ['异质碰撞', '色彩狂潮', '跨媒介跃迁', '即兴催化', '生机勃发'],
    },
  },

  ISFJ: {
    code: 'ISFJ',
    id: 'GT-09',
    name: '专注描绘型',
    englishName: 'FOCUSED OBSERVER',
    number: 'GT-09',
    title: '专注描绘型',
    enTitle: 'FOCUSED OBSERVER',
    category: '实操材料系',
    slogan: '以惊人的耐心打磨物性的微观尺度，在日复一日的沉静中凝铸岁月质地。',
    tagline: '以惊人的耐心打磨物性的微观尺度，在日复一日的沉静中凝铸岁月质地。',
    keywords: ['工匠耐力', '微观秩序', '经典造物', '温润关怀', '踏实深耕'],
    color: {
      accent: '#2563EB',
      soft: '#EFF6FF',
      border: '#BFDBFE',
      text: '#1D4ED8',
    },
    dimensions: {
      energy: '向内沉浸 82% · 18% 向外共振',
      perception: '实感观察 84% · 16% 概念构想',
      judgement: '感性表达 68% · 32% 结构推演',
      process: '计划构建 80% · 20% 即兴探索',
    },
    spectrum: {
      ie: { leftLabel: '向内沉浸', rightLabel: '向外共振', leftScore: 82, rightScore: 18 },
      ns: { leftLabel: '概念构想', rightLabel: '实感观察', leftScore: 16, rightScore: 84 },
      tf: { leftLabel: '结构推演', rightLabel: '感性表达', leftScore: 32, rightScore: 68 },
      jp: { leftLabel: '计划构建', rightLabel: '即兴探索', leftScore: 80, rightScore: 20 },
    },
    fullAnalysis:
      '当浮躁的艺术潮流不断追逐空洞概念与眼球效应时，你始终如同一位静默的守护者，沉浸在纯粹造物的时间长河里。你的灵感来自对自然万物微观肌理的漫长观察：叶脉的交织、传统纹样的韵律，或是某种工艺在反复摩挲后显露的温润包浆。面对命题，你习惯稳扎稳打，从最经典扎实的基础研究、物料调研与工序考证切入。在视觉语言上，你对工艺精细度、线条精准度、材质相融性有着近乎神圣的敬畏，擅长工笔、版画制版、精工染织与细腻陶瓷。做出决策时，你极其看重“品质感”与“对得起时间的沉淀”，不会为了走捷径而偷工减料。面对批评，你虚心且内敛，会默默将所有修改意见转化为下一轮打磨的细密刀痕。Deadline前，你往往按部就班、从容不迫地完成封底与包装；在小组中，你是所有人最信赖的品质底线，但有时也会因为过分克制内敛，而在概念阐述与舞台聚光灯下显得不够自信。',
    strengths: [
      '惊人的手作专注力与耐得住寂寞的深厚工匠精神',
      '对微观尺度、材料触感与工艺细节的严密把控',
      '踏实可靠、始终能拿出高完成度精品的兑现能力',
    ],
    challenges: [
      '对过于激进先锋的概念实验缺乏安全感，容易局限于舒适区',
      '不喜在公共场合争抢话语权，优秀的视觉质感易被低估',
    ],
    inspirationMode: '在植物园用放大镜细看花萼构造、研究古代纹样拓片，或在安静的工作台前抚摸不同纸张的克重。',
    deadlineMode: '绝不拖延，有条不紊地在节点前一周完成所有装裱与装订，作品散发着干净纯粹的气息。',
    teamworkMode: '小组的“质检大师”与默默付出的定海神针，凡是经过你双手的物料都具备无可挑剔的高品质。',
    creativeAdvice: '给自己的精湛工艺配上更勇敢的概念声音，敢于在展台上高声宣读你耗费无数心血沉淀出的造物哲学。',
    sections: {
      status01: '工作台永远整洁有序，工具按色号与尺码一丝不苟地排开，能在同一块材料前静坐数小时细细雕琢。',
      advantage02: '令人叹为观止的手工精度与耐心，对传统工艺规范与材料物理特性有深厚的身体记忆。',
      block03: '在方案初期容易因追求万无一失而显得过于保守，不敢轻易推翻既有经验去尝试破坏性实验。',
      spark04: '观察自然标本、抚摸手工纸的纹理，或者在博物馆库房近距离端详古代器物的修补金缮痕迹。',
      deadline05: '按照预定计划从容不迫地收工，早早就把作品妥善包装入库，从不在最后一刻狼狈失控。',
      teamwork06: '最值得托付的质量把关人与默默奉献者，只要把最具难度的实物制作交给你，大家都能放心。',
      keywords07: ['工匠专注', '微观秩序', '经典造物', '温润关怀', '踏实深耕'],
    },
  },

  ISTJ: {
    code: 'ISTJ',
    id: 'GT-10',
    name: '规范执行型',
    englishName: 'STRUCTURED MAKER',
    number: 'GT-10',
    title: '规范执行型',
    enTitle: 'STRUCTURED MAKER',
    category: '实操材料系',
    slogan: '遵循严格的工艺规范与严密制图，以无可挑剔的实体精度完成作品兑现。',
    tagline: '遵循严格的工艺规范与严密制图，以无可挑剔的实体精度完成作品兑现。',
    keywords: ['工程理性', '工艺模数', '严密标准', '可靠兑现', '实操严谨'],
    color: {
      accent: '#1D4ED8',
      soft: '#EFF6FF',
      border: '#BFDBFE',
      text: '#1E40AF',
    },
    dimensions: {
      energy: '向内沉浸 80% · 20% 向外共振',
      perception: '实感观察 86% · 14% 概念构想',
      judgement: '结构推演 84% · 16% 感性表达',
      process: '计划构建 88% · 12% 即兴探索',
    },
    spectrum: {
      ie: { leftLabel: '向内沉浸', rightLabel: '向外共振', leftScore: 80, rightScore: 20 },
      ns: { leftLabel: '概念构想', rightLabel: '实感观察', leftScore: 14, rightScore: 86 },
      tf: { leftLabel: '结构推演', rightLabel: '感性表达', leftScore: 84, rightScore: 16 },
      jp: { leftLabel: '计划构建', rightLabel: '即兴探索', leftScore: 88, rightScore: 12 },
    },
    fullAnalysis:
      '在你的艺术世界里，优秀的作品绝非依赖侥幸的灵光乍现，而是严谨工程思维、材料物理学与高度自律工艺的终极兑现。拿到命题时，你首先关注的是现实边界条件：场地荷载、施工公差、材料疲劳强度与工期预算。在视觉语言上，你青睐极简几何、标准化模数、精确工业制图与经得起卡尺测量的榫卯结构。做出创作决断时，你只相信客观事实与经过多次破坏性测试的数据，坚决摒弃那些悬浮在半空、不可落地的空泛叙事。面对评画与导师意见，只要指出的是具体物理缺陷或结构漏洞，你会立刻掏出小本认真记录并光速修正。面对Deadline，你的日程表如同高铁运行图般精准，永远是全工作室第一个完成终稿、将打样封箱归档的人。在团队中，你是最为不可或缺的“地基工程大师”与质量检查官，但有时容易对先锋实验中的非理性偶然性抱有怀疑，需要学会偶尔允许“意外的不完美”发生。',
    strengths: [
      '极其硬核的结构力学分析与工业级工程图纸绘制能力',
      '无懈可击的时间管理自律性与极高的项目落地完成度',
      '在复杂物理工艺面前保持高度冷静、讲究规范的专业操守',
    ],
    challenges: [
      '对过于模糊抽象或纯情绪抒发的概念缺乏认同感',
      '面对突发不可控变更时容易产生计划被破坏的抵触情绪',
    ],
    inspirationMode: '研究精密的机械构造剖面、翻阅工业制图技术规范，或在车床前推敲零件的公差配合。',
    deadlineMode: '全工作室唯一的提前交卷选手，布展图纸精确到毫米，标签水平仪贴得无可挑剔。',
    teamworkMode: '团队的核心工程骨干与秩序维护者，把控技术图纸与安全红线，严防方案沦为空中楼阁。',
    creativeAdvice: '允许自己的图纸上出现一条非理性的、偶发的弧线，艺术的灵气有时恰恰藏在那些“不合规范”的瞬间。',
    sections: {
      status01: '电脑文件夹分类严谨到毫厘，每一版方案都带有标准的版本迭代命名与详细的材料工艺清单。',
      advantage02: '极度可靠的工程落地能力与自律精神，能把最天马行空的草图精确转化为结实成立的物理构造。',
      block03: '对非理性的概念发散抱有天然警惕，有时会因为过早关注技术可行性而扼杀了先锋的创意火苗。',
      spark04: '查阅精密的机械制图图纸、研究工业模数体系，或者去工厂车间观摩精密机床加工过程。',
      deadline05: '严格按工程甘特图执行，永远是工作室里第一个完成布展并擦干净展示台的人。',
      teamwork06: '小组的技术基石与最稳防线，负责解决所有的尺寸、公差与承重问题，绝不掉链子。',
      keywords07: ['工程理性', '工艺模数', '严密标准', '可靠兑现', '实操严谨'],
    },
  },

  ESTJ: {
    code: 'ESTJ',
    id: 'GT-11',
    name: '统筹落实型',
    englishName: 'PROJECT ORGANIZER',
    number: 'GT-11',
    title: '统筹落实型',
    enTitle: 'PROJECT ORGANIZER',
    category: '现场统筹系',
    slogan: '以清晰的工期节点与强大的组织魄力，将错综复杂的展览构想落入现实。',
    tagline: '以清晰的工期节点与强大的组织魄力，将错综复杂的展览构想落入现实。',
    keywords: ['目标拆解', '工期倒排', '现场调度', '资源整合', '高质交付'],
    color: {
      accent: '#1E40AF',
      soft: '#EFF6FF',
      border: '#BFDBFE',
      text: '#172554',
    },
    dimensions: {
      energy: '向外共振 78% · 22% 向内沉浸',
      perception: '实感观察 80% · 20% 概念构想',
      judgement: '结构推演 82% · 18% 感性表达',
      process: '计划构建 86% · 14% 即兴探索',
    },
    spectrum: {
      ie: { leftLabel: '向内沉浸', rightLabel: '向外共振', leftScore: 22, rightScore: 78 },
      ns: { leftLabel: '概念构想', rightLabel: '实感观察', leftScore: 20, rightScore: 80 },
      tf: { leftLabel: '结构推演', rightLabel: '感性表达', leftScore: 82, rightScore: 18 },
      jp: { leftLabel: '计划构建', rightLabel: '即兴探索', leftScore: 86, rightScore: 14 },
    },
    fullAnalysis:
      '你拥有艺术院校中极其稀缺的“将纸面蓝图转化为物理现实”的卓越统筹力与行政魄力。对你而言，再惊艳的构思若无法按时立在展厅里，便毫无意义。面对命题，你能在极短时间内将其拆解为清晰的目标里程碑、采购物料单与施工配合方案。在视觉呈现上，你推崇具有强烈体量感、结构清晰、信息传达高效且工艺完成度极高的形态。做决策时，你雷厉风行、刀刃向内，当两个方向陷入争议时，你会毫不犹豫依据“现有条件下哪个能做到最佳交付”来一锤定音。面对批评，你从不拖泥带水沉湎于情绪内耗，立刻评估修改成本并迅速重新排期。Deadline前，你往往指挥若定，甚至连展签排版、灯光流明度与垃圾清扫都能安排得井井有条。在小组作业中，你不仅是公认的项目经理，更是带领大家冲出疲惫泥潭的强力引擎；但偶尔要提醒自己放慢脚步，给组员留出适度的沉思与情绪喘息空间。',
    strengths: [
      '卓越的展览统筹、工期倒排与现场多工种协同调度魄力',
      '高效利落的决断力，极擅长在复杂现实约束下达成高完成度',
      '务实干练的沟通风格，能迅速打通外部制作、打样与施工链路',
    ],
    challenges: [
      '在极度紧凑的推进节奏中容易显得过于强势，忽视同伴的情绪感受',
      '对带有实验性但成功率不确定的风险方案缺乏容忍度',
    ],
    inspirationMode: '观摩大型艺术展的搭建现场、研究美术馆展陈动线，或拆解一个大型展演项目的推进日程。',
    deadlineMode: '雷厉风行、巡视全场的“现场督导”，以绝对的权威确保每个部件按时螺丝上锁、完美亮灯。',
    teamworkMode: '无可撼动的首席项目总监，负责定下时间表与责任书，用铁腕保障全组平稳通过评图考核。',
    creativeAdvice: '给创作过程留一点“无目的的闲逛时间”，有时候最惊艳的艺术突破并非来自计划，而是来自偶遇。',
    sections: {
      status01: '随时备有打印整齐的工期甘特图与物料预算表，在嘈杂的布展现场如同战地指挥官般有条不紊。',
      advantage02: '极强的组织魄力与落地执行力，善于将宏大虚无的构想拆解为具体可量化的施工步骤并严密推进。',
      block03: '当同伴陷入漫无边际的情感纠结或概念发散时容易感到烦躁，更倾向用“行不行、做不做”快速切断争议。',
      spark04: '考察大型美术馆布展工地、研究工业级包装运输方案，或者制定一份严丝合缝的项目里程碑日程。',
      deadline05: '倒计时前早已安排好灯光调试、展签贴附与摄影文档归档，带着全组从容收工吃宵夜。',
      teamwork06: '公认的项目经理与现场总指挥，只要你在场，任何复杂的团队课题都能以极高的工业标准顺利交付。',
      keywords07: ['目标拆解', '工期倒排', '现场调度', '资源整合', '高质交付'],
    },
  },

  ESFJ: {
    code: 'ESFJ',
    id: 'GT-12',
    name: '协同沟通型',
    englishName: 'COLLABORATIVE CONNECTOR',
    number: 'GT-12',
    title: '协同沟通型',
    enTitle: 'COLLABORATIVE CONNECTOR',
    category: '现场统筹系',
    slogan: '以敏锐的同理心联结团队同伴，在温馨关照与默契协作中孵化动人成果。',
    tagline: '以敏锐的同理心联结团队同伴，在温馨关照与默契协作中孵化动人成果。',
    keywords: ['同伴共情', '资源联络', '氛围营造', '默契协作', '温情叙事'],
    color: {
      accent: '#0284C7',
      soft: '#F0F9FF',
      border: '#BAE6FD',
      text: '#0369A1',
    },
    dimensions: {
      energy: '向外共振 84% · 16% 向内沉浸',
      perception: '实感观察 78% · 22% 概念构想',
      judgement: '感性表达 76% · 24% 结构推演',
      process: '计划构建 78% · 22% 即兴探索',
    },
    spectrum: {
      ie: { leftLabel: '向内沉浸', rightLabel: '向外共振', leftScore: 16, rightScore: 84 },
      ns: { leftLabel: '概念构想', rightLabel: '实感观察', leftScore: 22, rightScore: 78 },
      tf: { leftLabel: '结构推演', rightLabel: '感性表达', leftScore: 24, rightScore: 76 },
      jp: { leftLabel: '计划构建', rightLabel: '即兴探索', leftScore: 78, rightScore: 22 },
    },
    fullAnalysis:
      '你深知艺术创作不仅是理性的博弈与灵感的迸发，更是一群人共同呼吸、彼此托举的情感旅程。面对命题，你不仅关注题目本身的学术诉求，更会敏锐觉察周围同伴的擅长点与兴奋点。在视觉语言上，你偏爱带有社会温度、人文关怀与治愈力量的叙事形式，善于把多位成员的特长（如手绘、木作、摄影或编导）有机编织进一个和谐温情的整体框架中。在做决策时，你极力避免非黑即白的零和对抗，总能用高超的情商找到兼顾艺术追求与团队凝聚力的最优解。面对评画与导师指导，你善于捕捉老师话语背后的核心期待，并迅速转化为通俗易懂的行动指引分发给组员。临近Deadline，你往往是一边通宵赶工一边为大家订奶茶点心、维系团队士气的温暖支柱。在团队中，你是当之无愧的团队胶水，但有时为了维护集体和气，容易压抑自己真实独特的艺术棱角，需要学会勇敢表达自己的个人锋芒。',
    strengths: [
      '极高的人际情商与发现同伴潜能的敏锐洞察力',
      '营造和谐、积极、富有生命力的创作工作氛围',
      '极强的外部资源对接能力与多方共赢的协商智慧',
    ],
    challenges: [
      '过度在意他人认同与评委情绪，容易在作品锐度上妥协退让',
      '不愿面对冲突，有时会回避方案中本该彻底重构的致命缺陷',
    ],
    inspirationMode: '在集体自习室里与大家围坐头脑风暴、翻看温馨的人文摄影集，或是策划一次工作室聚餐。',
    deadlineMode: '通宵夜里的团队守护神，用咖啡、点心与鼓励的话语化解所有人的焦虑，齐心协力撞线。',
    teamworkMode: '无可替代的核心凝聚力，总能把性格迥异、互不服气的艺术生整合成一支战斗力极强的队伍。',
    creativeAdvice: '不要害怕创作中的争议与冲突，有时候最震撼的艺术火花，恰恰诞生于彼此毫不妥协的碰撞之中。',
    sections: {
      status01: '画室里人缘最好的中心人物，随时能把来自不同专业的同学拉进同一个群聊，其乐融融地推进项目。',
      advantage02: '极强的团队凝聚力与同理心，擅长化解组内矛盾，让每一个参与者都能在作品中找到归属感。',
      block03: '过于看重大家的一致意见，容易在关键决策时刻摇摆不定，不敢独断专行地拍板定调。',
      spark04: '同伴之间温暖的深夜促膝长谈、走访社区手艺人，或者策划一次热闹的跨专业联谊展览。',
      deadline05: '一边麻利地整理展具物料，一边为通宵的组员递上热奶茶与眼药水，全组因你而充满韧性。',
      teamwork06: '公认的“团队润滑剂”与最佳合作搭档，只要有你在组里，协作过程就永远充满欢笑与安全感。',
      keywords07: ['同伴共情', '资源联络', '氛围营造', '默契协作', '温情叙事'],
    },
  },

  ISTP: {
    code: 'ISTP',
    id: 'GT-13',
    name: '动手验证型',
    englishName: 'HANDS-ON TESTER',
    number: 'GT-13',
    title: '动手验证型',
    enTitle: 'HANDS-ON TESTER',
    category: '实操材料系',
    slogan: '用双手直接与物质世界角力，在电光石火的物理试错中凿出作品的骨骼。',
    tagline: '用双手直接与物质世界角力，在电光石火的物理试错中凿出作品的骨骼。',
    keywords: ['实物试错', '工具大师', '材料阻力', '即兴智性', '机能美学'],
    color: {
      accent: '#D97706',
      soft: '#FFFBEB',
      border: '#FDE68A',
      text: '#B45309',
    },
    dimensions: {
      energy: '向内沉浸 84% · 16% 向外共振',
      perception: '实感观察 86% · 14% 概念构想',
      judgement: '结构推演 80% · 20% 感性表达',
      process: '即兴探索 72% · 28% 计划构建',
    },
    spectrum: {
      ie: { leftLabel: '向内沉浸', rightLabel: '向外共振', leftScore: 84, rightScore: 16 },
      ns: { leftLabel: '概念构想', rightLabel: '实感观察', leftScore: 14, rightScore: 86 },
      tf: { leftLabel: '结构推演', rightLabel: '感性表达', leftScore: 80, rightScore: 20 },
      jp: { leftLabel: '计划构建', rightLabel: '即兴探索', leftScore: 28, rightScore: 72 },
    },
    fullAnalysis:
      '你最讨厌在漫长空洞的草图讨论会上浪费口舌，对于你而言，“想一万次不如亲手做一次”。你的灵感直接迸发于与工具、机床、木料与金属的真实对抗中：砂轮飞溅的火花、材料切削的阻力，以及机件咬合瞬间的机械美感，都能让你瞬间进入高度专注的流心状态。面对命题，你习惯跳过冗长的文献检索，直接抱回一堆原材料在车间进行破坏性打样与装配实验。在视觉语言上，你极具硬核机能美学品味，追求材料的原生质感、结构裸露的真实性与严丝合缝的动手逻辑。做出决策时，你完全依据“现场做出来的物理效果究竟成立不成立”来判定。面对批评，你极少口头辩解，而是默默拎起扳手直接在展位上改给你看。面对Deadline，你拥有令人咋舌的极限动手应变力，任何突发故障都能被你用一把电烙铁现场搞定。你是不折不扣的车间战神，但偶尔需要走出作坊，让作品的观念文本与社会语境更加丰满。',
    strengths: [
      '精湛的工具驾驭能力与无惧材料物理阻力的动手实力',
      '极强的现场应急排障能力与冷峻沉着的工程直觉',
      '对原生材质肌理与功能性构造的独到审美品味',
    ],
    challenges: [
      '对纯理论性的前置观念研讨缺乏耐性，容易被误认为“只重制作不重思想”',
      '文字陈述与作品自述常显简略，需强化观念阐释能力',
    ],
    inspirationMode: '在五金机电城淘异形齿轮螺丝、把玩废弃工业零件，或在木工房亲手刨削一块木料的结疤。',
    deadlineMode: '叼着焊枪或拿着角磨机战斗到最后三十分钟，现场哪怕有零件崩塌也能化腐朽为神奇。',
    teamworkMode: '车间里的终极王牌与技术兜底人，任何纸面设计若卡壳，只要找你就能在半小时内拼出样机。',
    creativeAdvice: '试着为你无懈可击的手工原型撰写一段深沉的哲学自白，当硬核工艺遇上厚重思想，你的作品将所向披靡。',
    sections: {
      status01: '身上总带着机油味、木屑或金属粉尘，比起绘图软件，更信任游标卡尺、电烙铁与角磨机的真实震动。',
      advantage02: '极强的动手试错本领与现场故障排除能力，任何卡壳的结构难题到你手里都能被快速解构攻克。',
      block03: '对繁琐的文本论述与纯概念思辨缺乏耐心，容易陷入“埋头苦做却不愿向评委阐述背后意图”的沉默。',
      spark04: '在五金机电市场闲逛、研究老式机械手表的擒纵机构，或者亲手拆解一件报废的工业仪器。',
      deadline05: '在最后关头现场组装调试，即便突发断电或螺栓滑丝，也能冷静掏出替换构件光速解决。',
      teamwork06: '团队里不可替代的车间主心骨，只要有你在，任何疯狂的实体装置都有实现的可能。',
      keywords07: ['器物解构', '物理阻力', '机电装置', '极客工匠', '现场应变'],
    },
  },

  ISFP: {
    code: 'ISFP',
    id: 'GT-14',
    name: '细腻感知型',
    englishName: 'SENSITIVE OBSERVER',
    number: 'GT-14',
    title: '细腻感知型',
    enTitle: 'SENSITIVE OBSERVER',
    category: '感知表现系',
    slogan: '捕捉光影、色彩与肌理最微茫的颤动，在静默沉思中流淌出纯粹的视觉诗篇。',
    tagline: '捕捉光影、色彩与肌理最微茫的颤动，在静默沉思中流淌出纯粹的视觉诗篇。',
    keywords: ['感官敏锐', '光影流转', '色彩直觉', '隐性诗意', '纯粹具象'],
    color: {
      accent: '#EA580C',
      soft: '#FFF7ED',
      border: '#FED7AA',
      text: '#9A3412',
    },
    dimensions: {
      energy: '向内沉浸 82% · 18% 向外共振',
      perception: '实感观察 85% · 15% 概念构想',
      judgement: '感性表达 84% · 16% 结构推演',
      process: '即兴探索 76% · 24% 计划构建',
    },
    spectrum: {
      ie: { leftLabel: '向内沉浸', rightLabel: '向外共振', leftScore: 82, rightScore: 18 },
      ns: { leftLabel: '概念构想', rightLabel: '实感观察', leftScore: 15, rightScore: 85 },
      tf: { leftLabel: '结构推演', rightLabel: '感性表达', leftScore: 16, rightScore: 84 },
      jp: { leftLabel: '计划构建', rightLabel: '即兴探索', leftScore: 24, rightScore: 76 },
    },
    fullAnalysis:
      '你拥有令人艳羡的天生感官敏锐度，对现实世界的光影流变、微妙色彩倾向与微茫氛围有着超越常人的洞察力。面对创作命题，你不会急于上纲上线到宏大理论，而是任由现实世界中某个触动心灵的视觉细节——一处墙皮剥落的色阶、午后斜阳在画布上的投射——引导着你的画笔。在视觉语言上，你极其依赖身体记忆与直接的视觉审美直觉，擅长油画纯色调的微妙并置、雕塑光影切面的起伏，以及充满呼吸感的静谧画面。在决策时，你忠于自己双眼的纯粹判断，任何违背视觉和谐的教条安排都会让你感到生理上的不适。面对评画，你生性低调内秀，不喜夸夸其谈，更倾向让作品本身的色彩与质地替你发声。面对Deadline，你更愿意在自己的节奏里默默精进每一处高光；在团队中，你是无声提供高阶视觉审美的审美品鉴师，但有时会因不擅言辞阐释而在提案答辩时略显吃亏，需要学会为自己动人的画面赋予更自信的语言表达。',
    strengths: [
      '无与伦比的视觉审美纯度与对微妙色彩、质感的高阶鉴赏力',
      '极具当下现场感的即兴感知与捕捉瞬逝诗意的敏锐触角',
      '真挚纯粹、远离功利浮躁的艺术家本真状态',
    ],
    challenges: [
      '不擅长用学术化理论术语推销自己的作品，容易在答辩中吃哑巴亏',
      '过分追求画面的微妙感觉，有时难以权衡宏观概念的社会相关性',
    ],
    inspirationMode: '在午后阳光穿过树叶的斑驳光影中静坐、在油画调色板上尝试十种灰色调的渐变，或漫步于老画室的走廊。',
    deadlineMode: '不急不躁地为画布刷上最后一道半透明罩染光泽，即便全场喧闹也能保持心中的宁静孤岛。',
    teamworkMode: '团队的终极视觉审美品鉴师，任何刺眼或庸俗的配色只要被你过目，都能被调教得极其高级。',
    creativeAdvice: '不必害怕给你的感性画面配上文字，尝试用诗意的词汇写下你凝视光影那一瞬的心跳，它会成为通向观众的钥匙。',
    sections: {
      status01: '调色盘上的颜色过渡精妙如莫奈的花园，下笔极具敏锐的身体呼吸感，能精准捕捉到零点几度的色相偏差。',
      advantage02: '天生卓越的视觉通感与质感捕捉力，作品哪怕没有繁琐的理论包装，单凭视觉张力便足以动人。',
      block03: '不擅长用滔滔不绝的学术行话为自己辩护，在面对强词夺理的逻辑拷问时容易选择沉默与退缩。',
      spark04: '观察黄昏时光线在水泥地面上的反光、触摸一块老丝绸的褶皱，或者独自去郊野写生。',
      deadline05: '沉浸在自己的小宇宙里，安安静静地给画布刷上最后一遍定画液，静穆之中自有一股定力。',
      teamwork06: '组内的视觉审美守护者，负责让整套设计方案褪去廉价的商业烟火气，注入纯正的纯艺术格调。',
      keywords07: ['光影流转', '色彩直觉', '纯粹具象', '微茫氛围', '静谧感官'],
    },
  },

  ESTP: {
    code: 'ESTP',
    id: 'GT-15',
    name: '即兴实作型',
    englishName: 'SPONTANEOUS MAKER',
    number: 'GT-15',
    title: '即兴实作型',
    enTitle: 'SPONTANEOUS MAKER',
    category: '现场统筹系',
    slogan: '直面现场的偶发变异与感官刺激，在极限博弈中引爆最强悍的现场张力。',
    tagline: '直面现场的偶发变异与感官刺激，在极限博弈中引爆最强悍的现场张力。',
    keywords: ['现场破局', '高能行动', '危机直觉', '感官轰炸', '即兴爆破'],
    color: {
      accent: '#C2410C',
      soft: '#FFF7ED',
      border: '#FED7AA',
      text: '#9A3412',
    },
    dimensions: {
      energy: '向外共振 86% · 14% 向内沉浸',
      perception: '实感观察 82% · 18% 概念构想',
      judgement: '结构推演 74% · 26% 感性表达',
      process: '即兴探索 85% · 15% 计划构建',
    },
    spectrum: {
      ie: { leftLabel: '向内沉浸', rightLabel: '向外共振', leftScore: 14, rightScore: 86 },
      ns: { leftLabel: '概念构想', rightLabel: '实感观察', leftScore: 18, rightScore: 82 },
      tf: { leftLabel: '结构推演', rightLabel: '感性表达', leftScore: 74, rightScore: 26 },
      jp: { leftLabel: '计划构建', rightLabel: '即兴探索', leftScore: 15, rightScore: 85 },
    },
    fullAnalysis:
      '你身上的创作荷尔蒙几乎永远在沸腾，任何案头上的四平八稳都会让你索然无味，只有真实的现场危机与感官刺激能激发你最强悍的创造力。面对命题，你倾向以最快速度杀入现场，勘测场地、搜罗最粗粝有劲的现成品。在视觉语言上，你偏爱带有身体冲击力、动态机械、强烈光电与粗粝工业感的表达形式。做决策时你从不拖泥带水，靠野兽般的本能直觉一击制胜，敢于在布展前夜直接推翻温吞的常规方案，换上更具挑衅性的现场实验。面对导师批评，你从不玻璃心，反而把挑战当成角斗游戏，当场就能构思出反制方案。面对Deadline，别人可能濒临崩溃，你却在肾上腺素狂飙中爆发出三倍以上的能量，越是极限越能绝地反击打出漂亮一仗。在团队中，你是最敢冲锋陷阵的开路先锋与救火队长，但有时过于随性与追求瞬间快感，容易忽略对细节与概念深度的长期耐力淬炼。',
    strengths: [
      '野兽般敏锐的现场空间直觉与极限状态下的强大破局能力',
      '果敢无畏的行动力与制造震撼感官冲击的视觉把控力',
      '在任何复杂意外面前不退缩、善于变不利为奇迹的应变力',
    ],
    challenges: [
      '缺乏长线静心沉淀的耐心，容易对深层次理论推导感到厌倦',
      '冲动之下易做出颠覆性破坏动作，需防范彻底翻车的系统风险',
    ],
    inspirationMode: '在嘈杂的极限运动场、拆迁工地的断壁残垣中穿行，或在充满未知危险的废墟里即兴涂鸦。',
    deadlineMode: '肾上腺素爆棚的极限玩家，最后一刻直接把现场意外转化为神来之笔，震撼全场。',
    teamworkMode: '绝境突击队长，无论团队遭遇何种物料短缺或技术瘫痪，你都能带头冲进现场杀出一条血路。',
    creativeAdvice: '在宣泄强悍感官轰炸的同时，学会为你的火热行动匹配一个冷峻克制的批判支点，作品会更具重量。',
    sections: {
      status01: '拒绝四平八稳的温吞方案，极度享受在展厅现场挥洒汗水、敲敲打打，把不确定性直接转化为视觉张力。',
      advantage02: '极强的危机应变力与现场主导力，敢于在极限节点推翻常规、剑走偏锋，制造最具震慑力的效果。',
      block03: '难以忍受长达数周的前期文字论证，如果不让他立刻上手摸材料，创作热情便会迅速消退。',
      spark04: '去重工业工地考察、玩极限滑板，或者站在空旷的厂房里感受声光对身体的直接撞击。',
      deadline05: '在全场几乎要放弃的绝境下力挽狂澜，甚至能在评委入场前五分钟完成不可思议的现场拼装。',
      teamwork06: '最勇猛的救火队长与先锋突击手，凡是需要体力、魄力与现场应急的任务，派你去准没错。',
      keywords07: ['现场破局', '高能行动', '危机直觉', '感官轰炸', '即兴爆破'],
    },
  },

  ESFP: {
    code: 'ESFP',
    id: 'GT-16',
    name: '鲜活表现型',
    englishName: 'VIVID PERFORMER',
    number: 'GT-16',
    title: '鲜活表现型',
    enTitle: 'VIVID PERFORMER',
    category: '感知表现系',
    slogan: '以饱满的热情点燃视听盛宴，让艺术在与观众的热烈互动中鲜活绽放。',
    tagline: '以饱满的热情点燃视听盛宴，让艺术在与观众的热烈互动中鲜活绽放。',
    keywords: ['沉浸体验', '热烈感染', '视听盛宴', '即时反馈', '舞台气场'],
    color: {
      accent: '#D97706',
      soft: '#FEF3C7',
      border: '#FDE68A',
      text: '#92400E',
    },
    dimensions: {
      energy: '向外共振 88% · 12% 向内沉浸',
      perception: '实感观察 80% · 20% 概念构想',
      judgement: '感性表达 82% · 18% 结构推演',
      process: '即兴探索 86% · 14% 计划构建',
    },
    spectrum: {
      ie: { leftLabel: '向内沉浸', rightLabel: '向外共振', leftScore: 12, rightScore: 88 },
      ns: { leftLabel: '概念构想', rightLabel: '实感观察', leftScore: 20, rightScore: 80 },
      tf: { leftLabel: '结构推演', rightLabel: '感性表达', leftScore: 18, rightScore: 82 },
      jp: { leftLabel: '计划构建', rightLabel: '即兴探索', leftScore: 14, rightScore: 86 },
    },
    fullAnalysis:
      '对于你而言，艺术绝对不是博物馆里冰冷陈列的古董，而是一场正在发生的、充满生命狂欢的视听嘉年华。你的灵感来源于日常生活的每一个沸腾切片：流行音乐的节奏、聚会的光影、时尚秀场的流动，以及人群目光交织的热浪。面对命题，你最关心的是“怎样让观众进入展厅的第一秒就目不暇接、心跳加速？”在视觉语言上，你极其擅长使用明快高扬的色彩节奏、富有感染力的多媒体动态、空间叙事与富有表现力的综合装置。在决策时，你高度依赖观众的即时反馈与现场情绪共振。面对评画，你天生具备无与伦比的提案演讲感染力，能把一个原本简单的方案讲得引人入胜、星光熠熠。面对Deadline，你享受在热烈喧闹的通宵赶工氛围中与同伴共同作战。在团队中，你是无可争议的聚光灯焦点与公关发言人，但有时需警惕过度追求表面的华丽炫目，而削弱了作品内在的精神坚实度与学术沉淀。',
    strengths: [
      '出类拔萃的舞台表现力与极具沉浸感的视听现场营造力',
      '天生的共情感染力，善于把艺术作品变成人人都能享受的节日',
      '极高的社交直觉与极具魅力的公开答辩演绎才华',
    ],
    challenges: [
      '容易偏向视觉快感与眼球效应，需防止作品流于表面浮华',
      '面对过于晦涩冷清的纯学术命题容易失去持久专注力',
    ],
    inspirationMode: '在热烈的Livehouse现场感受低音轰鸣、观赏先锋时装秀与数字光影节，或在市井人流中捕捉欢腾。',
    deadlineMode: '放着最嗨的电子乐通宵鏖战，天亮前将展位打造成全场最耀眼夺目的视觉发光体。',
    teamworkMode: '明星主讲人与视觉门面，只要由你登上讲台汇报，全场目光都会被作品牢牢吸引。',
    creativeAdvice: '给璀璨夺目的视觉狂欢背后埋设一颗深思熟虑的隐喻内核，当观众欢呼散去后仍能细细回味，这才是顶级的魅力。',
    sections: {
      status01: '展位往往是全场最吸睛的互动焦点，声光电与肢体表演一应俱全，充满无法抗拒的生命元气。',
      advantage02: '极强的现场感染力与视觉表现力，能毫不费力地调动所有观众的全部感官参与其中。',
      block03: '容易对枯燥沉闷的纯理论论证产生厌倦，有时会因为过度注重形式华丽而忽略了概念纵深。',
      spark04: '参加热烈的先锋艺术派对、观看数字灯光秀，或者在流行文化的浪潮中抓取最前沿的视觉符号。',
      deadline05: '在全场热烈的音乐声中一鼓作气完成展出布置，展出的瞬间宛如一颗超新星爆发般耀眼。',
      teamwork06: '当仁不让的公关发言人与舞台主角，擅长用最富魅力的肢体语言与演讲征服所有评委和观众。',
      keywords07: ['视听盛宴', '感官狂欢', '沉浸交互', '高能气场', '生命狂想'],
    },
  },
};

// Ensure mbtiCode and dimensions.ie/ns/tf/jp are populated on all types for complete backwards compatibility
Object.values(GAFA_TYPES).forEach((item) => {
  if (!item.mbtiCode) item.mbtiCode = item.code;
  if (!item.dimensions.ie) {
    item.dimensions.ie = item.spectrum.ie;
    item.dimensions.ns = item.spectrum.ns;
    item.dimensions.tf = item.spectrum.tf;
    item.dimensions.jp = item.spectrum.jp;
  }
});

/**
 * 数组形式导出 (按 GT-01 至 GT-16 严格排序)
 */
export const CREATIVE_TYPES: GafaCreativeType[] = [
  GAFA_TYPES.INTJ,
  GAFA_TYPES.INTP,
  GAFA_TYPES.ENTJ,
  GAFA_TYPES.ENTP,
  GAFA_TYPES.INFJ,
  GAFA_TYPES.INFP,
  GAFA_TYPES.ENFJ,
  GAFA_TYPES.ENFP,
  GAFA_TYPES.ISFJ,
  GAFA_TYPES.ISTJ,
  GAFA_TYPES.ESTJ,
  GAFA_TYPES.ESFJ,
  GAFA_TYPES.ISTP,
  GAFA_TYPES.ISFP,
  GAFA_TYPES.ESTP,
  GAFA_TYPES.ESFP,
];

/**
 * 根据 MBTI Code (如 "INTJ") 获取官方 GAFA-TI 人格
 */
export function getCreativeTypeByCode(code: string): GafaCreativeType {
  const upper = code.toUpperCase() as GafaMbtiCode;
  if (GAFA_TYPES[upper]) {
    return GAFA_TYPES[upper];
  }
  return GAFA_TYPES.INTJ;
}

/**
 * 根据 ID (如 "GT-01" 或 "gt-01") 获取官方 GAFA-TI 人格
 */
export function getCreativeTypeById(id: string): GafaCreativeType {
  const normalized = id.toUpperCase();
  const matched = CREATIVE_TYPES.find((t) => t.id.toUpperCase() === normalized || t.number.toUpperCase() === normalized);
  return matched || GAFA_TYPES.INTJ;
}

/**
 * 别名快捷导出，确保类型统一
 */
export const getGafaType = getCreativeTypeByCode;
export const getGafaTypeById = getCreativeTypeById;

/**
 * 代码级防错校验函数 (严格满足规范第十六条)
 * 检查：
 * 1. 恰好 16 种类型
 * 2. INTJ 必须为精准构建型，INTP 必须为理性推演型... 16种完全严格匹配
 * 3. 严格禁止出现其他人格名称
 * 4. 每种类型的 fullAnalysis 都不为空且字数 >= 300
 */
export function validateGafaTypes(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // 1. 恰好 16 种类型
  const keys = Object.keys(GAFA_TYPES) as GafaMbtiCode[];
  if (keys.length !== 16) {
    errors.push(`Expected exactly 16 types, got ${keys.length}`);
  }

  // 2. 检查每种类型的官方映射
  for (const [code, expected] of Object.entries(GAFA_TYPE_MAP)) {
    const item = GAFA_TYPES[code as GafaMbtiCode];
    if (!item) {
      errors.push(`Missing type for code ${code}`);
      continue;
    }
    if (item.id !== expected.id) {
      errors.push(`Type ${code} ID mismatch: expected ${expected.id}, got ${item.id}`);
    }
    if (item.name !== expected.name) {
      errors.push(`Type ${code} name mismatch: expected ${expected.name}, got ${item.name}`);
    }
    if (item.englishName !== expected.englishName) {
      errors.push(`Type ${code} englishName mismatch: expected ${expected.englishName}, got ${item.englishName}`);
    }

    // 3. 检查是否在允许名称列表
    if (!ALLOWED_GAFA_NAMES.includes(item.name)) {
      errors.push(`Type ${code} has illegal name: ${item.name}`);
    }

    // 4. 检查 fullAnalysis 长度
    if (!item.fullAnalysis || item.fullAnalysis.trim().length < 300) {
      errors.push(`Type ${code} fullAnalysis too short or empty (length: ${item.fullAnalysis?.length || 0})`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
