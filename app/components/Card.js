/*jshint esversion:6*/
import React, { Component } from 'react';
import '../scss/card.scss';

export default class Card extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const { item } = this.props;
    return (
      <div className="col-xs-12 col-sm-6 col-md-3">
        <div className="card">
          <img className="card-img-top img-full" src={item.avatar_url} alt="Card image cap"/>
          <div className="card-block no-horizontal-padding">
            <h4 className="text-md-center text-sm-center">
              <a href={item.html_url}>{item.login}</a>
            </h4>
            <div className="card-text userDetail">
              <ul>
                <li><span className="label label-pill label-default">{item.score}</span></li>
                <li>
                  <a href={item.followers_url}>
                    <span className="label label-success">Follower</span>
                  </a>
                </li>
                <li>
                  <a href={item.repos_url}>
                    <span className="label label-danger">Repos</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
