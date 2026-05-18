import React from 'react';
import ExampleHolder from 'common/docs/ui/example_holder';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import ReCaptcha from 'ui/inputs/recaptcha';

import BackendCode from 'common/docs/ui/backend_code';

const title = 'ReCaptcha: basic';

export const info = {
	id: _g.slugify(title),
	title: title,
	description: '',
	code: `
import Form from 'ui/form';
import Field from 'ui/form/field';
import Input from 'ui/inputs/input';
import ReCaptcha from 'ui/inputs/recaptcha';

<Form
	refresh={true}
	action="example_api/recaptcha"
	submit={{
		title: 'Save',
	}}>
	<Field label="Some" name="data" component={Input} />
	<div
		style={{
			display: 'flex',
			justifyContent: 'flex-end',
			marginBottom: '20px',
		}}>
		<div>
			<Field name="captcha" component={ReCaptcha} isRequired={true} />
		</div>
	</div>
</Form>
  `,
};
//<editor-fold defaultstate="collapsed" desc="backendCode">
let backendCode = `
use App\\Logic\\Core\\ReCaptcha;

/**
* Recaptcha test
*
* @access public
* @return json
*/
public function recaptcha(Request $request) {
//<editor-fold defaultstate="collapsed" desc="recaptcha">
    //validation
    $rules = [
        'captcha' => 'required|string',
    ];
    $validate = Response::validate($request->all(), $rules);
    if ($validate) return $validate;

    if (!ReCaptcha::isValid($request->captcha)){
        return Response::error("Captcha is incorrect!");
    }

    $response = [
        'msg' => 'Captcha is correct',
    ];
    return Response::success($response);
//</editor-fold>
}
`;
//</editor-fold>

const Example = () => {
	return (
		<ExampleHolder
			id={info.id}
			title={info.title}
			description={info.description}
			code={info.code}>
			<Form
				refresh={true}
				action="example_api/recaptcha"
				submit={{
					title: 'Save',
				}}>
				<Field label="Some" name="data" component={Input} />
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						marginBottom: '20px',
					}}>
					<div>
						<Field name="captcha" component={ReCaptcha} isRequired={true} />
					</div>
				</div>
			</Form>
			<div style={{ paddingTop: '20px' }}>
				<BackendCode code={backendCode} />
			</div>
		</ExampleHolder>
	);
};

export default Example;
