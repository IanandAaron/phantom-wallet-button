# phantom-wallet-button 🦄
Generates a html button that when clicked trasmits a chosen amount of sol to a destination phantom wallet.

# Detailed Behavior
1) When the user clicks on the button it first checks to see if there is a phantom wallet installed. If not it redirects to download a wallet.
2) If a phantom wallet exists it will prompt the user to connect their wallet to the site.
3) Once connected it will create the transaction to the chosen destination address for the the sol amount.

# Required Inputs to Script tag
  ### id
  `Script expects this to be solButton`
  ### button-text
  `Text displayed on button`
  ### network
  `Script expects (testnet, devnet, mainnet-beta)`
  ### destination-address
  `Destination Wallet Public Address`
  ### sol-amount
  `Amount of Sol to send.`


# Usage Example
![image](https://user-images.githubusercontent.com/9723481/148671880-67fb182d-825e-44dc-bf56-5de7ff298952.png)
See included index.html
