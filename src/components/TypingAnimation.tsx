'use client';

import { TypeAnimation } from 'react-type-animation';

const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={['Chat', 4000, 'Ask', 4000, 'Learn', 4000, 'Chat']}
      cursor={false}
      speed={4}
      className='text-pink-700'
    />
  );
};

export default TypingAnimation;
