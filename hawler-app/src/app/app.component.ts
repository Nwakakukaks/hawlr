import { Component, OnInit } from '@angular/core';
import { ContractService } from './contract.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'hawler-app';
  navItems = [
    {
      label: 'hawler',
    }
  ]
  chains: Chain[]= [
    {
      name: "Gnosis Chiado Testnet",
      chainId: "10200",
      contract: "0xdd7a3Fb3dAaEf50e1F693A5c780c784De0eD7fE6"
    },
    {
      name: "Scroll Alpha Testnet",
      chainId: "534353",
      contract: "0xaF52Fe8cb0745063Dfc8771929440e2F976a73C4",
    },
    {
      name: "zkEVM Testnet",
      chainId: "1442",
      contract: "0x1D4d13B3cbc4C36506645cDF3b5c8826AB495969"
    },
    {
      name: "Mantle Testnet",
      chainId: "5001",
      contract: "0x0FC4262580c16ef00689157E264500f9401fE684"
    }
  ];
  selectedChain: Chain = {name:"",chainId:"", contract: ""};
  amount:Number = 0
  password: string = "";
  confirmPassword: string = "";

  contract: string = "";
  toAddress: string = "";
  passwordWithdraw: string = "";
  
  loggedIn = false;
  wallet: string = "Connect Wallet";

  constructor(private service:ContractService){
  }

  ngOnInit(): void {
    
  }

  async connectWallet(){
    if (this.selectedChain.name == ""){
      alert("Please select a chain!");
      return;
    }
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }else{
      alert("Install Metamask to proceed!")
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    this.wallet = accounts[0];  

    const correctChain = this.correctChain();

    if(!correctChain){
      console.log(window.ethereum.networkVersion);
      alert("Please switch to the correct chain in your Wallet! Should be: " + this.selectedChain.name + " with chainId "+this.selectedChain.chainId);
      this.wallet = "Connect Wallet";
      return;
    }
    this.loggedIn = true;
  }

  correctChain(){
    return window.ethereum.networkVersion == this.selectedChain.chainId
  }

  correctPasswordFormat(type:string){
    if (type == 'send'){
      return this.password == this.confirmPassword && this.password.length == 8;
    }
    if (type == 'withdraw'){
      return this.passwordWithdraw.length == 8
    }
    return false;
  }

  sendfunds(){
    if(this.amount > 0 && this.correctPasswordFormat('send') && this.correctChain()){
      const _address = this.service.deposit(this.password, this.amount, this.selectedChain.contract);
      alert("Transaction confirmed, withdrawal addres: " + _address + "Provide the address and password to the receiver.")
      return;
    }
    alert("Input details are incorrect! Check and resubmit.")
  }

  withdrawfunds(){
    if(this.contract != "" && this.passwordWithdraw.length == 8 && this.correctChain()){
      let withdrawalAddr = this.toAddress != "" ? this.toAddress : this.wallet; 
      const success = this.service.withdraw(this.password, withdrawalAddr, this.contract);
      alert("Transaction confirmed with status: " + success);
      return;
    }
    alert("Input details are incorrect! Check and resubmit.")
  }

}

interface Chain {
  name: string,
  chainId: string,
  contract: string
}
