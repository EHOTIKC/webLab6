function addAccordion() {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (title.length > 400 || content.length > 400) {
    alert("Заголовок та контент не можуть перевищувати 400 символів!");
    return;
  }

  const accordion = document.getElementById("accordion");
  const item = document.createElement("div");

  item.innerHTML = `
    <button class="accordion-header">${title}</button>
    <div class="accordion-content">${content}</div>
  `;

  const header = item.querySelector(".accordion-header");

  header.addEventListener("click", () => {
    const content = item.querySelector(".accordion-content");
    content.classList.toggle("active");
  });

  header.addEventListener("dblclick", () => {
    item.remove();
    saveAccordion();
  });

  accordion.appendChild(item);
  document.getElementById("accordionForm").reset();
}

async function saveAccordion() {
  const items = Array.from(document.querySelectorAll("#accordion > div")).map(div => ({
    title: div.querySelector(".accordion-header").innerText,
    content: div.querySelector(".accordion-content").innerText
  }));

  if (items.length > 0) {
    await fetch('https://weblab6-production.up.railway.app/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items)
    });
  }
}

async function loadAccordion() {
  const response = await fetch('https://weblab6-production.up.railway.app/load');
  const items = await response.json();

  const accordion = document.getElementById("accordion");
  accordion.innerHTML = '';

  items.forEach(item => {
    const div = document.createElement("div");

    div.innerHTML = `
      <button class="accordion-header">${item.title}</button>
      <div class="accordion-content">${item.content}</div>
    `;

    const header = div.querySelector(".accordion-header");

    header.addEventListener("click", () => {
      const content = div.querySelector(".accordion-content");
      content.classList.toggle("active");
    });

    header.addEventListener("dblclick", () => {
      div.remove();
      saveAccordion();
    });

    accordion.appendChild(div);
  });
}

if (window.location.pathname === '/page2.html') {
  loadAccordion();
  setInterval(loadAccordion, 5000);
}
