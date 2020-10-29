import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import HeadManager from 'components/head_manager';

import { DataContextProvider } from 'containers/data_context';

import Routing from 'routing';

function App() {
  return (
    <BrowserRouter>
      <DataContextProvider>
        <HeadManager/>
        <Routing/>
      </DataContextProvider>
    </BrowserRouter>
  );
}

export default App;
