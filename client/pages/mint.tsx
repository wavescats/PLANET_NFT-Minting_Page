import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { MenuView, Title } from "../components";
import { PlanetList } from "../components/Planet";
import { SpaceContext } from "../contexts";

export default function Mint() {
  const router = useRouter();
  const { showPlanet, clearPlanet } = useContext(SpaceContext);
  const [planetIndex, setPlanetIndex] = useState(-1);

  const showRandomPlanet = () => {
    setPlanetIndex(Math.floor(Math.random() * PlanetList.length));
    // 내림함수, 0 ~ 9 사이의 랜덤값
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
          <MainButton variant="contained" size="large">
            Mint Planet
          </MainButton>
          <MainButton
            variant="outlined"
            size="large"
            onClick={() => router.back()}
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
