import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { MenuView, Metadata, Title } from "../components";
import { SpaceContext, Web3Context } from "../contexts";
import { usePlanetContract } from "../hooks";

const List: NextPage = () => {
  const { web3 } = useContext(Web3Context);
  const { totalSupply, tokenURI, ownerOf } = usePlanetContract(web3);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [numOfTokens, setNumOfTokens] = useState(-1); // 발행량 👉 totalSupply 값을 못가져왔으면 아무것도 안보이게 -1
  const [owner, setOwner] = useState("");
  const [metadataURI, setMetadataURI] = useState("");
  const [metadataJson, setMetadataJson] = useState<any>();

  const { showPlanet, clearPlanet } = useContext(SpaceContext);

  const router = useRouter();

  useEffect(() => {
    if (web3) {
      (async () => {
        const total = await totalSupply();
        setNumOfTokens(+total);
        // total 값이 string 일 경우 앞에 + 붙혀주면 자동으로 number로 바꿔준다

        if (currentIndex < numOfTokens) {
          // index값이 발행량 보다 작을경우 실행
          const tokenId = web3.utils.numberToHex(currentIndex); // 숫자를 👉 0x0000 같은값으로 바꿔줌
          const uri = await tokenURI(tokenId);
          const owner = await ownerOf(tokenId);

          setOwner(owner);
          setMetadataURI(uri);
        }
      })();
    }
  }, [web3, currentIndex, numOfTokens, ownerOf, tokenURI, totalSupply]);

  useEffect(() => {
    if (metadataURI) {
      (async () => {
        const metadataQuery = await fetch(metadataURI);
        const metadata = await metadataQuery.json();

        setMetadataJson(metadata);
      })();
    }
  }, [metadataURI]);

  useEffect(() => {
    if (metadataJson && metadataJson.planetType) {
      showPlanet(metadataJson.planetType);
    }
    return () => clearPlanet();
  }, [metadataJson, showPlanet, clearPlanet]);

  const onClickPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const onClickNext = () => {
    if (currentIndex < numOfTokens - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <ListView>
      <DownMenuView>
        <Title>Planet #{currentIndex}</Title>
        {metadataJson && (
          <Metadata owner={owner} properties={metadataJson.attributes} />
        )}
        <SwitchView>
          <Button
            variant="contained"
            size="large"
            onClick={onClickPrev}
            disabled={currentIndex === 0}
          >
            Prev
          </Button>
          {numOfTokens > 0 && (
            <Counter>
              {currentIndex + 1} / {numOfTokens}
            </Counter>
          )}
          <Button
            variant="contained"
            size="large"
            onClick={onClickNext}
            disabled={currentIndex === numOfTokens - 1}
          >
            Next
          </Button>
        </SwitchView>
        <GoBackButton onClick={() => router.back()}>Go Previous</GoBackButton>
      </DownMenuView>
    </ListView>
  );
};

const ListView = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const DownMenuView = styled(MenuView)`
  margin-top: 320px;
`;

const SwitchView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
`;

const Counter = styled.div`
  flex: 1;
  text-align: center;
  color: #fff;
  font-size: 20px;
`;

const GoBackButton = styled(Button)`
  margin-top: 8px;
`;

export default List;
