import {
  ConnectWallet,
  useAddress,
  useContract,
  Web3Button,
  useContractRead,
  useContractEvents,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { utils } from "ethers";
import { useState } from "react";
import {
  clientIdConst,
  contractConst,
} from "../consts/parameters";

import Modal from 'react-modal';
import { Link } from "react-router-dom";
import "../styles/globals.css?inline";
import { toast } from 'react-toastify';



Modal.setAppElement('#root');

const urlParams = new URL(window.location.toString()).searchParams;
const contractAddress = urlParams.get("contract") || contractConst || "";

export default function Mint() {
  const { contract } = useContract(contractAddress);
  const address = useAddress();
  const [quantity, setQuantity] = useState(1);
  const [buttonText, setButtonText] = useState('CLAIM');

  const {
    data: ownedNFTs,
    isLoading: isOwnedNFTsLoading,
  } = useOwnedNFTs(contract, address);

  const gasLimit = "300000";
  const maxPriority = "200000";
  const maxFeePer = "400000000";

  let cost = '';
  let DisplayPRICE = '';

  const { data: PRICE, isLoading: loadingPRICE } = useContractRead(
    contract,
    "PRICE",
  );

  if (!loadingPRICE && PRICE) {
    DisplayPRICE = utils.formatUnits(PRICE.toString());
    cost = PRICE.toString();
  }


  const clientId = urlParams.get("clientId") || clientIdConst || "";
  if (!clientId) {
    return (
      <div className="flex items-center justify-center h-full">
        Client ID is required.
      </div>
    );
  }

  if (!contractAddress) {
    return (
      <div className="flex items-center justify-center h-full">
        Contract address is required.
      </div>
    );
  }

  if (isOwnedNFTsLoading &&  address) {
    return (
      <div className="page-wrap">
      <div className="navbar border">
        <a
          href="/"
          className="logotype w-inline-block w--current"
        >
          <p className="logo">DECLEANUP NETWORK</p>
        </a>
        <div>
          {/* <a href="#" className="icon w-inline-block is-tw-hide">
            <img src="images/Group-118.svg" loading="lazy" alt="" />
          </a> */}
          <a href="https://t.me/DecentralizedCleanup" className="icon w-inline-block">
            <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/6691417859fc8bc2dd146976_Group%20117.svg" loading="lazy" alt="" />
          </a>
          <a href="https://x.com/decentracleanup" className="icon is-last w-inline-block">
            <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/6691417892f6d310297f569b_icon%20x.svg" loading="lazy" alt="" />
          </a>
        </div>
      </div>
      <div className="heading-wrap">
        <h1 className="text-h1 is-hide-mobile">DeCleanup&nbsp;Rewards</h1>
        <h1 className="is-mob is-hide-mob">De Cleanup Rewards</h1>
      </div>
      <div className="about-wrap">
        <p className="text-size-m">
          <span className="is-line-text">Clean Up, Snap, Earn </span>
          <br />
          <br />
          We recognize and reward your efforts to clean up nature around you. Simply
          snap a photo of&nbsp;result, upload the proof, and receive digital rewards
          as you level up. Each action you take provides permanent validation of
          your positive impact. Together, we can make the world a&nbsp;cleaner
          place, one action at a time.
        </p>
      </div>
      <div className="button-wrap border">
       {/* <ConnectWallet className="button" /> */}
       <a className="loadbutton">
       LOADING...
       </a>
      </div>
      <div className="footer">
        <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/66914178dbf243a16af65b8a_2024%C2%A9.svg" loading="lazy" alt="" />
        <p className="logo-a">ARBITRUM</p>
      </div>
    </div>

    );
}



  return (
    <>
      <div>

        {address == "" || address == null ? (
          <>

            <div className="page-wrap">
              <div className="navbar border">
                <a
                  href="/"
                  className="logotype w-inline-block w--current"
                >
                  <p className="logo">DECLEANUP NETWORK</p>
                </a>
                <div>
                  {/* <a href="#" className="icon w-inline-block is-tw-hide">
                    <img src="images/Group-118.svg" loading="lazy" alt="" />
                  </a> */}
                  <a href="https://t.me/DecentralizedCleanup" className="icon w-inline-block">
                    <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/6691417859fc8bc2dd146976_Group%20117.svg" loading="lazy" alt="" />
                  </a>
                  <a href="https://x.com/decentracleanup" className="icon is-last w-inline-block">
                    <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/6691417892f6d310297f569b_icon%20x.svg" loading="lazy" alt="" />
                  </a>
                </div>
              </div>
              <div className="heading-wrap">
                <h1 className="text-h1 is-hide-mobile">DeCleanup&nbsp;Rewards</h1>
                <h1 className="is-mob is-hide-mob">De Cleanup Rewards</h1>
              </div>
              <div className="about-wrap">
                <p className="text-size-m">
                  <span className="is-line-text">Clean Up, Snap, Earn </span>
                  <br />
                  <br />
                  We recognize and reward your efforts to clean up nature around you. Simply
                  snap a photo of&nbsp;result, upload the proof, and receive digital rewards
                  as you level up. Each action you take provides permanent validation of
                  your positive impact. Together, we can make the world a&nbsp;cleaner
                  place, one action at a time.
                </p>
              </div>
              <div className="button-wrap border">
              <ConnectWallet className="button" />
              </div>
              <div className="footer">
                <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/66914178dbf243a16af65b8a_2024%C2%A9.svg" loading="lazy" alt="" />
                <p className="logo-a">ARBITRUM</p>
              </div>
            </div>
          </>

        ) : (
          <>
            <div>
              {!isOwnedNFTsLoading && (
                ownedNFTs && ownedNFTs.length > 0 ? (
                  <div className="page-wrap">
                    <div className="navbar border">
                      <a href="/" className="logotype w-inline-block">
                        <p className="logo">DECLEANUP NETWORK</p>
                      </a>
                      <div>
                        {/* <a href="#" className="icon w-inline-block is-tw-hide">
                          <img src="images/Group-118.svg" loading="lazy" alt="" />
                        </a> */}
                        <a href="https://t.me/DecentralizedCleanup" className="icon w-inline-block">
                          <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/6691417859fc8bc2dd146976_Group%20117.svg" loading="lazy" alt="" />
                        </a>
                        <a href="https://x.com/decentracleanup" className="icon is-last w-inline-block">
                          <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/6691417892f6d310297f569b_icon%20x.svg" loading="lazy" alt="" />
                        </a>
                      </div>
                    </div>
                    <div className="heading-wrap">
                      <h1 className="text-h1 is-hide-mobile">DeCleanup&nbsp;Rewards</h1>
                      <h1 className="is-mob is-hide-mob">De Cleanupn Rewards</h1>
                    </div>

                    <>
  <div className="nft-wrap">

  <div className="text-wrap">
      <p className="paragraph-s">thanks for your support &lt;3</p>
    </div>

    <div className="nft-card">
      <img
        src={`${ownedNFTs[0].metadata.image}`}
        loading="lazy"
        alt=""
        className="nft-img"
      />
    </div>


    <div className="lvls-wrap is-hide-mob hide-mo">
                {ownedNFTs[0].metadata.attributes && (
                    // @ts-ignore
                    ownedNFTs[0].metadata.attributes.slice(3, 7).map((attribute, index) => (
                        <div key={index}
                            id="w-node-_3c7c7431-5b3f-3ca3-f859-7a5558a3da1b-51c2bcea"
                            className="lvl"
                        >

                            <p
                                id="w-node-_6e9087bb-ca87-3a26-c99f-2796d17c4d61-51c2bcea"
                                className="text-size-l"
                            >
                                {attribute.trait_type}
                            </p>
                            <p
                                id="w-node-_3be52719-ff4c-2d23-0f67-8d9151dac7ce-51c2bcea"
                                className="text-size-l"
                            >
                                {attribute.value}
                            </p>
                        </div>
                    ))
                )}
            </div>
  </div>

  <div className="button-wrap border">
                <Link className="button" to={`/proof/${ownedNFTs[0].metadata.id}`}>
                    Upgrade
                </Link>
            </div>
</>



                    <div className="footer">
                      <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/66914178dbf243a16af65b8a_2024%C2%A9.svg" loading="lazy" alt="" />
                      <p className="logo-a">ARBITRUM</p>
                    </div>
                  </div>


                ) : (
                  <div className="page-wrap">
                    <div className="navbar border">
                      <a
                        href="/"
                        className="logotype w-inline-block w--current"
                      >
                        <p className="logo">DECLEANUP NETWORK</p>
                      </a>
                      <div>
                        {/* <a href="#" className="icon w-inline-block is-tw-hide" >
                          <img src="images/Group-118.svg" loading="lazy" alt="" />
                        </a> */}
                        <a href="https://t.me/DecentralizedCleanup" className="icon w-inline-block">
                          <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/6691417859fc8bc2dd146976_Group%20117.svg" loading="lazy" alt="" />
                        </a>
                        <a href="https://x.com/decentracleanup" className="icon is-last w-inline-block">
                          <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/6691417892f6d310297f569b_icon%20x.svg" loading="lazy" alt="" />
                        </a>
                      </div>
                    </div>
                    <div className="heading-wrap">
                      <h1 className="text-h1 is-hide-mobile">DeCleanup&nbsp;Rewards</h1>
                      <h1 className="is-mob is-hide-mob">De Cleanup Rewards</h1>
                    </div>
                    <div className="about-wrap">
                      <p className="text-size-m">
                        <span className="is-line-text">Clean Up, Snap, Earn </span>
                        <br />
                        <br />
                        We recognize and reward your efforts to clean up nature around you. Simply
                        snap a photo of&nbsp;result, upload the proof, and receive digital rewards
                        as you level up. Each action you take provides permanent validation of
                        your positive impact. Together, we can make the world a&nbsp;cleaner
                        place, one action at a time.
                      </p>
                    </div>
                    <div className="button-wrap border">
                      <Web3Button className="button"
                        contractAddress={contractConst}
                        onSubmit={() => setButtonText('Minting...')}
                        action={(contract) => contract.call("mint", [quantity], { gasLimit: gasLimit, value: cost, maxPriorityFeePerGas: maxPriority, maxFeePerGas: maxFeePer })}
                        onError={(err) => {
                          console.error(err);
                          console.log({ err });
                          setButtonText('TRY AGAIN');
                          toast("Sorry, something went wrong please try again.", {type: 'error', position: toast.POSITION.TOP_CENTER});
                        }}
                        onSuccess={() => {
                          setButtonText('MINT DONE');
                          toast("Congrats! Your mint was successful!", {type: 'success', position: toast.POSITION.TOP_CENTER});
                        }}
                      >
                        {buttonText}
                      </Web3Button>
                    </div>
                    <div className="footer">
                      <img src="https://cdn.prod.website-files.com/669132d0a567fe2c543eb7cf/66914178dbf243a16af65b8a_2024%C2%A9.svg" loading="lazy" alt="" />
                      <p className="logo-a">ARBITRUM</p>
                    </div>
                  </div>
                )
              )}
            </div>

          </>
        )}
      </div>

    </>
  );
}
