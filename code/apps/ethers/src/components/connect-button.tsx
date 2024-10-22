"use client";

import { useUpdateEffect } from "ahooks";
import React, { useState, useEffect } from "react";

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (
        event: string,
        callback: (...args: any[]) => void
      ) => void;
    };
  }
}

const networkParams: Array<{ chainId: number; chainName: string }> = [
  {
    chainId: 1,
    chainName: "Mainnet",
  },
  {
    chainId: 11155111,
    chainName: "Sepolia",
  },
  {
    chainId: 31337,
    chainName: "Hardhat",
  },
];

export function ConnectButtonMetamask() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null); // 新增 chainId 状态
  const [error, setError] = useState<string | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<number>(1); // 默认选择 Mainnet

  useEffect(() => {
    const checkPreviousConnection = async () => {
      const wasConnected = localStorage.getItem("walletConnected");
      if (wasConnected === "true") {
        await checkConnection();
      }
    };

    checkPreviousConnection();
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", checkConnection);
      window.ethereum.on("chainChanged", checkConnection);
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", checkConnection);
        window.ethereum.removeListener("chainChanged", checkConnection);
      }
    };
  }, []);

  async function checkConnection() {
    console.log("checkConnection");
    try {
      if (window.ethereum) {
        const { ethers } = await import("ethers");
        const { formatEther } = await import("ethers/utils");
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const address = await accounts[0].getAddress();
          setAccount(address);
          const balance = await provider.getBalance(accounts[0]);
          setBalance(formatEther(balance));
          const network = await provider.getNetwork();
          setChainId(+network.chainId.toString(10)); // 设置 chainId
        } else {
          setAccount(null);
          setBalance(null);
          setChainId(null);
        }
      }
    } catch (err) {
      console.error(err);
      setError("检查连接时出错");
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        // 可以添加一个临时的成功提示
        alert("地址已复制到剪贴板");
      },
      (err) => {
        console.error("无法复制文本: ", err);
      }
    );
  }

  async function connectWallet() {
    try {
      if (window.ethereum) {
        await switchNetwork();
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        localStorage.setItem("walletConnected", "true");
        await checkConnection();
      } else {
        setError("请安装 MetaMask");
      }
    } catch (err) {
      console.error(err);
      setError("连接钱包时出错");
    }
  }

  async function disconnectWallet() {
    try {
      // 清除所有状态
      setAccount(null);
      setBalance(null);
      setError(null);

      // 如果有本地存储的连接信息，也应该清除
      localStorage.removeItem("walletConnected");

      // 可选：刷新页面以确保所有状态都被重置
      window.location.reload();
    } catch (err) {
      console.error("断开连接时出错:", err);
      setError("断开连接时出错");
    }
  }

  async function switchNetwork() {
    if (!window.ethereum) return;

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: `0x${selectedNetwork.toString(16)}`,
          },
        ],
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("未知错误");
      }
    }
  }

  useUpdateEffect(() => {
    switchNetwork();
  }, [selectedNetwork]);

  function renderButton() {
    return (
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <select
              value={selectedNetwork}
              onChange={(e) => setSelectedNetwork(Number(e.target.value))}
              className="block w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {networkParams.map((network) => (
                <option key={network.chainId} value={network.chainId}>
                  {network.chainName}
                </option>
              ))}
            </select>
            <button
              onClick={connectWallet}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {account ? "切换账户" : "连接 MetaMask"}
            </button>
          </div>

          {account && (
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                <span className="text-gray-700 font-medium">当前账户:</span>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-600 font-bold">{`${account.slice(
                    0,
                    6
                  )}...${account.slice(-4)}`}</span>
                  <button
                    onClick={() => copyToClipboard(account)}
                    className="text-gray-500 hover:text-gray-700"
                    title="复制地址"
                  >
                    📋
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                <span className="text-gray-700 font-medium">余额:</span>
                <span className="text-green-600 font-bold">
                  {balance
                    ? `${parseFloat(balance).toFixed(4)} ETH`
                    : "加载中..."}
                </span>
              </div>
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                <span className="text-gray-700 font-medium">网络:</span>
                <span className="text-purple-600 font-bold">
                  {chainId
                    ? networkParams.find(
                        (network) => network.chainId === chainId
                      )?.chainName || "未知网络"
                    : "加载中..."}
                </span>
              </div>
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                <span className="text-gray-700 font-medium">Chain ID:</span>
                <span className="text-orange-600 font-bold">
                  {chainId
                    ? `0x${chainId.toString(16)} (${chainId})`
                    : "加载中..."}
                </span>
              </div>
              <button
                onClick={disconnectWallet}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                断开连接
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {renderButton()}
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
    </div>
  );
}
