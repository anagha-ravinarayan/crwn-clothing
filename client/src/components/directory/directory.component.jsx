import React from "react";
import { connect } from "react-redux";

import MenuItem from "../menu-item/menu-item.component";

import { selectDirectories } from "../../redux/directory/directory.selectors";

import { DirectoryMenu } from "./directory.styles";

const Directory = ({ directories }) => {
  return (
    <DirectoryMenu>
      {directories.map(({ id, ...otherDirectoryProps }) => {   // Destructuring
        return <MenuItem key={id} {...otherDirectoryProps} />
      })}
    </DirectoryMenu>
  );
}

const mapStateToProps = (state) => {
  return ({
    directories: selectDirectories(state)
  });
}

export default connect(mapStateToProps)(Directory);