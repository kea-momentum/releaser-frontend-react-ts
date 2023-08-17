import styled from "styled-components";
import Modal from "react-modal";

export const AlarmModal = styled(Modal)`
    width: 400px;
    height: 100px;

    position: absolute;
    top: 7%;
    right: 1%;

    border-radius: 15px;
    background: rgba(235, 235, 235, 0.50);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
    outline: none !important;
`;