import React from 'react';
import ReactDOM from 'react-dom';
import Repository from '../Repository';
import { configure, mount } from 'enzyme';
import { cleanup } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

afterEach(cleanup);

const initialProps = {
	full_name: 'shayan zeinali',
	name: 'shayan',
	description: 'here is the description',
	language: 'javascript',
	stargazers_count: '3',
	forks_count: '5',
};

describe('Repository', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Repository repo={initialProps} />);
	});

	it('render without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Repository repo={initialProps} />, div);
	});

	it('check place holder', () => {
		expect(wrapper.find(<Repository prop={initialProps} />)).toBeTruthy();
	});
});
