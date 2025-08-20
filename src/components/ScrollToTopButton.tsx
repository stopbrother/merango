'use client';

import { useInView } from 'react-intersection-observer';
import { Button } from './ui/button';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const { ref: sentinalRef, inView } = useInView({
    rootMargin: '0px 0px -60% 0px',
    threshold: 0,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div ref={sentinalRef} aria-hidden className="absolute w-px h-px top-0" />

      {!inView && (
        <Button
          onClick={handleClick}
          type="button"
          variant="secondary"
          title="맨 위로"
          aria-label="페이지 맨 위로"
          className="fixed bottom-30 right-1.5 rounded-full shadow-lg"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </>
  );
};

export default ScrollToTopButton;
