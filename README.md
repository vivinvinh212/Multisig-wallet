Project: **Oracle-integrated Multisig wallet**

Author: **Vinh Le**

Date: **2 September 2022**


**Overview**

A multisig factory web3 dapp allowing user to create multisig wallet with off-chain signature to save gas, pre-compute multisig wallet for fund deposit, add or remove signers/owners based on needs. This multisig wallet also integrate an oracle which supports adding signers when a certain threshold on BTC reserves/ ETH price is reached (too low/high), hence give owners additional method to escape funds when losing the private key/ access to the wallet. 


**Deliverables**

1.	Web App: A user-friendly multisig factory web application that allows users to:

    a.	Connect their wallets
  
    b.	Create multisig wallet by specifying wallet name, owners, quantity of signature required on the desired networks
  
    c.	Sign off-chain to save gas fee
  
    d.	Add signers, remove signers, owners
  
    e.	Change the number of signatures required
  
    f.	Receive pre-computed multisig wallet address so user can deposit funds to wallet
  
    g.	Allow oracle options (check BTC reserves/ ETH price) which allows for additional signatures provided when price/reserves thresholds are triggered facilitating fund sell/trade 
  
    h.	Distribute funds equally or according to predefined allocation to owners’ wallets
 
2.	Smart Contract(s): A set of smart-contracts to perform off-chain sign activities to on-chain transactions to maintain transparency.

    a.	MultisigFactory
  
        i.	A mapping to list to keep track of every multisig wallet created. 
    
        ii.	Creating a new multisig wallets with list of owners, number of signatures required, chainId parameters
    
        iii.	Use create2 from OpenZeppelin to pre-compute multisig-wallet based on user-defined wallet name (hash function)

    b.	MultisigWallet
  
        i.	Contracts defining constructor, init and other functions of a multisig wallet instance including add, remove signers, change number of signatures, make transactions, etc. 
    
        ii.	Support recovering the original signer of the message
    
        iii.	Sign 1 signature given the threshold of price feed/reserve is triggerd
    
    c.	Oracle
  
        i.	Integrate WBTC reserves and WBTC contract to check supply against reserves through data feeds
    
        ii.	Integrate ETH price feed to check for price against threshold 
    
        iii.	Return boolean for comparisons to aid in signing conditional logics of Multisig wallet


**Workflow Visual**

![image](https://user-images.githubusercontent.com/83176944/192600231-b245fc40-dc22-4124-9890-23e0461ce8fb.png)

**Acknowledgement**
This project was made possible with the support of scaffold-eth public template and examples of multisig functions

- Live app: http://absorbing-bird.surge.sh/

- Verified rinkeby contract: https://goerli.etherscan.io/address/0x800Ae5E4B1371123F00A94a8Ae69df7B0855cD53
