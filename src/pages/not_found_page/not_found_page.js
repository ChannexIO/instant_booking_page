import React from 'react';

import Footer from 'components/footer';
import Header from 'components/header';

import NotFoundMessage from './not_found_message';

export default function NotFoundPage() {
  return (
    <div>
      <Header />
      <NotFoundMessage />
      <Footer />
    </div>
  );
}
