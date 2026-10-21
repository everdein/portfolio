// Rebuild the social card from typography and CSS, without external assets.
import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PORTFOLIO_CHROMIUM_PATH || undefined,
});
try {
  const page = await browser.newPage({ viewport: { width: 1731, height: 909 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html lang="en"><meta charset="utf-8">
    <style>
      * { box-sizing: border-box; } body { margin: 0; background: #f5f3ed; color: #172821; font-family: Arial, sans-serif; }
      main { width: 1731px; height: 909px; padding: 90px 105px; border-left: 28px solid #174c36; position: relative; }
      .label { color: #245f45; font-size: 25px; letter-spacing: 4px; text-transform: uppercase; }
      h1 { font-size: 116px; letter-spacing: -5px; margin: 100px 0 20px; }
      .role { font-size: 42px; margin: 0 0 46px; }
      .capabilities { font-size: 32px; line-height: 1.65; max-width: 1250px; }
      footer { position: absolute; bottom: 80px; left: 105px; right: 105px; padding-top: 28px; border-top: 1px solid #adb9af; display: flex; justify-content: space-between; font-size: 25px; }
    </style><main><div class="label">Systems / Product / Evidence</div>
      <h1>Matthew Clark</h1><p class="role">Senior Software Engineer</p>
      <div class="capabilities">System Design · Application Architecture · Full-Stack Development<br>Enterprise Integrations · Technical Leadership</div>
      <footer><span>Selected work and engineering evidence</span><span>everdein.github.io/portfolio</span></footer>
    </main></html>`);
  await page.screenshot({ path: fileURLToPath(new URL('../public/og.png', import.meta.url)) });
} finally {
  await browser.close();
}
