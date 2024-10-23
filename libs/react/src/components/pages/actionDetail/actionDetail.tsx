import { Card, Takeover, UserSelectDropdown } from '../../molecules';
import { mutate as globalMutate } from 'swr';
import { User } from '@auth0/auth0-react';
import { axiosFetcher } from '@coldpbc/fetchers';
import { ActionPayload } from '@coldpbc/interfaces';
import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { CompletedBanner } from './completedBanner';
import { Avatar, BaseButton } from '../../atoms';
import { ButtonTypes, ErrorType, GlobalSizes } from '@coldpbc/enums';
import { Datepicker, Dropdown } from 'flowbite-react';
import { flowbiteThemeOverride } from '@coldpbc/themes';
import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ActionDetailProgress } from '../../organisms';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../application';
import { useAuth0Wrapper, useColdContext, useOrgSWR } from '@coldpbc/hooks';
import { getFormattedUserName } from '@coldpbc/lib';
import { isAxiosError } from 'axios';

interface Props {
	id: string;
}

const _ActionDetail = ({ id }: Props) => {
	const { logError, logBrowser } = useColdContext();
	const [searchParams, setSearchParams] = useSearchParams();
	const { getOrgSpecificUrl } = useAuth0Wrapper();
	const [show, setShow] = useState(true);

	const { data, error, isLoading, mutate } = useOrgSWR<ActionPayload, any>([`/actions/${id}`, 'GET'], axiosFetcher);

	const { data: categoriesData } = useOrgSWR<any>(['/categories', 'GET'], axiosFetcher);

	const isActionComplete = data?.action.steps.every(step => step.complete) && data?.action.ready_to_execute === true;

	const selectedAssignee = data?.action.assignee;

	const handleUpdateAction = async (updatedAction: Partial<ActionPayload['action']>) => {
		if (!data) return;

		const newAction: ActionPayload['action'] = {
			...data.action,
			...updatedAction,
		};

		const response = await axiosFetcher([getOrgSpecificUrl(`/actions/${data.id}`), 'PATCH', JSON.stringify(newAction)]);

		if (isAxiosError(response)) {
			logBrowser('Action failed to update', 'error', {
				newAction,
			});
		} else {
			await mutate();
			logBrowser('Action updated', 'info', {
				newAction,
			});
		}

		await globalMutate([getOrgSpecificUrl(`/actions`), 'GET']);
	};

	const handleClose = () => {
		const param = searchParams.get('actionId');
		if (param) {
			searchParams.delete('actionId');
			setSearchParams(searchParams);
		}
	};

	const handleAssigneeSelect = (assignee: User) => {
		handleUpdateAction({
			assignee: {
				name: assignee.name,
				family_name: assignee.family_name,
				given_name: assignee.given_name,
				picture: assignee.picture,
			},
		});
	};

	useEffect(() => {
		const reloadActions = async () => {
			await mutate();
			await globalMutate([getOrgSpecificUrl(`/actions`), 'GET']);
		};
		reloadActions();
	}, [searchParams]);

	// Find the label for an area of impact in the category data
	const getAreaOfImpactLabel = (area: string) => {
		// default to showing key if activity not found
		let label = area;

		Object.keys(categoriesData?.definition.categories ?? {}).forEach(categoryKey => {
			const category = categoriesData.definition.categories[categoryKey];

			Object.keys(category.subcategories).forEach(subcategoryKey => {
				const subcategory = category.subcategories[subcategoryKey];

				Object.keys(subcategory.activities).forEach(activityKey => {
					if (activityKey === area) {
						label = subcategory.activities[activityKey].activity_name;
					}
				});
			});
		});

		return <div className="ml-2 rounded-2xl bg-primary-300 py-2 px-4">{label}</div>;
	};

	if (error) {
		logBrowser(
			'Error fetching action',
			'error',
			{
				error,
			},
			error,
		);
		logError(error, ErrorType.SWRError);
		return null;
	}

	logBrowser('ActionDetail', 'info', { actionId: id });

	return (
		<Takeover
			show={show}
			setShow={setShow}
			isLoading={isLoading}
			header={{
				title: {
					text: data?.action.title || '',
				},
				dismiss: {
					dismissible: true,
					label: 'Close Action',
					onClick: handleClose,
				},
			}}
			className={'z-10'}
			fullScreenWidth={false}
			data-testid={'action-detail'}>
			<div className="flex gap-6 my-6">
				<div className="grid gap-6 flex-1 flex flex-col">
					{isActionComplete && (
						<CompletedBanner>
							<div className="font-bold text-xl leading-normal mb-2">Keep it up!</div>
							<div className="font-medium leading-normal text-sm">You've done everything you can here for now.</div>
						</CompletedBanner>
					)}
					<Card title="About this action" glow className="gap-0" data-testid={'action-detail-overview-card'}>
						<div className="flex h-full">
							<div>
								<div className="font-bold text-body leading-normal mt-4 mb-2">Objective</div>
								<div className="m-0 text-body leading-normal mb-4">{data?.action.overview}</div>
								<div className="m-0 text-body leading-normal">{data?.action.objective_description}</div>
								{data?.action.process_description && (
									<>
										<div className="font-bold text-body leading-normal mt-4 mb-2">How we're going to do it</div>
										<p className={'pl-1 text-body whitespace-pre-wrap'}>{data.action.process_description}</p>
									</>
								)}
								{data?.action.areas_of_impact && (
									<div className="flex items-center mt-10 text-xs font-medium leading-none">
										<span className="">Areas of impact:</span>
										{data?.action.areas_of_impact.map(area => getAreaOfImpactLabel(area))}
									</div>
								)}
							</div>
							<div
								className="min-w-[310px] max-w-[310px] h-full bg-cover bg-center bg-no-repeat rounded-lg ml-8"
								style={{
									backgroundImage: `url('${data?.action.image_url}')`,
								}}
							/>
						</div>
					</Card>
					{data && (
						<ActionDetailProgress
							actionPayload={data}
							setActionPayload={actionPayload => {
								handleUpdateAction(actionPayload.action);
							}}
						/>
					)}
				</div>
				<div className="w-[437px]">
					<div className="sticky top-[40px] w-full grid gap-6">
						<Card glow className="gap-0 p-0 overflow-visible" data-testid={'action-detail-assignee-card'}>
							<span className="p-4 w-full">
								{selectedAssignee && <div className="font-medium text-xs leading-none mb-2">Steward</div>}
								<UserSelectDropdown
									onSelect={handleAssigneeSelect}
									renderTrigger={() => (
										<span>
											<BaseButton variant={ButtonTypes.secondary} onClick={() => {}} className="w-full p-4 border border-bgc-accent bg-bgc-elevated">
												<span className="flex items-center justify-between">
													{selectedAssignee ? (
														<div className="flex items-center">
															<span className="mr-4">
																<Avatar size={GlobalSizes.xSmall} user={selectedAssignee} />
															</span>
															<span className="text-white font-bold text-sm leading-normal">{getFormattedUserName(selectedAssignee)}</span>
														</div>
													) : (
														'Add Steward'
													)}
													<ChevronDownIcon className="w-[18px] ml-2" />
												</span>
											</BaseButton>
										</span>
									)}
								/>
							</span>
							<div className="h-[1px] w-full bg-bgc-accent" />
							{data?.action.due_date && (
								<span className="font-medium leading-normal text-sm m-4 mb-0">Target Date: {DateTime.fromISO(data?.action.due_date).toFormat('MMMM d, y')}</span>
							)}
							<Dropdown
								inline
								label=""
								renderTrigger={() => (
									<span className="p-4 w-full">
										<BaseButton label={data?.action.due_date ? 'Edit Target Date' : 'Add Target Date'} variant={ButtonTypes.secondary} className="w-full" onClick={() => {}} />
									</span>
								)}
								arrowIcon={false}
								theme={flowbiteThemeOverride.dropdown}>
								<Datepicker
									inline
									minDate={new Date()}
									theme={flowbiteThemeOverride.datepicker}
									showClearButton={false}
									onSelectedDateChanged={date => {
										handleUpdateAction({
											due_date: date.toISOString(),
										});
									}}
									value={data?.action.due_date}
								/>
							</Dropdown>
						</Card>
						{data?.action.resources && (
							<Card title="Resources" glow className="gap-4" data-testid={'action-detail-resources-card'}>
								{data?.action.resources.map(resource => (
									<a
										target="_blank"
										rel="noreferrer"
										href={resource.url}
										className="w-full h-[70px] px-4 flex justify-between items-center bg-bgc-accent rounded-lg text-md font-bold leading-normal cursor-pointer">
										{resource.title} <ArrowRightIcon className="h-[20px]" />
									</a>
								))}
							</Card>
						)}
					</div>
				</div>
			</div>
		</Takeover>
	);
};

export const ActionDetail = withErrorBoundary(_ActionDetail, {
	FallbackComponent: props => <ErrorFallback {...props} />,
	onError: (error, info) => {
		console.error('Error occurred in ActionDetail: ', error);
	},
});
