import React, { useEffect, useState } from 'react';
import './style.css';
import { ApolloExplorer } from '@apollo/explorer/react';
import { Formik, Field, Form } from 'formik';

export default function App() {
  const [token, setToken] = useState('');
  const [endpointUrl, setEndpointUrl] = useState('');

  // query to use on initial explorer tab load
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

  useEffect(() => {
    // if endpointUrl is set in ls, use it
    const getHostname = window.localStorage.getItem('endpointUrl');
    getHostname ? setEndpointUrl(getHostname) : null;
  }, []);

  useEffect(() => {
    // if hostname and token query params are present, use them
    const queryParams = new URLSearchParams(window.location.search);
    const storefront_hostname = queryParams.get('storefront_hostname');
    const storefront_token = queryParams.get('storefront_token');
    storefront_hostname
      ? setEndpointUrl(`https://${storefront_hostname}/graphql`)
      : null;
    storefront_token ? setToken(storefront_token) : null;
  }, []);

  return (
    <>
      <div className="top-form">
        <span className="h1-style">Storefront GraphQL Playground</span>{' '}
        <span style={{ marginLeft: '2%' }}>
          Your hostname: {endpointUrl.split('?')[0]}
        </span>
        <Formik
          initialValues={{
            storefront_hostname: `${endpointUrl.split('?')[0]}`,
          }}
          onSubmit={async (values) => {
            setEndpointUrl(`https://${values.storefront_hostname}/graphql`);
            // update endpointUrl in ls on submit
            window.localStorage.setItem(
              'endpointUrl',
              `https://${values.storefront_hostname}/graphql`
            );
          }}
        >
          <Form>
            <label htmlFor="storefront_hostname">Change hostname:</label>
            {/* TODO: form validation and sanitizing */}
            <Field
              id="storefront_hostname"
              name="storefront_hostname"
              placeholder=" store-{HASH}.mybigcommerce.com"
            />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>

      <ApolloExplorer
        // unique if for this schema
        graphRef="My-Graph-aj8l5j@current"
        endpointUrl={endpointUrl}
        className="embedded-explorer"
        // persistExplorerState allows headers, tabs, and variables to persist
        persistExplorerState={true}
        includeCookies={true}
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
