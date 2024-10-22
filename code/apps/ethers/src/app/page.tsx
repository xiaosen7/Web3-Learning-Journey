import { ConnectButtonMetamask } from "@/components/connect-button";
import { HelloVitalik } from "@/components/hello-vitalik";

export default function Home() {
  return (
    <div>
      <HelloVitalik />

      <ConnectButtonMetamask />
    </div>
  );
}
