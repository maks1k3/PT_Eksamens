import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/form/form`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import OnBeforeSubmitExample, {
	info as OnBeforeSubmitExampleInfo,
} from './on_before_submit';
dataExtract({ info: OnBeforeSubmitExampleInfo, links, data, url });

import OnSubmitExample, { info as OnSubmitExampleInfo } from './on_submit';
dataExtract({ info: OnSubmitExampleInfo, links, data, url });

import OnChangeExample, { info as OnChangeExampleInfo } from './on_change';
dataExtract({ info: OnChangeExampleInfo, links, data, url });

import OnSuccessExample, { info as OnSuccessExampleInfo } from './on_success';
dataExtract({ info: OnSuccessExampleInfo, links, data, url });

import OnErrorExample, { info as OnErrorExampleInfo } from './on_error';
dataExtract({ info: OnErrorExampleInfo, links, data, url });

import OnFailExample, { info as OnFailExampleInfo } from './on_fail';
dataExtract({ info: OnFailExampleInfo, links, data, url });

import OnProcessExample, { info as OnProcessExampleInfo } from './on_process';
dataExtract({ info: OnProcessExampleInfo, links, data, url });

import OnValidateExample, {
	info as OnValidateExampleInfo,
} from './on_validate';
dataExtract({ info: OnValidateExampleInfo, links, data, url });

import OnValidationFailedExample, {
	info as OnValidationFailedExampleInfo,
} from './on_validation_failed';
dataExtract({ info: OnValidationFailedExampleInfo, links, data, url });

import OnRemoteRequestExample, {
	info as OnRemoteRequestExampleInfo,
} from './on_remote_request';
dataExtract({ info: OnRemoteRequestExampleInfo, links, data, url });

import AutoSubmitExample, {
	info as AutoSubmitExampleInfo,
} from './auto_submit';
dataExtract({ info: AutoSubmitExampleInfo, links, data, url });

import RefreshExample, { info as RefreshExampleInfo } from './refresh';
dataExtract({ info: RefreshExampleInfo, links, data, url });

import ConfirmationExample, {
	info as ConfirmationExampleInfo,
} from './confirmation';
dataExtract({ info: ConfirmationExampleInfo, links, data, url });

import NameExample, { info as NameExampleInfo } from './name';
dataExtract({ info: NameExampleInfo, links, data, url });

import CustomizationExample, {
	info as CustomizationExampleInfo,
} from './customization';
dataExtract({ info: CustomizationExampleInfo, links, data, url });

import RenderSubmitExample, {
	info as RenderSubmitExampleInfo,
} from './render_submit';
dataExtract({ info: RenderSubmitExampleInfo, links, data, url });

import FieldPropsExample, {
	info as FieldPropsExampleInfo,
} from './field_props';
dataExtract({ info: FieldPropsExampleInfo, links, data, url });

import ExternalControlExample, {
	info as ExternalControlExampleInfo,
} from './external_control';
dataExtract({ info: ExternalControlExampleInfo, links, data, url });

import ExternalControlWithNameExample, {
	info as ExternalControlWithNameExampleInfo,
} from './external_control_with_name';
dataExtract({ info: ExternalControlWithNameExampleInfo, links, data, url });

import ExternalComponentsExample, {
	info as ExternalComponentsExampleInfo,
} from './external_components';
dataExtract({ info: ExternalComponentsExampleInfo, links, data, url });

import CustomizeSubmitButtonExample, {
	info as CustomizeSubmitButtonExampleInfo,
} from './customize_submit_button';
dataExtract({ info: CustomizeSubmitButtonExampleInfo, links, data, url });

import CustomizeResponseExample, {
	info as CustomizeResponseExampleInfo,
} from './customize_response';
dataExtract({ info: CustomizeResponseExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<OnBeforeSubmitExample />
			<OnSubmitExample />
			<OnChangeExample />
			<OnSuccessExample />
			<OnErrorExample />
			<OnFailExample />
			<OnProcessExample />
			<OnValidateExample />
			<OnValidationFailedExample />
			<OnRemoteRequestExample />
			<AutoSubmitExample />
			<RefreshExample />
			<ConfirmationExample />
			<NameExample />
			<CustomizationExample />
			<RenderSubmitExample />
			<FieldPropsExample />
			<ExternalControlExample />
			<ExternalControlWithNameExample />
			<ExternalComponentsExample />
			<CustomizeSubmitButtonExample />
			<CustomizeResponseExample />
		</Fragment>
	);
};

export default Examples;
