import React, { FC } from "react";
import {
  EdgeProps,
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  StraightEdge,
  getStraightPath,
} from "reactflow";
import styled from "styled-components";

const CustomEdge: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <Label
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: "#f4f6e4",
            padding: 15,
            borderRadius: 10,
            fontSize: 23,
            fontWeight: 600,
          }}
          className="nodrag nopan"
        >
          {data.label}
        </Label>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;

const Label = styled.div`
  max-width: 300px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  border-radius: 40px;
  line-height: 25px;
  border: 6px solid #9c9c9c;
`;
