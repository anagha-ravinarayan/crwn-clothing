import React from "react";
import { connect } from "react-redux";

import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import MenuItem from "../menu-item/menu-item.component";
import { DirectoryMenu } from "./directory.styles";

const Directory = ({ sections }) => {
  return (
    <DirectoryMenu>
      {sections.map(({ id, ...otherSectionProps }) => {   // Destructuring
        return <MenuItem key={id} {...otherSectionProps} />
      })}
    </DirectoryMenu>
  );
}

const mapStateToProps = (state) => {
  return ({
    sections: selectDirectorySections(state)
  });
}

export default connect(mapStateToProps)(Directory);