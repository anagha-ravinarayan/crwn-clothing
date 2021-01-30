import React from "react";

import CollectionItem from "../collection-item/collection-item.component";

import { CollectionPreviewContainer, Title, Preview } from "./collection-preview.styles";

const CollectionPreview = ({ title, items }) => {
    return (
        <CollectionPreviewContainer>
            <Title>{title.toUpperCase()}</Title>
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

export default CollectionPreview;