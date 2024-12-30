// Background script: background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "killSticky",
    title: "Kill Sticky Elements",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "killSticky") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: removeStickyElements
    });
  }
});

function removeStickyElements() {
  const stickyElements = Array.from(document.querySelectorAll("*"));
  stickyElements.forEach(el => {
    const style = window.getComputedStyle(el);
    if (style.position === "sticky" || style.position === "fixed") {
      el.style.position = "static";
    }
  });
}
