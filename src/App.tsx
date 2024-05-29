import React, { lazy, Suspense, useEffect, useState } from 'react';
import useFetch from 'react-fetch-hook';

const MicroFrontendsAppSupportedTypes = lazy(() => import('MicroFrontendsApp/SupportedTypes'));
const WraperComponent = lazy(() => import('MicroFrontendsApp/Illustry/WraperComponent'));

import './App.css';

function App() {
  const { data: storedVis } = useFetch('http://localhost:8000/visualisations');

  const [mfSupportedTypes, setMfSupportedTypes] = useState();
  const [supportedVisualisations, setSupportedVisualisations] = useState();

  const [currentVisualization, setCurrentVisualization] = useState();

  useEffect(() => {
    if((storedVis as any)?.visualisations?.length && (mfSupportedTypes as any)?.length) {
      console.log('In if: ', mfSupportedTypes, storedVis);
      const supportedVisualisationsArray = [];

      (storedVis as any).visualisations.forEach((vis) => {
        if((mfSupportedTypes as any).includes(vis.visualization.type)) {
          supportedVisualisationsArray.push(vis);
        }
      })

      setSupportedVisualisations((supportedVisualisationsArray as any));
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

      <div style={{width: '90vw', marginLeft: 'auto', marginRight: 'auto'}}>
        <h1 className='app-header'>
          {currentVisualization ? (currentVisualization as any).visualization.name : 'Available Visualizations' }
        </h1>

        {
          currentVisualization && <button 
            className='button'
            onClick={() => {
              setCurrentVisualization(null);
            }}
          >
            Back
          </button>
        }

        {!currentVisualization && <ul>
          { (supportedVisualisations as any)?.length && (supportedVisualisations as any).map((vis) => {
              return (
                <li className='list-row'>
                  <h3 className='vis-header'>{vis.visualization.type}</h3>
                  <h3 className='vis-header vis-name'>{vis.visualization.name}</h3>
                  <button className='button'
                    onClick={() => {setCurrentVisualization(vis)}}
                  >
                    View Visualization
                  </button>
                </li>
              );
            }) 
          }
        </ul>}
      </div>

      { currentVisualization &&
        <WraperComponent type={(currentVisualization as any).visualization.type} props={(currentVisualization as any).visualization.data} />
      } 

    </Suspense>
  );
}

export default App;