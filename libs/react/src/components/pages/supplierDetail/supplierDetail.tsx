import { useParams } from 'react-router-dom';
import { getClaimsMock, getSupplierMock } from '@coldpbc/mocks';
import { find } from 'lodash';
import { BaseButton, ColdIcon, Input, MainContent, SupplierCertificates, SupplierDetailSidebar, Suppliers } from '@coldpbc/components';
import { ButtonTypes, CertificationStatus, IconNames } from '@coldpbc/enums';
import React, { useState } from 'react';
import opacity from 'hex-color-opacity';
import { HexColors } from '@coldpbc/themes';
import { c } from 'msw/lib/glossary-de6278a9';
import { getDateActiveStatus } from '@coldpbc/lib';
import { isDefined } from 'class-validator';

export const SupplierDetail = () => {
  const { id } = useParams();
  const supplierData = find(getSupplierMock(), supplier => supplier.id === id);
  const claims = getClaimsMock();
  const [supplier, setSupplier] = useState(supplierData);
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null);

  const deleteSupplier = () => {};
  const saveSupplier = () => {};

  const pageButtons = () => {
    return (
      <div className={'flex flex-row gap-[16px] h-[36px]'}>
        <BaseButton onClick={deleteSupplier} label={'Delete'} variant={ButtonTypes.warning} />
        <BaseButton onClick={saveSupplier} label={'Save'} />
      </div>
    );
  };

  let claimData: {
    name: string;
    label: string;
    activeDocuments: {
      name: string;
      expirationDate: string | null;
      status: string;
      type: string;
    }[];
    expiredDocuments: {
      name: string;
      expirationDate: string | null;
      status: string;
      type: string;
    }[];
  } | null = null;
  if (selectedClaim && supplier?.certificate_claims && isDefined(supplier?.certificate_claims[selectedClaim])) {
    const documentsWithNoDates = supplier.certificate_claims[selectedClaim].documents
      .filter(document => document.expiration_date === null)
      .map(document => {
        return {
          name: document.name,
          expirationDate: null,
          status: CertificationStatus.InActive,
          type: document.type,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    claimData = {
      name: selectedClaim,
      label: find(claims, claim => claim.name === selectedClaim)?.label || '',
      activeDocuments: supplier.certificate_claims[selectedClaim].documents
        .filter(document => document.expiration_date !== null)
        .filter(document => getDateActiveStatus(document.expiration_date) !== 'Expired')
        .map(document => ({
          name: document.name,
          expirationDate: document.expiration_date,
          status: getDateActiveStatus(document.expiration_date),
          type: document.type,
        }))
        .sort((a, b) => {
          if (a.expirationDate && b.expirationDate) {
            return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
          } else {
            return 0;
          }
        }),
      expiredDocuments: supplier.certificate_claims[selectedClaim].documents
        .filter(document => document.expiration_date !== null)
        .filter(document => getDateActiveStatus(document.expiration_date) === 'Expired')
        .map(document => ({
          name: document.name,
          expirationDate: document.expiration_date,
          status: getDateActiveStatus(document.expiration_date),
          type: document.type,
        }))
        .sort((a, b) => {
          if (a.expirationDate && b.expirationDate) {
            return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
          } else {
            return 0;
          }
        })
        .concat(...documentsWithNoDates),
    };
  } else {
    claimData = null;
  }

  if (!supplier)
    return (
      <div className={'w-[1199px] flex flex-col gap-[24px] text-tc-primary relative'}>
        <div className={'w-full px-[16px] py-[8px] bg-gray-70'}></div>
        <div className={'w-full flex flex-col gap-[40px] px-[64px]'}>
          <div className={'w-full text-h2'}>Supplier Not Found</div>
        </div>
      </div>
    );

  return (
    <>
      <div className={'w-full h-full flex flex-col items-center gap-[24px] text-tc-primary relative'}>
        <div
          className={'w-full px-[16px] flex flex-row py-[8px]'}
          style={{
            backgroundColor: opacity(HexColors.gray['30'], 0.5),
          }}>
          Suppliers {'>'} {supplier.name}
        </div>
        <div className={'w-[1199px] flex flex-col gap-[40px] px-[64px]'}>
          <div className={'w-full flex flex-row justify-between items-center'}>
            <div className={'text-h2 w-full'}>{supplier.name}</div>
            {pageButtons()}
          </div>
          <div className={'w-full mb-[40px] flex flex-col gap-[12px]'}>
            <Input
              input_label={'Name'}
              input_props={{
                name: 'name',
                value: supplier.name,
                onChange: e => setSupplier({ ...supplier, name: e.target.value }),
                onValueChange: e => setSupplier({ ...supplier, name: e.value }),
                className: 'py-2 rounded-[8px]',
              }}
              input_label_props={{ className: 'w-[77px] flex items-center' }}
              container_classname={'gap-[10px] flex flex-row w-full justify-between'}
            />
            <Input
              input_label={'Address 1'}
              input_props={{
                name: 'address_1',
                value: supplier.address_1,
                onChange: e => setSupplier({ ...supplier, address_1: e.target.value }),
                onValueChange: e => setSupplier({ ...supplier, address_1: e.value }),
                className: 'py-2 rounded-[8px]',
              }}
              input_label_props={{ className: 'w-[77px] flex items-center' }}
              container_classname={'gap-[10px] flex flex-row w-full justify-between'}
            />
            <Input
              input_label={'Address 2'}
              input_props={{
                name: 'address_2',
                value: supplier.address_2,
                onChange: e => setSupplier({ ...supplier, address_2: e.target.value }),
                onValueChange: e => setSupplier({ ...supplier, address_2: e.value }),
                className: 'py-2 rounded-[8px]',
              }}
              input_label_props={{ className: 'w-[77px] flex items-center' }}
              container_classname={'gap-[10px] flex flex-row w-full justify-between'}
            />
            <Input
              input_label={'City'}
              input_props={{
                name: 'city',
                value: supplier.city,
                onChange: e => setSupplier({ ...supplier, city: e.target.value }),
                onValueChange: e => setSupplier({ ...supplier, city: e.value }),
                className: 'py-2 rounded-[8px]',
              }}
              input_label_props={{ className: 'w-[77px] flex items-center' }}
              container_classname={'gap-[10px] flex flex-row w-full justify-between'}
            />
            <Input
              input_label={'Country'}
              input_props={{
                name: 'country',
                value: supplier.country,
                onChange: e => setSupplier({ ...supplier, country: e.target.value }),
                onValueChange: e => setSupplier({ ...supplier, country: e.value }),
                className: 'py-2 rounded-[8px]',
              }}
              input_label_props={{ className: 'w-[77px] flex items-center' }}
              container_classname={'gap-[10px] flex flex-row w-full justify-between'}
            />
          </div>
          <div>
            <SupplierCertificates
              id={supplier.id}
              showSupplierCertificateDetails={id => {
                if (id === selectedClaim) {
                  setSelectedClaim(null);
                } else {
                  setSelectedClaim(id);
                }
              }}
            />
          </div>
        </div>
        <SupplierDetailSidebar
          selectedClaim={claimData}
          setSelectedClaim={claim => {
            setSelectedClaim(claim);
          }}
        />
      </div>
    </>
  );
};
