import { ButtonTypes, EntityLevel } from '@coldpbc/enums';
import { Modal as FBModal } from 'flowbite-react';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { BaseButton, Card } from '@coldpbc/components';
import React from 'react';
import {useAddToastMessage, useAuth0Wrapper, useGraphQLMutation, useGraphqlSWRMutate} from '@coldpbc/hooks';
import { capitalize, toLower } from 'lodash';
import { ToastMessage } from '@coldpbc/interfaces';
import {useNavigate} from "react-router-dom";

export const DeleteEntityModal = (props: { isOpen: boolean; onClose: () => void; entityLevel: EntityLevel; entityId: string;}) => {
	const { isOpen, onClose, entityLevel, entityId } = props;
  const { orgId } = useAuth0Wrapper();
  const navigate = useNavigate();
	const { addToastMessage } = useAddToastMessage();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const { mutateGraphQL: deleteMaterial } = useGraphQLMutation('DELETE_MATERIAL');
	const { mutateGraphQL: deleteProduct } = useGraphQLMutation('DELETE_PRODUCT');
	const { mutateGraphQL: deleteSupplier } = useGraphQLMutation('DELETE_SUPPLIER');
  const {mutateKey} = useGraphqlSWRMutate(orgId);

  const ENTITY_MAP = {
		[EntityLevel.MATERIAL]: {
			mutateGraphQL: deleteMaterial,
			onCloseFunction: async () => {
				await mutateKey('GET_PAGINATED_MATERIALS_FOR_ORG');
        navigate('/materials');
			},
		},
		[EntityLevel.PRODUCT]: {
			mutateGraphQL: deleteProduct,
			onCloseFunction: async () => {
				await mutateKey('GET_PAGINATED_PRODUCTS_FOR_ORG');
				navigate('/products');
			},
		},
		[EntityLevel.SUPPLIER]: {
			mutateGraphQL: deleteSupplier,
			onCloseFunction: async () => {
        await mutateKey('GET_ALL_SUPPLIERS_FOR_ORG');
				navigate('/suppliers');
			},
		},
	};

  const upperCase = capitalize(entityLevel);
	const lower = toLower(entityLevel);

	const deleteEntity = async () => {
		setIsLoading(true);
		try {
      await ENTITY_MAP[entityLevel].mutateGraphQL({ filter: { id: entityId } });
      await addToastMessage({
        message: `${upperCase} deleted successfully`,
        type: ToastMessage.SUCCESS,
      });
      ENTITY_MAP[entityLevel].onCloseFunction();
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
			<Card title={`Are you sure you want to delete this ${lower}?`} className="relative p-4 w-full bg-gray-20" overflowHidden={false}
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
              disabled={isLoading}
            />
					</div>
				</div>
			</Card>
		</FBModal>
	);
};
