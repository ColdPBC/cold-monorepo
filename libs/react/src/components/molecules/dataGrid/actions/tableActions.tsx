import { useState } from 'react';
import { TableActionButton } from './tableActionButton';
import { TableActionType } from '../../../../interfaces/tableAction';
import { TableAction } from './tableAction';
import { Dropdown } from 'flowbite-react';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { Modal } from '../../modal';
import { useAddToastMessage, useExecuteAction } from '@coldpbc/hooks';
import { ToastMessage } from '@coldpbc/interfaces';
import { RoleModal } from './roleModal';

export interface TableActionsProps {
	actions: TableActionType[];
}

// TODO: Add story for this component

export const TableActions = (props: TableActionsProps) => {
	const { actions } = props;
	const [shown, setShown] = useState(false);
	const [actionModal, setActionModal] = useState<TableActionType | null>(null);
	const { addToastMessage } = useAddToastMessage();
	const { executeAction } = useExecuteAction();
	const { modalProps } = actionModal || {};

	const onActionModalConfirm = async () => {
		if (actionModal) {
			addLoadingToButton(true);
			executeAction(actionModal)
				.then(() => {
					addToastMessage({
						message: actionModal.toastMessage.success,
						type: ToastMessage.SUCCESS,
					});
					addLoadingToButton(false);
					setActionModal(null);
				})
				.catch(() => {
					addToastMessage({
						message: actionModal.toastMessage.fail,
						type: ToastMessage.FAILURE,
					});
					addLoadingToButton(false);
					setActionModal(null);
				});
		}
	};

	const addLoadingToButton = (loading: boolean) => {
		if (modalProps && actionModal) {
			setActionModal({
				...actionModal,
				modalProps: {
					...modalProps,
					footer: {
						...modalProps?.footer,
						resolveButton: {
							...modalProps?.footer?.resolveButton,
							loading: loading,
						},
					},
				},
			});
		}
	};

	const getActionModal = () => {
		if (actionModal?.name === 'update role') {
			if (modalProps) {
				return (
					<RoleModal
						show={true}
						setShowModal={() => setActionModal(null)}
						action={{
							...actionModal,
							modalProps: {
								...modalProps,
								footer: {
									rejectButton: {
										...modalProps?.footer?.rejectButton,
										onClick: () => {
											if (modalProps?.footer?.rejectButton?.onClick) {
												modalProps?.footer?.rejectButton?.onClick();
											}
											setActionModal(null);
										},
									},
									resolveButton: {
										...modalProps?.footer?.resolveButton,
										onClick: () => {
											if (modalProps?.footer?.resolveButton?.onClick) {
												modalProps?.footer?.resolveButton?.onClick();
											}
											onActionModalConfirm();
										},
									},
								},
							},
						}}
					/>
				);
			} else {
				return null;
			}
		} else {
			return (
				<Modal
					show={actionModal !== null}
					setShowModal={() => setActionModal(null)}
					header={{
						title: modalProps?.header.title || '',
					}}
					body={<div className="text-sm font-medium">{modalProps?.body}</div>}
					footer={{
						rejectButton: {
							...modalProps?.footer?.rejectButton,
							onClick: () => {
								if (modalProps?.footer?.rejectButton?.onClick) {
									modalProps?.footer?.rejectButton?.onClick();
								}
								setActionModal(null);
							},
						},
						resolveButton: {
							...modalProps?.footer?.resolveButton,
							onClick: () => {
								if (modalProps?.footer?.resolveButton?.onClick) {
									modalProps?.footer?.resolveButton?.onClick();
								}
								onActionModalConfirm();
							},
						},
					}}
				/>
			);
		}
	};

	if (!actions.length) return null;

	return (
		<>
			<Dropdown
				inline={true}
				label={
					<div data-testid={'table-actions'}>
						<TableActionButton
							onClick={() => {
								setShown(!shown);
							}}
						/>
					</div>
				}
				arrowIcon={false}
				theme={flowbiteThemeOverride.dropdown}>
				{actions.map((action, index, array) => {
					return (
						<div key={`${index}`}>
							<Dropdown.Item theme={flowbiteThemeOverride.dropdown.floating.item} className="p-0 w-full">
								<TableAction action={action} setActionsShown={setShown} openActionModal={setActionModal} />
							</Dropdown.Item>
							{index + 1 < actions.length && <div className="bg-bgc-accent h-[1px] w-full" />}
						</div>
					);
				})}
			</Dropdown>
			{getActionModal()}
		</>
	);
};
