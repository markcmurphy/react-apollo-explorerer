import React, { useEffect, useState }from 'react';
import './style.css';
import { ApolloExplorerReact } from '@apollo/explorer';

export default function App() {
  const [token, setToken] = useState('');
  const [document, setDocument] = useState(`query Site {
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
`);
//   const queryParams = new URLSearchParams(window.location.search)
//   const term = queryParams.get("token")
  
//   setToken(term);


  // const location = queryParams.get("location")

  return (
    <ApolloExplorerReact
      graphRef="My-Graph-aj8l5j@current"
      endpointUrl="https://bc.murphymark.me/graphql"
      persistExplorerState={false}
      initialState={{
        document: {document},        
        headers: {
          authorization: `${token}`,
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
