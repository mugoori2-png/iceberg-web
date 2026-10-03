// ─────────────────────────────────────────────────────────────
// 작업사례 데이터 — 새 작업이 끝나면 여기에 하나만 추가하면
// 홈 갤러리와 각 서비스 랜딩에 자동으로 반영됩니다.
// 형식: 문제(한 줄) → 해결(한 줄) → 결과(숫자가 있으면 최고)
// ─────────────────────────────────────────────────────────────

export type WorkCategory = "AI" | "자동화" | "웹·앱" | "수정";

export interface WorkCase {
  slug: string;
  title: string;
  category: WorkCategory;
  /** 어떤 상황이었나 */
  problem: string;
  /** 무엇을 만들었나 */
  solution: string;
  /** 결과 — 숫자·상태 중심 */
  result: string;
  tags: string[];
  /** 실운영 여부 라벨 */
  live?: boolean;
  evidence?: { src: string; caption: string }[];
  /** 관련 서비스 랜딩 (있으면 카드에 링크) */
  serviceHref?: string;
}

export const WORK_CATEGORIES: ("전체" | WorkCategory)[] = ["전체", "AI", "자동화", "웹·앱", "수정"];

export const WORKS: WorkCase[] = [
  { slug: "student-grade-consult", title: "성적관리와 상담을 연결하는 학생 카드", category: "웹·앱", problem: "학생 정보, 시험 성적, 상담 기록을 각각 찾아보면 상담 준비와 기록에 시간이 든다.", solution: "학생 이름을 누르면 기본정보·성적 요약·실제 시험 성적·상담일지를 한 창에서 확인하도록 개발했습니다. 과목별 성적 변화와 강점·보완 과목을 확인하고, 성적 요약을 상담일지에 넣을 수 있습니다.", result: "2026년 10월 3일 학생 카드 기능 개발, 10월 4일 성적 추이 그래프와 상담 편집기 개선 기록 확인. 상담 서식 편집과 자동 저장을 구현했습니다.", tags: ["학생 카드", "성적 변화", "상담 기록"], serviceHref: "/programs" },
  { slug: "learning-dashboard", title: "학원 분석 화면, 개선 전과 후", category: "수정", problem: "큰 요약 카드와 넓은 여백 때문에 보강할 단원을 보려면 많이 내려가야 했습니다.", solution: "반복 문구를 덜어내고 요약 카드를 한 줄로, 보강 후보를 간결한 목록으로 바꿨습니다. 휴대폰에서도 단원과 보강 버튼을 쉽게 찾도록 정리했습니다.", result: "실제 개발 화면을 가상 데이터로 촬영한 동일 크기(390px) 캡처로 배치 개선을 확인할 수 있습니다. 아래 숫자는 테스트용이며 실제 학생 성적이나 성과가 아닙니다.", tags: ["전후 비교", "모바일 개선", "관리자 화면"], serviceHref: "/clinic", evidence: [{src:"/proof/analysis-before.png",caption:"개선 전 · 큰 카드가 차지하던 화면"},{src:"/proof/analysis-after.png",caption:"개선 후 · 요약과 보강 단원을 함께 확인"}] },
  { slug: "mobile-wrongnote", title: "휴대폰 오답노트 선택 화면", category: "웹·앱", problem: "긴 문제 목록을 내려가면서 선택한 개수와 다음 작업을 확인하기 어려웠습니다.", solution: "문제 선택 상태와 전체 선택·취소·삭제 버튼을 하단에 모아, 목록을 내려가도 작업 상태를 확인할 수 있도록 개발했습니다.", result: "가상 문제를 넣은 실제 개발 테스트 화면입니다. 하단에 선택 개수와 작업 버튼이 유지되는 모습을 확인할 수 있습니다.", tags: ["오답노트", "모바일", "선택 기능"], serviceHref: "/programs", evidence: [{src:"/proof/wrongnote-mobile.png",caption:"가상 데이터 · 스크롤 후에도 선택 상태와 버튼 표시"}] },
  { slug: "academy-management", title: "학원 통합 관리 시스템", category: "웹·앱", problem: "학생 정보와 출결·성적을 각각 관리하면 운영 현황을 한눈에 파악하기 어렵다.", solution: "React·Supabase 기반으로 학생·출결·성적 관리와 관리자 대시보드를 직접 개발.", result: "학원 운영에 사용하는 관리 시스템으로 개발·운영", tags: ["학생 관리", "출결·성적", "관리자 대시보드"], live: true, serviceHref: "/programs" },
  {
    slug: "ai-tutor-dbbot",
    title: "교재 기반 AI 학습 튜터 챗봇",
    category: "AI",
    problem: "학생들의 개념 질문에 강사가 일일이 답하기 어렵고, 응답이 밤·주말에 끊긴다.",
    solution:
      "교재·기출 자료를 벡터 검색(RAG)해 출처와 함께 답하는 챗봇을 구축. 근거가 부족하면 답하지 않고 강사에게 넘기는 안전장치와 관리자 검수 화면까지 포함.",
    result: "학원 앱에 탑재되어 실서비스 운영 중 — 출처 인용 답변, 미답변 질문은 강사 연결",
    tags: ["RAG 챗봇", "출처 인용", "관리자 검수"],
    live: true,
    serviceHref: "/chatbot",
  },
  {
    slug: "omr-auto-grading",
    title: "OMR 스캔 자동 채점 시스템",
    category: "자동화",
    problem: "인성검사 답안지 수백 장을 손으로 채점하면 반나절이 걸리고 실수가 생긴다.",
    solution: "답안지 스캔 이미지를 판독해 마킹을 인식하고 자동 채점·집계하는 파이프라인 제작.",
    result: "스캔 답안지 마킹 인식부터 자동 채점·엑셀 집계까지 연결",
    tags: ["이미지 판독", "자동 채점", "엑셀 집계"],
    live: true,
    serviceHref: "/automation",
  },
  {
    slug: "hwpx-exam-generator",
    title: "한글(HWP) 시험지 자동 생성",
    category: "자동화",
    problem: "문제은행에서 시험지·정답지·해설지를 한글 문서로 옮기는 데 회당 몇 시간씩 걸린다.",
    solution:
      "문제 데이터에서 한글(HWPX) 문서 3종을 버튼 한 번에 생성. 보기 순서 섞기, 해설 번호 자동 재정렬, 정답·오답 색상 표기까지 자동 처리.",
    result: "시험지 세트 제작 몇 시간 → 클릭 1번",
    tags: ["한글 문서 자동화", "HWPX", "문제은행"],
    live: true,
    serviceHref: "/automation",
  },
  {
    slug: "qr-attendance-kiosk",
    title: "QR 출결 키오스크",
    category: "웹·앱",
    problem: "학생 등하원을 수기로 확인하고 학부모 안내를 따로 보내야 했다.",
    solution: "QR 스캔 키오스크와 자동 출결 기록·알림 시스템 구축. 스캔 지연 원인 3종을 찾아 해소.",
    result: "학원 현장에서 실운영 중 — 스캔 즉시 기록·알림",
    tags: ["키오스크", "QR", "실시간 알림"],
    live: true,
  },
  {
    slug: "mock-exam-system",
    title: "실전 모의고사 시스템",
    category: "웹·앱",
    problem: "종이 모의고사는 채점·석차·통계 산출까지 사람 손이 너무 많이 간다.",
    solution:
      "문제은행 기반 자동 출제(단원·난이도 배분, 보기 섞기) → 온라인 응시 → 자동 채점 → 전국 통계·석차까지 한 흐름으로 구축.",
    result: "문제 12,000+ 문제은행 위에서 운영 중",
    tags: ["웹앱", "자동 채점", "통계"],
    live: true,
  },
  {
    slug: "homepage-clinic",
    title: "홈페이지·랜딩페이지 수정",
    category: "수정",
    problem: "만들어둔 홈페이지의 문구·이미지·모바일 깨짐을 어디서 고쳐야 할지 모른다.",
    solution: "화면 캡처 한 장으로 요청을 받아 필요한 부분만 빠르게 수정. 전체 리뉴얼을 권하지 않는다.",
    result: "크몽 '홈페이지 수정 클리닉' 서비스로 판매 중",
    tags: ["문구 수정", "모바일 깨짐", "랜딩 개선"],
    serviceHref: "/clinic",
  },
];
