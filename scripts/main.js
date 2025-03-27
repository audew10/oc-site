
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});
document.querySelectorAll(".sub-tabs").forEach(tabGroup => {
  const subTabs = tabGroup.querySelectorAll(".sub-tab");
  subTabs.forEach(subTab => {
    subTab.addEventListener("click", () => {
      const contentGroup = subTab.closest(".tab-content");
      contentGroup.querySelectorAll(".sub-tab").forEach(st => st.classList.remove("active"));
      contentGroup.querySelectorAll(".subtab-content").forEach(sc => sc.classList.remove("active"));
      subTab.classList.add("active");
      contentGroup.querySelector("#" + subTab.dataset.subtab).classList.add("active");
    });
  });
});

// 多 tag 複選查找
let imageData = [];

fetch("scripts/image-data.json")
  .then(res => res.json())
  .then(data => {
    imageData = data;
  });

let selectedTags = new Set();

document.addEventListener("click", function (event) {
  if (!event.target.classList.contains("tag")) return;
  const tagValue = event.target.dataset.tag;
  if (selectedTags.has(tagValue)) {
    selectedTags.delete(tagValue);
    event.target.classList.remove("active-tag");
  } else {
    selectedTags.add(tagValue);
    event.target.classList.add("active-tag");
  }

  const resultDiv = document.getElementById("gallery-results");
  const filtered = imageData.filter(img =>
    [...selectedTags].every(tag => img.tags.includes(tag))
  );

  if (selectedTags.size === 0) {
    resultDiv.innerHTML = "<p>請選擇一個或多個 tag 查找。</p>";
  } else if (filtered.length === 0) {
    resultDiv.innerHTML = "<p>沒有符合的圖片。</p>";
  } else {
    resultDiv.innerHTML = filtered.map(img =>
      `<img src="assets/images/${img.src}" alt="" style="max-width:200px; margin:5px;">`
    ).join("");
  }
});

// 清空已選取的條件
document.querySelector(".clear-button").addEventListener("click", () => {
  selectedTags.clear();  // 清空選中的tag
  document.querySelectorAll(".tag").forEach(tag => {
    tag.classList.remove("active-tag");  // 移除已選的tag
  });
  document.getElementById("gallery-results").innerHTML = "<p>請選擇一個或多個 tag 查找。</p>";  // 重置顯示內容
});
