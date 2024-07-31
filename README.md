# PIXELLER

## 프로젝트 개요
메타버스에서 실시간으로 중고 물품의 상태를 확인하고 중고 거래 및 실시간 경매를 진행해보세요!

https://pixeller.net/

## 개발 기간
2024년 6월 24일 ~ 7월 27일 (약 5주)

## 기능 소개

- 2D 메타버스
- 화상 연결
- DM
- 경매

## 포스터

<img src="./img/POSTER.png" alt="POSTER">

## PIXELLER 메인 화면

<img src="./img/픽셀러 UI.png">

## 경매장

<img src="./img/경매장 사진.png">

## 시스템 아키텍쳐

<img src="./img/Mixed Architecture.png">

## 참여 역할
> 저희 프론트 팀은 일 별로 구현할 메인 기능을 가져가고, 1주일 단위로 각종 버그, 마이너 이슈들과 기능들을 가져가며 개발에 임했습니다. 

### Fact that I did
- Phaser 엔진: 자신 및 다른 유저의 플레이어 렌더링
- 화상 채팅
- 경매 페이지, 로직 및 소켓 통신 (socket.io)
- 백엔드 서버와 통신을 위한 API axios 코드 작성 및 모듈화
- 로그인 페이지 및 메인 페이지 작성 (UI의 세부 CSS는 다른 팀원)
- 유저간 위치 동기화 (세부 내용은 이슈탭에서 확인가능합니다.)
- Phaser 렌더링 최적화 (세부 내용은 이슈탭에서 확인가능합니다.)

### Lesson that I learn
- 무한 props 전달과 callback hell을 경험, React 상태 관리의 필요성
- OpenVidu 라이브러리 사용 경험을 통한 엔지니어링

    > 판매자와 구매자의 화상 화면을 따로 분리하여 띄워야하여서, trackPublication에 meta 데이터를 집어넣어 판매자와 구매자를 구분하고 싶었으나, 관련된 코드를 찾을 수 없었고 시간이 부족한 관계로 OpenVidu 서버 접속을 위한 토큰을 발급할 때에 입력하는 Identification Name을 string으로 판매자와 구매자로 구분하기로 했습니다.
- 다른 경력자들에게 DOM구조, CSS 수정 방안, CORS 해결 대책 등에 대해서 들을 수 있었습니다.
- 자바스크립트와 타입스크립트를 병행하여 사용하며, 각각의 장단점을 느낄 수 있었습니다.
- 구조화된 컴포넌트 사용으로 대규모 프로젝트가 된다면 어떤 식으로 구조가 잡힐 지에 대한 예상
- 최적화의 필요성

### 소스 트리 구조

```
src
│  App.js
│  index.js
│  reportWebVitals.js
│  setupTests.js
│
├─api
│  │  axios.jsx
│  │  login.jsx
│  │  products.jsx
│  │
│  └─dto
│          productDTO.js
│          user.js
│
├─components
│  │  Cookies.ts
│  │  GLogin.jsx
│  │  Header.jsx
│  │  List.js
│  │  ModalLogin.jsx
│  │  ModalRegist.jsx
│  │  side-menu.jsx
│  │  TextAnimation.jsx
│  │  Tooltip.jsx
│  │
│  ├─alert
│  │      AlertAuction.jsx
│  │      auctionAlert.jsx
│  │      CustomButton.jsx
│  │      sweetAlert2.jsx
│  │
│  ├─Auction
│  │      Auction.css
│  │      Auction.jsx
│  │      Auction_max_bid.jsx
│  │      Auction_new.tsx
│  │      Auction_optimized.tsx
│  │      Auction_seller.tsx
│  │      bidAnalyzer.js
│  │      useSpeechRecognition.js
│  │
│  ├─Boards
│  │      PC.css
│  │      PD.css
│  │      PL.css
│  │      ProductCreate.jsx
│  │      ProductDetail.jsx
│  │      ProductDetailNew.jsx
│  │      ProductList.jsx
│  │
│  ├─Effects
│  │      CountDownEffect.jsx
│  │      FadeAwayBid.css
│  │      FadeAwayBid.jsx
│  │
│  ├─OpenVidu
│  │      AudioComponent.tsx
│  │      VideoAuction.tsx
│  │      VideoCanvas.tsx
│  │      VideoComponent.tsx
│  │
│  └─UI
│      │  Bottom.jsx
│      │  BottomMenu.jsx
│      │  ChatBox.jsx
│      │  CircularProgressBar.css
│      │  CircularProgressBar.jsx
│      │  Logout.jsx
│      │  ProductBox.jsx
│      │  SellerProducts.jsx
│      │  UserInfo.jsx
│      │
│      ├─bottommenu
│      │      bgm.jsx
│      │
│      ├─chatalert
│      │      Alert.css
│      │      Alert.jsx
│      │
│      └─productlist
│              ProductCreate.jsx
│              ProductList.jsx
│              ProductSearchList.jsx
│
├─games
│  │  gameApp.css
│  │  GameApp.js
│  │  GameScene.js
│  │
│  ├─character
│  │      OPlayer.ts
│  │      Player.ts
│  │
│  ├─Interface
│  │  ├─Chara
│  │  │      iCharacter.ts
│  │  │
│  │  └─Objects
│  │          iObject.ts
│  │
│  ├─object
│  │      object.ts
│  │
│  └─scroll
│          scrollEventHandler.ts
│
├─pages
│      Login.jsx
│      LoginNew.jsx
│      Main.css
│      Main.jsx
│      Main_optimized.jsx
│      NotFound.jsx
│
├─socket
│      auctions.jsx
│      chat.jsx
│      chat_direct.jsx
│      chat_div_component.jsx
│      chat_div_component_direct.jsx
│      chat_public.jsx
│      chat_user_list.jsx
│
└─static
    ├─css
    │      AlertAuction.css
    │      App.css
    │      bottom.css
    │      index.css
    │      List.css
    │      Login.css
    │      LoginNew.css
    │      ModalLogin.css
    │      SellerProduct.css
    │      swiper-bundle.min.css
    │      Tooltip.css
    │      TypingAnimation.css
    │      VideoCanvas.css
    │      VideoComponent.css
    │
    └─svg
            logo.svg
```

