import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from '../SearchBar';
import { configure, shallow, mount, simulate } from 'enzyme';
import { render, cleanup, act } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';

import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

afterEach(cleanup);

const initialProps = {
	term: "'type anything here'",
};

describe('Search Bar', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<SearchBar />);
	});

	it('render without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<SearchBar />, div);
	});

	it('check data-testid', () => {
		expect(wrapper.find('div#data-testid')).toBeTruthy();
	});

	const { term } = initialProps;
	it('check place holder', () => {
		expect(wrapper.find(<SearchBar term={term} />)).toBeTruthy();
	});

	it('matches snapshot', () => {
		const tree = renderer.create(<SearchBar term={term} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
