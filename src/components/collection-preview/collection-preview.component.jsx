import React from "react";

import CollectionItem from "../collection-item/collection-item.component";

import "./collection-preview.styles.scss";

const CollectionPreview = ({ title, items }) => {
    return (
        <div className="collection-preview">
            <h1 className="title">{title.toUpperCase()}</h1>
            <div className="preview">
                {items
                    .filter((item, index) => index < 4)     // return only the first 4 items
                    .map(({ id, ...otherCollectionItemProps }) => {
                        return <CollectionItem key="id" {...otherCollectionItemProps} />
                    })}
            </div>
        </div>
    );
}

export default CollectionPreview;
