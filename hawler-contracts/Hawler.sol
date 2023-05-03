// SPDX-License-Identifier: MIT

import "./HawlerWithdrawer.sol";

pragma solidity ^0.8.17;

contract Hawler {
    uint256 toll = 100000;
    event Deposit(address sender, address withdrawAddress);
    function deposit(bytes32 _hashedPassword)external payable{
        require(msg.sender != address(0), "Address 0");
        require(msg.value > toll, "Amount should be > toll");
        bytes32 _withdrawalHash = keccak256(abi.encodePacked(_hashedPassword));
        HawlerWithdrawer _contractWithdrawer = new HawlerWithdrawer(_withdrawalHash);
        (bool success, ) = address(_contractWithdrawer).call{value: msg.value-toll}("");
        require(success, "Unsuccessful");
        emit Deposit(msg.sender, address(_contractWithdrawer));
    }
}