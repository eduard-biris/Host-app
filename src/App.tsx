import React, { lazy, Suspense, useEffect, useState } from 'react';
import useFetch from 'react-fetch-hook';

const MicroFrontendsAppSupportedTypes = lazy(() => import('MicroFrontendsApp/SupportedTypes'));
const Component = lazy(() => import('MicroFrontendsApp/Timelines/TimelineView'));

/*
  Ilustratii de implementat:
  - Sunburst - ?
  - Scatter - ?
  - PieChart - DA
  - LineChart - DA
  - BarChart - DA
  - Calendar - DA
  
  Ilustratii implementate:
  - Timeline
*/

const SecondLibSupportedTypes = lazy(() => import('SecondMfApp/SupportedTypes'));
const SecondLibComponent = lazy(() => import('SecondMfApp/Component')); 

// 25 mai -> aplicatie + parte scrisa gata (draft)

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
    componentStores,
    setComponentStores
  ] = useState([
    // {
    //   name: 'MicroFrontendsApp',
    //   component: Component,
    //   types: [],
    // },
    // {
    //   name: 'SecondLibApp',
    //   component: SecondLibComponent,
    //   types: [],
    // }
  ]);


  const [componentToRender, setComponentToRender] = useState();

  useEffect(() => {
    if(componentStores && storedVis) {
      console.log('Both here: ');

      console.log('mfAvComponents: ', componentStores);
      console.log('storedVis: ', storedVis);

      storedVis.visualisations.forEach(vis => {
        console.log('vis: ', vis);

        const type = vis.type;
        // const type = 'TestComponentOne';
        // const type = 'SecondLibTestTwo';
        // const type = 'UnknownType';

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

        setComponentToRender(<Component type={type} data={data} message={'my message'}/>)
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