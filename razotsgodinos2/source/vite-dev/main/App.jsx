import Content from './components/layout/content/Content';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import AdministrationHeader from './components/layout/administration_header/AdministrationHeader';
import { createPortal } from 'react-dom';
import Cookies from './components/ui/cookies/Cookies';

export default function App() {
	return (
		<div className="flex flex-col h-screen items-center">
			<AdministrationHeader />
			<Header />
			<Content />
			<Footer />
			{createPortal(<Cookies />, document.body)}
		</div>
	);
}
