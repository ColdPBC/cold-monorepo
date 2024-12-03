import { Injectable } from '@nestjs/common';
import { z } from 'zod';

/*
 * Province Enums, Schemas, and Types
 */
export enum ProvinceNameByCodeEnum {
	CA_AB = 'Alberta, CA',
	CA_BC = 'British Columbia, CA',
	CA_MB = 'Manitoba, CA',
	CA_NB = 'New Brunswick, CA',
	CA_NL = 'Newfoundland and Labrador, CA',
	CA_NS = 'Nova Scotia, CA',
	CA_NT = 'Northwest Territories, CA',
	CA_NU = 'Nunavut, CA',
	CA_ON = 'Ontario, CA',
	CA_PE = 'Prince Edward Island, CA',
	CA_QC = 'Quebec, CA',
	CA_SK = 'Saskatchewan, CA',
	CA_YT = 'Yukon, CA',
}
export const ProvinceNameByCodeSchema = z.nativeEnum(ProvinceNameByCodeEnum);
export type ProvinceNameByCodeType = z.infer<typeof ProvinceNameByCodeSchema>;

export enum ProvinceCodeByNameEnum {
	'Alberta, CA' = 'CA_AB',
	'British Columbia, CA' = 'CA_BC',
	'Manitoba, CA' = 'CA_MB',
	'New Brunswick, CA' = 'CA_NB',
	'Newfoundland and Labrador, CA' = 'CA_NL',
	'Nova Scotia, CA' = 'CA_NS',
	'Northwest Territories, CA' = 'CA_NT',
	'Nunavut, CA' = 'CA_NU',
	'Ontario, CA' = 'CA_ON',
	'Prince Edward Island, CA' = 'CA_PE',
	'Quebec, CA' = 'CA_QC',
	'Saskatchewan, CA' = 'CA_SK',
	'Yukon, CA' = 'CA_YT',
}
export const ProvinceCodeByNameSchema = z.nativeEnum(ProvinceCodeByNameEnum);
export type ProvinceCodeByNameType = z.infer<typeof ProvinceCodeByNameSchema>;

/*
 * Region Enums, Schemas, and Types
 */
export enum RegionNameByCodeEnum {
	AFRICA = 'Africa',
	EU = 'European Union',
	EU_S_AMERICA = 'Europe and South America',
	GLOBAL = 'Global',
	MIDDLE_EAST = 'Middle East',
	N_AMERICA = 'North America',
	OCEANIA = 'Oceania',
	OTHER_ASIA = 'Other Asia',
	ROW = 'Rest-of-World',
	ROW_WA = 'Central Asia and Pacific Asia, Oceania, Antarctica',
	ROW_WE = 'East Europe and Iceland',
	ROW_WF = 'Africa except Egypt and South Africa',
	ROW_WL = 'Latin America except Brazil',
	ROW_WM = 'Middle East, Asia and Egypt',
	WEU = 'Western Europe',
}
export const RegionNameByCodeSchema = z.nativeEnum(RegionNameByCodeEnum);
export type RegionNameByCodeType = z.infer<typeof RegionNameByCodeSchema>;

export enum RegionCodeByNameEnum {
	'Viet Nam' = 'VN',
	'Africa' = 'AFRICA',
	'European Union' = 'EU',
	'Europe and South America' = 'EU_S_AMERICA',
	'Global' = 'GLOBAL',
	'Middle East' = 'MIDDLE_EAST',
	'North America' = 'N_AMERICA',
	'Other Asia' = 'OTHER_ASIA',
	'Rest-of-World' = 'ROW',
	'Central Asia and Pacific Asia, Oceania, Antarctica' = 'ROW_WA',
	'East Europe and Iceland' = 'ROW_WE',
	'Africa except Egypt and South Africa' = 'ROW_WF',
	'Latin America except Brazil' = 'ROW_WL',
	'Middle East, Asia and Egypt' = 'ROW_WM',
	'Western Europe' = 'WEU',
}
export const RegionCodeByNameSchema = z.nativeEnum(RegionCodeByNameEnum);
export type RegionCodeByNameType = z.infer<typeof RegionCodeByNameSchema>;

/*
 * Country Enums, Schemas, and Types
 */
