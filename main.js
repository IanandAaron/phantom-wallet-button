function doTheRestOfTheStuff() {
  const isPhantomInstalled = window.solana && window.solana.isPhantom
  const div = document.getElementById("root");
  let btn = document.createElement("button");
  if(isPhantomInstalled == true) {
    btn.innerHTML = "Connect to Wallet";
    btn.onclick = connectWallet;
  } else {
    window.alert("Solana object not found! Get a Phantom Wallet 👻");
  }
  div.appendChild(btn);
}

window.addEventListener('load', doTheRestOfTheStuff)

async function connectWallet() {
  try {
    const resp = await window.solana.connect();
  } catch (err) {}
};
