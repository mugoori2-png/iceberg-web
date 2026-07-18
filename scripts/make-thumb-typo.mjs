// scripts/make-thumb-typo.mjs — 크몽 스타일 타이포 썸네일 (652×488)
// 큰 글자가 주인공인 크몽 관례 스타일: 브랜드 칩 + 초대형 헤드라인(포인트 컬러) + 특징 칩.
// 배경 이미지는 선택 — 있으면 어둡게 깔고, 없으면 ICEBERG 네이비 그라데이션.
//
// 사용: node scripts/make-thumb-typo.mjs <출력.png> <설정JSON>
// 설정JSON 예:
// {
//   "badge": "실서비스 운영 경험",
//   "lines": [["회사 자료로 답하는"], [["AI 챗봇", "cyan"], " 구축"]],
//   "chips": ["출처 인용", "모르면 답 안 함", "관리자 화면"],
//   "bgImage": "선택 - 배경 사진 경로"
// }
import sharp from 'sharp';
import { mkdirSync, readFileSync } from 'fs';
import { dirname } from 'path';

const W = 652, H = 488;
const [out, cfgArg] = process.argv.slice(2);
if (!out || !cfgArg) {
    console.error('사용법: node scripts/make-thumb-typo.mjs <출력.png> <설정JSON 또는 @파일>');
    process.exit(1);
}
const cfg = JSON.parse(cfgArg.startsWith('@') ? readFileSync(cfgArg.slice(1), 'utf8') : cfgArg);

// 공백은 NBSP 로 — SVG 가 tspan 경계의 공백을 접어버리는 것 방지
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, ' ');
const CYAN = '#5eead4', BLUE = '#60a5fa', WHITE = '#ffffff';
const color = (c) => c === 'cyan' ? CYAN : c === 'blue' ? BLUE : WHITE;

// 헤드라인: lines = [ [세그먼트...] ] — 세그먼트는 "문자열" 또는 ["문자열","cyan"]
const lines = cfg.lines || [];
const FONT = 'Malgun Gothic, Pretendard, sans-serif';
const headSize = cfg.headSize || (lines.length >= 3 ? 62 : 72);
const lineGap = Math.round(headSize * 1.22);
const headBlockH = lines.length * lineGap;
const headStartY = Math.round((H - headBlockH) / 2) + headSize - (cfg.chips ? 18 : 0);

const headline = lines.map((segs, i) => {
    const parts = (Array.isArray(segs) ? segs : [segs]).map(seg => {
        const [text, c] = Array.isArray(seg) ? seg : [seg, 'white'];
        return `<tspan fill="${color(c)}">${esc(text)}</tspan>`;
    }).join('');
    return `<text x="${W / 2}" y="${headStartY + i * lineGap}" text-anchor="middle"
        font-family="${FONT}" font-size="${headSize}" font-weight="800"
        letter-spacing="-1">${parts}</text>`;
}).join('\n');

// 상단 배지
const badge = cfg.badge ? `
  <rect x="${W / 2 - 110}" y="46" width="220" height="40" rx="20" fill="#5eead4" fill-opacity="0.14" stroke="#5eead4" stroke-opacity="0.55"/>
  <text x="${W / 2}" y="73" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="700" fill="${CYAN}">${esc(cfg.badge)}</text>` : '';

// 하단 특징 칩 (가운데 정렬, 최대 3개)
let chips = '';
if (cfg.chips?.length) {
    const chipH = 42, gap = 12, padX = 20, fs = 19;
    const widths = cfg.chips.map(t => Math.round(t.length * fs * 0.98) + padX * 2);
    const total = widths.reduce((a, b) => a + b, 0) + gap * (widths.length - 1);
    let cx = (W - total) / 2;
    const cy = H - 86;
    chips = cfg.chips.map((t, i) => {
        const wdt = widths[i];
        const rect = `<rect x="${cx}" y="${cy}" width="${wdt}" height="${chipH}" rx="${chipH / 2}"
            fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.28"/>
          <text x="${cx + wdt / 2}" y="${cy + 28}" text-anchor="middle" font-family="${FONT}"
            font-size="${fs}" font-weight="600" fill="#e2e8f0">${esc(t)}</text>`;
        cx += wdt + gap;
        return rect;
    }).join('\n');
}

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B1020"/>
      <stop offset="100%" stop-color="#16224a"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="18%" r="70%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.22"/>
      <stop offset="60%" stop-color="#38bdf8" stop-opacity="0"/>
    </radialGradient>
  </defs>
  ${cfg.bgImage ? `<rect width="${W}" height="${H}" fill="#0B1020" fill-opacity="0.78"/>` : `<rect width="${W}" height="${H}" fill="url(#bg)"/>`}
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <circle cx="${W - 60}" cy="${H - 40}" r="140" fill="#2563eb" fill-opacity="0.10"/>
  <circle cx="40" cy="60" r="110" fill="#5eead4" fill-opacity="0.06"/>
  ${badge}
  ${headline}
  ${chips}
</svg>`;

mkdirSync(dirname(out), { recursive: true });
const overlay = Buffer.from(svg);
if (cfg.bgImage) {
    await sharp(cfg.bgImage).resize(W, H, { fit: 'cover' }).composite([{ input: overlay }]).png().toFile(out);
} else {
    await sharp({ create: { width: W, height: H, channels: 4, background: '#0B1020' } })
        .composite([{ input: overlay }]).png().toFile(out);
}
console.log(`✓ ${out} (${W}x${H})`);
