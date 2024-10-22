// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IMyERC20 {
    // 返回代币的总供应量
    function totalSupply() external view returns (uint256);

    // 返回账户的代币余额
    function balanceOf(address account) external view returns (uint256);

    // 将 `amount` 数量的代币从调用者的账户转移到 `recipient`
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    // 返回 `owner` 允许 `spender` 使用的代币数量
    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    // 允许 `spender` 从调用者的账户中最多使用 `amount` 数量的代币
    function approve(address spender, uint256 amount) external returns (bool);

    // 将 `amount` 数量的代币从 `sender` 转移到 `recipient`，使用 allowance 机制
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    // 当代币被转移时触发（包括零值转移）
    event Transfer(address indexed from, address indexed to, uint256 value);

    // 当 `owner` 设置 `spender` 的 allowance 时触发
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}
