import { Chip, Container, Avatar } from "@mui/material";
import React from "react";
// @ts-ignore
import Controls from ".";

interface ChipContainerProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onDelete?: () => void;
  chips?: any[];
}

const ChipContainer: React.FC<ChipContainerProps> = ({
  chips,
  onDelete,
  onClick,
}) => {
  return (
    <Container>
      {chips?.map((data) => (
        <Chip
          key={data?.id}
          avatar={<Avatar src={data?.file} />}
          label={data?.title}
          size="medium"
          onDelete={onDelete}
          deleteIcon={<Controls.MuiIcon name="Clear" />}
          onClick={onClick}
        />
      ))}
    </Container>
  );
};

export default ChipContainer;
