// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.1;

contract TransferEth {

    function transferEther(address payable recipient) public payable{
    withdrawMoney(recipient);
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function withdrawMoney(address payable to) public {
        to.transfer(getBalance());
    }
}