import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import UsersPage from 'admin/pages/users';
import TranslationsPage from 'admin/pages/translations';
import MetaDataPage from 'admin/pages/meta_data';
import SettingsPage from 'admin/pages/settings';
import Route from 'core/navigation/Route';
import Switch from 'core/navigation/Switch';
import BlogEntries from 'admin/pages/blog/components/blog_entries';
import BlogCategories from 'admin/pages/blog/components/blog_categories';
import Calculator from 'admin/pages/calculator/Calculator';
import ContactsPage from 'admin/pages/contacts/Contacts';
import CalculatorRequestPage from 'admin/pages/caclculator_requests';
import CalculatorOptions from 'admin/pages/calculator_options';
import CalculatorCategories from 'admin/pages/calculator_categories';
import CalculatorWorkTypes from 'admin/pages/calculator_work_types';

const propTypes = {};

const defaultProps = {};

class Content extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Switch>
				<Route
					path="/administration/blog/blog_entries"
					component={BlogEntries}
				/>
				<Route
					path="/administration/blog/blog_categories"
					component={BlogCategories}
				/>
				<Route path="/administration/calculator" component={Calculator} />
				<Route
					path="/administration/translations"
					component={TranslationsPage}
				/>
				<Route
					path="/administration/calculator_requests"
					component={CalculatorRequestPage}
				/>
				<Route
					path="/administration/calculator_options"
					component={CalculatorOptions}
				/>
				<Route
					path="/administration/calculator_categories"
					component={CalculatorCategories}
				/>
				<Route
					path="/administration/calculator_work_types"
					component={CalculatorWorkTypes}
				/>

				<Route path="/administration/contacts" component={ContactsPage} />
				<Route path="/administration/settings" component={SettingsPage} />
				<Route path="/administration/metadata" component={MetaDataPage} />
				<Route path="/administration/users" component={UsersPage} />
				<Route path="/administration" component={UsersPage} />
			</Switch>
		);
	}
}

Content.propTypes = propTypes;

Content.defaultProps = defaultProps;

export default Content;
