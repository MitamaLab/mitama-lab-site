import { getAllPosts } from '../lib/api'
import Post from '../types/post'
import dynamic from "next/dynamic";
import Link from "next/link";
import { Layout, Card, Divider } from "antd";
import Head from "next/head";
import React, { ReactNode, useState } from "react";
import styles from "./BasicLayout.module.css";

const { Header, Sider, Content, Footer } = Layout;

const BasicLayout = dynamic(() => import("../layouts/FixedLayout"), {
  ssr: false,
});

type Props = {
  allPosts: Post[]
}

type Latest = {
  latestPost: Post
}

const LatestPost = ({ latestPost }: Latest) => {
  return (
    <>
    </>
  )
}

const Blog = ({ allPosts }: Props) => {
  const latestPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <BasicLayout>
      <Layout>
        <Head>
          <title>Mitama Blog. | Top</title>
        </Head>
        {latestPost && (
          <LatestPost latestPost={latestPost} />
        )}
      </Layout>
    </BasicLayout>
  )
}

export default Blog

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
