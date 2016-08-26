/*jshint esversion:6*/
import React, { Component } from 'react';
import '../scss/tip.scss';

export default class Tip extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const { status, keyword } = this.props;
    return (
      <div className={status ? 'tip-text' : 'hidden'}>
        <p>亲，没有搜索匹配<strong>{keyword}</strong>到用户，换个关键字搜索试试！！！</p>
        <p>We couldn’t find any github user matching <strong>{keyword}</strong></p>
      </div>
    );
  }
}
