let current = 0;
let screens = document.querySelectorAll(".screen");

// ONBOARDING
function next() {
  screens[current].classList.remove("active");
  current++;
  screens[current].classList.add("active");
}

function startApp() {
  document.getElementById("onboarding").style.display = "none";
  document.getElementById("app").style.display = "block";
}

// DATA
let budget = 50000;
let days = 30;

let balance = Number(localStorage.getItem("balance")) || budget;
let savings = Number(localStorage.getItem("savings")) || 0;
let spent = Number(localStorage.getItem("spent")) || 0;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// LOAD
window.onload = function() {
  updateUI();
  transactions.forEach(t => renderTransaction(t));
};

// ADD TRANSACTION
function addTransaction() {
  let desc = document.getElementById("desc").value;
  let amt = Number(document.getElementById("amt").value);
  
  if (desc === "" || amt <= 0) {
    alert("Enter valid details");
    return;
  }
  
  let save = amt * 0.075;
  
  savings += save;
  spent += amt;
  balance -= amt;
  
  let percent = (spent / budget) * 100;
  
  if (percent >= 90) {
    alert("⚠️ 90% budget used");
  } else if (percent >= 75) {
    alert("⚠️ 75% budget used");
  }
  
  let transaction = { desc, amount: amt };
  transactions.push(transaction);
  
  saveData();
  updateUI();
  renderTransaction(transaction);
  
  document.getElementById("desc").value = "";
  document.getElementById("amt").value = "";
}

// UI UPDATE
function updateUI() {
  let safe = balance / days;
  
  document.getElementById("balance").innerText = "₦" + balance;
  document.getElementById("savings").innerText = "₦" + Math.floor(savings);
  document.getElementById("safe").innerText = "₦" + Math.floor(safe);
}

// SAVE
function saveData() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("savings", savings);
  localStorage.setItem("spent", spent);
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// RENDER
function renderTransaction(t) {
  let li = document.createElement("li");
  li.innerHTML = `<span>${t.desc}</span><strong>₦${t.amount}</strong>`;
  document.getElementById("list").appendChild(li);
}
