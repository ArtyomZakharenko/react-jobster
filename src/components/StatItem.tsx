import Wrapper from '../assets/wrappers/StatItem';
import { Stat } from "../models/Stat";

const StatItem = ({ count, title, icon, color, bcg }: Stat) => {
	return (
		<Wrapper color={color} bcg={bcg}>
			<header>
				<span className='count'>{count}</span>
				<span className='icon'>{icon}</span>
			</header>
			<h5 className='title'>{title}</h5>
		</Wrapper>
	);
};

export default StatItem;
