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
  /** 관련 서비스 랜딩 (있으면 카드에 링크) */
  serviceHref?: string;
}

export const WORK_CATEGORIES: ("전체" | WorkCategory)[] = ["전체", "AI", "자동화", "웹·앱", "수정"];

export const WORKS: WorkCase[] = [
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
  },
  {
    slug: "omr-auto-grading",
    title: "OMR 스캔 자동 채점 시스템",
    category: "자동화",
    problem: "인성검사 답안지 수백 장을 손으로 채점하면 반나절이 걸리고 실수가 생긴다.",
    solution: "답안지 스캔 이미지를 판독해 마킹을 인식하고 자동 채점·집계하는 파이프라인 제작.",
    result: "195명 분량 채점을 분 단위로 단축, 채점 실수 0",
    tags: ["이미지 판독", "자동 채점", "엑셀 집계"],
    live: true,
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
