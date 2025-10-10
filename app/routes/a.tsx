import type { FieldMetadata } from "@conform-to/react/future";
import { useForm } from "@conform-to/react/future";
import { z } from "zod";

import { nodeData } from "../nodeData";

type NodeData = {
	tree?: NodeData[];
	id: number;
};

type NodeProps = {
	field: FieldMetadata<unknown>;
	nodeData?: NodeData;
};

const Node = ({ field, nodeData }: NodeProps) => {
	if (!nodeData?.tree) {
		return <small style={{ marginLeft: "1rem" }}>(leaf)</small>;
	}
	return (
		<ul
			style={{
				background: "hsla(210 100% 20% / 0.1)",
				marginBottom: "2rem",
			}}
		>
			{nodeData?.tree?.map((child) => (
				<li key={child.id}>
					Node {child.id}
					<Node field={field} key={child.id} nodeData={child} />
				</li>
			))}
		</ul>
	);
};

export default () => {
	const { fields } = useForm({
		schema: z.object({
			a: z.string(),
			b: z.string(),
		}),
	});

	return (
		<>
			<input {...fields.a.inputProps} />
			<ul>
				{nodeData.map((rootNodeData) => {
					return (
						<li key={rootNodeData.id}>
							Node {rootNodeData.id}
							<Node
								field={fields.b}
								key={rootNodeData.id}
								nodeData={rootNodeData}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
};
