/*jshint esversion:6*/
import React from 'react';
import Card from './Card';

export default class Cards extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const { items } = this.props;
    return (
      <div>
        {
          items.map((item, index) =>
            <Card key={index} item={item} />)
        }
      </div>
    );
  }
}
