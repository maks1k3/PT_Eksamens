import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import styles from './About.module.less';
import Svg4 from './svg/Svg4';
import Svg5 from './svg/Svg5';
import WithUi from 'hoc/store/ui';
import Editable from 'cms/editable';
const propTypes = {};

const defaultProps = {};
const uiProps = (ownProps) => {
	return {
		content: {
			work_title_1: {
				langData: 'langData1',
			},
			work_title_2: {
				langData: 'langData2',
			},
			work_title_3: {
				langData: 'langData3',
			},
			work_text: {
				langData: 'langData4',
			},
		},
	};
};

class About extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className={styles.container}>
					<Svg4 />
					<Svg5 />
					<div className={styles.info}>
						<p className={styles.left_text}>
							<Editable
								edit={{
									name: 'work_title_1',
								}}>
								<p>{this.props.langData1?.work_title1}</p>
							</Editable>
							<Editable
								edit={{
									name: 'work_title_2',
								}}>
								<p>{this.props.langData2?.work_title2}</p>
							</Editable>

							<Editable
								edit={{
									name: 'work_title_3',
								}}>
								<p>{this.props.langData3?.work_title3}</p>
							</Editable>
						</p>

						<p className={styles.right_text}>
							<Editable
								edit={{
									name: 'work_text',
								}}>
								<p>{this.props.langData4?.work_Text}</p>
							</Editable>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

About.propTypes = propTypes;

About.defaultProps = defaultProps;

export default WithUi(uiProps)(About);
