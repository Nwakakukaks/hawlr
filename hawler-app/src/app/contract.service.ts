import { Injectable } from '@angular/core';
import { ethers, utils } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  provider: any;
  signer: any;

  constructor() {}
  
  async withdraw(password: string, withdrawalAddr: string, withdrawalContract: string) {
    const provider = this.getprovider();
    const signer = this.getsigner();

    const _contract = new ethers.Contract(withdrawalContract, HawlerWithdrawalABI, signer);

    const transaction = await _contract.withdraw(password, withdrawalAddr)
    const receipt = await transaction.wait();
    const eventReceived = receipt.events.find((data:any) => data.event === 'Withdraw');
    const [withdrawAddress] = eventReceived.args;
    console.log(withdrawAddress)

    return transaction;

  }
  async deposit(password: string, amount: Number, chainContract: string) {
    const provider = this.getprovider();
    const signer = this.getsigner();

    const _contract = new ethers.Contract(chainContract, HawlerABI, signer);

    const hash = utils.keccak256(utils.toUtf8Bytes(password));

    console.log(hash);

    const transaction = await _contract.deposit(hash, {value: ethers.utils.parseEther(`${amount}`)})
    const receipt = await transaction.wait();
    const eventReceived = receipt.events.find((data:any) => data.event === 'Deposit');
    const [sender, withdrawAddress] = eventReceived.args;

    console.log(sender, withdrawAddress)
    
    alert("Withdraw address: "+ withdrawAddress)

    return withdrawAddress;

  }

  async getprovider(){
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    return this.provider;
  }

  getsigner(){
    this.signer = this.provider.getSigner();
    return this.signer
  }
}

const HawlerABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "withdrawAddress",
				"type": "address"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_hashedPassword",
				"type": "bytes32"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]

const HawlerWithdrawalABI = [
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_withdrawalHash",
				"type": "bytes32"
			}
		],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "withdrawAddress",
				"type": "address"
			}
		],
		"name": "Withdraw",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_password",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "toAddress",
				"type": "address"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]
