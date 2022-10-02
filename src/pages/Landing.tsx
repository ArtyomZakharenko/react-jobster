import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from "../components";
import { Link } from "react-router-dom";

function Landing() {
	return (
		<Wrapper>
			<main>
				<nav>
					<Logo/>
				</nav>
				<div className='container page'>
					{/* info */}
					<div className='info'>
						<h1>
							job <span>tracking</span> app
						</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ab aspernatur autem exercitationem facilis
							perferendis perspiciatis quod rerum tempora voluptate.
						</p>
						<Link to='/register' className='btn btn-hero'>
							Login/Register
						</Link>
					</div>
					<img src={main} alt='job hunt' className='img main-img'/>
				</div>
			</main>
		</Wrapper>
	);
}

export default Landing;
