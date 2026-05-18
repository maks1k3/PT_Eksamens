import React, { Fragment } from 'react';
import Contents from 'common/docs/ui/contents';
import config from 'web_docs/config';
import dataExtract from 'common/docs/misc/dataExtract';

const links = [];
const url = `${config.baseName}/inputs/datetime_picker`;
export const data = {};

import BasicExample, { info as BasicExampleInfo } from './basic';
dataExtract({ info: BasicExampleInfo, links, data, url });

import DisabledExample, { info as DisabledExampleInfo } from './disabled';
dataExtract({ info: DisabledExampleInfo, links, data, url });

import IconExample, { info as IconExampleInfo } from './icon';
dataExtract({ info: IconExampleInfo, links, data, url });

import ClearableExample, { info as ClearableExampleInfo } from './clearable';
dataExtract({ info: ClearableExampleInfo, links, data, url });

import ExternalControlExample, {
	info as ExternalControlExampleInfo,
} from './external_control';
dataExtract({ info: ExternalControlExampleInfo, links, data, url });

import CallbacksExample, { info as CallbacksExampleInfo } from './callbacks';
dataExtract({ info: CallbacksExampleInfo, links, data, url });

import DateFormatExample, {
	info as DateFormatExampleInfo,
} from './date_format';
dataExtract({ info: DateFormatExampleInfo, links, data, url });

import TimeFormatExample, {
	info as TimeFormatExampleInfo,
} from './time_format';
dataExtract({ info: TimeFormatExampleInfo, links, data, url });

import LocaleExample, { info as LocaleExampleInfo } from './locale';
dataExtract({ info: LocaleExampleInfo, links, data, url });

import ViewModeExample, { info as ViewModeExampleInfo } from './view_mode';
dataExtract({ info: ViewModeExampleInfo, links, data, url });

import IsValidDateExample, {
	info as IsValidDateExampleInfo,
} from './is_valid_date';
dataExtract({ info: IsValidDateExampleInfo, links, data, url });

import TimeConstraintsExample, {
	info as TimeConstraintsExampleInfo,
} from './time_constraints';
dataExtract({ info: TimeConstraintsExampleInfo, links, data, url });

import ShowValidationErrorExample, {
	info as ShowValidationErrorExampleInfo,
} from './show_validation_error';
dataExtract({ info: ShowValidationErrorExampleInfo, links, data, url });

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
			<IconExample />
			<ClearableExample />
			<ExternalControlExample />
			<CallbacksExample />
			<DateFormatExample />
			<TimeFormatExample />
			<LocaleExample />
			<ViewModeExample />
			<IsValidDateExample />
			<TimeConstraintsExample />
			<ShowValidationErrorExample />
			<CustomizationExample />
		</Fragment>
	);
};

export default Examples;
