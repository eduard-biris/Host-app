import React, { lazy, Suspense, useEffect, useState } from 'react';
import useFetch from 'react-fetch-hook';

const MicroFrontendsAppSupportedTypes = lazy(() => import('MicroFrontendsApp/SupportedTypes'));
const Component = lazy(() => import('MicroFrontendsApp/Illustry/WraperComponent'));

const SecondLibSupportedTypes = lazy(() => import('SecondMfApp/SupportedTypes'));
const SecondLibComponent = lazy(() => import('SecondMfApp/Component')); 

const { testData } = require('./test_data');

function App() {
  const { isLoading: visLoading, data: storedVis } = useFetch('http://localhost:8000/visualisations');

  const [componentStores, setComponentStores] = useState([]);
  const [componentToRender, setComponentToRender] = useState();

  useEffect(() => {
    if(componentStores && storedVis) {
      console.log('Both here: ');

      console.log('mfAvComponents: ', componentStores);
      console.log('storedVis: ', storedVis);

      storedVis.visualisations.forEach(vis => {
        console.log('vis: ', vis);

        // const type = vis.type;

        const type = 'PiechartView';
        const testProps = testData[type];

        const findComponentToRender = (type: string) => {
          for (const store of componentStores) {
            if(store.types.find(t => t === type)) {
              return store.component;
            }
          }

          return () => (<>Component not supported!</>);
        };

        const Component = findComponentToRender(type);

        console.log('Type: ', type);

        setComponentToRender(<Component type={type} props={testProps}/>)
      });
    }
  }, [componentStores, storedVis]);

  const pushIntoStores = (newStore) => {
    console.log('Updating store with: ', newStore);
    const currentStores = componentStores;
    currentStores.push(newStore);
    setComponentStores(currentStores);
  };

  return (
    <Suspense fallback={'Loading...'}>
      <MicroFrontendsAppSupportedTypes
        getAvailableComponents={true}
        onRetrieve={(types: any) => {
          pushIntoStores({
            name: 'MicroFrontendsApp',
            component: Component,
            types,
          })
        }}
      />

      <SecondLibSupportedTypes
        getAvailableComponents={true}
        onRetrieve={(types: any) => {
          pushIntoStores({
            name: 'SecondLibApp',
            component: SecondLibComponent,
            types,
          });
        }}
      />

      { componentToRender }
    </Suspense>
  );
}

export default App;