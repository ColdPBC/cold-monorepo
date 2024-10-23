import { useAddToastMessage } from '../../../../hooks/useToastMessage';
import { useExecuteAction } from '../../../../hooks/useExecuteAction';
import { TableActionType } from '../../../../interfaces/tableAction';
import { ToastMessage } from '@coldpbc/interfaces';

export interface TableActionProps {
	action: TableActionType;
	setActionsShown: (val: boolean) => void;
	openActionModal: (action: any) => void;
}

export const TableAction = (props: TableActionProps) => {
	const { action, setActionsShown } = props;
	const { executeAction } = useExecuteAction();
	const { addToastMessage } = useAddToastMessage();

	switch (action.type) {
		case 'button':
			return (
				<button
					onClick={() => {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						executeAction(action as TableActionType)
							.then(() => {
								addToastMessage({
									message: action.toastMessage.success,
									type: ToastMessage.SUCCESS,
								});
								setActionsShown(false);
							})
							.catch(() => {
								addToastMessage({
									message: action.toastMessage.fail,
									type: ToastMessage.FAILURE,
								});
								setActionsShown(false);
							});
					}}
					className="w-full text-left p-4">
					{action.label}
				</button>
			);
		case 'modal':
			return (
				<button
					onClick={() => {
						props.openActionModal(action);
					}}
					className="w-full text-left p-4">
					{action.label}
				</button>
			);
		default:
			return null;
	}
};
