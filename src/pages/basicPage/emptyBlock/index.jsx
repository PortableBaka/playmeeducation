import React from "react";

import emptyImage from "../../../assets/emptyImage.png";

import "./styles.sass";

const EmptyBlock = (props) => {
  return (
    <div className='contentEmpty'>
      <div className='emptyImage'>
        <img
          src={emptyImage}
          alt='emptyImage'
          className='img'
        />
      </div>
      <div className='emptyText'>
        <p className='text'>{props.text}</p>
      </div>
    </div>
  );
};

export default EmptyBlock;
