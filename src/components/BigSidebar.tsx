import NavLinks from './NavLinks';
import Logo from '../components/Logo';
import Wrapper from '../assets/wrappers/BigSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleSidebar } from "../features/user/userSlice";

function BigSidebar() {
	const { isSidebarOpen } = useSelector((store: RootState) => store.user);
	const dispatch = useDispatch();

	const toggle = () => {
		dispatch(toggleSidebar());
	};

	return (
		<Wrapper>
			<div
				className={
					isSidebarOpen
						? 'sidebar-container '
						: 'sidebar-container show-sidebar'
				}
			>
				<div className='content'>
					<header>
						<Logo />
					</header>
					<NavLinks toggleSidebar={toggle}/>
				</div>
			</div>
		</Wrapper>
	);
}

export default BigSidebar;
