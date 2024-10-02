import { convertLocalDateToUTC } from './date_utils';
import { GuidPrefixes } from '../cuid/compliance.enums';
import { Cuid2Generator } from '../cuid/cuid2-generator.service';

export function setEntityDefaults(args: any, prefix: GuidPrefixes) {
	for (const item of args.items) {
		setEntityDefaultDates(item);
		item.id = new Cuid2Generator(prefix).scopedId;
	}
}

export function setEntityDefaultDates(item: any) {
	const today = new Date();

	item.createdAt = convertLocalDateToUTC(today);
	item.updatedAt = convertLocalDateToUTC(today);

	return item;
}
