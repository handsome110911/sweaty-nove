let items = [
  { name: "未中獎", probability: 100 }
];

function renderItems() {
  const list = document.getElementById('item-list');
  list.innerHTML = '';
  let total = getTotalProbability();

  items.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'item-entry';

    const nameInput = document.createElement('input');
    nameInput.value = item.name;
    nameInput.oninput = e => {
      items[index].name = e.target.value;
      drawWheel();
    };

    const probInput = document.createElement('input');
    probInput.type = 'number';
    probInput.value = item.probability;
    probInput.min = 0;
    probInput.oninput = e => {
      const newProb = parseFloat(e.target.value);
      if (isNaN(newProb)) return;
      items[index].probability = newProb;
      autoAdjustNone();
      drawWheel();
    };

    const delBtn = document.createElement('button');
    delBtn.textContent = '刪除';
    delBtn.onclick = () => {
      if (items.length <= 1) return alert("必須保留至少一個項目！");
      items.splice(index, 1);
      autoAdjustNone();
      drawWheel();
      renderItems();
    };

    div.append(nameInput, probInput, delBtn);
    list.appendChild(div);
  });
}

function getTotalProbability() {
  return items.reduce((acc, item) => acc + item.probability, 0);
}

function autoAdjustNone() {
  const total = getTotalProbability();
  let noneItem = items.find(i => i.name === '未中獎');
  if (!noneItem) {
    noneItem = { name: '未中獎', probability: 0 };
    items.push(noneItem);
  }
  if (total > 100) {
    alert("總機率超過 100%，請重新分配！");
  } else {
    noneItem.probability = 100 - (total - noneItem.probability);
  }
  renderItems();
}

function addItem() {
  if (getTotalProbability() >= 100) return alert("無法新增：總機率已達 100%");
  items.push({ name: `項目${items.length}`, probability: 0 });
  autoAdjustNone();
  renderItems();
  drawWheel();
}

function resetItems() {
  if (confirm("確定要重設所有項目？")) {
    items = [{ name: "未中獎", probability: 100 }];
    renderItems();
    drawWheel();
  }
}

function removeLastItem() {
  if (items.length <= 1) return alert("必須保留至少一個項目！");
  items.pop();
  autoAdjustNone();
  renderItems();
  drawWheel();
}
