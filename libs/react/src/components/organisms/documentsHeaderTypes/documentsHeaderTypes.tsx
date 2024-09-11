import { FilesWithAssurances } from '@coldpbc/interfaces';
import { Card, DocumentsHeaderType } from '@coldpbc/components';
import { cloneDeep, forEach, keys, orderBy } from 'lodash';
import { FileTypes } from '@coldpbc/enums';

export const DocumentsHeaderTypes = (props: { files: FilesWithAssurances[] }) => {
	const { files } = props;
	// seperate files into different types using FileTypes enum
	// order by amount of files, but remove OTHER type from ordering
	// then render DocumentsHeaderType for each type

	const getFileTypeTitle = (type: string) => {
		switch (type) {
			case FileTypes.CERTIFICATE:
				return 'Certificates';
			case FileTypes.TEST_RESULTS:
				return 'Test Documents';
			case FileTypes.STATEMENT:
				return 'Statements';
			default:
				return 'Other';
		}
	};

	const fileTypes: {
		[key: string]: { title: string; amount: number; totalAmount: number };
	} = {
		[FileTypes.CERTIFICATE]: {
			title: getFileTypeTitle(FileTypes.CERTIFICATE),
			amount: 0,
			totalAmount: files.length,
		},
		[FileTypes.STATEMENT]: {
			title: getFileTypeTitle(FileTypes.STATEMENT),
			amount: 0,
			totalAmount: files.length,
		},
		[FileTypes.TEST_RESULTS]: {
			title: getFileTypeTitle(FileTypes.TEST_RESULTS),
			amount: 0,
			totalAmount: files.length,
		},
		[FileTypes.OTHER]: {
			title: getFileTypeTitle(FileTypes.OTHER),
			amount: 0,
			totalAmount: files.length,
		},
	};

	forEach(files, file => {
		if ([FileTypes.OTHER, FileTypes.ASSESSMENT, FileTypes.POLICY].includes(file.type)) {
			fileTypes[FileTypes.OTHER].amount += 1;
		} else {
			fileTypes[file.type].amount += 1;
		}
	});

	orderBy(fileTypes, ['amount'], ['desc']);

	const otherType = cloneDeep(fileTypes[FileTypes.OTHER]);
	delete fileTypes[FileTypes.OTHER];

	return (
		<Card className="bg-bgc-elevated w-full flex flex-row" glow={false}>
			{keys(fileTypes).map(key => {
				const fileType = fileTypes[key];
				return (
					<div key={key} className={'w-1/4'}>
						<DocumentsHeaderType title={fileType.title} amount={fileType.amount} totalAmount={fileType.totalAmount} />
					</div>
				);
			})}
			<div className={'w-1/4'}>
				<DocumentsHeaderType title={otherType.title} amount={otherType.amount} totalAmount={otherType.totalAmount} />
			</div>
		</Card>
	);
};
