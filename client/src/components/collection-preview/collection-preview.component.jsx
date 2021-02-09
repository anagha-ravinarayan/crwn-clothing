import React from "react";
import { withRouter } from 'react-router-dom';

import CollectionItem from "../collection-item/collection-item.component";

import { CollectionPreviewContainer, Title, Preview } from "./collection-preview.styles";

const CollectionPreview = ({ title, items, history, match, routeName }) => {
    return (
        <CollectionPreviewContainer>
            <Title onClick={() => history.push(`${match.path}/${routeName}`)}>
                {title.toUpperCase()}
            </Title>
            <Preview>
                {items
                    .filter((item, index) => index < 4)     // return only the first 4 items
                    .map((item) => {
                        return <CollectionItem key={item.id} item={item} />
                    })}
            </Preview>
        </CollectionPreviewContainer>
    );
}

export default withRouter(CollectionPreview);