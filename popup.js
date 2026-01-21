const toggle = document.getElementById('toggle');

chrome.storage.sync.get(['hideShorts'], (result) => {
  toggle.checked = result.hideShorts ?? false;
});

toggle.addEventListener('change', () => {
  chrome.storage.sync.set({ hideShorts: toggle.checked });
});
