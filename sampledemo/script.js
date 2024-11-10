const apiUrl = 'http://localhost:3000/students';

async function loadItems() {
  const response = await fetch(apiUrl);
  const items = await response.json();
  renderItems(items);
}

function renderItems(items) {
  const tableBody = document.getElementById("itemsTable").querySelector("tbody");
  tableBody.innerHTML = "";

  items.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.id}</td>
      <td contenteditable="true" onblur="updateItem(${item.id}, 'nome', this.innerText)">${item.nome}</td>
      <td contenteditable="true" onblur="updateItem(${item.id}, 'curso', this.innerText)">${item.curso}</td>
      <td contenteditable="true" onblur="updateItem(${item.id}, 'idade', this.innerText)">${item.idade}</td>
      <td>
        <button onclick="deleteItem(${item.id})">Excluir</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

async function createNewItem() {
  const nome = document.getElementById("newProp1").value;
  const curso = document.getElementById("newProp2").value;
  const idade = document.getElementById("newProp3").value;

  if (!nome || !curso || !idade) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const newItem = { nome, curso, idade: parseInt(idade) };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem)
  });
  if (response.ok) loadItems();

  document.getElementById("newProp1").value = "";
  document.getElementById("newProp2").value = "";
  document.getElementById("newProp3").value = "";
}

async function updateItem(id, property, value) {
  const updatedData = { [property]: value };

  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData)
  });
}

async function deleteItem(id) {
  const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  if (response.ok) loadItems();
}

window.onload = loadItems;
