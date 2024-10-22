// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const NAME = "MyToken";
const SYMBOL = "MTK";
const DECIMALS = 18;
const INITIAL_SUPPLY = 1n; // 使用 BigInt 表示大数
const TOKEN_PRICE = parseEther("1"); // 1 ETH 购买 1 token

const MyERC20Module = buildModule("MyERC20Module", (m) => {
  const name = m.getParameter("name", NAME);
  const symbol = m.getParameter("symbol", SYMBOL);
  const decimals = m.getParameter("decimals", DECIMALS);
  const initialSupply = m.getParameter("initialSupply", INITIAL_SUPPLY);
  const tokenPrice = m.getParameter("tokenPrice", TOKEN_PRICE);

  const myERC20 = m.contract("MyERC20", [
    name,
    symbol,
    decimals,
    initialSupply,
    tokenPrice,
  ]);

  return { myERC20 };
});

export default MyERC20Module;
