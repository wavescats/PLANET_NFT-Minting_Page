// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Planet is ERC721, Ownable {
  using Strings for uint256; // uint 정수형을 string으로 바꿔주는 라이브러리(Strings)

  uint256 numOfMetadata;
  uint256 public totalSupply; // 현재까지 발행된 량
  mapping(uint256 => uint256) tokenMetadataId; // 각 tokenId 마다 어떤 메타데이터를 가지고 있는지 저장

  constructor(uint256 _numOfMetadata) ERC721("CryptoSpace", "PLANET") {
    numOfMetadata = _numOfMetadata; // 메타데이터의 갯수
  }

  function mintPlanet() external payable {
    require(msg.value >= 0.01 ether);
    uint256 tokenId = totalSupply++; // 함수가 실행될때마다 발행량 증가

    uint256 metadataId = uint256(blockhash(block.number - 1)) % numOfMetadata; // 랜덤값 생성 (난수)
    // 트랜잭션이 실행될때는 블록이 생성단계라서 아직 생성이 안되었으므로 블록해쉬값을 받아올수 없다
    // 그래서 이전블록(- 1)의 해쉬값을 받아온다
    // 0 ~ 9999 사이의 메타데이터 값

    tokenMetadataId[tokenId] = metadataId; // tokenid 와 메타데이터를 짝 지어주기
    _safeMint(_msgSender(), tokenId);
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenMetadataId[tokenId].toString())) : "";
        // baseURI 뒤에 랜덤하게 생성된 메타데이터 id를 붙혀주는데 uint형을 string 으로 바꿔줘야한다
    }

  function _baseURI() internal view virtual override returns (string memory) {
        return "https://space.coinyou.io/metadata/";
    }

  function withdraw() external onlyOwner {
    payable(msg.sender).transfer(address(this).balance);
  }
}