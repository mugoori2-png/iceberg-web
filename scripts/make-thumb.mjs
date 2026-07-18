// scripts/make-thumb.mjs — 크몽 썸네일 생성기
// 사용: node scripts/make-thumb.mjs <원본이미지> <출력파일> "<메인 문구>" ["<서브 문구>"] [--right]
//   - 652×488 (크몽 규격) 중앙 크롭
//   - 좌측 어두운 그라데이션 + 한글 문구 오버레이 (인물 버전은 인물이 우측이므로 기본 좌측 배치,
//     --right 를 주면 문구를 우측에 배치)
// 예: node scripts/make-thumb.mjs ~/Downloads/chatbot.png public/thumbs/chatbot.png "회사 자료로 답하는\nAI 챗봇 구축" "출처 인용 · 실서비스 운영 경험"
import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { dirname } from 'path';

const W = 652, H = 488;

const [src, out, mainText, subText] = process.argv.slice(2).filter(a => a !== '--right');
const alignRight = process.argv.includes('--right');
if (!src || !out || !mainText) {
    console.error('사용법: node scripts/make-thumb.mjs <원본> <출력> "<메인 문구>" ["<서브 문구>"] [--right]');
    process.exit(1);
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const mainLines = mainText.split('\\n').map(esc);
const lineH = 52;
const mainStartY = H - 90 - (mainLines.length - 1) * lineH - (subText ? 34 : 0);
const x = alignRight ? W - 36 : 36;
const anchor = alignRight ? 'end' : 'start';
const gradDir = alignRight
    ? { x1: '100%', x2: '0%' }   // 우측 어둡게
    : { x1: '0%', x2: '100%' };  // 좌측 어둡게

const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="${gradDir.x1}" y1="0%" x2="${gradDir.x2}" y2="0%">
      <stop offset="0%" stop-color="#0B1020" stop-opacity="0.82"/>
      <stop offset="55%" stop-color="#0B1020" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#0B1020" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="bottom" x1="0%" y1="100%" x2="0%" y2="60%">
      <stop offset="0%" stop-color="#0B1020" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#0B1020" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#shade)"/>
  <rect width="${W}" height="${H}" fill="url(#bottom)"/>
  ${mainLines.map((line, i) =>
    `<text x="${x}" y="${mainStartY + i * lineH}" text-anchor="${anchor}"
      font-family="Malgun Gothic, Pretendard, sans-serif" font-size="42" font-weight="800"
      fill="#ffffff" stroke="#0B1020" stroke-width="1">${line}</text>`).join('\n  ')}
  ${subText ? `<text x="${x}" y="${H - 52}" text-anchor="${anchor}"
      font-family="Malgun Gothic, Pretendard, sans-serif" font-size="21" font-weight="600"
      fill="#7dd3fc">${esc(subText)}</text>` : ''}
</svg>`;

mkdirSync(dirname(out), { recursive: true });
await sharp(src)
    .resize(W, H, { fit: 'cover', position: 'attention' })
    .composite([{ input: Buffer.from(svg) }])
    .png()
    .toFile(out);
console.log(`✓ ${out} (${W}x${H})`);
