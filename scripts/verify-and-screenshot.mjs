import { spawn } from "child_process";
import { chromium } from "playwright";
import path from "path";

const brainDir = "C:\\Users\\Sami\\.gemini\\antigravity\\brain\\1a366266-1060-47ac-9cd1-e943fc8afa7f";
const PORT = 3005;

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log("Starting Next.js production server on port " + PORT + "...");
  const server = spawn("cmd.exe", ["/c", `npx next start -p ${PORT}`], {
    stdio: "inherit",
    shell: true,
  });

  // Give server 3 seconds to start
  await wait(3500);

  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    headless: true,
  });

  // 1. Desktop View (1440x900)
  console.log("Capturing desktop view...");
  const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await desktopPage.goto(`http://localhost:${PORT}`, { waitUntil: "networkidle" });
  await wait(1000);
  await desktopPage.screenshot({
    path: path.join(brainDir, "app-desktop.png"),
    fullPage: false,
  });

  // 2. Mobile View (390x844)
  console.log("Capturing mobile view...");
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  await mobilePage.goto(`http://localhost:${PORT}`, { waitUntil: "networkidle" });
  await wait(1000);
  await mobilePage.screenshot({
    path: path.join(brainDir, "app-mobile.png"),
    fullPage: false,
  });

  // 3. Personalized View with Member ID entered
  console.log("Testing and capturing personalized member view...");
  await desktopPage.evaluate(() => {
    localStorage.setItem("tag_member_id", "998877665");
  });
  await desktopPage.reload({ waitUntil: "networkidle" });
  await wait(1000);
  await desktopPage.screenshot({
    path: path.join(brainDir, "app-desktop-personalized.png"),
    fullPage: false,
  });

  // 4. Test eWorld tab with personalized links
  console.log("Capturing eWorld tab view...");
  const eworldTabBtn = await desktopPage.locator('button:has-text("خدمات eWorld")');
  if (await eworldTabBtn.count() > 0) {
    await eworldTabBtn.click();
    await wait(800);
    await desktopPage.screenshot({
      path: path.join(brainDir, "app-eworld-personalized.png"),
      fullPage: false,
    });
  }

  // 5. Test toast alert on unconfigured link click (Link 15)
  console.log("Testing warning toast when clicking unconfigured personalized link...");
  await desktopPage.evaluate(() => {
    localStorage.removeItem("tag_member_id");
  });
  await desktopPage.reload({ waitUntil: "networkidle" });
  await wait(1000);

  // Click on eWorld tab again
  const eworldTab2 = await desktopPage.locator('button:has-text("خدمات eWorld")');
  if (await eworldTab2.count() > 0) {
    await eworldTab2.click();
    await wait(600);
    // Find card for link 15 and click copy button
    const card15 = await desktopPage.locator('article:has-text("رعاية موزع جديد")');
    if (await card15.count() > 0) {
      const copyBtn = card15.locator('button:has-text("نسخ الرابط")');
      await copyBtn.click();
      await wait(500);
      await desktopPage.screenshot({
        path: path.join(brainDir, "app-warning-toast.png"),
        fullPage: false,
      });
    }
  }

  await browser.close();
  server.kill();
  console.log("All screenshots successfully captured into brain directory!");
  process.exit(0);
}

run().catch((err) => {
  console.error("Error in verification:", err);
  process.exit(1);
});
