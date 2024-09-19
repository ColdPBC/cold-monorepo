import { FilesWithAssurances } from '@coldpbc/interfaces';
import { Card, DocumentsHeaderType } from '@coldpbc/components';
import { cloneDeep, forEach, orderBy } from 'lodash';
import capitalize from "lodash/capitalize";

export const DocumentsHeaderTypes = (props: { files: FilesWithAssurances[] }) => {
	const { files } = props;
	// separate files into different types using FileTypes enum
	// order by amount of files, but remove OTHER type from ordering
	// then render DocumentsHeaderType for each type

	const fileTypes: { title: string; amount: number; totalAmount: number }[] = [
		{
			title: "Certificates",
			amount: 0,
			totalAmount: files.length,
		},
		{
			title: "Statements",
			amount: 0,
			totalAmount: files.length,
		},
		{
			title: "Test Reports",
			amount: 0,
			totalAmount: files.length,
		},
		{
			title: "Other",
			amount: 0,
			totalAmount: files.length,
		},
	];

	forEach(files, file => {
    switch(file.type) {
      case "CERTIFICATE":
        fileTypes[0].amount += 1;
      break;
      case "STATEMENT":
        fileTypes[1].amount += 1;
      break;
      case "TEST_REPORT":
        fileTypes[2].amount += 1;
      break;
      default:
        fileTypes[3].amount += 1;
    }
	});

	const otherType = cloneDeep(fileTypes[3]);
	fileTypes.splice(3, 1);

	const ordered = orderBy(fileTypes, ['amount'], ['desc']);

	return (
		<Card className="bg-bgc-elevated w-full flex flex-row" glow={false}>
			{ordered.map((type, index) => {
				return (
					<div key={index} className={'w-1/4'}>
						<DocumentsHeaderType title={type.title} amount={type.amount} totalAmount={type.totalAmount} />
					</div>
				);
			})}
			<div className={'w-1/4'}>
				<DocumentsHeaderType title={otherType.title} amount={otherType.amount} totalAmount={otherType.totalAmount} />
			</div>
		</Card>
	);
};
