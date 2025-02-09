import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from "./home";
import MyNotes from "./mynotes";
import Favorites from "./favorites";
import Layout from "../components/Layout";
import NotePage from "./note";
import SignUp from "./signup";

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path='/' component={ Home } />
        <Route exact path='/mynotes' component={ MyNotes } />
        <Route exact path='/favorites' component={ Favorites } />
        <Route exact path='/note/:id' component={ NotePage } />
        <Route exact path='/signup' component={ SignUp } />
      </Layout>
    </Router>
  )
}

export default Pages;