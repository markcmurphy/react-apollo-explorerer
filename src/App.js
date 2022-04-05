import React from "react";
import "./style.css";
import { ApolloExplorerReact } from '@apollo/explorer';
  
export default function App() {
  return (
    <ApolloExplorerReact 
      graphRef='My-Graph-aj8l5j@current'
      endpointUrl='https://bc.murphymark.me/graphql'
      persistExplorerState={true}
      style={{"height":'100vh'}}
      initialState={{
        document: `query ExampleQuery {
  customer {
    entityId
  }
}
`,
        variables: { 'Variable1': 'ExampleValue' },
        headers: { 'Header1': 'ExampleValue' },
        displayOptions: {
          showHeadersAndEnvVars: true, 
          docsPanelState: 'open', 
          theme: 'light',
        },
      }}
    />
  );
}