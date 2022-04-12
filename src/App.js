import { Breadcrumb, Layout } from 'antd';
import './App.css';
import HeaderComp from './components/header';
import HomePage from './components/homePage';

function App() {
	const { Header, Content, Footer } = Layout;
	return (
		<div className="App">
			<Layout>
				<HeaderComp />
				<Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>Главная</Breadcrumb.Item>
					</Breadcrumb>
					<div className="site-layout-background" style={{ padding: 24, minHeight: '82vh' }}>
						<HomePage />
					</div>
				</Content>
				<Footer style={{ textAlign: 'center' }}></Footer>
			</Layout>
		</div>
	);
}

export default App;
