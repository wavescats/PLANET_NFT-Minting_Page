import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { MenuView, Title } from "../components";

export default function Mint() {
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
          <MainButton variant="outlined" size="large">
            Go Previous
          </MainButton>
        </ButtonView>
      </MenuView>
    </MainView>
  );
}

const MainView = styled.div`
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
