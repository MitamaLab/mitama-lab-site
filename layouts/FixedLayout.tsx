import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ArrowRightOutlined,
  TwitterOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Image, Row, Col, Breadcrumb } from "antd";
import Head from "next/head";
import React, { ReactNode, useEffect, useState } from "react";
import styles from "./BasicLayout.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

const { Header, Sider, Content, Footer } = Layout;

type Path = {
  breadcrumb: string,
  href: string,
}

function MainContent({ children, breadcrumbs }: { readonly children: ReactNode, breadcrumbs: Path[] | null }) {
  return (
    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
      <Breadcrumb>
        <Breadcrumb.Item>
          HOME
        </Breadcrumb.Item>
        {breadcrumbs && (
          breadcrumbs.map(path => {
            return (
              <Link href={path.href}>
                <a>
                  <Breadcrumb.Item>
                    {path.breadcrumb}
                  </Breadcrumb.Item>
                </a>
              </Link>
            )
          }
          )
        )}
      </Breadcrumb>
      <Content
        className={styles.siteLayoutBackground}
        style={{
          margin: "16px",
          padding: 24,
          minHeight: '100vh',
        }}
      >
        {children}
      </Content>
    </Content>
  )
}

// Fixed Layout

// |----------------------|
// |  Header              |
// |----------------------|
// | S | Contents         |
// | i |                  |
// | d |                  |
// | e |                  |
// |   |                  |
// | M |                  |
// | e |                  |
// | n |                  |
// | u |                  |
// |----------------------|

function FixedLayout({ children }: { readonly children: ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  function toggle() {
    setCollapsed(!collapsed);
  }

  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Array<Path> | null>(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Mitama Lab.</title>
      </Head>

      {/* Fixed Header Grid */}
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: "100px" }}>
          <Row justify="center" align="middle">
            <Col className="gutter-row" span={6}>
              <Link href="/">
                <a><Image src="/assets/lab/MitamaLabHeaderM.svg" height="90px" preview={false} /></a>
              </Link>
            </Col>
            <Col className="gutter-row" span={6}>
            </Col>
            <Col className="gutter-row" span={6} offset={6}>
              <a href="https://twitter.com/mitama_rs" target="_blank">
                <TwitterOutlined style={{ color: "white", fontSize: '50px', margin: 10 }} />
              </a>
              <a href="https://github.com/orgs/MitamaLab" target="_blank">
                <GithubOutlined style={{ color: "white", fontSize: '50px', margin: 10 }} />
              </a>
            </Col>
          </Row>
        </Header>
      </Layout>

      <Layout>
        {/* Fixed Side Menu */}
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 100
          }}
          trigger={null}
          collapsible collapsed={collapsed}
        >

          {collapsed ? (
            <MenuUnfoldOutlined className={styles.trigger} onClick={toggle} />
          ) : (
            <MenuFoldOutlined className={styles.trigger} onClick={toggle} />
          )}

          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<ArrowRightOutlined />}>
              <Link href="/">
                HOME
              </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<ArrowRightOutlined />}>
              PORTFOLIO
            </Menu.Item>
            <Menu.Item key="3" icon={<ArrowRightOutlined />}>
              <Link href="/blog">
                BLOG
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>

        {/* Main Contents */}
        {collapsed ? (
          <Layout className="site-layout" style={{ marginLeft: 80, marginTop: 100 }}>
            <MainContent children={children} breadcrumbs={breadcrumbs} />
            <Footer style={{ textAlign: 'center' }}>Mitama Lab. ©2021 All Rights Reserved.</Footer>
          </Layout>
        ) : (
          <Layout className="site-layout" style={{ marginLeft: 200, marginTop: 100 }}>
            <MainContent children={children} breadcrumbs={breadcrumbs} />
            <Footer style={{ textAlign: 'center' }}>Mitama Lab. ©2021 All Rights Reserved.</Footer>
          </Layout>
        )}

      </Layout>
    </>
  );
}

export default FixedLayout;
