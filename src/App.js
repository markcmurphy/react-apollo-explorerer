import React from 'react';
import './style.css';
import { ApolloExplorerReact } from '@apollo/explorer';

export default function App() {
  return (
    <ApolloExplorerReact
      graphRef="My-Graph-aj8l5j@current"
      endpointUrl="https://bc.murphymark.me/graphql"
      persistExplorerState={true}
      style={{ height: '100vh' }}
      initialState={{
        document: `query Site {
          site {
            products {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
`,        
        headers: {
          authorization: 'Bearer abc123',
        },
        displayOptions: {
          showHeadersAndEnvVars: true,
          docsPanelState: 'open',
          theme: 'dark',
        },
      }}
    />
  );
}
