# Hawler - Stealth Crypto Payment Platform

Hawler is a stealth crypto payment platform built with Angular and Solidity. It allows users to send payments psuedo-anonymously while providing a layer of privacy. The smart contracts have been deployed to Polygon zkEVM, Scroll, Gnosis Chain, and Mantle test networks with the following contract addresses:

Polygon zkEVM: 0x1D4d13B3cbc4C36506645cDF3b5c8826AB495969
Scroll: 0xaF52Fe8cb0745063Dfc8771929440e2F976a73C4
Gnosis Chain: 0xdd7a3Fb3dAaEf50e1F693A5c780c784De0eD7fE6
Mantle: 0x0FC4262580c16ef00689157E264500f9401fE684

## How it Works
```mermaid
graph TD;
    A[User Deposits Funds] --> B[Creates a Password];
    B --> C[Password is Hashed Off-Chain];
    C --> D[Hash is Sent to the Smart Contract];
    D --> E[Hash is Hashed Again in the Smart Contract];
    E --> F[Deposit Contract Generates a Disposable Smart Contract Wallet];
    F --> G[Secured by the Hashed Hash of the Password];
    G --> H[Withdrawer Calls the Withdraw Method in the Smart Contract Wallet];
    H --> I[Providing the Exchange/Non-Linked Account and the Raw Password];
    I --> J[Raw Password is Hashed and Hashed Again to Prove Ownership];
    J --> K[Funds are Released];
```

## Notice
Please note that the project is not audited and should only be used in testnet.

## License
This project is licensed under the MIT License.
