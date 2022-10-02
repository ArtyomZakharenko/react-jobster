import logo from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/Landing';

function Landing() {
	return (
		<Wrapper>
			<main>
				<nav>
					<img src={logo} alt='jobster logo' className='logo'/>
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
						<button className='btn btn-hero'>Login/Register</button>
					</div>
					<img src={main} alt='job hunt' className='img main-img'/>
				</div>
			</main>
		</Wrapper>
	);
}

export default Landing;
