import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/inputs/textarea`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import DisabledExample, { info as DisabledExampleInfo } from './disabled';
dataExtract({ info: DisabledExampleInfo, links, data, url });

import ReadOnlyExample, { info as ReadOnlyExampleInfo } from './readonly';
dataExtract({ info: ReadOnlyExampleInfo, links, data, url });

import AutoSizeExample, { info as AutoSizeExampleInfo } from './auto_size';
dataExtract({ info: AutoSizeExampleInfo, links, data, url });

import CharsLimitExample, {
	info as CharsLimitExampleInfo,
} from './chars_limit';
dataExtract({ info: CharsLimitExampleInfo, links, data, url });

import ClearableExample, { info as ClearableExampleInfo } from './clearable';
dataExtract({ info: ClearableExampleInfo, links, data, url });

import ControlledExample, { info as ControlledExampleInfo } from './controlled';
dataExtract({ info: ControlledExampleInfo, links, data, url });

import ExternalControlExample, {
	info as ExternalControlExampleInfo,
} from './external';
dataExtract({ info: ExternalControlExampleInfo, links, data, url });

import StyledPlacholderExample, {
	info as StyledPlacholderExampleInfo,
} from './styled_placeholder';
dataExtract({ info: StyledPlacholderExampleInfo, links, data, url });

import AutoSelectExample, {
	info as AutoSelectExampleInfo,
} from './auto_select';
dataExtract({ info: AutoSelectExampleInfo, links, data, url });

import AutoFocusExample, { info as AutoFocusExampleInfo } from './auto_focus';
dataExtract({ info: AutoFocusExampleInfo, links, data, url });

import InvisibleExample, { info as InvisibleExampleInfo } from './invisible';
dataExtract({ info: InvisibleExampleInfo, links, data, url });

import CallbacksExample, { info as CallbacksExampleInfo } from './callbacks';
dataExtract({ info: CallbacksExampleInfo, links, data, url });

import ValidationErrorExample, {
	info as ValidationErrorExampleInfo,
} from './validation_error';
dataExtract({ info: ValidationErrorExampleInfo, links, data, url });

import CustomizationExample, {
	info as CustomizationExampleInfo,
} from './customization';
dataExtract({ info: CustomizationExampleInfo, links, data, url });

const Examples = () => {
	return (
		<Fragment>
			<Contents links={links} />
			<BasicExample />
			<DisabledExample />
			<ReadOnlyExample />
			<AutoSizeExample />
			<CharsLimitExample />
			<ClearableExample />
			<ControlledExample />
			<ExternalControlExample />
			<StyledPlacholderExample />
			<AutoSelectExample />
			<AutoFocusExample />
			<InvisibleExample />
			<CallbacksExample />
			<ValidationErrorExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
