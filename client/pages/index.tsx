import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { MenuView, Title } from "../components";

export default function Home() {
  return (
    <MainView>
      <MenuView>
        <Title>CRYPTOSPACE</Title>
        <MainButton variant="outlined" size="large">
          Minting Your Own Planet
        </MainButton>
        <MainButton variant="outlined" size="large">
          View All Planet
        </MainButton>
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

const MainButton = styled(Button)`
  margin: 4px 0;
`;
