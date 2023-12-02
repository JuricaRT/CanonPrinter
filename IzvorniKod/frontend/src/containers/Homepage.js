import React from 'react';
import { Link } from "react-router-dom";
import { Container, ButtonLayout, Button1, Button2, GlobalStyle } from '../elements/global';
import * as Element from '../elements/homepage';
import Banner from './Banner';

let loggedIn = false;
let children = null;

const Homepage = () => (
    <React.Fragment>
    <GlobalStyle />
      <Container>
        <Banner></Banner>
        <Message></Message>
        <Reviews></Reviews>
      </Container>
    </React.Fragment>
);

const Message = () => (
    <Element.OpeningMessage></Element.OpeningMessage>
);

const Reviews = () => (
    <Element.Reviews>
      <Review>One of the best apps for learning foreign languages</Review>
      <Review>
        After 6 months of study, I passed the exam and got a job in Germany
      </Review>
    </Element.Reviews>
);

const Review = ( {children} ) => (
    <Element.Review>
      <Element.ReviewChildren>{children}</Element.ReviewChildren>
      <Element.ReviewPerson>Anonymous ⭐⭐⭐⭐⭐</Element.ReviewPerson>
    </Element.Review>
);

export default Homepage;