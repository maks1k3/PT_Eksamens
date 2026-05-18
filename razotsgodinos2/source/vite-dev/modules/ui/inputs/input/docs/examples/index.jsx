import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/inputs/input`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import DisabledExample, { info as DisabledExampleInfo } from './disabled';
dataExtract({ info: DisabledExampleInfo, links, data, url });

import ReadOnlyExample, { info as ReadOnlyExampleInfo } from './readonly';
dataExtract({ info: ReadOnlyExampleInfo, links, data, url });

import LoadingExample, { info as LoadingExampleInfo } from './loading';
dataExtract({ info: LoadingExampleInfo, links, data, url });

import NumbersExample, { info as NumbersExampleInfo } from './numbers';
dataExtract({ info: NumbersExampleInfo, links, data, url });

import MaxExample, { info as MaxExampleInfo } from './max';
dataExtract({ info: MaxExampleInfo, links, data, url });

import CustomFormatExample, {
	info as CustomFormatExampleInfo,
} from './custom_format';
dataExtract({ info: CustomFormatExampleInfo, links, data, url });

import IconExample, { info as IconExampleInfo } from './icon';
dataExtract({ info: IconExampleInfo, links, data, url });

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
			<LoadingExample />
			<NumbersExample />
			<MaxExample />
			<CustomFormatExample />
			<IconExample />
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
