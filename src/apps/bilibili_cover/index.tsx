import React from "react";
import ClipboardJS from "clipboard";
// @ts-expect-error ts-migrate(2691) FIXME: An import path cannot end with a '.tsx' extension.... Remove this comment to see the full error message
import Template from "../../layout/EnquireTemplate.tsx";
import { snackbar } from "mdui";

class Result extends React.Component {
	constructor(props: any) {
		super(props);
	}
	componentDidMount() {
		// @ts-expect-error ts-migrate(2454) FIXME: Variable 'clipboard' is used before being assigned... Remove this comment to see the full error message
		clipboard && clipboard.destroy();
		var clipboard = new ClipboardJS("#input");
		clipboard.on("success", (e) => {
			snackbar({ message: "已复制" });
			e.clearSelection();
		});
	}
	render() {
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
		const { data } = this.props;
		if (!data) return null;
		var src = data.cover;
		return (
			<>
				<div
					id="input"
					data-clipboard-text={src}
					className="mdui-textfield"
				>
					<label className="mdui-textfield-label">点击即可复制</label>
					<input
						disabled={true}
						value={src}
						className="mdui-textfield-input"
						type="text"
					/>
				</div>
				<img alt="预览封面" src={src} className="mdui-img-fluid" />
			</>
		);
	}
}

export default () => (
	<>
		<Template
			Result={Result}
			api="/api/bilibili_cover?av="
			inputOpt={{
				header: "输入av号/番号",
				icon: "ondemand_video",
			}}
		/>
	</>
);