export enum CountryNameByCodeEnum {
	AE = 'United Arab Emirates (the)',
	AF = 'Afghanistan',
	AL = 'Albania',
	AM = 'Armenia',
	AO = 'Angola',
	AR = 'Argentina',
	AT = 'Austria',
	AU = 'Australia',
	AZ = 'Azerbaijan',
	BA = 'Bosnia and Herzegovina',
	BB = 'Barbados',
	BD = 'Bangladesh',
	BE = 'Belgium',
	BG = 'Bulgaria',
	BH = 'Bahrain',
	BJ = 'Benin',
	BO = 'Bolivia, Plurinational State of',
	BR = 'Brazil',
	BT = 'Bhutan',
	BW = 'Botswana',
	BY = 'Belarus',
	CA = 'Canada',
	CD = 'Congo, The Democratic Republic of the',
	CG = 'Congo',
	CH = 'Switzerland',
	CL = 'Chile',
	CM = 'Cameroon',
	CN = 'China',
	CO = 'Colombia',
	CR = 'Costa Rica',
	CU = 'Cuba',
	CY = 'Cyprus',
	CZ = 'Czechia',
	DE = 'Germany',
	DJ = 'Djibouti',
	DK = 'Denmark',
	DZ = 'Algeria',
	EC = 'Ecuador',
	EE = 'Estonia',
	EG = 'Egypt',
	ER = 'Eritrea',
	ES = 'Spain',
	ET = 'Ethiopia',
	FI = 'Finland',
	FR = 'France',
	GA = 'Gabon',
	GB = 'United Kingdom',
	GE = 'Georgia',
	GH = 'Ghana',
	GN = 'Guinea',
	GR = 'Greece',
	GT = 'Guatemala',
	GY = 'Guyana',
	HN = 'Honduras',
	HR = 'Croatia',
	HT = 'Haiti',
	HU = 'Hungary',
	ID = 'Indonesia',
	IE = 'Ireland',
	IL = 'Israel',
	IN = 'India',
	IQ = 'Iraq',
	IR = 'Iran, Islamic Republic of',
	IS = 'Iceland',
	IT = 'Italy',
	JM = 'Jamaica',
	JO = 'Jordan',
	JP = 'Japan',
	KE = 'Kenya',
	KG = 'Kyrgyzstan',
	KH = 'Cambodia',
	KP = "Korea, Democratic People's Republic of",
	KR = 'Korea, Republic of',
	KW = 'Kuwait',
	KZ = 'Kazakhstan',
	LA = "Lao People's Democratic Republic",
	LB = 'Lebanon',
	LK = 'Sri Lanka',
	LR = 'Liberia',
	LT = 'Lithuania',
	LU = 'Luxembourg',
	LV = 'Latvia',
	LY = 'Libya',
	MA = 'Morocco',
	MD = 'Moldova, Republic of',
	ME = 'Montenegro',
	MK = 'North Macedonia',
	MM = 'Myanmar',
	MN = 'Mongolia',
	MR = 'Mauritania',
	MT = 'Malta',
	MW = 'Malawi',
	MX = 'Mexico',
	MY = 'Malaysia',
	MZ = 'Mozambique',
	NA = 'Namibia',
	NE = 'Niger',
	NG = 'Nigeria',
	NI = 'Nicaragua',
	NL = 'Netherlands',
	NO = 'Norway',
	NP = 'Nepal',
	NZ = 'New Zealand',
	OM = 'Oman',
	PA = 'Panama',
	PE = 'Peru',
	PG = 'Papua New Guinea',
	PH = 'Philippines (the)',
	PK = 'Pakistan',
	PL = 'Poland',
	PT = 'Portugal',
	PY = 'Paraguay',
	QA = 'Qatar',
	RO = 'Romania',
	RS = 'Serbia',
	RU = 'Russian Federation (the)',
	RW = 'Rwanda',
	SA = 'Saudi Arabia',
	SB = 'Solomon Islands',
	SD = 'Sudan (the)',
	SE = 'Sweden',
	SG = 'Singapore',
	SI = 'Slovenia',
	SK = 'Slovakia',
	SL = 'Sierra Leone',
	SN = 'Senegal',
	SR = 'Suriname',
	SV = 'El Salvador',
	SY = 'Syrian Arab Republic (the)',
	SZ = 'Eswatini',
	TD = 'Chad',
	TG = 'Togo',
	TH = 'Thailand',
	TJ = 'Tajikistan',
	TM = 'Turkmenistan',
	TN = 'Tunisia',
	TR = 'Türkiye',
	TT = 'Trinidad and Tobago',
	TW = 'Taiwan (Province of China)',
	TZ = 'Tanzania, United Republic of',
	UA = 'Ukraine',
	UG = 'Uganda',
	US = 'United States of America (the)',
	UY = 'Uruguay',
	UZ = 'Uzbekistan',
	VA = 'Holy See (Vatican City State)',
	VE = 'Venezuela (Bolivarian Republic of)',
	VN = 'Viet Nam',
	YE = 'Yemen',
	ZA = 'South Africa',
	ZM = 'Zambia',
	ZW = 'Zimbabwe',
}
export enum CountryCodeByNameEnum {
	'United Arab Emirates (the)' = 'AE',
	'Afghanistan' = 'AF',
	'Albania' = 'AL',
	'Armenia' = 'AM',
	'Angola' = 'AO',
	'Argentina' = 'AR',
	'Austria' = 'AT',
	'Australia' = 'AU',
	'Azerbaijan' = 'AZ',
	'Bosnia and Herzegovina' = 'BA',
	'Barbados' = 'BB',
	'Bangladesh' = 'BD',
	'Belgium' = 'BE',
	'Bulgaria' = 'BG',
	'Bahrain' = 'BH',
	'Benin' = 'BJ',
	'Bolivia, Plurinational State of' = 'BO',
	'Brazil' = 'BR',
	'Bhutan' = 'BT',
	'Botswana' = 'BW',
	'Belarus' = 'BY',
	'Canada' = 'CA',
	'Congo, The Democratic Republic of the' = 'CD',
	'Congo' = 'CG',
	'Switzerland' = 'CH',
	'Chile' = 'CL',
	'Cameroon' = 'CM',
	'China' = 'CN',
	'Colombia' = 'CO',
	'Costa Rica' = 'CR',
	'Cuba' = 'CU',
	'Cyprus' = 'CY',
	'Czechia' = 'CZ',
	'Germany' = 'DE',
	'Djibouti' = 'DJ',
	'Denmark' = 'DK',
	'Algeria' = 'DZ',
	'Ecuador' = 'EC',
	'Estonia' = 'EE',
	'Egypt' = 'EG',
	'Eritrea' = 'ER',
	'Spain' = 'ES',
	'Ethiopia' = 'ET',
	'Finland' = 'FI',
	'France' = 'FR',
	'Gabon' = 'GA',
	'United Kingdom' = 'GB',
	'Georgia' = 'GE',
	'Ghana' = 'GH',
	'Guinea' = 'GN',
	'Greece' = 'GR',
	'Guatemala' = 'GT',
	'Guyana' = 'GY',
	'Honduras' = 'HN',
	'Croatia' = 'HR',
	'Haiti' = 'HT',
	'Hungary' = 'HU',
	'Indonesia' = 'ID',
	'Ireland' = 'IE',
	'Israel' = 'IL',
	'India' = 'IN',
	'Iraq' = 'IQ',
	'Iran, Islamic Republic of' = 'IR',
	'Iceland' = 'IS',
	'Italy' = 'IT',
	'Jamaica' = 'JM',
	'Jordan' = 'JO',
	'Japan' = 'JP',
	'Kenya' = 'KE',
	'Kyrgyzstan' = 'KG',
	'Cambodia' = 'KH',
	"Korea, Democratic People's Republic of" = 'KP',
	'Korea, Republic of' = 'KR',
	'Kuwait' = 'KW',
	'Kazakhstan' = 'KZ',
	"Lao People's Democratic Republic" = 'LA',
	'Lebanon' = 'LB',
	'Sri Lanka' = 'LK',
	'Liberia' = 'LR',
	'Lithuania' = 'LT',
	'Luxembourg' = 'LU',
	'Latvia' = 'LV',
	'Libya' = 'LY',
	'Morocco' = 'MA',
	'Moldova, Republic of' = 'MD',
	'Montenegro' = 'ME',
	'North Macedonia' = 'MK',
	'Myanmar' = 'MM',
	'Mongolia' = 'MN',
	'Mauritania' = 'MR',
	'Malta' = 'MT',
	'Malawi' = 'MW',
	'Mexico' = 'MX',
	'Malaysia' = 'MY',
	'Mozambique' = 'MZ',
	'Namibia' = 'NA',
	'Niger' = 'NE',
	'Nigeria' = 'NG',
	'Nicaragua' = 'NI',
	'Netherlands' = 'NL',
	'Norway' = 'NO',
	'Nepal' = 'NP',
	'New Zealand' = 'NZ',
	'Oceania' = 'OCEANIA',
	'Oman' = 'OM',
	'Panama' = 'PA',
	'Peru' = 'PE',
	'Papua New Guinea' = 'PG',
	'Philippines (the)' = 'PH',
	'Pakistan' = 'PK',
	'Poland' = 'PL',
	'Portugal' = 'PT',
	'Paraguay' = 'PY',
	'Qatar' = 'QA',
	'Romania' = 'RO',
	'Serbia' = 'RS',
	'Russian Federation (the)' = 'RU',
	'Rwanda' = 'RW',
	'Saudi Arabia' = 'SA',
	'Solomon Islands' = 'SB',
	'Sudan (the)' = 'SD',
	'Sweden' = 'SE',
	'Singapore' = 'SG',
	'Slovenia' = 'SI',
	'Slovakia' = 'SK',
	'Sierra Leone' = 'SL',
	'Senegal' = 'SN',
	'Suriname' = 'SR',
	'El Salvador' = 'SV',
	'Syrian Arab Republic (the)' = 'SY',
	'Eswatini' = 'SZ',
	'Chad' = 'TD',
	'Togo' = 'TG',
	'Thailand' = 'TH',
	'Tajikistan' = 'TJ',
	'Turkmenistan' = 'TM',
	'Tunisia' = 'TN',
	'Turkiye' = 'TR',
	'Trinidad and Tobago' = 'TT',
	'Taiwan (Province of China)' = 'TW',
	'Tanzania, United Republic of' = 'TZ',
	'Ukraine' = 'UA',
	'Uganda' = 'UG',
	'United States of America (the)' = 'US',
	'Uruguay' = 'UY',
	'Uzbekistan' = 'UZ',
	'Holy See (Vatican City State)' = 'VA',
	'Venezuela (Bolivarian Republic of)' = 'VE',
	'Yemen' = 'YE',
	'South Africa' = 'ZA',
	'Zambia' = 'ZM',
	'Zimbabwe' = 'ZW',
}

