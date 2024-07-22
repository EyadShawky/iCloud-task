import { Content, Footer, Header } from "antd/es/layout/layout";
import Navbar from "./Navbar";
import { Layout } from "antd";
import Link from "next/link";

const MainLayout = ({ children , cart , setCart }) => {
    return (
        <Layout className="main-home vh-100">
            <Header>
                <Navbar car={cart} />
            </Header>
            <Content style={{ padding: '15px' }}>
                {children}
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                   
                }}
            >
                Got questions? Take a look at our <Link href='/faq'>FAQs</Link> , talk to us on Twitter @company or send an email to <Link href='/faq'>team@company.com</Link>
            </Footer>
        </Layout>
    )
}

export default MainLayout;