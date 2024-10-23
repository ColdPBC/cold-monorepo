import { withKnobs } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';
import { Markdown } from './markdown';

const meta: Meta<typeof Markdown> = {
	title: 'Molecules/Markdown',
	component: Markdown,
	tags: ['autodocs'],
	decorators: [withKnobs],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		markdown:
			'### Cold Climate Privacy Policy\n' +
			'\n' +
			'#### Last Updated: Aug 21, 2023\n' +
			'\n' +
			'\n' +
			'At Cold Climate, PBC (“Cold Climate,” “we,” “us,” or “our”), we know how important privacy is to you. We have created\n' +
			'this privacy policy (“Policy”) to describe how information you provide to us during the account set-up process is used\n' +
			'and shared, and to assist you in exercising the privacy rights available to you.\n' +
			'\n' +
			'#### Scope of This Policy\n' +
			'This Policy covers the information that we collect about you when you (“Visitor”, “Customer”, “User”) use our website\n' +
			'(“Website”), [coldclimate.com] and our related online offerings (collectively, the “Services”). This policy also\n' +
			'explains choices you can make surrounding how we use your personal and business information, and what rights you have\n' +
			'over, and access you have to information we collect.\n' +
			'\n' +
			'#### Important Information About This Policy\n' +
			'While we always aim to provide complete and transparent information about how we process your personal information, we\n' +
			'reserve the right to amend or update this Policy from time to time or to create additional policies in order to\n' +
			'accurately reflect changed circumstances or new legal requirements. As a result, it is important that you read this\n' +
			'Policy closely so that you are fully aware of how and why we are using your personal information.\n' +
			'To assist us in ensuring that we can provide the most accurate information possible, we ask that you check this Policy\n' +
			'for updates. We also ask that, where we have an ongoing relationship with you and any of the data you have provided\n' +
			'becomes no longer accurate, you keep us informed of this so we can amend our records accordingly. By providing us with\n' +
			'personal information or using our Website, you expressly consent to the information-handling practices described in this\n' +
			'Policy. If you do not agree with this Policy, please do not use our Services or provide us with your information.\n' +
			'\n' +
			"#### Cold Climate's Location\n" +
			'Our Website and Services are operated by Cold Climate in the United States (US). If you are located outside the US\n' +
			'please be aware that information you provide may be transferred, processed, maintained, stored and used on computer\n' +
			'systems outside of your home country where privacy laws may not be as protective as those in your jurisdiction.\n' +
			'\n' +
			'#### Types of Data We Collect\n' +
			'We collect a variety of information from Visitors of our Website, and Users of our Services.\n' +
			'\n' +
			'_Personal Information_\n' +
			'\n' +
			'For the purposes of this Policy, “personal information” is any information that identifies, relates to, or can be used\n' +
			'to contact a particular individual. We collect the following types of personal information as described below:\n' +
			'\n' +
			'_Website Visitors or Users_\n' +
			'- **Contact information** – first name, last name, email address, name and mailing address of your organization, billing\n' +
			'address, and telephone number.\n' +
			'- **Marketing information** – details regarding informational and promotional materials you may have requested or\n' +
			'received from us, the services in which you are interested, your receipt of promotional communications, and information\n' +
			'on your marketing or communication preferences.\n' +
			'- **Communication information** – copies of communications and inquiries you have submitted to us, including through\n' +
			'email, calls, and features available on our Website.\n' +
			'- **Device and usage information** – details regarding how and when you use our Website, including the device used to\n' +
			'connect to the Website, your IP address and device identifier, the frequency and duration of your usage, the pages you\n' +
			'view, what websites or search terms referred you to our Website, and information about your interaction with our\n' +
			'Website.\n' +
			'\n' +
			'If you are a Website visitor or user, we may collect personal information when you click on or navigate our Website,\n' +
			'request access to or use of our Services, submit online forms and surveys, contact us by email, phone, or otherwise,\n' +
			'visit or engage with our social media pages, interact with any chatbot deployed on our Website for customer service\n' +
			'purposes, or otherwise provide us with personal information.\n' +
			'\n' +
			'_Customers_\n' +
			'\n' +
			'In addition to the information that would be collected from our Website visitors or users described above, we collect\n' +
			'the following types of personal information from or about the Users of our Services:\n' +
			'\n' +
			'- **User account information** – user ID, account username, account password, account number, and other information that\n' +
			'we may request or that you may provide relating to your account.\n' +
			'- **Technical information** – details of the third-party services you will connect to via the Services, including your\n' +
			'credentials for such third-party service provider applications.\n' +
			'- **Transactional information** – details about your transactions with us, including method of payment, payments\n' +
			'received, payment details, transaction history, and other information relating to the services purchased by you or your\n' +
			'organization.\n' +
			'- **Financial account information** – details about the financial accounts you designate to make payments or receive\n' +
			'payments for your use of the Services.\n' +
			'- **Communication information** – copies of communications and inquiries you have submitted to us, including through\n' +
			'email, calls, and features available through our Services.\n' +
			'- **Customer service information** – details of any communications regarding any customer experience or technical issues\n' +
			'in using the Services.\n' +
			'- **Device and usage information** – details regarding how and when you use our Services, including the device used to\n' +
			'connect to the Services, your IP address and device identifier, the frequency and duration of your usage, the pages you\n' +
			'view, what websites or search terms referred you to our Services, and information about your interaction with our\n' +
			'Services.\n' +
			'\n' +
			'We collect this information when you create a Cold Climate account. In order to create a Cold Climate account, our\n' +
			'Customers provide information to us including name, business name, and email address. Our payments provider collects\n' +
			'billing information (credit card or bank information, address and name) to process payments for the Services. Please\n' +
			'note that their privacy policy may apply to any information you provide directly to the payment provider.\n' +
			'\n' +
			'_Information We Collect Automatically_\n' +
			'\n' +
			'We may collect information automatically on anyone who visits our Website or Services, using web tracking technologies\n' +
			'like “cookies” and third-party tracking services in order to provide a better user experience and to help us analyze\n' +
			'Website and Services usage more thoroughly.\n' +
			'\n' +
			"A cookie is a piece of textual information that a website saves on a visitor's computer. That information helps us\n" +
			'analyze Website and Services usage more closely, and provides additional functionality for the Services. For example, a\n' +
			"cookie is saved when a User logs in to our Services, and is used to identify the User so that they don't need to\n" +
			're-enter login information on subsequent visits.\n' +
			'\n' +
			"We also use third-party tracking services to collect data on site usage including, but not limited to, the Visitor's IP\n" +
			'address, web browser, operating system, referring site, and date and time of each visit.\n' +
			'\n' +
			'We use these technologies to help ensure that your account security is not compromised; mitigate risk and prevent fraud;\n' +
			'and to promote trust and safety across our Services. You are free to decline our automated technologies if your browser\n' +
			'or browser add-on permits, unless our automated technologies are required to prevent fraud or ensure the security of\n' +
			'websites we control. However, declining our automated technologies may interfere with your use of our Services.\n' +
			'\n' +
			'The information collected through these technologies may be combined with personal information or aggregated with other\n' +
			'information on Website visits. We may share information about your use of our Services with our advertising and\n' +
			'analytics partners, who may combine it with other information that you previously provided to them.\n' +
			'\n' +
			'_Email Recipients_\n' +
			'\n' +
			'We send two types of emails to Users of our Services, and visitors of our Website.\n' +
			'\n' +
			'_Marketing emails_. We send marketing emails for the purpose of sharing information about Cold Climate and promoting our\n' +
			'Services. These emails are opt-in through our website. Our marketing service provider tracks whether an email has been\n' +
			"opened, clicks within the email, User's preferred language, geolocation based on IP, email client, and date and time of\n" +
			'activity. You can opt out of marketing emails by clicking the “unsubscribe” link at the bottom of any marketing email.\n' +
			'\n' +
			'_Transactional emails_. We send transactional or administrative emails to customers to do a variety of tasks, including\n' +
			'but not limited to confirming email address, sending password change links, and notifying or alerting Users about\n' +
			'Service usage. These emails may also track opens, clicks, location based on IP, email client, and date and time of\n' +
			'activity. You cannot opt out of transactional or administrative emails.\n' +
			'\n' +
			'_Information from Other Sources_\n' +
			'\n' +
			'We may obtain both personal and non-personal information about you from our vendors, business partners, and other third\n' +
			'parties and add it to other information we have collected. We, and the third parties we engage, may combine information\n' +
			'we collect from you with information obtained from other sources. This helps us improve the information’s overall\n' +
			'accuracy and completeness, and also helps us better tailor our interactions with you.\n' +
			'\n' +
			'**How We Use Personal Information**\n' +
			'\n' +
			'We (or service providers acting on our behalf) may use the personal information identified above for the following\n' +
			'purposes:\n' +
			'- Performing our contract with you or your business or organization.\n' +
			'- Providing you information about our Services, including documentation related to the access and use of the Website and\n' +
			'Services.\n' +
			'- Providing and optimizing your experience as part of our Services and ensuring that we present our content to you in\n' +
			'the most effective manner.\n' +
			'- Communicating with you and responding to your inquiries and communicating regarding our Services and other technical\n' +
			'or customer service issues.\n' +
			'- Sending you promotional or informational communications and materials, tracking your marketing preferences, and for\n' +
			'our internal marketing purposes.\n' +
			'- Developing, updating, and improving our Services, Customer experience, and otherwise improving our knowledge and\n' +
			'insights regarding visitors to our Services.\n' +
			'- Preventing and detecting fraud, financial crime, hacking activities, security breaches, and other unlawful activities\n' +
			'in connection with the Services.\n' +
			'- Enforcing our agreements with our business partners, partner organizations and others, complying with our legal or\n' +
			'regulatory obligations, and defending or advancing legal claims.\n' +
			'- Notifying you about changes to our Services or material changes to this Policy.\n' +
			'- Providing you with surveys or otherwise soliciting feedback from you.\n' +
			'- Performing other functions as otherwise described to you at the time of collection or to which you otherwise consent.\n' +
			'\n' +
			'For more information about your options relating to your personal information and your communication preferences, see\n' +
			'“Your Choices About Personal Information” below.\n' +
			'\n' +
			'**Disclosure of Personal Information**\n' +
			'\n' +
			'When the information we collect about you is aggregated, anonymized, or otherwise does not identify you, we may use that\n' +
			'information for any purpose or disclose it to third parties, to the extent permitted by applicable law.\n' +
			'\n' +
			'In order to administer our business and for our Website and Services to run properly, we do disclose some personal or\n' +
			'business data with certain types of third parties, as listed below:\n' +
			'\n' +
			'- With service providers that we use to assist us with providing the website and our services, including our IT system\n' +
			'providers, website and mobile application providers, chatbot service providers, payment processors, or API providers.\n' +
			'- With vendors that we use for our contract management and fulfillment processes.\n' +
			'- With our third-party marketing service providers that assist us with promotional materials, campaigns, and\n' +
			'communications.\n' +
			'- With website analytics vendors in order to understand our Website traffic and usage patterns, optimize our website,\n' +
			'and identify potential new clients.\n' +
			'- With our customer relationship management vendors as necessary for customer service and support, sales, marketing, and\n' +
			'lead generation.\n' +
			'- With our email service provider, who enables us to communicate with you and our other contacts.\n' +
			'- With our affiliates, subsidiaries, parent companies, or related entities for the purposes of marketing and product\n' +
			'development related to our services.\n' +
			'- Buyers or other successors prior to or in the event of a merger, acquisition, divestiture, restructuring,\n' +
			'reorganization, dissolution, or other sale or transfer of some or all of our assets, whether as a going concern or as a\n' +
			'part of bankruptcy, liquidation, or similar proceeding, where the information is among the assets being transferred.\n' +
			'- Regulatory and governmental authorities, law enforcement agencies, and courts, as necessary to comply with applicable\n' +
			'laws and regulations, respond to a subpoena, search warrant, or other lawful request for information, or to otherwise\n' +
			'protect our rights.\n' +
			'- For any other purpose disclosed by us when you provide the information.\n' +
			'\n' +
			'We reserve the right to disclose your information as necessary to comply with a subpoena or similar investigative\n' +
			'demand, court order, request for cooperation from law enforcement or other governmental agency, to exercise our legal\n' +
			'rights, to defend against legal claims, or as otherwise required by law.\n' +
			'\n' +
			'**Your Choices About Personal Information**\n' +
			'\n' +
			'We respect your right to make choices about the ways we collect, use, and disclose your information. We try to offer you\n' +
			'meaningful choices regarding your personal information. Some choices you have regarding personal information include the\n' +
			'following.\n' +
			'\n' +
			'- _Marketing Emails_: As required by applicable laws, you can opt-out of receiving promotional emails from us by\n' +
			'clicking the “opt out,” “unsubscribe,” or similar link in any such promotional emails and following the instructions\n' +
			'provided.\n' +
			'\n' +
			'- _Cookies_: Depending on your browser or device, you may have the option to set the browser to accept all cookies,\n' +
			'reject all cookies, notify you when a cookie is set, or delete cookies. Each browser and device are different, so we\n' +
			'recommend you evaluate the tools and settings available in your browser or device, as well as any available instructions\n' +
			'for the same. You can learn more about disabling cookies here.\n' +
			'\n' +
			'- _Declining to Provide Information_: You can choose not to provide us with information we may request through our\n' +
			'Services, but that may result in you being unable to use certain features of our Services, request information about our\n' +
			'services, or initiate other transactions with us.\n' +
			'\n' +
			'- _Do Not Track Mechanisms_: Please note that our Website does not honor “Do Not Track” signals, and such signals will\n' +
			'not impact the operation of the Services.\n' +
			'In addition to the above, you may contact us using the details provided at the end of this Policy with any questions\n' +
			'about the choices relating to your personal information.\n' +
			'\n' +
			'**Links to Third-Party Websites**\n' +
			'\n' +
			'Our website may contain links to third-party websites. Such websites have separate privacy policies that you should\n' +
			'review. We cannot take responsibility for the content of linked websites or those companies’ data-handling practices.\n' +
			'\n' +
			'**Changes to This Policy**\n' +
			'\n' +
			'Please note that we may change this Policy from time to time. If there are changes to our Policy, we will post them here\n' +
			'and update the “Last Updated” date at the top of this document. Continued use of this Website after any changes is\n' +
			'deemed to be acceptance of those changes. Accordingly, we encourage you to check the Policy periodically for updates.\n' +
			'\n' +
			'**Contact Us**\n' +
			'\n' +
			'If you have any questions about this Policy or our privacy practices, please contact us at support@coldclimate.com.',
	},
};

export const Small: Story = {
	args: {
		markdown:
			'How you pay for electricity impacts your organization’s opportunities to purchase different types of RECs. If your electric usage is incorporated in your lease, for instance, you may not be able to determine your annual energy use. Select from the following options:' +
			'\n1.   You directly pay your utility bills;' +
			'\n2.   You pay your utility bills indirectly via your landlord;' +
			'\n3.   You do not pay for utilities because the cost is incorporated into your rent.',
		className: 'prose-sm',
	},
};
