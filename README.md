# [SelfMade]

# Introduction

**SelfMade**는 **Indie Musician**을 위한 **MusicStreaming Platform**입니다.

![ScreenShot](/src/selfmadeImg/main.jpg)
![ScreenShot](/src/selfmadeImg/main_select.jpg)
![ScreenShot](/src/selfmadeImg/loginModal.jpg)
![ScreenShot](/src/selfmadeImg/signUpModal.jpg)
![ScreenShot](/src/selfmadeImg/categoryList.jpg)
![ScreenShot](/src/selfmadeImg/listeningHistory.jpg)
![ScreenShot](/src/selfmadeImg/uploadMusic.jpg)



## Requirements

- SelfMade는 Firebase auth (Google, Facebook)를 사용하였습니다.
- Login 없이도 음악 Streaming이 가능합니다.
- 업로드, 적립을 위해선 SignUp, Login이 필요합니다.
- Google, Facebook 가입이 선행되어야 합니다.

## Prerequisites

[MongoDB](https://docs.mongodb.com/manual/installation/), Node.js 설치

## Installation

### Client
```
git clone https://github.com/Dailyscat/SelfMade_Front
cd selfmade_front
npm install
npm start
```

### Server
```
git clone https://github.com/Dailyscat/SelfMade_server
cd selfmade_server
npm install
npm start
```

## Features

- Login없이도 Streaming 가능
- 카테고리 분류를 통한 음악 리스트 구현
- 각 카테고리의 리스트는 Random Sort
- Footer Audio를 통한 PlayList 조작 (Prev, Next, Play, Pause, Stop)
- Listening History 구현
- FormData를 활용한 Music, Thumbnail, Category, Title Upload 가능
- JSON Web Token Authentication

## Client-Side

- 모던 자바스크립트(ES2015+)
- React, Webpack, CSS Modules을 사용한 컴포넌트 베이스 UI 아키텍처 구현
- React Hot Loader 플러그인을 사용, 프런트 개발 환경 간편화
- HTTP Client 라이브러리는 Promise 베이스의 axios
- CSS는 별도의 프레임워크를 사용하지 않았습니다.
- Firebase를 사용한 Google, Facebook Login구현 

## Server-Side

- 자바스크립트 엔진(V8 engine)기반의 서버사이드 플랫폼 Node.js
- 서버사이드에서는 Node.js가 권장하는 ES5+
- Node.js 웹 어플리케이션 프레임워크 Express
- JSON Web Token Authentication
- 대표적인 NoSQL 데이터베이스, MongoDB
- MongoDB 기반의 Node.js 전용 ODM 라이브러리 Mongoose
- MongoDB 호스팅 플랫폼인 mlab


## Continuous Integration

- 소스관리/빌드/테스트/배포의 지속적인 통합을 위한 ebCI

## Deployment

### Client

- AWS S3 Bucket의 Static Website Hosting
- AWS S3 Storage 사용
- AWS CloudFront 서비스 대기시간과 성능을 개선(CDN서비스)

### Server

- AWS Elastic Beanstalk을 사용하여 배포
- ebCI 연동하여 배포 자동화 구축 

## Version Control

- Web, Server의 독립적인 관리를 위한 GIT Repo 구분
- Branch, Pull Request 기반 개발 진행


## DevOps

- SelfMade는 개발부터 배포까지 상당 부분 자동화되어 있습니다.
- SelfMade Application은 SelfMade-Front / SelfMade-Server 두개의 Repo로 관리합니다.
- AWS CodeDeploy로 자동 배포 됩니다.

## Things to do


- 적립, 환전을 위한 결제모듈 연동
- Custom Audio Player의 Remote 기능 향상
- Integration Test
- HTTPS 세팅
- 전반적인 UX 향상
- Cross Browser Compatibility
- Mobile 반응형
- Code Refactoring
- 버그 해결


Special thanks to [Ken Huh](https://github.com/Ken123777)
