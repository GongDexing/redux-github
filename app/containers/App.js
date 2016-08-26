/*jshint esversion:6*/
import '../../node_modules/bootstrap/scss/bootstrap.scss';
import React , { Component } from 'react';
import { connect } from 'react-redux';
import Search from '../components/Search';
import Cards from '../components/Cards';
import Spinner from '../components/Spinner';
import Tip from '../components/Tip';
import { fetchStatus } from '../actions/fetch';
import { firstFetchUsers, loadMoreUser, clearCurrentUsers } from '../actions/users';
import { tipStatus } from '../actions/tip';
import { putLocal } from '../local/storage';

class App extends Component{
  constructor(){
    super();
  }
  componentDidMount(){
    this.onScroll = this.onScroll.bind(this);
    this.search = this.search.bind(this);
    window.addEventListener('scroll', this.onScroll, false);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }
  onScroll() {
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let s = (document.body.scrollTop || document.documentElement.scrollTop || 0);
    if(h + s >= document.body.offsetHeight * 0.9){
      const { dispatch, isComplete, fetch} = this.props;
      if(!fetch && isComplete === false){
        Promise.resolve()
          .then(() => dispatch(fetchStatus(true)))
          .then(() => dispatch(loadMoreUser()));
      }
    }
  }
  search(query){
    const { keyword, items, dispatch, total_count } = this.props;
    putLocal(keyword, {items, total_count});
    Promise.resolve()
      .then(() => dispatch(clearCurrentUsers()))
      .then(() => dispatch(tipStatus(false)))
      .then(() => dispatch(fetchStatus(true)))
      .then(() => dispatch(firstFetchUsers(query)));
  }
  render(){
    const { dispatch, isComplete, total_count, fetch, tip, keyword} = this.props;
    // console.log('fetch: ', fetch);
    // console.log('isComplete', isComplete);
    // console.log('total_count', total_count);
    return (
      <div className='container'>
        <Search dispatch={dispatch} search={(k) => this.search(k)}/>
        <Tip status={tip} keyword={keyword}/>
        <Cards {...this.props}/>
        <Spinner status={!isComplete && fetch}/>
      </div>
    );
  }
}

function mapStateToProps(state){
  const { users, fetch, tip} = state;
  const { total_count, keyword, nextPage, perPage, items} = users;
  return {
    isComplete: total_count === items.length && total_count > 0,
    total_count,
    keyword,
    nextPage,
    perPage,
    items,
    fetch,
    tip
  };
}

export default connect(mapStateToProps)(App);
