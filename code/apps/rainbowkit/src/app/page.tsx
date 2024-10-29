"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { erc20Config } from "@/contractConfig";
import { useState, useEffect } from "react";
import { formatUnits, parseUnits, parseEther } from "viem";

// 自定义钩子，用于读取合约数据
const useERC20Data = () => {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address, token: erc20Config.address });
  const { data: name } = useReadContract({
    ...erc20Config,
    functionName: "name",
  });
  const { data: symbol } = useReadContract({
    ...erc20Config,
    functionName: "symbol",
  });
  const { data: totalSupply } = useReadContract({
    ...erc20Config,
    functionName: "totalSupply",
  });
  const { data: decimals } = useReadContract({
    ...erc20Config,
    functionName: "decimals",
  });
  const { data: tokenPrice } = useReadContract({
    ...erc20Config,
    functionName: "tokenPrice",
  });
  return { address, balance, name, symbol, totalSupply, decimals, tokenPrice };
};

// 组件：代币信息
interface TokenInfoProps {
  name: string | undefined;
  symbol: string | undefined;
  balance: { formatted: string; symbol: string } | undefined;
  totalSupply: bigint | undefined;
  decimals: number | undefined;
}

const TokenInfo: React.FC<TokenInfoProps> = ({
  name,
  symbol,
  balance,
  totalSupply,
  decimals,
}) => (
  <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300">
    <h2 className="text-2xl font-bold mb-4 text-indigo-600">代币信息</h2>
    <div className="grid grid-cols-2 gap-4">
      <p className="mb-2">
        <span className="font-semibold">名称:</span> {name}
      </p>
      <p className="mb-2">
        <span className="font-semibold">符号:</span> {symbol}
      </p>
      <p className="mb-2">
        <span className="font-semibold">余额:</span> {balance?.formatted}{" "}
        {balance?.symbol}
      </p>
      <p className="mb-2">
        <span className="font-semibold">总供给:</span>{" "}
        {`${formatUnits(totalSupply || BigInt(0), decimals || 0)} ${symbol}`}
      </p>
    </div>
  </div>
);

// 通用输入组件
const Input: React.FC<{
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ type, placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
);

