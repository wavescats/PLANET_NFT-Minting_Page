import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Space } from "../components";
import styled from "@emotion/styled";
import { SpaceContextProvider, Web3ContextProvider } from "../contexts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ContextProvider>
      <SpaceContextProvider>
        <AppView>
          <SpaceWrapper>
            <Space />
          </SpaceWrapper>
          <ComponenetWrapper>
            <Component {...pageProps} />
          </ComponenetWrapper>
        </AppView>
      </SpaceContextProvider>
    </Web3ContextProvider>
  );
}

const AppView = styled.div`
  width: 100%;
  height: 100%;
`;

const SpaceWrapper = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
`;

const ComponenetWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
`;
