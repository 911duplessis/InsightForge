import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

page.on('pageerror', err => console.log('Page error:', err.message));

await page.goto('http://localhost:3000/discover');
await page.waitForLoadState('domcontentloaded');
await page.waitForTimeout(3000);

await page.screenshot({ path: '/tmp/discover-before.png' });

const inputs = await page.locator('input').all();
console.log('Inputs found:', inputs.length);
for (const inp of inputs) {
  const t = await inp.getAttribute('type');
  const p = await inp.getAttribute('placeholder');
  console.log(' - type:', t, '| placeholder:', p);
}

const phoneInput = page.locator('input[type="tel"]');
const count = await phoneInput.count();
console.log('Tel inputs:', count);

if (count > 0) {
  await phoneInput.fill('+27791582852');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/tmp/discover-after.png' });

  const badge = page.getByText('South Africa');
  const visible = await badge.isVisible().catch(() => false);
  console.log('South Africa badge visible:', visible);
  if (visible) {
    console.log('Badge text:', await badge.textContent());
  }
} else {
  const html = await page.content();
  console.log('Page HTML snippet:', html.slice(0, 1000));
}

await browser.close();
