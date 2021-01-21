import React from "react";
import { connect } from "react-redux";

import { selectDirectorySections } from "../../redux/directory/directory.selectors";
import MenuItem from "../menu-item/menu-item.component";
import "./directory.styles.scss";

const Directory = ({ sections }) => {
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherSectionProps }) => {   // Destructuring
        return <MenuItem key={id} {...otherSectionProps} />
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return ({
    sections: selectDirectorySections(state)
  });
}

export default connect(mapStateToProps)(Directory);