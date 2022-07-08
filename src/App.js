import React, { useEffect, useState } from 'react';
import './style.css';
import { ApolloExplorer } from '@apollo/explorer/react';
import { Formik, Field, Form } from 'formik';

export default function App() {
  const [token, setToken] = useState(process.env.REACT_APP_TOKEN);

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

  const [endpointUrl, setEndpointUrl] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const storefront_hostname = queryParams.get('storefront_hostname');
    storefront_hostname
      ? setEndpointUrl(`https://${storefront_hostname}/graphql`)
      : null;
  }, []);

  return (
    <>
      <h1>Storefront GraphQL Playground</h1>
      <p>Current hostname: {endpointUrl}</p>
      <Formik
        initialValues={{
          storefront_hostname: `${endpointUrl}`,
        }}
        onSubmit={async (values) => {
          setEndpointUrl(`https://${values.storefront_hostname}/graphql`);
        }}
      >
        <Form>
          <label htmlFor="storefront_hostname">Change hostname:</label>
          <Field
            id="storefront_hostname"
            name="storefront_hostname"
            placeholder="store-{HASH}.mybigcommerce.com"
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>

      <ApolloExplorer
        graphRef="My-Graph-aj8l5j@current"
        endpointUrl={endpointUrl}
        persistExplorerState={false}
        initialState={{
          document: `${document}`,
          headers: {
            authorization: `Bearer ${token}`,
          },
          displayOptions: {
            showHeadersAndEnvVars: true,
            docsPanelState: 'open',
            theme: 'dark',
          },
        }}
      />
    </>
  );
}
