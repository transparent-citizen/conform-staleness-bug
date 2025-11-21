import { parseSubmission, report, useForm } from "@conform-to/react/future";
import { coerceFormValue } from "@conform-to/zod/v4/future";
import type { ChangeEvent } from "react";
import { Form, useSubmit } from "react-router";
import z from "zod";

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

	const mealOptions = meals.map((meal) => ({
		label: meal.name,
		value: meal.id,
	}));

	const { mealId } = result.data || {};

	const sideDishes =
		meals.find((meal) => meal.id === mealId)?.sideDishes || [];

	// If the user has made a choice, select that side dish.
	// Otherwise, if there are multiple side dishes, select the first one.
	// Otheriwse, select none.
	const sideDishId =
		result.data?.sideDishId || sideDishes.length > 0
			? sideDishes[0]?.id
			: undefined;

	const sideDishOptions: SelectOption[] = sideDishes.map((sideDish) => ({
		label: sideDish.title,
		value: sideDish.id,
	}));

	const nextValue = {
		mealId: mealId ?? "",
		sideDishId: sideDishId ?? "",
	} satisfies z.input<typeof schema>;

	return {
		defaultValue: nextValue,
		lastResult: report(submission, {
			reset: true,
			targetValue: nextValue,
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
				<div className="text-lg">Select a meal</div>
				<div className="flex flex-col space-y-6">
					<Select
						defaultValue={fields.mealId.defaultValue}
						name={fields.mealId.name}
						onChange={onChange}
						options={loaderData.mealOptions}
					/>
				</div>
				<div className="flex justify-end">
					<button
						className="bg-blue-400 hover:bg-blue-300 rounded-sm p-2 mx-auto cursor-pointer"
						type="submit"
					>
						Get available side dishes
					</button>
				</div>
				<div className="text-lg">Select a side dish</div>
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