export const CountryNameByCodeSchema = z.nativeEnum(CountryNameByCodeEnum);
export const CountryCodeByNameSchema = z.nativeEnum(CountryCodeByNameEnum);

export type CountryNameByCodeType = z.infer<typeof CountryNameByCodeSchema>;
export type CountryCodeByNameType = z.infer<typeof CountryCodeByNameSchema>;

/**
 * Countries Service class!
 */
@Injectable()
export class CountriesService {
	/**
	 * Get the province name by code
	 * @param id
	 */
	getProvinceNameByCode(id: ProvinceNameByCodeType): ProvinceNameByCodeType {
		return ProvinceNameByCodeEnum[id];
	}

	/**
	 * Get the province code by name
	 * @param name
	 */
	getProvinceCodeByName(name: ProvinceCodeByNameType): ProvinceCodeByNameType {
		return ProvinceCodeByNameEnum[name];
	}

	/**
	 * Find a province code by partial name
	 * @param partialName
	 */
	findProvinceCodeByName(partialName: string): { id: string; name: string }[] {
		const matches: { id: string; name: string }[] = [];
		const lowerPartialName = partialName.toLowerCase();

		for (const [name, id] of Object.entries(ProvinceCodeByNameEnum)) {
			if (name.toLowerCase().includes(lowerPartialName)) {
				matches.push({ id, name });
			}
		}

		return matches;
	}

