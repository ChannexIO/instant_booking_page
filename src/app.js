import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routing from 'routing';

import { DataContextProvider } from 'containers/data_context';

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
