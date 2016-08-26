/*jshint esversion:6*/
import React from 'react';


export default class Search extends React.Component{
  constructor(props){
    super(props);
    this.click = this.click.bind(this);
  }
  click(e){
    e.preventDefault();
    const { search } = this.props;
    const keyword = this.refs.search.value;
    console.log('search: ' + keyword);
    search(keyword);
  }
  componentDidMount(){
    document.onkeydown = (e) => {
      if(!e){
        e = window.event;//火狐中是 window.event
      }
      if((e.keyCode || e.which) === 13){
          this.click(e);
      }
    };
  }
  render(){
    return (
      <div className='jumbotron'>
        <div className="form-group form-inline text-md-center text-sm-center text-xs-center">
          <input  ref='search' type="text" className="form-control" placeholder="search github users"/>
          <button onClick={this.click} className="btn btn-default">Search</button>
        </div>
      </div>
    );
  }
}
