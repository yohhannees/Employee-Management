import React from 'react';
import { Image } from '@mantine/core';
import imgg from '../assets/react.svg';

const NotFound: React.FC = () => {
  return (
    <div className="text-center mt-20 mb-20">
      <Image src={imgg} width={800} height={550} alt="not found" />
    </div>
  );
};

export default NotFound;