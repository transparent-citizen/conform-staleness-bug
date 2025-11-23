import {
	type DefaultValue,
	parseSubmission,
	report,
	useForm,
} from "@conform-to/react/future";
import { coerceFormValue } from "@conform-to/zod/v4/future";
import type { ChangeEvent } from "react";
import { Form, redirect, useSubmit } from "react-router";
import { z } from "zod";

import { Select, type SelectOption } from "../../app/components/Select";
import { meals } from "../../app/meals";
import type { Route } from "./+types/index";

const schema = coerceFormValue(
	z.object({
		mealId: z.string().optional(),
		sideDishId: z.string().optional(),
	}),
);

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url);
	const submission = parseSubmission(url.searchParams);
	const result = schema.safeParse(submission.payload);

	const mealId = result.data?.mealId;
	const sideDishId = result.data?.sideDishId;

	const mealOptions: SelectOption[] = meals.map((meal) => ({
		label: meal.name,
		value: meal.id,
	}));

	const meal = meals.find((meal) => meal.id === mealId);

	// Delete unrecognized mealId from URL
	if (mealId !== undefined) {
		if (!meals.find((_meal) => _meal.id === mealId)) {
			url.searchParams.delete("mealId");
			throw redirect(url.href);
		}
	}

	// Delete sideDishId from URL if it doesn't belong to the meal
	if (
		meal &&
		sideDishId !== undefined &&
		!meal.sideDishes.some((sideDish) => sideDish.id === sideDishId)
	) {
		url.searchParams.delete("sideDishId");
		throw redirect(url.href);
	}

	// Set sideDishId in URL if there is only a single side dish available
	if (meal && sideDishId === undefined) {
		if (meal.sideDishes.length === 1) {
			url.searchParams.set("sideDishId", String(meal.sideDishes[0].id));
			throw redirect(url.href);
		}
	}

	// Delete sideDishId from URL if mealId is missing
	if (mealId === undefined && sideDishId !== undefined) {
		url.searchParams.delete("sideDishId");
		throw redirect(url.href);
	}

	const sideDishOptions: SelectOption[] = (meal?.sideDishes || []).map(
		(_sideDish) => ({
			label: _sideDish.title,
			value: _sideDish.id,
		}),
	);

	const nextValue = {
		mealId: mealId ?? "",
		sideDishId: sideDishId ?? "",
	} satisfies DefaultValue<z.input<typeof schema>>;

	return {
		defaultValue: nextValue,
		lastResult: report(submission, {
			reset: true,
			value: nextValue,
		}),
		sideDishOptions,
		mealOptions,
	};
};

export default ({ loaderData }: Route.ComponentProps) => {
	const { fields, form } = useForm({
		defaultValue: loaderData.defaultValue,
		lastResult: loaderData.lastResult,
		schema,
	});

	const submit = useSubmit();

	const onChange = (
		event: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
	) => {
		submit(event.target.form, {
			replace: true,
		});
	};

	return (
		<Form className="self-center" {...form.props}>
			<div className="w-96 mx-auto flex flex-col gap-4 mt-20">
				<div className="text-lg">Select a meal 🍔</div>
				<Select
					defaultValue={fields.mealId.defaultValue}
					name={fields.mealId.name}
					onChange={onChange}
					options={loaderData.mealOptions}
				/>
				<div className="flex justify-end">
					<button
						className="bg-blue-400 hover:bg-blue-300 rounded-sm p-2 mx-auto cursor-pointer"
						type="submit"
					>
						Get available side dishes
					</button>
				</div>
				<div className="text-lg">Select a side dish 🥣</div>
				<Select
					defaultValue={fields.sideDishId.defaultValue}
					name={fields.sideDishId.name}
					options={loaderData.sideDishOptions}
				/>
				<div className="mt-8">
					<b>lastResult.targetValue</b>
					<div className="bg-blue-950 text-amber-500 p-2">
						{JSON.stringify(loaderData.lastResult.targetValue)}
					</div>
				</div>
			</div>
		</Form>
	);
};
