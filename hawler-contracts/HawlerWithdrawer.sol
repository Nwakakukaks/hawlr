// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract HawlerWithdrawer {
    uint256 toll = 100000;
    bool withdrawn = false;
    bytes32 withdrawalHash;
    event Withdraw(address withdrawAddress);
    constructor(bytes32 _withdrawalHash) payable{
        withdrawalHash = _withdrawalHash;
    }
    function checkPassword(bytes32 _passwordHash)internal view returns(bool _matches){
        bytes32 _hashPassword = keccak256(abi.encodePacked(_passwordHash));
        _matches = _hashPassword == withdrawalHash;
    }
    function withdraw(string memory _password, address toAddress)external payable {
        require(msg.value > toll, "Pay spam prevention toll");
        require(bytes(_password).length == 8, "Incorrect password");
        require(msg.sender != address(0), "Address 0");
        require(!withdrawn, "Already withdrawn");
        require(checkPassword(keccak256(abi.encodePacked(bytes(_password)))), "Incorrect");
        withdrawn = true;
        uint256 _balance = address(this).balance;
        (bool success, ) = toAddress.call{value: _balance}("");
        require(success, "Unsuccessful");
        emit Withdraw(toAddress);
    }
    fallback() external payable{}
    receive()external payable{}
}