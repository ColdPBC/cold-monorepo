import { BaseButton, Card, Dropdown, ErrorFallback } from '@coldpbc/components';
import { SustainabilityAttribute, ToastMessage } from '@coldpbc/interfaces';
import { Modal as FBModal } from 'flowbite-react';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import {ButtonTypes, EntityLevel} from '@coldpbc/enums';
import React from 'react';
import { lowerCase } from 'lodash';
import capitalize from 'lodash/capitalize';
import { useAddToastMessage, useAuth0Wrapper, useColdContext, useGraphQLMutation } from '@coldpbc/hooks';
import {withErrorBoundary} from "react-error-boundary";
import {pluralize} from "@coldpbc/lib";

export interface BulkEditSustainabilityAttributeModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  refreshMaterials: () => void;
  entities: {
    entity: any;
    hasAttribute: boolean;
  }[];
  sustainabilityAttribute: SustainabilityAttribute;
  level: string;
}

const _BulkEditSustainabilityAttributeModal = (props: BulkEditSustainabilityAttributeModalProps) => {
  const { logBrowser } = useColdContext()
  const { orgId } = useAuth0Wrapper();
	const { show, setShow, refreshMaterials, entities, sustainabilityAttribute, level } = props;
	const [selectedValue, setSelectedValue] = React.useState<string>('true');
  const [buttonLoading, setButtonLoading] = React.useState<boolean>(false);
  const { mutateGraphQL: deleteAttributeAssurances } = useGraphQLMutation('DELETE_ATTRIBUTE_ASSURANCES');
  const { mutateGraphQL: createAttributeAssurances } = useGraphQLMutation('CREATE_ATTRIBUTE_ASSURANCES')
	const { addToastMessage } = useAddToastMessage();

	const onSave = async () => {
    setButtonLoading(true);
		try {
      if(selectedValue === 'false'){
        const entityIds = entities.map(entity => entity.entity.id) as string[]
        if(entityIds.length !== 0){
          await deleteAttributeAssurances({
            filter: {
              sustainabilityAttribute: { id: sustainabilityAttribute.id },
              organization: { id: orgId },
              material: level === EntityLevel.MATERIAL ? { id_in: entityIds } : undefined,
              organizationFacility: level === EntityLevel.SUPPLIER ? { id_in: entityIds } : undefined,
              product: level === EntityLevel.PRODUCT ? { id_in: entityIds } : undefined,
            },
          })
        }
      } else {
        const createInputs = entities.map(entity => {
          if(entity.hasAttribute){
            return null;
          }
          return {
            organization: { id: orgId },
            material: level === EntityLevel.MATERIAL ? { id: entity.entity.id } : undefined,
            organizationFacility: level === EntityLevel.SUPPLIER ? { id: entity.entity.id } : undefined,
            product: level === EntityLevel.PRODUCT ? { id: entity.entity.id } : undefined,
            sustainabilityAttribute: { id: sustainabilityAttribute.id },
          }
        }).filter(Boolean);
        if(createInputs.length !== 0){
          await createAttributeAssurances({
            input: createInputs,
          })
        }
      }

      refreshMaterials();
      setShow(false);
      addToastMessage({ message: `Success! ${entities.length} ${capitalize(level)} Records Updated`, type: ToastMessage.SUCCESS });
      logBrowser(`Successfully edited sustainability attribute`, 'info', {
        level,
        selectedValue,
        entities,
      });
    } catch (e) {
      addToastMessage({ message: 'Failed to update attribute', type: ToastMessage.FAILURE });
      logBrowser(`Failed to edit sustainability attribute`, 'error', {
        level,
        selectedValue,
        entities,
        error: e,
      });
		}
    setButtonLoading(false);
	};

  logBrowser(`Opened bulk edit sustainability attribute modal`, 'info', {
    level,
    entities,
    sustainabilityAttribute
  })

	return (
		<FBModal dismissible show={show} onClose={() => setShow(false)} theme={flowbiteThemeOverride.modal}>
			<Card className="relative p-4 w-[626px] bg-gray-20 overflow-visible" glow={false}>
				<div className={'flex flex-col gap-[24px] w-full'}>
					<div className={'flex flex-row text-h3'}>Edit Attribute</div>
					<span>
						Bulk edit for {pluralize(lowerCase(level), entities.length)}.
					</span>
					<Dropdown
						options={[
							{ value: 'true', label: 'True' },
							{ value: 'false', label: 'False' },
						]}
						onSelect={value => setSelectedValue(value)}
						selected={selectedValue}
            data-testid={'bulk-edit-attribute-dropdown'}
					/>
				</div>
				<div className={'w-full flex flex-row justify-between'}>
					<BaseButton label={'Cancel'} onClick={() => setShow(false)} variant={ButtonTypes.secondary} />
					<div className={'flex flex-row gap-[16px] items-center'}>
						<div className={'text-body font-bold text-tc-secondary'}>
							{pluralize(capitalize(level), entities.length)}
						</div>
						<BaseButton
              label={'Save'}
              onClick={onSave}
              loading={buttonLoading}
            />
					</div>
				</div>
			</Card>
		</FBModal>
	);
};

export const BulkEditSustainabilityAttributeModal = withErrorBoundary(_BulkEditSustainabilityAttributeModal, {
  FallbackComponent: props => <ErrorFallback {...props} />,
  onError: (error, info) => {
    console.error('Error occurred in BulkEditSustainabilityAttributeModal: ', error);
  },
});