## 기술 스택
## Front End

[![Phaser](https://img.shields.io/badge/Phaser-3.55.2-FAA61A?style=flat&logo=phaser)](https://phaser.io/)
[![React](https://img.shields.io/badge/React-17.0.2-61DAFB?style=flat&logo=react)](https://reactjs.org/)

## Back End

[![Nest.js](https://img.shields.io/badge/Nest.js-7.6.15-E0234E?style=flat&logo=nestjs)](https://nestjs.com/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.5.4-6DB33F?style=flat&logo=springboot)](https://spring.io/projects/spring-boot)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-3.8.16-FF6600?style=flat&logo=rabbitmq)](https://www.rabbitmq.com/)

## Database

[![AWS RDS: MySQL](https://img.shields.io/badge/AWS%20RDS-MySQL-527FFF?style=flat&logo=amazonaws)](https://aws.amazon.com/rds/)

## Object Storage

[![AWS S3](https://img.shields.io/badge/AWS%20S3-569A31?style=flat&logo=amazonaws)](https://aws.amazon.com/s3/)

## 통신

[![Socket.io](https://img.shields.io/badge/Socket.io-4.1.2-010101?style=flat&logo=socket.io)](https://socket.io/)
[![STOMP](https://img.shields.io/badge/STOMP-1.2-010101?style=flat&logo=stomp)](https://stomp.github.io/stomp-specification-1.2.html)
[![HTTPS](https://img.shields.io/badge/HTTPS-2.0-0058B0?style=flat&logo=https)](https://developer.mozilla.org/ko/docs/Web/HTTP/HTTPS)
[![OpenVidu](https://img.shields.io/badge/OpenVidu-2.17.0-3A3A3A?style=flat&logo=openvidu)](https://openvidu.io/)
[![Livekit](https://img.shields.io/badge/Livekit-1.2-8D8D8D?style=flat&logo=livekit)](https://docs.livekit.io/)

## CI/CD

[![Github](https://img.shields.io/badge/Github-Actions-181717?style=flat&logo=github)](https://github.com/features/actions)
[![AWS CodeDeploy](https://img.shields.io/badge/AWS%20CodeDeploy-527FFF?style=flat&logo=amazonaws)](https://aws.amazon.com/codedeploy/)

## Secure

[![AWS WAF](https://img.shields.io/badge/AWS%20WAF-527FFF?style=flat&logo=amazonaws)](https://aws.amazon.com/waf/)
[![AWS Shield](https://img.shields.io/badge/AWS%20Shield-527FFF?style=flat&logo=amazonaws)](https://aws.amazon.com/shield/)


## 팀원 소개

|이름   |역할               |Github                             |
|-------|------------------|-----------------------------------|
|류강현 |Leader,Frontend    |https://github.com/ryyugang        |
|김수민 |Backend            |https://github.com/kssumin         |
|민사빈 |Backend            |https://github.com/sabinKrafton    |
|최우성 |Frontend           |https://github.com/wooseong-choi   |
|최재혁 |Frontend           |https://github.com/Digit24-dev     |

## 프로젝트 산출물

- Trello
    - https://trello.com/b/VUpxKJBd/namanmu

## 시연 영상
[![Video Label](http://img.youtube.com/vi/awCNAZ6LixU/0.jpg)](https://youtu.be/awCNAZ6LixU)

## 실행 방법

React: `npm start`
NestJS: `nest start`
Spring:
(DB 별도 구축 필요)