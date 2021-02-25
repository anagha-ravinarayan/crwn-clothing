import React from "react";
import { withRouter } from "react-router-dom"; // Needed if navigation is required from this component to another

import { MenuItemContainer, BackgroundImage, Content, Title, Subtitle } from "./menu-item.styles";

const MenuItem = ({ title, imageUrl, size, history, location, match }) => (
  <MenuItemContainer size={size} onClick={() => { history.push(`${match.url}shop/${title.toLowerCase()}`) }}>
    <BackgroundImage imageUrl={imageUrl} />
    <Content>
      <Title>{title.toUpperCase()}</Title>
      <Subtitle>SHOP NOW</Subtitle>
    </Content>
  </MenuItemContainer>
);

export default withRouter(MenuItem);