import styled from "styled-components";
import Image from "next/image";
import { ProfileSetting } from "@/types/Profile";

export const ProfileContainer = styled.div`
  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: column;

  position: relative;
  z-index: 1;
`;

export const ImgWrapper = styled.div<ProfileSetting>`
  width: ${props => props.width};
  height: ${props => props.height};

  border-radius: 50%;
  border: ${props => props.border};

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &:hover + .description {
    display: block;
  }
  position: relative;
  z-index: -4;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(${props => props.brightness});
  }
`;

// export const CircleProfile = styled.div<ProfileSetting>`
//   width: ${props => props.width};
//   height: ${props => props.height};
//   border-radius: 45px;
//   filter: brightness(${props => props.brightness});

//   margin-right: 5px;
//   border: ${props => props.border};

//   &:hover + .description {
//     display: block;
//   }
//   position: relative;
//   z-index: -4;
// `;

export const Description = styled.div`
  font-size: 12px;
  font-weight: 400;

  width: 50px;
  padding: 1px;
  display: none;

  top: 105%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 3px;
  background: #e9e9e9;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: -6;
  position: absolute;
  text-align: center;
`;
