// ---------- Client-side ----------
export function getClientErrorDetails(error: Error, context?: any) {
  const now = new Date().toISOString();
  const ua = navigator.userAgent;
  return {
    timestamp: now,
    errorName: error.name,
    errorMessage: error.message,
    stack: error.stack,
    url: window.location.href,
    userAgent: ua,
    screen: `${window.screen.width}x${window.screen.height}`,
    platform: navigator.platform,
    browser: getBrowser(ua),
    os: getOS(ua),
    context: context || {},
  };
}

// ---------- Server-side ----------
export function getServerErrorDetails(error: Error, req: any) {
  const now = new Date().toISOString();
  const ua = req.headers['user-agent'] || 'unknown';
  return {
    timestamp: now,
    errorName: error.name,
    errorMessage: error.message,
    stack: error.stack,
    url: req.url || req.originalUrl || 'unknown',
    userAgent: ua,
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown',
    browser: getBrowser(ua),
    os: getOS(ua),
    headers: req.headers,
  };
}

// ---------- Helpers ----------
function getBrowser(ua: string): string {
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  return 'Unknown';
}
function getOS(ua: string): string {
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac OS')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad'))
    return 'iOS';
  return 'Unknown';
}

// ---------- Build HTML report ----------
export function buildErrorHtmlReport(details: any, isServer: boolean) {
  const lines = [
    `<h2>🚨 Error Report (${isServer ? 'Server' : 'Client'})</h2>`,
    `<p><strong>Time:</strong> ${details.timestamp}</p>`,
    `<p><strong>Error:</strong> ${details.errorName}: ${details.errorMessage}</p>`,
    `<p><strong>URL:</strong> ${details.url}</p>`,
    `<p><strong>User Agent:</strong> ${details.userAgent}</p>`,
    `<p><strong>Browser:</strong> ${details.browser}</p>`,
    `<p><strong>OS:</strong> ${details.os}</p>`,
  ];
  if (isServer) {
    lines.push(`<p><strong>IP:</strong> ${details.ip}</p>`);
    lines.push(
      `<p><strong>Headers:</strong> <pre>${JSON.stringify(
        details.headers,
        null,
        2,
      )}</pre></p>`,
    );
  } else {
    lines.push(`<p><strong>Screen:</strong> ${details.screen}</p>`);
    lines.push(`<p><strong>Platform:</strong> ${details.platform}</p>`);
    lines.push(
      `<p><strong>Context:</strong> <pre>${JSON.stringify(
        details.context,
        null,
        2,
      )}</pre></p>`,
    );
  }
  lines.push(`<h3>Stack Trace</h3><pre>${details.stack || 'No stack'}</pre>`);
  return lines.join('\n');
}

// ---------- Send report to your backend ----------
export async function sendErrorReport(details: any, isServer: boolean) {
  const html = buildErrorHtmlReport(details, isServer);
  const email = 'info@nbhoz.ru'; // or from env

  try {
    await fetch('/api/help', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, text: html }),
    });
  } catch (err) {
    // Fail silently – don't loop errors
    console.error('Failed to send error report', err);
  }
}
