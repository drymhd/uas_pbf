import React from "react";
import { Card } from "react-daisyui";

const MyCard = ({
  children,
  title,
  actionButtonLabel,
  secondaryButtonLabel,
}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {children}
      </Card.Body>
    </Card>
  );
};

export default MyCard;
