import React, { useState, useEffect } from 'react';
import { getUserData, getUserRepositories } from '../providers/githubProvider';

import Navbar from '../components/NavBar/NavBar';
import UserInfos from '../components/UserInfo/UserInfo';
import SearchBar from '../components/SearchBar/SearchBar';

import Repositories from '../components/Repositories/Repositories';
import Tabs from '../components/Tabs/Tabs';
import './UserPage.css';

import Loading from '../components/Loading/Loading';

function UserPage({ match }) {
	const [user, setUser] = useState();
	const [repositories, setRepositories] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);

	const userNameParams = match.params.userName;

	useEffect(() => {
		fetchUser();
		fetchRepositories();
		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, []);

	async function fetchUser() {
		const { data } = await getUserData(userNameParams);
		setUser(data);
	}
	async function fetchRepositories() {
		const { data } = await getUserRepositories(userNameParams);
		setRepositories(data);
	}

	const searchHandler = (searchTerm) => {
		setSearchTerm(searchTerm);
		if (searchTerm !== '') {
			const newRepoList = repositories.filter((rep) => {
				return Object.values(rep).join(' ').toLowerCase().includes(searchTerm.toLowerCase());
			});
			setSearchResults(newRepoList);
		} else {
			setSearchResults(repositories);
		}
	};

	return (
		<>
			{user ? (
				<>
					<Navbar user={user} />
					<div>
						<div className="Layout-sidebar">
							<UserInfos user={user} />
						</div>
						<div className="Layout-main">
							<div className="container">
								<Tabs repos={repositories} user={user} />
								<SearchBar searchKeyword={searchHandler} term={searchTerm} />
								<Repositories repos={searchTerm.length < 1 ? repositories : searchResults} user={user} />
							</div>
						</div>
					</div>
				</>
			) : (
				<Loading />
			)}
		</>
	);
}

export default UserPage;
