import type { ComponentProps } from "react";

export type SelectOption = {
	label: string;
	value: string;
};

export const Select = ({
	options,
	...rest
}: ComponentProps<"select"> & { options: SelectOption[] }) => {
	return (
		<select className="bg-gray-300 p-2 rounded-md" {...rest}>
			<option value="">No selection</option>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{" "}
					{option.label}
				</option>
			))}
		</select>
	);
};
