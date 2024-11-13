import { organizations } from '@prisma/client';

export const supplierAgreementExtractionPrompt = (organization: organizations) => {
	return `
	Extract the following information from the document, ensuring accuracy by identifying explicit role indicators and cross-referencing context:

1. Authoring Company: This should be ${organization.display_name}.
2. Supplier Name Identify the company referenced as the supplier of materials or services and should NOT be ${organization.display_name}.
		- Look for contextual clues such as:
		- References to compliance with terms, standards, or guidelines set by the authoring company.
		- Mentions of roles or responsibilities indicating supplier activity.
3. Address Information: Extract address information explicitly mentioned for either the authoring company or the supplier.
	- If no address is provided, return ‘undefined.’
4. Signatory Information:
	- Extract the name and title of the person who signed the document.
	- Ensure the company association of the signatory (authoring company or supplier) is clearly identified where possible.

Extraction Rules:

`;
};
