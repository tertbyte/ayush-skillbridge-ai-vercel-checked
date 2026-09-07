(() => {
  const FROM = /\bAnanya(?:\s+Menon)?\b/g;
  const TO = "Madhumithra K";

  const replaceText = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (FROM.test(node.nodeValue)) {
        FROM.lastIndex = 0;
        node.nodeValue = node.nodeValue.replace(FROM, TO);
      }
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "SCRIPT" && node.tagName !== "STYLE") {
      node.childNodes.forEach(replaceText);
    }
  };

  const run = () => replaceText(document.getElementById("root") || document.body);
  new MutationObserver(run).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  run();
})();
