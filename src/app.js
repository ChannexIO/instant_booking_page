import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { DataContextProvider } from 'containers/data_context';

import Routing from 'routing';

function App() {
  return (
    <BrowserRouter>
      <DataContextProvider>
        <Routing/>
      </DataContextProvider>
    </BrowserRouter>
  );
}

export default App;
