import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  
  * {
  padding: 0;
  margin: 0;
  }




  @font-face {
  font-family: "Pretendard-Regular";
  font-size: 700;
  font-style: normal;
  src: url("../public/fonts/Pretendard-Regular.woff2") format("woff");
}

@font-face {
  font-family: "Pretendard-Black";
  font-size: 700;
  font-style: normal;
  src: url("../public/fonts/Pretendard-Black.otf") format("otf");
}

@font-face {
  font-family: "Pretendard-Blod";
  font-size: 500;
  font-style: normal;
  src: url("../public/fonts/Pretendard-Blod.otf") format("otf");
}

  html, body, #__next {
    font-family: 'Pretendard-Blod', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    height: 100%;

}

.react-flow .react-flow__edge path,
.react-flow__connectionline path {
  stroke: #868585;
  stroke-width: 4;
}

.swal2-title {
  font-family: 'Pretendard-Blod', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 25px;
}
`;
