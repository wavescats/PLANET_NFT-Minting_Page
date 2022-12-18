import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { BN } from "bn.js";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { MenuView, Title } from "../../components";
import { PlanetList } from "../../components/Planet";
import { SpaceContext, Web3Context } from "../../contexts";
import { usePlanetContract } from "../../hooks";

export default function Mint() {
  const router = useRouter();
  const { showPlanet, clearPlanet } = useContext(SpaceContext);
  const [planetIndex, setPlanetIndex] = useState(-1);
  const { web3 } = useContext(Web3Context);
  const { mintPlanet } = usePlanetContract(web3);

  const showRandomPlanet = () => {
    setPlanetIndex(Math.floor(Math.random() * PlanetList.length));
    // 내림함수, 0 ~ 9 사이의 랜덤값
  };

  const onClickMint = async () => {
    if (!web3) {
      // 메타마스크 지갑이 설치 안되어있으면 그냥 리턴
      return;
    }

    const accounts = await web3.eth.requestAccounts(); // 잔고 조회
    const currentAccount = accounts[0]; // 현재 지갑 잔고
    console.log(currentAccount);

    mintPlanet({
      from: currentAccount,
      value: web3.utils.toWei(new BN(10), "milliether"),
      // milliether = 0.001 eth 👉 10 👉 0.01 eth
    }).on("transactionHash", (txHash: string) => {
      router.push(`/mint/${txHash}`);
    });
    // 트랜잭션을 보내면 바로 해쉬값을 얻을 수 있다
  };

  useEffect(() => {
    if (planetIndex >= 0) {
      showPlanet(PlanetList[planetIndex]);
    }

    return () => clearPlanet();
  }, [planetIndex, showPlanet, clearPlanet]);

  useEffect(() => {
    const interval = setInterval(() => showRandomPlanet(), 1000);
    // 1초마다 랜덤한 행성을 보여주기
    showRandomPlanet();

    return () => clearInterval(interval); // 1초마다 행성을 보여주는걸 초기화
  }, []);
  return (
    <MainView>
      <MenuView>
        <Title>Mint Your Own PLANET!</Title>

        <Description>
          You can mint a planet NFT by paying <b>0.01ETH</b>.<br />
          You will get a random planet.
          <br />
          Please press below button to mint!
        </Description>

        <ButtonView>
          <MainButton variant="contained" size="large" onClick={onClickMint}>
            Mint Planet
          </MainButton>
          <MainButton
            variant="outlined"
            size="large"
            onClick={() => router.back()} // 뒤로가기
          >
            Go Previous
          </MainButton>
        </ButtonView>
      </MenuView>
    </MainView>
  );
}

const MainView = styled.div`
  margin-top: 120px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Description = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 100;
  color: #fff;
  text-align: center;
`;

const ButtonView = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const MainButton = styled(Button)`
  margin: 4px 0;
  width: 100%;
`;
