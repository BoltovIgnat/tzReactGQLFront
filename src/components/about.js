import { Layout } from "antd";
import { Content, Footer } from "antd/lib/layout/layout";
import React from "react";
import AboutBook from "./aboutBook";
import HeaderComp from "./header";

function AboutPage() {
	return (
		<>
			<Layout>
				<HeaderComp />
				<AboutBook />
				<Footer style={{ textAlign: 'center' }}></Footer>
			</Layout>
		</>
	)
}

export default AboutPage;