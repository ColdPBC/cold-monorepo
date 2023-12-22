const parsePayload = (deploymentPayload, serviceNameToFind) => {
  try {
    const parsedPayload = typeof deploymentPayload === 'string' ? JSON.parse(deploymentPayload) : deploymentPayload;

    // Find service domain for the specified service name
    if (serviceNameToFind) {
      const service = parsedPayload.serviceDeployments.find(deployment => deployment.service.serviceName === serviceNameToFind);

      if (service) {
        return service.service.serviceDomain;
      } else {
        throw new Error(`Service Domain not found for ${serviceNameToFind}`);
      }
    } else {
      throw new Error('No service name specified.');
    }
  } catch (error) {
    throw new Error('Error parsing deployment payload: ' + error.message);
  }
};

// Read deployment payload from command line argument
const deploymentPayload = process.argv[2];

if (!deploymentPayload) {
  console.error('Usage: node parse_payload.js <deployment_payload_json> <service_name_to_find>');
  process.exit(1);
}

// Read service name to find from command line argument
const serviceNameToFind = process.argv[3];

// Parse and return the result
try {
  const result = parsePayload(deploymentPayload, serviceNameToFind);
  console.log(result);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
