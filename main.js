// Function to actually do the connection to the wallet
async function connectWallet() {
  try {
    await window.solana.connect();
    await sendSol();
  } catch (err) {}
}

//Function to create button and on click
function connectAndSend() {
  const isPhantomInstalled = window.solana && window.solana.isPhantom;

  if (isPhantomInstalled == true) {
    let btn = document.createElement("button");
    let scriptObject = document.getElementById("test");
    btn.innerHTML = scriptObject.getAttribute("button-text");
    btn.onclick = connectWallet;
    document.body.appendChild(btn);
  } else {
    window.alert("Solana object not found! Get a Phantom Wallet 👻");
    window.location = "https://www.phantom.app/";
  }
}

// On load of page check to see if there is a phantom window object if not then haave popup
window.addEventListener("load", connectAndSend);

async function sendSol() {
  const provider = window.solana;
  const scriptObject = document.getElementById("test");
  console.log("Public key of the emitter: ", provider.publicKey.toString());
  console.log(solanaWeb3.LAMPORTS_PER_SOL);

  let connection = new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl("devnet"),
    "confirmed"
  );
  var toAccount = new solanaWeb3.PublicKey(
    scriptObject.getAttribute("to-address")
  );

  var transaction = new solanaWeb3.Transaction().add(
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
