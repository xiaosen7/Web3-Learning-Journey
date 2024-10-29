# ERC20 App Demo

这是一个使用 ERC20 协议、Hardhat、RainbowKit 和 PNPM Workspace 构建的去中心化 Demo 应用。

![alt text](preview.png)

## 项目结构

- `apps/rainbowkit`: 使用 Rainbowkit 搭建的智能合约交互示例
- `apps/hardhat`: Hardhat 智能合约项目
- `ethers`: 使用 ethers.js 的智能合约交互示例

## 开始使用

### 前置要求

- Node.js (推荐版本 18.x 或更高)
- pnpm (如果没有安装,可以运行 `npm install -g pnpm` 进行全局安装)

### 安装依赖

在此目录运行：

`pnpm install`

这将为所有子项目安装必要的依赖。

### 本地部署智能合约

1. 启动本地以太坊节点:

在 `apps/hardhat` 目录下运行:

```bash
pnpm hardhat node
```

这将启动一个本地的以太坊节点(localhost)。

2. 部署智能合约:

打开新的终端,在 `apps/hardhat` 目录下运行:

```bash
pnpm hardhat ignition deploy ./ignition/modules/MyERC20.ts --network localhost
```

这将在本地(localhost)部署智能合约并输出合约地址。

### 启动 Rainbowkit 前端项目

1. 在前端项目中设置合约地址和 ABI

在 [apps/rainbowkit/src/contractConfig.ts](apps/rainbowkit/src/contractConfig.ts) 文件中,设置 `address` 为部署的合约地址,并更新 `erc20Config` 中的 `abi` 为部署的合约 ABI。

ABI 可以在 [apps/hardhat/artifacts/contracts/MyERC20.sol/MyERC20.json](apps/hardhat/artifacts/contracts/MyERC20.sol/MyERC20.json) 文件中找到。

2. 启动前端开发服务器:

打开新的终端,在 `apps/rainbowkit` 目录下运行:

```bash
pnpm dev
```

现在,您可以在浏览器中访问 `http://localhost:3000` 来查看您的 dApp。

### 启动 ethers 前端项目

todo

### 部署到 Sepolia 测试网络

todo
