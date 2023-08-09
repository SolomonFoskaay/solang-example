import { Button } from "@chakra-ui/react";
import {
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useProgram } from "@/contexts/ProgramContextProvider";
import { program } from "@/utils/anchorSetup";

export default function GetButton() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const { program } = useProgram();

  const onClick = async () => {
    if (!publicKey || !program) return;

    const [pda] = PublicKey.findProgramAddressSync(
      [Buffer.from("seed"), publicKey.toBuffer()],
      program.programId
    );

    // Get the value of the data account directly.
    const value = await program.account.dataAccount.fetch(pda);

    // Display the value below the button.
    const element = document.getElementById("value");
    element.textContent = value;

    // Console log the value for troubleshooting.
    console.log(value);
  };

  return <Button onClick={onClick}>Get Value</Button>;
}