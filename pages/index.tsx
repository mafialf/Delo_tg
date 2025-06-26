// pages/index.tsx

import React from 'react';
import { useRouter } from 'next/router';

const IndexPage: React.FC = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.push('/page2');
  }, []);

  return null;
};

export default IndexPage;
