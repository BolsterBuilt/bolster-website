// HubspotForm.tsx
import React from 'react';
import { useHubspotForm } from 'next-hubspot';

// Define the types for the component's props
interface HubspotFormProps {
  portalId: string;
  formId: string;
}

const HubspotForm: React.FC<HubspotFormProps> = ({ portalId, formId }) => {
  const { loaded, error, formCreated } = useHubspotForm({
    portalId: portalId,
    formId: formId,
    target: '#hubspot-form-wrapper'
  });

  return (
    <div>
      <div id="hubspot-form-wrapper"></div>
      {error && <p>Failed to load the form. Please check the console for details or try again later.</p>}
      {!loaded && <p>Loading form...</p>}
      {formCreated && <p>Form is ready!</p>}
    </div>
  );
}

export default HubspotForm;
