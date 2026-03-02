const STYLE_ID = 'yt-cleaner';

function updateStyles({ hideShorts, hideHome }) {
  let style = document.getElementById(STYLE_ID);

  if (!hideShorts && !hideHome) {
    style?.remove();
    return;
  }

  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }

  style.textContent = `
    ${hideShorts ? `
      ytd-rich-section-renderer,
      ytd-reel-shelf-renderer,
      grid-shelf-view-model:has(a[href^="/shorts"]),
      ytd-guide-entry-renderer:has(a[href^="/shorts"]),
      ytd-mini-guide-entry-renderer:has(a[href^="/shorts"]),
      ytd-guide-entry-renderer:has(a[title="Shorts"]),
      ytd-video-renderer:has(ytd-thumbnail-overlay-time-status-renderer[overlay-style="SHORTS"]),
      a[href^="/shorts"] {
        display: none !important;
      }
    ` : ''}

    ${hideHome ? `
      ytd-browse[page-subtype="home"] ytd-rich-grid-renderer {
        display: none !important;
      }
    ` : ''}
  `;
}

chrome.storage.sync.get(['hideShorts', 'hideHome'], updateStyles);

chrome.storage.onChanged.addListener(() => {
  chrome.storage.sync.get(['hideShorts', 'hideHome'], updateStyles);
});