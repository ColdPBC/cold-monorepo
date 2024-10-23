export function getDocumentsListTableMock() {
	return {
		id: '66b2ff76-39cb-4a0d-83c7-951d34f3f653',
		name: 'documents_list_table',
		description: 'Provides details for the table of documents',
		created_at: '2023-05-21T19:47:11.390Z',
		updated_at: '2023-05-21T19:47:11.969Z',
		definition: {
			items: [
				{
					field: 'name',
					headerStyle: 'py-4',
					headerTitle: 'Document Name',
				},
				{
					field: 'type',
					headerStyle: 'py-4',
					headerTitle: 'Document Type',
				},
			],
		},
	};
}
