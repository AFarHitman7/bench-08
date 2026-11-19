/**
 * Generate the static previews used by the results cards.
 *
 *   cd site
 *   python -m http.server 8080
 *   node thumbs.mjs
 *
 * The script drives Chrome over the DevTools protocol. Set CHROME_PATH if
 * Chrome is not at the default Windows location. Set SITE_URL if the local
 * server is not on http://127.0.0.1:8080.
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = process.env.SITE_URL || 'http://127.0.0.1:8080';
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PROFILE = path.join(HERE, '.chrome-thumbs');
const PORT = 9229;

const models = [
  ['deepseek', 'deepseek-4-1-flash-run-1'],
  ['glm', 'glm-5-3-run-1'],
  ['gpt', 'gpt-6-luna-run-1'],
  ['haiku1', 'haiku-5-5'],
  ['haiku2', 'haiku-5-5-run-2'],
  ['hy4', 'hy4-flash-run-1'],
  ['muse1', 'muse-spark-1-3-run-1'],
  ['muse2', 'muse-spark-1-3-run-2'],
];

const tasks = [
  ['02', '02-interface.thin.html', '02-interface.thick.html', 1440, 900],
  ['03', '03-critique.thin.html', '03-critique.thick.html', 1440, 900],
  ['04', '04-motion.thin.html', '04-motion.thick.html', 1280, 720],
];

const chrome = spawn(
  CHROME,
  ['--headless=new', '--disable-gpu', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`, 'about:blank'],
  { stdio: 'ignore' }
);

await new Promise((resolve) => setTimeout(resolve, 1200));
const targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
const page = targets.find((target) => target.type === 'page');
if (!page) throw new Error('No Chrome page target');

const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));

let id = 0;
const pending = new Map();
ws.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  }
});

function send(method, params = {}) {
  return new Promise((resolve) => {
    const messageId = ++id;
    pending.set(messageId, resolve);
    ws.send(JSON.stringify({ id: messageId, method, params }));
  });
}

await send('Page.enable');
await send('Runtime.enable');

for (const [, folder] of models) {
  for (const [task, thin, thick, width, height] of tasks) {
    for (const variant of ['thin', 'thick']) {
      const file = variant === 'thin' ? thin : thick;
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await send('Page.navigate', { url: `${SITE_URL}/artifacts/${folder}/${file}` });
      await new Promise((resolve) => setTimeout(resolve, 700));

      if (task === '04') {
        await send('Runtime.evaluate', {
          expression:
            "try{window.__anim&&window.__anim.pause&&window.__anim.pause();window.__anim&&window.__anim.seek&&window.__anim.seek(4)}catch(e){}",
        });
        await new Promise((resolve) => setTimeout(resolve, 250));
      }

      const shot = await send('Page.captureScreenshot', {
        format: 'jpeg',
        quality: 84,
        fromSurface: true,
        clip: { x: 0, y: 0, width, height, scale: 0.5 },
      });
      const out = path.join(HERE, 'thumbs', folder, `${task}-${variant}.jpg`);
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
      console.log('thumb', folder, task, variant);
    }
  }
}

ws.close();
chrome.kill();
