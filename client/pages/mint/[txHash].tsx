import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { MenuView } from "../../components";
import { PlanetName } from "../../components/Planet";
import { SpaceContext, Web3Context } from "../../contexts";
import { usePlanetContract } from "../../hooks";

type TxStatus = "PENDING" | "MINING" | "MINED" | "WRONG_TX";

const MintTx = () => {
  const router = useRouter();
  const { txHash } = router.query;

  const [status, setStatus] = useState<TxStatus>("PENDING");
  const { web3 } = useContext(Web3Context);
  const { contractAddress, tokenURI } = usePlanetContract(web3);
  const { showPlanet } = useContext(SpaceContext);
  const [planetMetadata, setPlanetMetadata] = useState();
  const [planetOwner, setPlanetOwner] = useState("");
  const [planetTokenId, setPlanetTokenId] = useState<number | null>(null);

  const checkTx = useCallback(async () => {
    if (web3 && txHash) {
      const receipt = await web3.eth.getTransactionReceipt(txHash as string);

      if (receipt) {
        const mintingEvent = receipt.logs.filter(
          // logs 의 0번째 배열에는 Transfer 인자가 해쉬화되어있음
          log =>
            log.topics[0] ===
            web3.utils.sha3("Transfer(address,address,uint256)")
        )[0];
        // logs.topics 의 0번째 값은 === 721 Transfer 함수의 인자가 들어간 값을 해쉬값이랑 같음

        const isMintingTx =
          receipt.to.toLowerCase() === contractAddress.toLowerCase() &&
          mintingEvent;
        // 해쉬된 값끼리 소문자로 변환하여 비교
        if (isMintingTx) {
          // logs.topics 의 배열은 4개가 나오는데
          // 0번째는 721 Transfer 함수의 인자가 들어간 값
          // 1번째는 address(from) 보내는사람
          // 2번째는 address(to) 받는사람
          // 3번째는 tokenId
          const tokenId = mintingEvent.topics[3];
          const uri = await tokenURI(tokenId); // web3로 연결된 tokenURI 함수에 tokenId 대입
          const metadataQuery = await fetch(uri);
          const metadata = await metadataQuery.json();

          setPlanetMetadata(metadata);

          const owner = mintingEvent.topics[2]; // 2번째 address(to) 받는사람
          setPlanetOwner(owner.slice(-40)); // 끝에서 40글자만 가져오기(지갑주소)
          setPlanetTokenId(web3.utils.hexToNumber(tokenId)); // 0x0000 같은 string을 hexNumber로 바꿔줌

          const planetTypes = metadata.planetType as PlanetName;
          showPlanet(planetTypes);

          setStatus("MINED");
        }
      } else {
        setStatus("MINING");
      }
    }
  }, [web3, txHash]);

  useEffect(() => {
    if (status === "PENDING") {
      // PENDING 중이면 체크
      checkTx();
      return;
    }

    if (status === "MINING") {
      // MINING 중이면 (블록체인에 아직 기록되지않은 상태) 5초마다 한번씩 체크
      const interval = setInterval(() => checkTx(), 5000);
      return () => clearInterval(interval);
    }
  }, [status, checkTx]);

  return (
    <TxView>
      <DownMenuView>{txHash}</DownMenuView>
    </TxView>
  );
};

const TxView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DownMenuView = styled(MenuView)`
  margin-top: 320px;
  align-items: center;
`;

export default MintTx;
