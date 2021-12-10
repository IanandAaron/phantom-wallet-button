async function sendSol() {
const getProvider = async () => {
    if ("solana" in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
        console.log("Is Phantom installed?  ", provider.isPhantom);
        return provider;
        }
    } else {
        window.open("https://www.phantom.app/", "_blank");
    }
    };
    


let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
var provider = await getProvider();
console.log("Public key of the emitter: ",provider.publicKey.toString());

var toAccount = new solanaWeb3.PublicKey("9fuYBoRvgptU4fVZ8ZqvWTTc6oC68P4tjuSA2ySzn6Nv");

var transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey: provider.publicKey,
      toPubkey: toAccount,
      lamports: solanaWeb3.LAMPORTS_PER_SOL //Investing 1 SOL. Remember 1 Lamport = 10^-9 SOL.
    }),
  );

// Setting the variables for the transaction
transaction.feePayer = await provider.publicKey;
let blockhashObj = await connection.getRecentBlockhash();
transaction.recentBlockhash = await blockhashObj.blockhash;

// Transaction constructor initialized successfully
if(transaction) {
    console.log("Txn created successfully");
    }
// Request creator to sign the transaction (allow the transaction)
let signed = await provider.signTransaction(transaction);
let signature = await connection.sendRawTransaction(signed.serialize());
await connection.confirmTransaction(signature);
 }

