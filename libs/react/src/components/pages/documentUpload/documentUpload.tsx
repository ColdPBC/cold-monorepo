import React from 'react';
import { AppContent, Avatar, BaseButton, Card, Datagrid } from "@coldpbc/components";
import { ButtonTypes, GlobalSizes } from "@coldpbc/enums";

export const DocumentUpload = () => {
  const uploadDocument = () => {
    console.log("upload document");
  };

  const deleteDocument = () => {
    console.log("delete document");
  };

  const data = [
    {
      name: (
        <div className="flex items-center text-tc-primary">
          billing
        </div>
      ),
      type: (
        <span className="text-white font-medium text-sm leading-normal">
          docx
        </span>
      ),
      delete: (
        <span className={"flex items-center"}>
          <BaseButton
            size={GlobalSizes.medium}
            variant={ButtonTypes.secondary}
            onClick={() => {
              deleteDocument();
            }}
            label={"Delete"}
          />
        </span>
      ),
    }
  ]

  return (
    <AppContent title="Documents">
      <Card
        title={"Documents List"}
        ctas={[
          {
            text: "Upload Documents",
            variant: ButtonTypes.primary,
            action: () => {
              uploadDocument();
            },
          },
        ]}
        className={"w-full"}
      >
        <Datagrid definitionURL={'/components/documents_list_table'} items={data} />
      </Card>
    </AppContent>
  )
}
