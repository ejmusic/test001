export interface ProjectPanel {
  id: string;
  num: string;
  stage: string;
  title: string;
  dialogue?: string;
  caption: string;
  image: string;
  sfx?: string;
}

export interface AwardItem {
  id: string;
  num: number;
  title: string;
  year: string;
  rank: string;
  rankVerified: boolean;
  theme: string;
  format: string;
  focusPoint: string;
  submissionType: string;
  image?: string;
  captionExcerpt?: string;
  isSensitive?: boolean;
  notes?: string;
}

export const STAGES_CONFIG = {
  hero: {
    id: 'hero',
    name: 'HERO',
    label: '00',
    bg: '#0B0B0B',
    fg: '#FFF7CB',
    accent: '#FFD557',
    temp: 10,
  },
  about: {
    id: 'about',
    name: 'ABOUT',
    label: '01',
    bg: '#281214',
    fg: '#FFEDD0',
    accent: '#CFB083',
    temp: 25,
  },
  p01: {
    id: 'p01',
    name: 'PROJECT 01',
    label: '02',
    bg: '#3B453E',
    fg: '#FFF7CB',
    accent: '#CFB083',
    temp: 45,
  },
  p02: {
    id: 'p02',
    name: 'PROJECT 02',
    label: '03',
    bg: '#0B0B0B',
    bgWarm: '#CFB083',
    fg: '#FFEDD0',
    fgWarm: '#281214',
    accent: '#FFD557',
    accentWarm: '#714E2F',
    temp: 70,
  },
  awarded: {
    id: 'awarded',
    name: 'AWARDED',
    label: '04',
    bg: '#FFEDD0',
    fg: '#281214',
    accent: '#714E2F',
    temp: 85,
  },
  exp: {
    id: 'exp',
    name: 'EXPERIENCE',
    label: '05',
    bg: '#FFF7CB',
    fg: '#281214',
    accent: '#714E2F',
    temp: 95,
  },
  contact: {
    id: 'contact',
    name: 'CONTACT',
    label: '06',
    bg: '#FFF7CB',
    fg: '#281214',
    accent: '#FFD557',
    temp: 100,
  },
};

export const P01_PANELS: ProjectPanel[] = [
  {
    id: 'p01-01',
    num: '01',
    stage: 'Situation',
    title: '작은 질문',
    dialogue: '오늘 신문이 왜 이렇게 늦지? 매일 아침 세상 소식을 놓칠 순 없는데…',
    caption: '아버지가 배달되지 않은 신문을 알아차립니다. 일상의 작은 질문으로 이야기가 시작됩니다.',
    image: '/assets/cuts/p01-panel-01.png',
  },
  {
    id: 'p01-02',
    num: '02',
    stage: 'Action',
    title: '질문이 행동이 되다',
    dialogue: '오호, 우리 강아지 신문 배달부였구나! 멍!!',
    caption: '강아지가 신문을 가져옵니다. 앞 컷의 질문이 행동으로 이어지며 전개를 연결합니다.',
    image: '/assets/cuts/p01-panel-02.png',
    sfx: '멍!!',
  },
  {
    id: 'p01-03',
    num: '03',
    stage: 'Expansion',
    title: '의미가 넓어지다',
    dialogue: '신문은 단순한 정보가 아니라 우리 사회를 연결해주는 중요한 매체야. 맞아! 깊이 있는 분석과 믿을 수 있는 기사로 세상을 더 잘 이해하게 해주지.',
    caption: '신문을 사회를 연결하는 매체이자 깊이 있는 정보를 전하는 수단으로 설명합니다.',
    image: '/assets/cuts/p01-panel-03.png',
  },
  {
    id: 'p01-04',
    num: '04',
    stage: 'Resolution',
    title: '일상으로 돌아오다',
    dialogue: '강아지 덕분에 신문이 더 소중해졌어! 내일도 잘 부탁한다, 우리 배달부! 이 신문으로 더 나은 세상을 배워보자.',
    caption: '가족이 함께 신문을 읽습니다. 신문의 의미를 가족의 일상으로 되돌려 마무리합니다.',
    image: '/assets/cuts/p01-panel-04.png',
  },
];

export const P01_PRINCIPLES = [
  {
    num: '01',
    tag: 'Structure',
    title: '질문에서 결론까지',
    desc: '상황, 행동, 정보, 결론이 네 컷에 차례로 놓입니다. 앞 컷의 질문이 다음 컷의 행동이 됩니다.',
  },
  {
    num: '02',
    tag: 'Readability',
    title: '컷마다 하나의 일',
    desc: '각 컷에는 핵심 역할이 하나뿐입니다. 독자는 순서대로 따라가면 됩니다.',
  },
  {
    num: '03',
    tag: 'Message',
    title: '가치를 일상으로',
    desc: '신문의 사회적 가치를 가족이 함께 읽는 장면에 담았습니다. 먼 이야기가 가까운 장면이 됩니다.',
  },
];

export const COOL_PALETTE = [
  { hex: '#0B0B0B', name: 'Ink Black', role: '배경 & 심도' },
  { hex: '#281214', name: 'Deep Wine', role: '인물 음영 & 긴장' },
  { hex: '#530B12', name: 'Crimson Glow', role: '감정 악센트' },
  { hex: '#3B453E', name: 'Moss Charcoal', role: '공간 배경' },
  { hex: '#808080', name: 'Muted Grey', role: '선 & 구조' },
];

