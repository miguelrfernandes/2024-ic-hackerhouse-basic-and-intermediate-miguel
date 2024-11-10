import { useState } from "react";
import { NFID } from "@nfid/embed";
import { HttpAgent } from "@dfinity/agent";
import {
  canisterId,
  createActor,
} from "declarations/hackerhouse_basic_backend";

function NfidLogin(props) {
  const [myPrincipal, setMyPrincipal] = useState("Not Logged In");

  async function handleLogin() {
    const nfid = await NFID.init({
      application: {
        name: "IC AI Hacker House",
        logo: "https://taikai.azureedge.net/g85_fmDME2uOKEmFV0CfFmfcZQCmiDvIFknjOsWr8v8/rs:fit:350:0:0/aHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3RhaWthaS1zdG9yYWdlL2ltYWdlcy9iYTViMmVhMC04ZDUxLTExZWYtYTI3MS02NTA0MjI1OTI3NGJTcXVlcmUtMiAoMikucG5n",
      },
    });

    const delegationIdentity = await nfid.getDelegation({
      // Only for custom domain
      derivationOrigin: undefined,

      // 8 hours in nanoseconds
      maxTimeToLive: BigInt(8) * BigInt(3_600_000_000_000),
    });

    const agent = new HttpAgent({ identity: delegationIdentity });
    if (process.env.DFX_NETWORK === "local") {
      agent.fetchRootKey();
    }

    const backendActor = createActor(canisterId, { agent });
    props.setBackendActor(backendActor);

    // show the principal on the page
    setMyPrincipal(delegationIdentity.getPrincipal().toText());
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <section>
        <button
          id="loginBtn"
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          🚀 Login with Gmail (powered by NFID)
        </button>
      </section>
      <br />
      <br />
      <section id="loginStatus">
        <p style={{ fontSize: "18px", fontWeight: "bold" }}>{myPrincipal}</p>
        {myPrincipal !== "Not Logged In" && (
          <p style={{ color: "red" }}>
            <em>⚠️ Note: never use this principal for production usage!</em>
          </p>
        )}
      </section>
    </div>
  );
}

export default NfidLogin;
