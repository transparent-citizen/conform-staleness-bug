import type { BaseMetadata } from "@conform-to/react/future";
import { FormOptionsProvider } from "@conform-to/react/future";
import type { ComponentProps } from "react";
import { Outlet, Scripts } from "react-router";

export const defineCustomMetadata = <FieldShape, ErrorShape>(
	metadata: BaseMetadata<FieldShape, ErrorShape>,
) => {
	return {
		// get $$typeof() {
		// 	return undefined;
		// },
		// get [Symbol.toStringTag]() {
		// 	return "Object";
		// },
		get inputProps() {
			return {
				defaultValue: metadata.defaultValue,
				name: metadata.name,
				required: metadata.required,
			} satisfies ComponentProps<"input">;
		},
	};
};
declare module "@conform-to/react/future" {
	interface CustomMetadata<FieldShape, ErrorShape>
		extends ReturnType<
			typeof defineCustomMetadata<FieldShape, ErrorShape>
		> {}
}

export default () => {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8"></meta>
			</head>
			<body>
				<FormOptionsProvider
					defineCustomMetadata={defineCustomMetadata}
				>
					<Outlet />
				</FormOptionsProvider>
				<Scripts />
			</body>
		</html>
	);
};