export const WARM_PALETTE = [
  { hex: '#714E2F', name: 'Warm Brown', role: '부드러운 음영' },
  { hex: '#CFB083', name: 'Soft Sand', role: '온기 톤' },
  { hex: '#FFD557', name: 'Sun Yellow', role: '핵심 하이라이트' },
  { hex: '#FFEDD0', name: 'Light Cream', role: '인물 피부 & 빛' },
  { hex: '#FFF7CB', name: 'Pale Sun', role: '전체 채광' },
];

export const AWARD_ITEMS: AwardItem[] = [
  {
    id: 'award-1',
    num: 1,
    title: '한국신문협회 신문 만화 공모전',
    year: '2024',
    rank: '대상',
    rankVerified: true,
    theme: '신문의 가치',
    format: '네 컷 만화',
    focusPoint: '스토리 & 전개 구성',
    submissionType: '개인 출품',
    image: '/assets/cuts/p01-full.png',
    captionExcerpt: '신문의 사회적 가치와 일상의 온기를 강아지와 가족의 네 컷 서사로 완성한 대상 수상작',
    notes: '공식 공모전 명칭 확인 필요',
  },
  {
    id: 'award-2',
    num: 2,
    title: '유아·청소년 흡연예방 공모전',
    year: '2024',
    rank: '공모전 수상',
    rankVerified: false,
    theme: '흡연 예방',
    format: '단편 웹툰 연출',
    focusPoint: '일상과 메시지',
    submissionType: '출품작',
    image: '/assets/cuts/award-purple-02.png',
    captionExcerpt: '망설임의 한 장면 — 일상 속 호기심과 망설임을 구체적인 대사와 호흡으로 보여줍니다.',
    notes: '주최 기관 · 수상 등급 확인 필요',
  },
  {
    id: 'award-3',
    num: 3,
    title: '청소년 생명존중 웹툰 공모전',
    year: '2024',
    rank: '공모전 수상',
    rankVerified: false,
    theme: '생명존중',
    format: '감정 연출 웹툰',
    focusPoint: '흑백 명암 대비 연출',
    submissionType: '출품작',
    image: '/assets/cuts/award-dark-01.png',
    captionExcerpt: '어둠의 결 — 흑백의 명암 대비와 컷 분할로 장면의 내면 긴장과 무게감을 쌓았습니다.',
    isSensitive: true,
    notes: '주최 기관 · 수상 등급 확인 필요',
  },
  {
    id: 'award-4',
    num: 4,
    title: '기억 희망 청소년 웹툰 공모전',
    year: '2024',
    rank: '공모전 수상',
    rankVerified: false,
    theme: '기억과 희망',
    format: '서사 웹툰',
    focusPoint: '서사적 연결 & 여운',
    submissionType: '출품작',
    image: '/assets/cuts/projects-montage.png',
    captionExcerpt: '서로를 마주보는 시선과 서사의 기억을 담아낸 연결 컷 구성',
    notes: '주최 기관 · 수상 등급 확인 필요',
  },
  {
    id: 'award-5',
    num: 5,
    title: '대한민국 ESG 청년 웹툰 공모전',
    year: '2024',
    rank: '공모전 수상',
    rankVerified: false,
    theme: 'ESG',
    format: '스토리텔링 웹툰',
    focusPoint: '색채와 감정 전달',
    submissionType: '출품작',
    image: '/assets/cuts/award-sunset-03.png',
    captionExcerpt: '온기의 색 — 따스한 노을빛 채색으로 두 인물 사이의 공감과 온기를 담았습니다.',
    notes: '주최 기관 · 수상 등급 확인 필요',
  },
  {
    id: 'award-6',
    num: 6,
    title: '군포시 자살 예방 공모전',
    year: '2024',
    rank: '공모전 수상',
    rankVerified: false,
    theme: '자살 예방',
    format: '공익 웹툰',
    focusPoint: '공감적 시선 & 감정 치유',
    submissionType: '출품작',
    image: '/assets/cuts/p02-hero-dark.png',
    captionExcerpt: '혼자만의 어둠 속에서 내미는 손길의 온도를 단계적 색조 전환으로 표현',
    isSensitive: true,
    notes: '주최 기관 · 수상 등급 확인 필요',
  },
];

export const TIMELINE_MILESTONES = [
  {
    year: '2024',
    title: '공모전 수상 6건',
    subtitle: '한국신문협회 신문 만화 공모전 대상 수상',
    badge: 'Awards',
  },
  {
    year: '2026.07',
    title: 'JLPT N3 취득',
    subtitle: '일본어 능력 시험 N3 취득',
    badge: 'Language',
  },
  {
    year: '2026.09',
    title: '툰스퀘어 인턴 시작',
    subtitle: '2026.09.03 ~ 현재 재직 중',
    badge: 'Internship · Active',
  },
  {
    year: '2027.02',
    title: '정화예술대학교 졸업 예정',
    subtitle: '웹툰애니메이션과 학사 과정',
    badge: 'Education',
  },
];
