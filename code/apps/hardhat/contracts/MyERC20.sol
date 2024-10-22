// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27; // 指定 Solidity 编译器版本

import "./IMyERC20.sol"; // 导入 IERC20 接口

// MyToken 合约实现了 IERC20 接口
contract MyERC20 is IMyERC20 {
    string public name; // 公共变量，存储代币名称
    string public symbol; // 公共变量，存储代币符号
    uint8 public decimals; // 公共变量，存储代币小数位数
    uint256 private _totalSupply; // 私有变量，存储代币总供应量
    uint256 public tokenPrice; // 公共变量，存储代币价格

    // 映射，存储每个地址的代币余额
    mapping(address => uint256) private _balances;
    // 嵌套映射，存储每个地址允许其他地址使用的代币数量
    mapping(address => mapping(address => uint256)) private _allowances;

    // 构造函数，初始化代币的基本信息
    constructor(
        string memory _name, // 代币名称参数
        string memory _symbol, // 代币符号参数
        uint8 _decimals, // 代币小数位数参数
        uint256 initialSupply, // 初始供应量参数
        uint256 _tokenPrice // tokenPrice 参数
    ) {
        name = _name; // 设置代币名称
        symbol = _symbol; // 设置代币符号
        decimals = _decimals; // 设置代币小数位数
        _totalSupply = initialSupply * 10 ** uint256(_decimals); // 计算并设置总供应量
        _balances[msg.sender] = _totalSupply; // 将所有代币分配给合约部署者
        tokenPrice = _tokenPrice;
        emit Transfer(address(0), msg.sender, _totalSupply); // 触发转账事件
    }

    // 返回代币的总供应量
    function totalSupply() public view override returns (uint256) {
        return _totalSupply; // 返回总供应量
    }

    // 返回指定地址的代币余额
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account]; // 返回指定地址的余额
    }

    // 转移代币
    function transfer(
        address recipient, // 接收者地址
        uint256 amount // 转移数量
    ) public override returns (bool) {
        _transfer(msg.sender, recipient, amount); // 调用内部转移函数
        return true; // 返回成功
    }

    // 返回 owner 允许 spender 使用的代币数量
    function allowance(
        address owner, // 代币所有者地址
        address spender // 被授权的地址
    ) public view override returns (uint256) {
        return _allowances[owner][spender]; // 返回授权数量
    }

    // 批准 spender 可以使用的代币数量
    function approve(
        address spender, // 被授权的地址
        uint256 amount // 授权数量
    ) public override returns (bool) {
        _approve(msg.sender, spender, amount); // 调用内部授权函数
        return true; // 返回成功
    }

    // 从 sender 转移代币到 recipient，使用授权机制
    function transferFrom(
        address sender, // 发送者地址
        address recipient, // 接收者地址
        uint256 amount // 转移数量
    ) public override returns (bool) {
        _transfer(sender, recipient, amount); // 调用内部转移函数
        uint256 currentAllowance = _allowances[sender][msg.sender]; // 获取当前授权数量
        require(
            currentAllowance >= amount,
            "ERC20: transfer amount exceeds allowance"
        ); // 检查授权数量是否足够
        unchecked {
            _approve(sender, msg.sender, currentAllowance - amount); // 更新授权数量
        }
        return true; // 返回成功
    }

    // 内部函数，执行代币转移
    function _transfer(
        address sender, // 发送者地址
        address recipient, // 接收者地址
        uint256 amount // 转移数量
    ) internal {
        require(sender != address(0), "ERC20: transfer from the zero address"); // 检查发送者不是零地址
        require(recipient != address(0), "ERC20: transfer to the zero address"); // 检查接收者不是零地址

        uint256 senderBalance = _balances[sender]; // 获取发送者余额
        require(
            senderBalance >= amount,
            "ERC20: transfer amount exceeds balance"
        ); // 检查余额是否足够
        unchecked {
            _balances[sender] = senderBalance - amount; // 减少发送者余额
        }
        _balances[recipient] += amount; // 增加接收者余额

        emit Transfer(sender, recipient, amount); // 触发转账事件
    }

    // 内部函数，执行授权操作
    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from the zero address"); // 检查所有者不是零地址
        require(spender != address(0), "ERC20: approve to the zero address"); // 检查被授权者不是零地址

        _allowances[owner][spender] = amount; // 设置授权数量
        emit Approval(owner, spender, amount); // 触发授权事件
    }

    // 将 mint 函数改为私有的
    function _mint(address account, uint256 amount) private {
        require(account != address(0), "ERC20: mint to the zero address");
        require(amount > 0, "ERC20: mint amount must be greater than 0");

        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }

    function mint(uint256 amount) public {
        require(amount > 0, "ERC20: mint amount must be greater than 0");
        _mint(msg.sender, amount);
    }

    // 修改 buyTokens 函数以使用私有的 _mint 函数
    function buyTokens() external payable {
        require(msg.value > 0, "ERC20: sent value must be greater than 0");
        uint256 tokenAmount = (msg.value * 10 ** uint256(decimals)) /
            tokenPrice;
        require(tokenAmount > 0, "ERC20: token amount must be greater than 0");
        _mint(msg.sender, tokenAmount);
    }
}
