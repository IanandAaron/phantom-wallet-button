// Function to actually do the connection to the wallet
async function connectAndSend() {
  try {
    await window.solana.connect();
    await sendSol();
  } catch (err) {}
}

//Function to create button and on click
function validateAndPlaceButton() {
  const isPhantomInstalled = window.solana && window.solana.isPhantom;

  if (isPhantomInstalled == true) {
    let btn = document.createElement("button");
    let scriptObject = document.getElementById("test");
    btn.innerHTML = scriptObject.getAttribute("button-text");
    btn.onclick = connectAndSend;
    document.body.appendChild(btn);
  } else {
    window.alert("Solana object not found! Get a Phantom Wallet 👻");
    window.location = "https://www.phantom.app/";
  }
}

// On load of page check to see if there is a phantom window object if not then haave popup
window.addEventListener("load", validateAndPlaceButton);

async function sendSol() {
  // Get values for transaction from script tag inputs
  const provider = window.solana;
  const scriptObject = document.getElementById("test");
  const connection = new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl("devnet"),
    "confirmed"
  );
  const toAccount = new solanaWeb3.PublicKey(
    scriptObject.getAttribute("to-address")
  );

  // Create transaction object
  let transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey: provider.publicKey,
      toPubkey: toAccount,
      lamports:
        solanaWeb3.LAMPORTS_PER_SOL * scriptObject.getAttribute("sol-amount"),
    })
  );

  // Setting the variables for the transaction
  transaction.feePayer = await provider.publicKey;
  let blockhashObj = await connection.getRecentBlockhash();
  transaction.recentBlockhash = await blockhashObj.blockhash;

  // Transaction constructor initialized successfully
  if (transaction) {
    console.log("Txn created successfully");
  }
  // Request creator to sign the transaction (allow the transaction)
  let signed = await provider.signTransaction(transaction);
  let signature = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(signature);
}
