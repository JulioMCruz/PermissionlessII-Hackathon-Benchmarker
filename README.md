## Table of Contents
- [Abstract](#abstract)
- [User Requirements and Features](#User-Requirements-and-Features)
    - [Gitcoin Passport Score Requirement](#Gitcoin-Passport-Score-Requirement)
    - [Easy DCA Parameter Setup](#Easy-DCA-Parameter-Setup)
    - [Gitcoin Stamp Score Update](#Gitcoin-Stamp-Score-Update)
    - [AA Account Deployment](#AA-Account-Deployment)
    - [Ragequit/Termination](#Ragequit/Termination)
    - [Automatic Distribution](#Automatic-Distribution)
    - [zkSync Integration](#zkSyncIntegration)



## Abstract
Introducing Benchmarking, a groundbreaking onchain Dollar-Cost Averaging (DCA) assistant built on zkSync Era's native account abstraction. Our platform is designed to transform the landscape of digital asset accumulation while maintaining self-custody. Benchmarking offers a streamlined, user-friendly solution that empowers investors to effortlessly use USDC to DCA into any cryptocurrency with zero gas fees & instant withdrawals, all without the complexities of manual execution.

Benchmarking's standout innovation is the implementation of the customizable paymaster smart contract on zkSync Era. This technique empowers Benchmarking to efficiently manage gas fees in on-chain transactions, eliminating the burden of gas expenses for users. Moreover, it offers users the freedom to select their preferred trading tokens, enhancing their control over the DCA process.

To get start with Benchmarking, users simply connect their wallets, set up a new smart contract wallet, and configure their desired recurring buy parameters. The process is straightforward and user-centric, enabling individuals to define their investment strategy with ease. Ensuring the sufficient fund in each accounts is the only responsibility that Benchmarking's user need to take care of. This minimal effort is the only requirement to maintain a consistent DCA strategy.

Benchmarking leverages zkSync Era's native account abstraction to provide a secure, efficient, and scalable foundation for these innovative features. By combining the power of zkSync technology with user-centric design principles, Benchmarking empowers users to take control of their financial future and offering a new level of convenience in the world of digital asset investing.

## </a>User Requirements and Features:

* **Gitcoin Passport Score Requirement:** Users are required to have a Gitcoin Passport score equal to or greater than X (e.g., 10) to use Benchmarking. This criterion helps filter out bots and ensures a genuine user base.

* **Easy DCA Parameter Setup:** Users should be able to easily configure their DCA parameters, including recurrency (daily, weekly, monthly), the total number of DCAs, the final DCA date, the amount of USDC to invest in each DCA action, and the token they wish to buy. The system should provide clear outputs based on these inputs, such as the total amount of USDC that will be invested by the end of the strategy.

* **Gitcoin Stamp Score Update:** Benchmarking will update the user's Gitcoin Stamp score based on their activity within the platform.

* **AA Account Deployment:** Users should have the capability to set up an Autonomous Account (AA) as a smart contract for automated investing. The cost of deploying this smart contract should be covered by Benchmarking's paymaster account, ensuring a seamless experience for users.

* **Ragequit/Termination:** Users should be able to terminate their investment position (ragequit) at any time. Benchmarking's paymaster account should cover the gas fees associated with the withdrawal process.

* **Automatic Distribution:** When the final DCA occurs, the AA account should automatically distribute the funds back into the user's main wallet, simplifying the withdrawal process.

* **zkSync Integration:** All transactions should initially take place in zkSync, ensuring efficiency, security, and scalability for users.
