import * as anchor from "@coral-xyz/anchor"
import { Program } from "@coral-xyz/anchor"
import { AccountData } from "../target/types/account_data"

describe("account-data", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)

  const dataAccount = anchor.web3.Keypair.generate()
  const wallet = provider.wallet

  const program = anchor.workspace.AccountData as Program<AccountData>

  // Create the new account
  // TODO: Figure out how to calculate the initial size of the account required for Solang programs
  it("Is initialized!", async () => {
    const tx = await program.methods
      .new(
        wallet.publicKey, // payer
        10240, // space (10240 bytes is the maximum space allowed when allocating space through a program)
        "Joe C", // name
        136, // house number
        "Mile High Dr.", // street
        "Solana Beach" // city
      )
      .accounts({ dataAccount: dataAccount.publicKey })
      .signers([dataAccount])
      .rpc()
    console.log("Your transaction signature", tx)
  })

  // Get the account data
  it("Get AddressInfo Data", async () => {
    const val = await program.methods
      .get()
      .accounts({ dataAccount: dataAccount.publicKey })
      .view()
    console.log("State:", val)
  })

  // Get the account data size
  it("Get AddressInfo Size", async () => {
    const size = await program.methods
      .getAddressInfoSize()
      .accounts({ dataAccount: dataAccount.publicKey })
      .view()
    console.log("Size:", size.toNumber())
  })
})