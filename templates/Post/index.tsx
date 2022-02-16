import React from 'react';
import PostLayoutDesktop from './PostLayoutDesktop';
import PostLayoutMobile from './PostLayoutMobile';

const Post = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    const isMobile = /iPhone|iPad|Android/i.test(globalThis?.navigator?.userAgent);

    return isMobile ? <PostLayoutMobile /> : <PostLayoutDesktop />;
  }

  return <div />;
};

export default Post;
