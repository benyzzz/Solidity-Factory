// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PoolFactory {
    struct Pool {
        address tokenA;
        address tokenB;
        uint256 reserveA;
        uint256 reserveB;
        uint256 totalLiquidity;
    }

    mapping(address => Pool) public pools;
    address[] public poolList;

    event PoolCreated(address indexed poolAddress, address tokenA, address tokenB);
    event LiquidityAdded(address indexed poolAddress, uint256 amountA, uint256 amountB, uint256 liquidity);
    event SwapExecuted(address indexed poolAddress, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOut);

    function createPool(address tokenA, address tokenB) public {
        require(tokenA != tokenB, "PoolFactory: Tokens must be different");
        Pool memory newPool = Pool({
            tokenA: tokenA,
            tokenB: tokenB,
            reserveA: 0,
            reserveB: 0,
            totalLiquidity: 0
        });
        pools[msg.sender] = newPool;
        poolList.push(msg.sender);
        emit PoolCreated(msg.sender, tokenA, tokenB);
    }

    function addLiquidity(address poolAddress, uint256 amountA, uint256 amountB) public {
        Pool storage pool = pools[poolAddress];
        require(pool.tokenA != address(0), "PoolFactory: Pool does not exist");

        IERC20(pool.tokenA).transferFrom(msg.sender, address(this), amountA);
        IERC20(pool.tokenB).transferFrom(msg.sender, address(this), amountB);

        uint256 liquidity = sqrt(amountA * amountB);
        pool.reserveA += amountA;
        pool.reserveB += amountB;
        pool.totalLiquidity += liquidity;

        emit LiquidityAdded(poolAddress, amountA, amountB, liquidity);
    }

    function swap(address poolAddress, address tokenIn, uint256 amountIn) public {
        Pool storage pool = pools[poolAddress];
        require(pool.tokenA != address(0), "PoolFactory: Pool does not exist");

        uint256 amountOut;
        if (tokenIn == pool.tokenA) {
            amountOut = (amountIn * pool.reserveB) / (pool.reserveA + amountIn);
            IERC20(pool.tokenA).transferFrom(msg.sender, address(this), amountIn);
            IERC20(pool.tokenB).transfer(msg.sender, amountOut);
            pool.reserveA += amountIn;
            pool.reserveB -= amountOut;
        } else if (tokenIn == pool.tokenB) {
            amountOut = (amountIn * pool.reserveA) / (pool.reserveB + amountIn);
            IERC20(pool.tokenB).transferFrom(msg.sender, address(this), amountIn);
            IERC20(pool.tokenA).transfer(msg.sender, amountOut);
            pool.reserveB += amountIn;
            pool.reserveA -= amountOut;
        } else {
            revert("PoolFactory: Invalid token for swap");
        }

        emit SwapExecuted(poolAddress, tokenIn, tokenIn == pool.tokenA ? pool.tokenB : pool.tokenA, amountIn, amountOut);
    }

        function withdrawLiquidity(address poolAddress) public {
        Pool storage pool = pools[poolAddress];
        require(pool.tokenA != address(0), "PoolFactory: Pool does not exist");

        uint256 amountA = pool.reserveA;
        uint256 amountB = pool.reserveB;

        IERC20(pool.tokenA).transfer(msg.sender, amountA);
        IERC20(pool.tokenB).transfer(msg.sender, amountB);

        // Réinitialisation de la pool
        pool.reserveA = 0;
        pool.reserveB = 0;
        pool.totalLiquidity = 0;
    }

    function sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
}