// 通用按钮组件
const Button: React.FC<{
  onClick: () => void;
  disabled: boolean;
  isPending: boolean;
  children: React.ReactNode;
  color: string;
}> = ({ onClick, disabled, isPending, children, color }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full p-3 rounded-md text-white font-semibold transition-colors duration-300 ${color} hover:${color.replace(
      "500",
      "600"
    )} disabled:bg-gray-400`}
  >
    {isPending ? "处理中..." : children}
  </button>
);

// 组件：转账表单
interface TransferFormProps {
  decimals: number | undefined;
}

const TransferForm: React.FC<TransferFormProps> = ({ decimals }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const {
    writeContractAsync,
    data: hash,
    error,
    isPending,
    isSuccess,
  } = useWriteContract();

  const handleTransfer = async () => {
    if (recipient.startsWith("0x") && amount && decimals) {
      try {
        await writeContractAsync({
          ...erc20Config,
          functionName: "transfer",
          args: [recipient as `0x${string}`, parseUnits(amount, decimals)],
        });
      } catch (error) {
        console.error("Transfer failed:", error);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">转账</h2>
      <p className="mb-4 text-gray-600">输入接收地址和金额以进行代币转账。</p>
      <Input
        type="text"
        placeholder="接收地址"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <Input
        type="number"
        placeholder="金额"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button
        onClick={handleTransfer}
        disabled={isPending}
        isPending={isPending}
        color="bg-blue-500"
      >
        转账
      </Button>
      {isSuccess && (
        <p className="text-green-500 mt-2">转账成功！交易哈希: {hash}</p>
      )}
      {error && <p className="text-red-500 mt-2">转账失败: {error.message}</p>}
    </div>
  );
};

// 组件：批准表单
interface ApproveFormProps {
  decimals: number | undefined;
}

const ApproveForm: React.FC<ApproveFormProps> = ({ decimals }) => {
  const [spender, setSpender] = useState("");
  const [approveAmount, setApproveAmount] = useState("");

  const {
    writeContractAsync,
    data: hash,
    error,
    isPending,
    isSuccess,
  } = useWriteContract();

  const handleApprove = async () => {
    if (spender.startsWith("0x") && approveAmount && decimals) {
      try {
        await writeContractAsync({
          ...erc20Config,
          functionName: "approve",
          args: [spender as `0x${string}`, parseUnits(approveAmount, decimals)],
        });
      } catch (error) {
        console.error("Approval failed:", error);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">批准</h2>
      <p className="mb-4 text-gray-600">
        授权某个地址可以使用您账户中的一定数量的代币。
      </p>
      <Input
        type="text"
        placeholder="授权地址"
        value={spender}
        onChange={(e) => setSpender(e.target.value)}
      />
      <Input
        type="number"
        placeholder="授权金额"
        value={approveAmount}
        onChange={(e) => setApproveAmount(e.target.value)}
      />
      <Button
        onClick={handleApprove}
        disabled={isPending}
        isPending={isPending}
        color="bg-green-500"
      >
        批准
      </Button>
      {isSuccess && (
        <p className="text-green-500 mt-2">授权成功！交易哈希: {hash}</p>
      )}
      {error && <p className="text-red-500 mt-2">授权失败: {error.message}</p>}
    </div>
  );
};

// 组件：授权转账表单
interface TransferFromFormProps {
  decimals: number | undefined;
}

const TransferFromForm: React.FC<TransferFromFormProps> = ({ decimals }) => {
  const [from, setFrom] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transferFromAmount, setTransferFromAmount] = useState("");

  const {
    writeContractAsync,
    data: hash,
    error,
    isPending,
    isSuccess,
  } = useWriteContract();

  const handleTransferFrom = async () => {
    if (
      from.startsWith("0x") &&
      recipient.startsWith("0x") &&
      transferFromAmount &&
      decimals
    ) {
      try {
        await writeContractAsync({
          ...erc20Config,
          functionName: "transferFrom",
          args: [
            from as `0x${string}`,
            recipient as `0x${string}`,
            parseUnits(transferFromAmount, decimals),
          ],
        });
      } catch (error) {
        console.error("TransferFrom failed:", error);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">授权转账</h2>
      <p className="mb-4 text-gray-600">
        使用授权额度从指定地址转移代币到接收地址。
      </p>
      <Input
        type="text"
        placeholder="发送者地址"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <Input
        type="text"
        placeholder="接收地址"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <Input
        type="number"
        placeholder="转账金额"
        value={transferFromAmount}
        onChange={(e) => setTransferFromAmount(e.target.value)}
      />
      <Button
        onClick={handleTransferFrom}
        disabled={isPending}
        isPending={isPending}
        color="bg-purple-500"
      >
        授权转账
      </Button>
      {isSuccess && (
        <p className="text-green-500 mt-2">授权转账成功！交易哈希: {hash}</p>
      )}
      {error && (
        <p className="text-red-500 mt-2">授权转账失败: {error.message}</p>
      )}
    </div>
  );
};

// 组件：查询授权额度表单
interface QueryAllowanceFormProps {
  address: `0x${string}` | undefined;
  decimals: number | undefined;
}

const QueryAllowanceForm: React.FC<QueryAllowanceFormProps> = ({
  address,
  decimals,
}) => {
  const [queryAddress, setQueryAddress] = useState("");
  const [queriedAllowance, setQueriedAllowance] = useState<string | null>(null);

  const {
    data: allowance,
    refetch,
    isError,
    isLoading,
  } = useReadContract({
    ...erc20Config,
    functionName: "allowance",
    args:
      queryAddress && address
        ? [queryAddress as `0x${string}`, address as `0x${string}`]
        : undefined,
    query: {
      enabled: false,
    },
  });

  const handleQueryAllowance = async () => {
    if (queryAddress.startsWith("0x") && address) {
      await refetch();
    }
  };

  useEffect(() => {
    if (allowance !== undefined && decimals !== undefined) {
      setQueriedAllowance(formatUnits(allowance, decimals));
    }
  }, [allowance, decimals]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">查询授权额度</h2>
      <p className="mb-4 text-gray-600">
        输入地址以查看该地址授权给您的代币额度。
      </p>
      <Input
        type="text"
        placeholder="查询地址"
        value={queryAddress}
        onChange={(e) => setQueryAddress(e.target.value)}
      />
      <Button
        onClick={handleQueryAllowance}
        disabled={isLoading}
        isPending={isLoading}
        color="bg-yellow-500"
      >
        查询
      </Button>
      {queriedAllowance !== null && (
        <p className="mt-4 text-indigo-600 font-semibold">
          授权额度: {queriedAllowance}
        </p>
      )}
      {isError && <p className="text-red-500 mt-2">查询失败，请重试</p>}
    </div>
  );
};

// 添加 MintForm 组件
interface MintFormProps {
  decimals: number | undefined;
}

const MintForm: React.FC<MintFormProps> = ({ decimals }) => {
  const [mintAmount, setMintAmount] = useState("");

  const {
    writeContractAsync,
    data: hash,
    error,
    isPending,
    isSuccess,
  } = useWriteContract();

  const handleMint = async () => {
    if (mintAmount && decimals) {
      try {
        await writeContractAsync({
          ...erc20Config,
          functionName: "mint",
          args: [parseUnits(mintAmount, decimals)],
        });
      } catch (error) {
        console.error("铸造失败:", error);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">铸造代币</h2>
      <p className="mb-4 text-gray-600">输入想要铸造的代币数量。</p>
      <Input
        type="number"
        placeholder="铸造数量"
        value={mintAmount}
        onChange={(e) => setMintAmount(e.target.value)}
      />
      <Button
        onClick={handleMint}
        disabled={isPending}
        isPending={isPending}
        color="bg-pink-500"
      >
        铸造
      </Button>
      {isSuccess && (
        <p className="text-green-500 mt-2">铸造成功！交易哈希: {hash}</p>
      )}
      {error && <p className="text-red-500 mt-2">铸���失败: {error.message}</p>}
    </div>
  );
};

// 添加 BuyTokensForm 组件
interface BuyTokensFormProps {
  tokenPrice: bigint | undefined;
}

const BuyTokensForm: React.FC<BuyTokensFormProps> = ({ tokenPrice }) => {
  const [ethAmount, setEthAmount] = useState("");

  const {
    writeContractAsync,
    data: hash,
    error,
    isPending,
    isSuccess,
  } = useWriteContract();

  const handleBuyTokens = async () => {
    if (ethAmount && tokenPrice) {
      try {
        await writeContractAsync({
          ...erc20Config,
          functionName: "buyTokens",
          value: parseEther(ethAmount),
        });
      } catch (error) {
        console.error("购买代币失败:", error);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">购买代币</h2>
      <p className="mb-4 text-gray-600">输入想要购买代币的 ETH 数量。</p>
      <Input
        type="number"
        placeholder="ETH 数量"
        value={ethAmount}
        onChange={(e) => setEthAmount(e.target.value)}
      />
      <Button
        onClick={handleBuyTokens}
        disabled={isPending}
        isPending={isPending}
        color="bg-orange-500"
      >
        购买代币
      </Button>
      {isSuccess && (
        <p className="text-green-500 mt-2">购买成功！交易哈希: {hash}</p>
      )}
      {error && <p className="text-red-500 mt-2">购买失败: {error.message}</p>}
    </div>
  );
};

const Home: NextPage = () => {
  const { address, balance, name, symbol, totalSupply, decimals, tokenPrice } =
    useERC20Data();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12">
      <Head>
        <title>My dApp</title>
        <meta name="description" content="My decentralized application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-center text-indigo-600 mb-8 animate-pulse">
            欢迎来到我的dApp!
          </h1>
          <div className="flex justify-center mb-8">
            <ConnectButton />
          </div>
          {address && (
            <div className="space-y-8 animate-fade-in-down">
              <TokenInfo
                name={name}
                symbol={symbol}
                balance={balance}
                totalSupply={totalSupply}
                decimals={decimals}
              />
              <TransferForm decimals={decimals} />
              <ApproveForm decimals={decimals} />
              <TransferFromForm decimals={decimals} />
              <QueryAllowanceForm address={address} decimals={decimals} />
              <MintForm decimals={decimals} />
              <BuyTokensForm tokenPrice={tokenPrice} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
