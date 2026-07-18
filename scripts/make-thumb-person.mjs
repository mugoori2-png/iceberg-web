// scripts/make-thumb-person.mjs — 크몽 인기 스타일 썸네일 (인물 + 초대형 타이포 + 하단 바)
// 참고 스타일: 우측 인물, 좌측 2줄 대형 헤드라인(줄별 색), 알약 배지, 하단 풀폭 컬러 바.
//
// 사용: node scripts/make-thumb-person.mjs <출력.png> <설정JSON 또는 @파일>
// 설정 예:
// {
//   "bgImage": "인물 이미지 경로 (우측 인물, 좌측 여백 프롬프트로 생성한 것)",
//   "lines": [["회사 자료로", "white"], ["AI 챗봇 구축", "accent"]],
//   "badge": "실서비스 운영 전문",
//   "bottomBar": "출처 인용 ㅣ 오답 방지 ㅣ 관리자 화면",
//   "accent": "#FDE047"
// }
import sharp from 'sharp';
import { mkdirSync, readFileSync } from 'fs';
import { dirname } from 'path';

const W = 652, H = 488;
const [out, cfgArg] = process.argv.slice(2);
if (!out || !cfgArg) {
    console.error('사용법: node scripts/make-thumb-person.mjs <출력.png> <설정JSON 또는 @파일>');
    process.exit(1);
}
const cfg = JSON.parse(cfgArg.startsWith('@') ? readFileSync(cfgArg.slice(1), 'utf8') : cfgArg);

const ACCENT = cfg.accent || '#FDE047';
const FONT = 'Malgun Gothic, Pretendard, sans-serif';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, ' ');
const color = (c) => c === 'accent' ? ACCENT : c === 'cyan' ? '#5eead4' : '#ffffff';

const BAR_H = cfg.bottomBar ? 84 : 0;
const X = 36;                       // 좌측 여백
const headSize = cfg.headSize || 76;
const lineGap = Math.round(headSize * 1.24);
const lines = cfg.lines || [];

// 헤드라인 시작 y — 배지·바 공간을 뺀 영역에서 위쪽 배치 (인물 얼굴을 안 가리게)
const headStartY = cfg.headStartY || 150;

// 장식 점 5개 (참고 이미지의 상단 도트)
const dots = Array.from({ length: 5 }, (_, i) =>
    `<circle cx="${X + 10 + i * 56}" cy="${headStartY - headSize - 22}" r="7" fill="${ACCENT}"/>`).join('');

const headline = lines.map((ln, i) => {
    const [text, c] = Array.isArray(ln) ? ln : [ln, 'white'];
    return `<text x="${X}" y="${headStartY + i * lineGap}" font-family="${FONT}"
      font-size="${headSize}" font-weight="800" letter-spacing="-2"
      fill="${color(c)}" stroke="#000000" stroke-opacity="0.35" stroke-width="2"
      paint-order="stroke">${esc(text)}</text>`;
}).join('\n');

// 알약 배지 — 헤드라인 아래
let badge = '';
if (cfg.badge) {
    const fs = 30, padX = 26, bh = 58;
    const bw = Math.round(cfg.badge.length * fs * 0.96) + padX * 2;
    const by = headStartY + (lines.length - 1) * lineGap + 38;
    badge = `
      <rect x="${X}" y="${by}" width="${bw}" height="${bh}" rx="${bh / 2}" fill="#FFFDF3"/>
      <text x="${X + bw / 2}" y="${by + bh / 2 + fs * 0.36}" text-anchor="middle"
        font-family="${FONT}" font-size="${fs}" font-weight="800" fill="#111111">${esc(cfg.badge)}</text>`;
}

// 하단 풀폭 바
const bottomBar = cfg.bottomBar ? `
  <rect x="0" y="${H - BAR_H}" width="${W}" height="${BAR_H}" fill="${ACCENT}"/>
  <text x="${W / 2}" y="${H - BAR_H / 2 + 12}" text-anchor="middle"
    font-family="${FONT}" font-size="34" font-weight="800" fill="#111111">${esc(cfg.bottomBar)}</text>` : '';

// 좌측 가독성 그라데이션 (인물이 우측이므로 좌측만 살짝 어둡게)
const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.45"/>
      <stop offset="55%" stop-color="#000000" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H - BAR_H}" fill="url(#shade)"/>
  ${dots}
  ${headline}
  ${badge}
  ${bottomBar}
</svg>`;

mkdirSync(dirname(out), { recursive: true });
const overlay = Buffer.from(svg);
if (cfg.bgImage) {
    await sharp(cfg.bgImage).resize(W, H, { fit: 'cover' }).composite([{ input: overlay }]).png().toFile(out);
} else {
    // 인물 이미지 전 미리보기용 — 네이비 그라데이션 배경
    const bg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#101828"/><stop offset="100%" stop-color="#1e293b"/>
      </linearGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <circle cx="${W - 130}" cy="${H / 2}" r="150" fill="#334155"/>
      <text x="${W - 130}" y="${H / 2 + 8}" text-anchor="middle" font-family="${FONT}" font-size="22" fill="#94a3b8">인물 자리</text>
    </svg>`);
    await sharp(bg).composite([{ input: overlay }]).png().toFile(out);
}
console.log(`✓ ${out} (${W}x${H})`);
