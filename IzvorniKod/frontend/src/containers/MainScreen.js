import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, GlobalStyle } from '../elements/global';
import { connect } from 'react-redux'
import * as Element from '../elements/mainscreen';
import Banner from './Banner';
import AdminPage from './Admin'

const MainScreen = ({isAuthenticated, is_superuser}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === null)
      navigate('/');
  }, [isAuthenticated, navigate]);

  return (
    <React.Fragment>
    <GlobalStyle />
      <Container>
          <Banner origin="MainScreen"></Banner>
          <Element.TopDiv>
            {is_superuser ? <></> : <AdminPage></AdminPage>}
            <Element.SearchBar />
            <form>
              <Element.SearchBar
                type="text"
                placeholder="Search..."
              ></Element.SearchBar>
            </form>
          </Element.TopDiv>
          <hr />
      </Container>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  is_superuser: state.profile.is_admin
})

export default connect(mapStateToProps, { })(MainScreen);