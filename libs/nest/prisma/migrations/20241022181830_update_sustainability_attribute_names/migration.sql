/*
Purpose: Update sustainability attribute names according to standardization requirements
Changes:
- Delete deprecated attributes
- Update names for clarity and consistency
- Include full names and abbreviations where applicable
Date: 2024-10-22
*/

-- Step 1: Delete deprecated attributes that are no longer needed
DELETE FROM sustainability_attributes
WHERE name IN (
   '1% for the Planet',
   'Altitude Sports',
   'FSC Certificate',
   'Globetrotter',
   'Yonderland'
  );

-- Step 2: Update existing attributes with standardized names
-- This includes expanding abbreviations and fixing typos
UPDATE sustainability_attributes
SET name = CASE name
  -- Organization names with expanded acronyms
   WHEN 'BEPI' THEN 'BEPI (Business Environmental Performance Initiative)'
   WHEN 'BIFMA Level' THEN 'BIFMA (Business and Institutional Furniture Manufacturers Association)'
   WHEN 'BSCI' THEN 'BSCI (Business Social Compliance Initiative)'
   WHEN 'ESG Policy' THEN 'ESG Policy (Environmental, Social, Governance)'
   WHEN 'FSC' THEN 'FSC (Forest Stewardship Council)'
   WHEN 'GOTS - Made with X% Organic' THEN 'GOTS Made with Organic (Global Organic Textile Standard)'
   WHEN 'GOTS - Organic' THEN 'GOTS Organic (Global Organic Textile Standard)'
   WHEN 'Oeko-Tex STeP' THEN 'Oeko-Tex STeP (Sustainable Textile and Leather Production)'
   WHEN 'Polycyclic aromatic hydrocarbons (PAH)' THEN 'PAH (Polycyclic Aromatic Hydrocarbons)'
   WHEN 'PEFC Programme for the Endorsement of Forest Certification (PEFC)' THEN 'PEFC (Programme for the Endorsement of Forest Certification)'
   WHEN 'REACH' THEN 'REACH Material (Registration, Evaluation, Authorisation and Restriction of Chemical)'
   WHEN 'SMETA Audit' THEN 'SMETA Audit (Sedex Members Ethical Trade Audit)'
   WHEN 'WFTO Fair Trade Standard' THEN 'WFTO Fair Trade Standard (World Fair Trade Organization)'
   WHEN 'ZDHC Chemical Management System' THEN 'ZDHC Chemical Management System (Zero Discharge of Hazardous Chemicals)'
   WHEN 'Adherence to ZDHC MRSL' THEN 'ZDHC MRSL (Zero Discharge of Hazardous Chemicals Manufacturing Restricted Substances List)'

  -- Acronym standardization
   WHEN 'Carbon Border Adjustment Mechanism (CBAM)' THEN 'CBAM (Carbon Border Adjustment Mechanism)'
   WHEN 'Digial Product Passport (DPP)' THEN 'DPP (Digital Product Passport)'
   WHEN 'Worldwide Responsible Accredited Production (WRAP)' THEN 'WRAP (Worldwide Responsible Accredited Production)'

  -- New acronyms
   WHEN 'Global Recycled Standard' THEN 'GRS (Global Recycled Standard)'
   WHEN 'Organic Content Standard' THEN 'OCS (Organic Content Standard)'
   WHEN 'Recycled Claim Standard' THEN 'RCS (Recycled Claim Standard)'
   WHEN 'Responsible Down Standard' THEN 'RDS (Responsible Down Standard)'
   WHEN 'Responsible Wool Standard' THEN 'RWS (Responsible Wool Standard)'

  -- Simple corrections
   WHEN 'Better Cotton Initative' THEN 'Better Cotton Initiative'
   WHEN 'Carbon Trust - Carbon Neutral Certification' THEN 'Carbon Trust Carbon Neutral Certification'
   WHEN 'Carbon Trust - Carbon Reduction Certification' THEN 'Carbon Trust Carbon Reduction Certification'
   WHEN 'Carbon Trust - Lower Co2 Lable' THEN 'Carbon Trust Lower Co2 Label'
   WHEN 'Climate Neutral - South Pole' THEN 'South Pole Climate Neutral'
   WHEN 'Fair Trade Quaterly Reporting' THEN 'Fair Trade Quarterly Reporting'
   WHEN 'REACH (Registration, Evaluation, Authorisation and Restriction of Chemical)' THEN 'REACH Product (Registration, Evaluation, Authorisation and Restriction of Chemical)'
   WHEN 'Uses Rewneable Energy' THEN 'Uses Renewable Energy'
  END
WHERE name IN (
   'BEPI',
   'Better Cotton Initative',
   'BIFMA Level',
   'BSCI',
   'Carbon Trust - Carbon Neutral Certification',
   'Carbon Trust - Carbon Reduction Certification',
   'Carbon Trust - Lower Co2 Lable',
   'Carbon Border Adjustment Mechanism (CBAM)',
   'Digial Product Passport (DPP)',
   'ESG Policy',
   'Fair Trade Quaterly Reporting',
   'FSC',
   'GOTS - Made with X% Organic',
   'GOTS - Organic',
   'Global Recycled Standard',
   'Organic Content Standard',
   'Oeko-Tex STeP',
   'Polycyclic aromatic hydrocarbons (PAH)',
   'PEFC Programme for the Endorsement of Forest Certification (PEFC)',
   'Recycled Claim Standard',
   'Responsible Down Standard',
   'REACH',
   'REACH (Registration, Evaluation, Authorisation and Restriction of Chemical)',
   'Responsible Wool Standard',
   'SMETA Audit',
   'Climate Neutral - South Pole',
   'Uses Rewneable Energy',
   'WFTO Fair Trade Standard',
   'Worldwide Responsible Accredited Production (WRAP)',
   'ZDHC Chemical Management System',
   'Adherence to ZDHC MRSL'
  );
