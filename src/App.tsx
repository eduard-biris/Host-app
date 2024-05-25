import React, { lazy, Suspense, useEffect, useState } from 'react';
import useFetch from 'react-fetch-hook';

const MicroFrontendsAppSupportedTypes = lazy(() => import('MicroFrontendsApp/SupportedTypes'));
const WraperComponent = lazy(() => import('MicroFrontendsApp/Illustry/WraperComponent'));

function App() {
  const { isLoading: visLoading, data: storedVis } = useFetch('http://localhost:8000/visualisations');

  const [mfSupportedTypes, setMfSupportedTypes] = useState();
  const [supportedVisualisations, setSupportedVisualisations] = useState();

  useEffect(() => {
    if(storedVis?.visualisations?.length && mfSupportedTypes?.length) {
      console.log('In if: ', mfSupportedTypes, storedVis);
      const supportedVisualisationsArray = [];

      storedVis.visualisations.forEach((vis) => {
        if(mfSupportedTypes.includes(vis.visualization.type)) {
          supportedVisualisationsArray.push(vis);
        }
      })

      setSupportedVisualisations(supportedVisualisationsArray);
    }
  }, [mfSupportedTypes, storedVis]);

  return (
    <Suspense fallback={'Loading...'}>

      <MicroFrontendsAppSupportedTypes
        getAvailableComponents={true}
        onRetrieve={(types: any) => {
            console.log('Got supported types: ', types);
            setMfSupportedTypes(types);
        }}
      />

        { supportedVisualisations?.length && supportedVisualisations.map((vis) => {
            return (
              <div>
                {vis._id} - {vis.visualization.type}
                <WraperComponent type={vis.visualization.type} props={vis.visualization.data} />
              </div>
            );
          }) 
        }

    </Suspense>
  );
}

export default App;