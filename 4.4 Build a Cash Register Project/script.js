const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");

const CURRENCY_UNIT = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100],
];

let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

purchaseBtn.addEventListener("click", () => {
  const price = parseFloat(document.getElementById("price").value);
  const cash = parseFloat(document.getElementById("cash").value);

  if (isNaN(price) || isNaN(cash)) {
    alert("Please enter valid numbers for both price and cash.");
    return;
  }

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item.");
    return;
  }

  const change = calculateChange(price, cash, cid);

  if (change.status === "INSUFFICIENT_FUNDS") {
    changeDue.textContent = `Status: INSUFFICIENT_FUNDS`;
  } else if (change.status === "CLOSED") {
    changeDue.textContent = `Status: CLOSED ${formatChange(change.change)}`;
  } else if (change.status === "OPEN") {
    changeDue.textContent = `Status: OPEN ${formatChange(change.change)}`;
  }
});

function calculateChange(price, cash, cid) {
  let changeDue = cash - price;
  const originalCid = [...cid];
  const change = [];

  // Reverse cid to start with the highest currency unit
  cid = cid.reverse();

  for (let [currency, amount] of cid) {
    const currencyValue = CURRENCY_UNIT.find((unit) => unit[0] === currency)[1];
    let amountToReturn = 0;

    while (changeDue >= currencyValue && amount > 0) {
      changeDue -= currencyValue;
      changeDue = Math.round(changeDue * 100) / 100; // Fix floating-point precision
      amount -= currencyValue;
      amountToReturn += currencyValue;
    }

    if (amountToReturn > 0) {
      change.push([currency, amountToReturn]);
    }
  }

  const totalInDrawer = originalCid.reduce((sum, [_, amount]) => sum + amount, 0);
  const totalChangeGiven = change.reduce((sum, [_, amount]) => sum + amount, 0);

  if (changeDue > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (totalInDrawer === totalChangeGiven) {
    return { status: "CLOSED", change: originalCid.reverse() };
  }

  return { status: "OPEN", change };
}

function formatChange(change) {
  return change
    .map(([currency, amount]) => `${currency}: $${amount.toFixed(2)}`)
    .join(" ");
}
