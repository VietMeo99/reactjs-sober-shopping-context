import React from 'react';
import { Redirect, Route, Switch } from "react-router";

import NotFound from '../modules/notFound/NotFound';
import Home from "../pages/Home";
import News from '../pages/News.js'
import Shop from '../pages/Shop.js'
import Contact from '../pages/Contact.js'
import ProductDetail from '../pages/ProductDetail.js'
import Collection from '../pages/Collection';
import NewsDetail from '../pages/NewsDetail';
import NewsCate from '../pages/NewsCate';
// import Checkout from '../pages/Checkout'; 

import Login from '../components/admin/Login/Login';

const Routers = () => {
  return (
    <Switch>  
      <Route exact path="/" component={Home} />
      <Route path="/news" exact component={News} />
      <Route path="/men" exact component={Shop} />
      <Route path="/shop/:search" exact component={Shop}/>
      <Route path="/men/:cate" exact component={Shop}/>
      <Route path="/women" exact component={Shop}/>
      <Route path="/women/:cate" exact component={Shop}/>
      <Route path="/contact" exact component={Contact}/>
      <Route path="/collection/:id" exact component={Collection}/>
      <Route path="/products/:id" exact component={ProductDetail}/>
      <Route path="/news/:id" exact component={NewsDetail}/>
      <Route path="/news/category/:cate" exact component={NewsCate}/>
      <Route path="/admin" exact component={Login}/>
      {/* <Route path="/checkout" exact component={Checkout}/>  */}
      <Route exact path="/404.html" component={NotFound} /> 
      <Redirect to="/404.html" /> 
    </Switch>
  );
};

export default Routers;