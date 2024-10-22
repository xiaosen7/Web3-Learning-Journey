"use client";
import { useRequest } from "ahooks";

export const HelloVitalik = () => {
  const { loading, data, error } = useRequest(async () => {
    const { ethers } = await import("ethers");
    const provider = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_MAINNET_RPC_URL
    );
    const balance = await provider.getBalance(`vitalik.eth`);
    return balance;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return <div>ETH Balance of vitalik: {data} ETH</div>;
};
