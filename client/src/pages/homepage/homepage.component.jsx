import React, { useEffect } from "react";
import { connect } from "react-redux";

import { default as Directory } from "../../components/directory/directory.container";

import { fetchDirectoriesStart } from "../../redux/directory/directory.actions";

import { HomePageContainer } from "./homepage.styles";

const HomePage = ({ fetchDirectories }) => {

  useEffect(() => {
    fetchDirectories();
  }, [fetchDirectories]);

  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  );
}

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchDirectories: () => {
      dispatch(fetchDirectoriesStart());
    }
  });
}

export default connect(null, mapDispatchToProps)(HomePage);