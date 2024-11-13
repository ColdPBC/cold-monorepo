import { organizations } from '@prisma/client';

export const supplierStatementExtractionPrompt = (organization: organizations) => {
	return `Extract the following information from the document, ensuring accuracy by identifying explicit role indicators and cross-referencing context:

1. Supplier Name: Identify the company referenced as the supplier of materials or services.
		- The name ${organization.display_name} should NOT be considered as a supplier.
		- Look for contextual clues such as mentions of roles or responsibilities indicating supplier activity.
3. Address Information: Extract address information explicitly mentioned for either the authoring company or the supplier.
		- If no address is provided, return ‘undefined.’
4. Signatory Information:
	- Extract the name and title of the person who signed the document.
	- Ensure the company association of the signatory (authoring company or supplier) is clearly identified where possible.

Extraction Rules:

Role Validation:
- In determining authorship, consider the following in order:
        1. The logo or letterhead of the document.
        2. Company name located in the footer or header.
        4. Fallback for Ambiguity:
						- If roles are unclear, use contextual evidence like the purpose of the document (e.g., setting standards or compliance requirements)
`;
};
