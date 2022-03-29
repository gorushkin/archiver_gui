import { useContext } from 'react';

import { StateContext } from './AppContext';
import { renderPage } from './pages';

const App = () => {
  const { state } = useContext(StateContext);

  const renderComponent = (type: string | undefined) => {
    if (!type) return null;

    const Component = renderPage(type);

    return <Component />;
  };

  return (
    <div className="main">
      <div className="wrapper">
        <div className="main__inner">
          <h1 className="main__title">Archiver</h1>
          {renderComponent(state?.page)}
        </div>
      </div>
    </div>
  );
};

export default App;
