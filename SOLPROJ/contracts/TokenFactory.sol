// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20Token.sol";

contract TokenFactory {
    address[] public tokens;

    event TokenCreated(address tokenAddress, string name, string symbol, uint256 initialSupply);

    function createToken(string memory name, string memory symbol, uint256 initialSupply) public {
        ERC20Token newToken = new ERC20Token(name, symbol, initialSupply);
        tokens.push(address(newToken));
        emit TokenCreated(address(newToken), name, symbol, initialSupply);
    }

    function getTokens() public view returns (address[] memory) {
        return tokens;
    }
}