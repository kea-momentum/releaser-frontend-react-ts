import * as S from "./ToolTipNode.styled";
import { useState } from "react";
import { Handle, Position, NodeToolbar, NodeResizer } from "reactflow";

import Link from "next/link";
export default function ToolTipNode(props: any) {
  const [isVisible, setVisible] = useState(false);

  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {/* <NodeToolbar isVisible={isVisible} position={props.toolbarPosition}>
          <S.Tooltip>안녕</S.Tooltip>
        </NodeToolbar> */}
      <>
        <S.HandleStyledLR type="target" position={Position.Left} />
        <S.HandleStyledLR type="source" position={Position.Right} />
        <S.HandleStyledTB type="target" position={Position.Top} />
        <S.HandleStyledTB type="source" position={Position.Bottom} />
      </>

      <Link
        href={`${props.data.projectId}/?releaseId=${props.data.uid}`}
        as={`${props.data.projectId}/?releaseId=${props.data.uid}`}
      >
        <S.NodeStyled>
          {props.data.info.type === "major" && <S.MajorNode></S.MajorNode>}
          {props.data.info.type === "minor" && <S.MinorNode></S.MinorNode>}
          {props.data.info.type === "patch" && <S.PatchNode></S.PatchNode>}
          <S.ReleaseTitle>{`V ${props.data.label}`}</S.ReleaseTitle>
        </S.NodeStyled>
      </Link>
    </div>
  );
}
