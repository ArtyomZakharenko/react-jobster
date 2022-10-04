import StatItem from './StatItem';
import { Stat } from '../models/Stat';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import { useSelector } from 'react-redux';
import { RootState } from "../store";

function StatsContainer() {
	const { stats } = useSelector((store: RootState) => store.allJobs);
	const defaultStats: Stat[] = [
		{
			title: 'pending applications',
			count: stats?.pending || 0,
			icon: <FaSuitcaseRolling />,
			color: '#e9b949',
			bcg: '#fcefc7',
		},
		{
			title: 'interviews scheduled',
			count: stats?.interview || 0,
			icon: <FaCalendarCheck />,
			color: '#647acb',
			bcg: '#e0e8f9',
		},
		{
			title: 'jobs declined',
			count: stats?.declined || 0,
			icon: <FaBug />,
			color: '#d66a6a',
			bcg: '#ffeeee',
		}
	];

	return (
		<Wrapper>
			{defaultStats.map((item, index) => {
				return <StatItem key={index} {...item} />;
			})}
		</Wrapper>
	);
}

export default StatsContainer;
