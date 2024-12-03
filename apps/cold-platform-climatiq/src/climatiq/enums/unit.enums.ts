import * as z from 'zod';

export enum AreaUnits {
	m2 = 'm2',
	km2 = 'km2',
	ft2 = 'ft2',
	ha = 'ha',
}

export enum DistanceUnits {
	m = 'm',
	km = 'km',
	ft = 'ft',
	mi = 'mi',
	nmi = 'nmi',
}

export enum TimeUnits {
	ms = 'ms',
	s = 's',
	m = 'm',
	h = 'h',
	day = 'day',
	year = 'year',
}

export enum DataUnits {
	MB = 'MB',
	GB = 'GB',
	TB = 'TB',
}

export enum MoneyUnits {
	usd = 'usd',
	afn = 'afn',
	dzd = 'dzd',
	ars = 'ars',
	aud = 'aud',
	bhd = 'bhd',
	brl = 'brl',
	cad = 'cad',
	kyd = 'kyd',
	cny = 'cny',
	dkk = 'dkk',
	egp = 'egp',
	eur = 'eur',
	hkd = 'hkd',
	huf = 'huf',
	isk = 'isk',
	inr = 'inr',
	iqd = 'iqd',
	ils = 'ils',
	jpy = 'jpy',
	lbp = 'lbp',
	mxn = 'mxn',
	mad = 'mad',
	nzd = 'nzd',
	nok = 'nok',
	qar = 'qar',
	rub = 'rub',
	sar = 'sar',
	sgd = 'sgd',
	zar = 'zar',
	krw = 'krw',
	sek = 'sek',
	chf = 'chf',
	thb = 'thb',
	twd = 'twd',
	tnd = 'tnd',
	try = 'try',
	aed = 'aed',
	gbp = 'gbp',
}

export enum VolumeUnits {
	l = 'l',
	ml = 'ml',
	m3 = 'm3',
	standard_cubic_foot = 'standard_cubic_foot',
	gallon_us = 'gallon_us',
	bbl = 'bbl',
}

export enum WeightUnits {
	g = 'g',
	kg = 'kg',
	t = 't',
	ton = 'ton',
	lb = 'lb',
}

export enum EnergyUnits {
	Wh = 'Wh',
	kWh = 'kWh',
	MWh = 'MWh',
	MJ = 'MJ',
	GJ = 'GJ',
	TJ = 'TJ',
	BTU = 'BTU',
	therm = 'therm',
	MMBTU = 'MMBTU',
}

export const AreaUnitsSchema = z.nativeEnum(AreaUnits);
export const DistanceUnitsSchema = z.nativeEnum(DistanceUnits);
export const TimeUnitsSchema = z.nativeEnum(TimeUnits);
export const DataUnitsSchema = z.nativeEnum(DataUnits);
export const MoneyUnitsSchema = z.nativeEnum(MoneyUnits);
export const VolumeUnitsSchema = z.nativeEnum(VolumeUnits);
export const WeightUnitsSchema = z.nativeEnum(WeightUnits);
export const EnergyUnitsSchema = z.nativeEnum(EnergyUnits);
