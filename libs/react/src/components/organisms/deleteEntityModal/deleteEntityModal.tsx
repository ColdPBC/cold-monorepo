import { ButtonTypes, EntityLevel } from '@coldpbc/enums';
import { Modal as FBModal } from 'flowbite-react';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { BaseButton, Card } from '@coldpbc/components';
import React from 'react';
import { useAddToastMessage, useGraphQLMutation } from '@coldpbc/hooks';
import { capitalize, toLower } from 'lodash';
import { ToastMessage } from '@coldpbc/interfaces';
import {useNavigate} from "react-router-dom";

export const DeleteEntityModal = (props: { isOpen: boolean; onClose: () => void; entityLevel: EntityLevel; entityId: string;}) => {
	const { isOpen, onClose, entityLevel, entityId } = props;
  const navigate = useNavigate();
	const { addToastMessage } = useAddToastMessage();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const { mutateGraphQL: deleteMaterial } = useGraphQLMutation('DELETE_MATERIAL');
	const { mutateGraphQL: deleteProduct } = useGraphQLMutation('DELETE_PRODUCT');
	const { mutateGraphQL: deleteSupplier } = useGraphQLMutation('DELETE_SUPPLIER');

	let title = '';
	const upperCase = capitalize(entityLevel);
	const lower = toLower(entityLevel);

	switch (entityLevel) {
		case EntityLevel.MATERIAL:
			title = 'Delete Material';
			break;
		case EntityLevel.PRODUCT:
			title = 'Delete Product';
			break;
		case EntityLevel.SUPPLIER:
			title = 'Delete Supplier';
			break;
		default:
			title = 'Delete Entity';
			break;
	}

	const deleteEntity = async () => {
		setIsLoading(true);
		try {
      switch (entityLevel) {
        case EntityLevel.MATERIAL:
          await deleteMaterial({ filter: { id: entityId } });
          break;
        case EntityLevel.PRODUCT:
          await deleteProduct({ filter: { id: entityId } });
          break;
        case EntityLevel.SUPPLIER:
          await deleteSupplier({ filter: { id: entityId } });
          break;
        default:
          break;
      }
      addToastMessage({
        message: `${upperCase} deleted successfully`,
        type: ToastMessage.SUCCESS,
      });
      switch (entityLevel) {
        case EntityLevel.MATERIAL:
          navigate('/materials');
          break;
        case EntityLevel.PRODUCT:
          navigate('/products');
          break;
        case EntityLevel.SUPPLIER:
          navigate('/suppliers');
          break;
        default:
          break;
      }
      onClose();
		} catch (error) {
			addToastMessage({
				message: `Error deleting this ${lower}`,
				type: ToastMessage.FAILURE,
			});
		}
    setIsLoading(false);
	};

	return (
		<FBModal
      dismissible
      show={isOpen}
      onClose={onClose}
      theme={flowbiteThemeOverride.modal}
      style={{
        boxShadow: '0px 8px 32px 8px rgba(0, 0, 0, 0.70)',
      }}
    >
			<Card title={`Are you sure you want to delete this ${lower}`} className="relative p-4 w-full bg-gray-20" overflowHidden={false}
            glow={false}
      >
				<div className={'flex flex-col w-full h-full justify-between gap-4'}>
					<div className="w-full flex justify-between">
						<BaseButton
							label="Cancel"
							onClick={() => {
								onClose();
							}}
							variant={ButtonTypes.secondary}
						/>
						<BaseButton
              label={'Yes, Delete'}
              loading={isLoading}
              onClick={deleteEntity}
              variant={ButtonTypes.warning}
            />
					</div>
				</div>
			</Card>
		</FBModal>
	);
};
