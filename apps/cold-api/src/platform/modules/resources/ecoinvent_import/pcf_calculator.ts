// Define a type to hold the details of each activity
import { BaseWorker } from '@coldpbc/nest';

type Activity = {
	name: string;
	quantity: number; // The amount of activity used per functional unit
	impactFactor: number; // Emission factor (e.g., kg CO₂-eq per unit)
};

export class ProductCarbonFootprintCalculator extends BaseWorker {
	private activities: Activity[] = [];

	constructor() {
		super(ProductCarbonFootprintCalculator.name);
	}

	/**
	 * Adds an activity with its associated quantity and impact factor.
	 * @param name - The descriptive name of the activity.
	 * @param quantity - The amount of the activity used per product unit.
	 * @param impactFactor - The CO₂-equivalent impact per unit.
	 */
	public addActivity(name: string, quantity: number, impactFactor: number): number {
		this.activities.push({ name, quantity, impactFactor });
		return quantity * impactFactor;
	}

	/**
	 * Calculates the total product carbon footprint by summing the impacts
	 * from each activity.
	 * @returns The total carbon footprint in kg CO₂-eq.
	 */
	public calculateTotal(): number {
		return this.activities.reduce((total, activity) => {
			return total + activity.quantity * activity.impactFactor;
		}, 0);
	}

	/**
	 * Provides a detailed breakdown of the carbon impact of each activity.
	 * @returns An array of objects with activity name and its carbon impact.
	 */
	public getBreakdown(): { name: string; impact: number }[] {
		return this.activities.map(activity => ({
			name: activity.name,
			impact: activity.quantity * activity.impactFactor,
		}));
	}
}
