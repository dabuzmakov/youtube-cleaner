const $ = (id) => document.getElementById(id);

const toggles = {
  hideShorts: $('toggleShorts'),
  hideHome: $('toggleHome')
};

chrome.storage.sync.get(Object.keys(toggles), (data) => {
  for (const key in toggles) {
    toggles[key].checked = data[key] ?? false;
  }
});

for (const key in toggles) {
  toggles[key].addEventListener('change', () => {
    chrome.storage.sync.set({ [key]: toggles[key].checked });
  });
}