function addAccordion() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
  
    const accordion = document.getElementById("accordion");
    const item = document.createElement("div");
  
    item.innerHTML = `
      <button class="accordion-header">${title}</button>
      <div class="accordion-content">${content}</div>
    `;
  
    accordion.appendChild(item);
    document.getElementById("accordionForm").reset();
  }
  
  async function saveAccordion() {
    const items = Array.from(document.querySelectorAll("#accordion > div")).map(div => ({
      title: div.querySelector(".accordion-header").innerText,
      content: div.querySelector(".accordion-content").innerText
    }));
  
    await fetch('https://weblab6-production.up.railway.app/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items)
    });
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
        div.remove();
      });
  

      header.addEventListener("dblclick", () => {
        const content = div.querySelector(".accordion-content");
        content.classList.toggle("active");
      });
  
      accordion.appendChild(div);
    });
  }
  
  
  if (window.location.pathname === '/page2.html') {
    loadAccordion();
    setInterval(loadAccordion, 5000);
  }
  