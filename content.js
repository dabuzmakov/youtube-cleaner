const HIDE_CLASS = 'hide-shorts-extension';

function applyHide(hide) {
  let style = document.getElementById(HIDE_CLASS);

  if (hide && !style) {
    style = document.createElement('style');
    style.id = HIDE_CLASS;
    style.textContent = `
      ytd-rich-section-renderer,
      ytd-reel-shelf-renderer {
        display: none !important;
      }

      grid-shelf-view-model:has(a[href^="/shorts"]) {
        display: none !important;
      }

      ytd-guide-entry-renderer:has(a[href^="/shorts"]) {
        display: none !important;
      }

      ytd-mini-guide-entry-renderer:has(a[href^="/shorts"]) {
        display: none !important;
      }

      ytd-video-renderer:has(ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]) {
        display: none !important;
      }

      ytd-guide-entry-renderer:has(a[title="Shorts"]) {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  if (!hide && style) {
    style.remove();
  }
}

chrome.storage.sync.get(['hideShorts'], r => applyHide(r.hideShorts));
chrome.storage.onChanged.addListener(c => {
  if (c.hideShorts) applyHide(c.hideShorts.newValue);
});
