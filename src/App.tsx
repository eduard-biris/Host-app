import React, { lazy, Suspense, useEffect, useState } from 'react';
import useFetch from 'react-fetch-hook';

const MicroFrontendsAppSupportedTypes = lazy(() => import('MicroFrontendsApp/SupportedTypes'));
const Component = lazy(() => import('MicroFrontendsApp/Timelines/TimelineView'));

function App() {

  const data = {
    "2023-10-07": {
      "summary": {
        "title": "Sample Timeline"
      },
      "events": [
        {
          "summary": "Event 1",
          "date": "08:00:00",
          "type": "Type A",
          "author": "Author 1",
          "tags": [
            {
              "name": "Tag A"
            }
          ],
          "description": "Description of Event 1"
        },
        {
          "summary": "Event 2",
          "date": "09:00:00",
          "type": "Type B",
          "author": "Author 2"
        }
      ]
    },
    "2023-10-10": {
      "summary": {
        "title": "Sample Timeline"
      },
      "events": [
        {
          "summary": "Event 3",
          "date": "09:00:00",
          "type": "Type C",
          "author": "Author 3"
        },
        {
          "summary": "Event 4",
          "date": "10:00:00",
          "type": "Type D",
          "author": "Author 4"
        },
        {
          "summary": "Event 5",
          "date": "10:00:00",
          "type": "Type E",
          "author": "Author 5"
        }
      ]
    },
    "2023-10-08": {
      "summary": {
        "title": "Sample Timeline"
      },
      "events": [
        {
          "summary": "Event 6",
          "date": "11:00:00",
          "type": "Type F",
          "author": "Author 6"
        },
        {
          "summary": "Event 7",
          "date": "11:00:00",
          "type": "Type G",
          "author": "Author 7"
        },
        {
          "summary": "Event 8",
          "date": "12:00:00",
          "type": "Type H",
          "author": "Author 8"
        }
      ]
    },
    "2023-10-06 ": {
      "summary": {
        "title": "Sample Timeline"
      },
      "events": [
        {
          "summary": "Event 9",
          "date": "12:00:00",
          "type": "Type I",
          "author": "Author 9"
        },
        {
          "summary": "Event 10",
          "date": "13:00:00",
          "type": "Type J",
          "author": "Author 10"
        }
      ]
    }
  };

  const { isLoading: visLoading, data: storedVis } = useFetch('http://localhost:8000/visualisations');

  const [
    microFrontendsAppComponentStore,
    setMicroFrontendsAppComponentStore
  ] = useState({
    name: 'MicroFrontendsApp',
    component: Component,
    types: [],
  });


  const [componentToRender, setComponentToRender] = useState();

  useEffect(() => {
    if(microFrontendsAppComponentStore && storedVis) {
      console.log('Both here: ');

      console.log('mfAvComponents: ', microFrontendsAppComponentStore);
      console.log('storedVis: ', storedVis);

      storedVis.visualisations.forEach(vis => {
        console.log('vis: ', vis);

        const type = vis.type;
        // const type = 'TestComponentOne';

        const findComponentToRender = (type: string) => {
          if(microFrontendsAppComponentStore.types.find(t => t === type)) {
            return microFrontendsAppComponentStore.component;
          }

          return () => (<>Component not supported!</>);
        };

        const Component = findComponentToRender(type);

        console.log('Type: ', type);

        setComponentToRender(<Component type={type} data={data}/>)
      });
    }
  }, [microFrontendsAppComponentStore, storedVis]);

  return (
    <Suspense fallback={'Loading...'}>
      <MicroFrontendsAppSupportedTypes
        getAvailableComponents={true}
        onRetrieve={(types: any) => {
          setMicroFrontendsAppComponentStore({
            ...microFrontendsAppComponentStore,
            types: types,
          })
        }}/>

      { componentToRender }
    </Suspense>
  );
}

export default App;