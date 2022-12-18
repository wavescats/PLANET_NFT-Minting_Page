import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React from "react";

const MintTx = () => {
  const router = useRouter();
  const { txHash } = router.query;

  return <TxView>{txHash}</TxView>;
};

const TxView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default MintTx;