	/**
	 * Get the region name by code
	 * @param id
	 */
	getRegionNameByCode(id: RegionNameByCodeType): RegionNameByCodeType {
		return RegionNameByCodeEnum[id];
	}

	/**
	 * Get the region code by name
	 * @param name
	 */
	getRegionCodeByName(name: RegionCodeByNameType): RegionCodeByNameType {
		return RegionCodeByNameEnum[name];
	}

	/**
	 * Find a region code by partial name
	 * @param partialName
	 */

	findRegionCodeByName(partialName: string): { id: string; name: string }[] {
		const matches: { id: string; name: string }[] = [];
		const lowerPartialName = partialName.toLowerCase();

		for (const [name, id] of Object.entries(RegionCodeByNameEnum)) {
			if (name.toLowerCase().includes(lowerPartialName)) {
				matches.push({ id, name });
			}
		}

		return matches;
	}

	/**
	 * Get the country name by code
	 * @param id
	 */
	getCountryNameByCode(id: CountryNameByCodeType): CountryNameByCodeType {
		return CountryNameByCodeEnum[id];
	}

	/**
	 * Get the country code by name
	 * @param name
	 */
	getCountryCodeByName(name: CountryCodeByNameType): CountryCodeByNameType {
		return CountryCodeByNameEnum[name];
	}

	/**
	 * Find a country code by partial name
	 * @param partialName
	 */
	findCountryCodeByName(partialName: string): { id: string; name: string }[] {
		const matches: { id: string; name: string }[] = [];
		const lowerPartialName = partialName.toLowerCase();

		for (const [name, id] of Object.entries(CountryCodeByNameEnum)) {
			if (name.toLowerCase().includes(lowerPartialName)) {
				matches.push({ id, name });
			}
		}

		return matches;
	}
}
